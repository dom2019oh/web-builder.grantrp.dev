import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import SectionPalette from "@/components/editor/SectionPalette";
import EditorCanvas from "@/components/editor/EditorCanvas";
import StylePanel from "@/components/editor/StylePanel";
import EditorToolbar from "@/components/editor/EditorToolbar";
import KeyboardShortcutsHelp from "@/components/editor/KeyboardShortcutsHelp";
import { useUndoRedo } from "@/hooks/useUndoRedo";

interface Component {
  id: string;
  component_id: string;
  component_type: string;
  props: any;
  position_x: number;
  position_y: number;
  width: number;
  height: number;
  z_index: number;
}

const Editor = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projectName, setProjectName] = useState("");
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewMode, setPreviewMode] = useState(false);
  
  const {
    state: components,
    setState: setComponents,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoRedo<Component[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (projectId) {
      checkAccessAndLoadProject();
      loadComponents();
    }
  }, [projectId, user]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo: Ctrl+Z or Cmd+Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo) undo();
      }
      // Redo: Ctrl+Shift+Z or Cmd+Shift+Z or Ctrl+Y
      if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') || (e.ctrlKey && e.key === 'y')) {
        e.preventDefault();
        if (canRedo) redo();
      }
      // Delete: Delete or Backspace
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedComponent) {
        e.preventDefault();
        handleDeleteComponent(selectedComponent);
      }
      // Save: Ctrl+S or Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, selectedComponent, undo, redo]);

  const checkAccessAndLoadProject = async () => {
    try {
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (projectError) throw projectError;

      // Access control: only project owner can access
      if (project.user_id !== user!.id) {
        toast.error("You don't have permission to access this project");
        navigate("/dashboard");
        return;
      }

      setProjectName(project.name);
    } catch (error) {
      console.error("Error loading project:", error);
      toast.error("Failed to load project");
      navigate("/dashboard");
    }
  };

  const loadComponents = async () => {
    try {
      const { data, error } = await supabase
        .from("project_components")
        .select("*")
        .eq("project_id", projectId)
        .order("z_index");

      if (error) throw error;
      setComponents(data || []);
    } catch (error) {
      console.error("Error loading components:", error);
      toast.error("Failed to load components");
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.id !== "canvas") {
      setSelectedComponent(event.active.id as string);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, delta, over } = event;

    if (over?.id === "canvas" && active.data.current?.isNew) {
      // Create new component
      const newComponent = {
        project_id: projectId,
        component_type: active.id as string,
        component_id: active.id as string,
        props: {},
        position_x: Math.max(0, delta.x),
        position_y: Math.max(0, delta.y),
        width: 300,
        height: 200,
        z_index: components.length,
      };

      try {
        const { data, error } = await supabase
          .from("project_components")
          .insert(newComponent)
          .select()
          .single();

        if (error) throw error;
        setComponents([...components, data]);
        toast.success("Component added!");
      } catch (error) {
        console.error("Error adding component:", error);
        toast.error("Failed to add component");
      }
    } else if (active.data.current?.isExisting) {
      // Update existing component position
      const component = components.find((c) => c.id === active.id);
      if (component) {
        const updatedComponent = {
          ...component,
          position_x: component.position_x + delta.x,
          position_y: component.position_y + delta.y,
        };

        try {
          const { error } = await supabase
            .from("project_components")
            .update({
              position_x: updatedComponent.position_x,
              position_y: updatedComponent.position_y,
            })
            .eq("id", component.id);

          if (error) throw error;

          setComponents(
            components.map((c) => (c.id === component.id ? updatedComponent : c))
          );
        } catch (error) {
          console.error("Error updating component:", error);
          toast.error("Failed to update component");
        }
      }
    }
  };

  const handleDeleteComponent = async (id: string) => {
    try {
      const { error } = await supabase
        .from("project_components")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setComponents(components.filter((c) => c.id !== id));
      setSelectedComponent(null);
      toast.success("Component deleted!");
    } catch (error) {
      console.error("Error deleting component:", error);
      toast.error("Failed to delete component");
    }
  };

  const handleUpdateComponent = async (id: string, updates: Partial<Component>) => {
    const component = components.find((c) => c.id === id);
    if (!component) return;

    const updatedComponent = { ...component, ...updates };

    try {
      const { error } = await supabase
        .from("project_components")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      setComponents(components.map((c) => (c.id === id ? updatedComponent : c)));
    } catch (error) {
      console.error("Error updating component:", error);
      toast.error("Failed to update component");
    }
  };

  const handleAIEnhance = async () => {
    if (!selectedComponent) return;
    
    const component = components.find((c) => c.id === selectedComponent);
    if (!component) return;

    try {
      const { data, error } = await supabase.functions.invoke("enhance-component", {
        body: {
          componentType: component.component_type,
          currentProps: component.props,
        },
      });

      if (error) throw error;

      if (data?.enhancedProps) {
        handleUpdateComponent(selectedComponent, { props: data.enhancedProps });
        toast.success("Component enhanced with AI!");
      }
    } catch (error) {
      console.error("Error enhancing component:", error);
      toast.error("Failed to enhance component");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("projects")
        .update({ 
          updated_at: new Date().toISOString() 
        })
        .eq("id", projectId);

      if (error) throw error;

      toast.success("Project saved!");
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  const getCanvasWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      default:
        return "100%";
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Top Toolbar */}
        <EditorToolbar
          projectName={projectName}
          onSave={handleSave}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
          isSaving={isSaving}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          previewMode={previewMode}
          onPreviewToggle={() => setPreviewMode(!previewMode)}
        />

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Section Palette */}
          {!previewMode && (
            <div className="w-72 bg-muted/30 border-r border-border overflow-hidden">
              <SectionPalette />
            </div>
          )}

          {/* Main Canvas Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-muted/20">
            <div className="flex-1 overflow-auto p-6">
              <div
                className="mx-auto transition-all duration-300 bg-background shadow-xl"
                style={{
                  width: getCanvasWidth(),
                  minHeight: viewMode === "desktop" ? "100%" : "667px",
                }}
              >
                <EditorCanvas
                  components={components}
                  selectedComponent={selectedComponent}
                  onSelectComponent={setSelectedComponent}
                  onDeleteComponent={handleDeleteComponent}
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar - Style Panel */}
          {!previewMode && (
            <div className="w-80 bg-muted/30 border-l border-border overflow-hidden">
              <StylePanel
                component={components.find((c) => c.id === selectedComponent) || null}
                onUpdate={(updates) => selectedComponent && handleUpdateComponent(selectedComponent, updates)}
                onDelete={() => selectedComponent && handleDeleteComponent(selectedComponent)}
                onAIGenerate={handleAIEnhance}
                onDuplicate={() => {
                  const component = components.find((c) => c.id === selectedComponent);
                  if (component) {
                    const { id, created_at, updated_at, ...componentData } = component as any;
                    const newComponent = {
                      project_id: projectId,
                      ...componentData,
                      position_x: component.position_x + 20,
                      position_y: component.position_y + 20,
                    };
                    supabase
                      .from("project_components")
                      .insert([newComponent])
                      .select()
                      .single()
                      .then(({ data, error }) => {
                        if (!error && data) {
                          setComponents([...components, data]);
                          toast.success("Component duplicated!");
                        }
                      });
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Floating Back Button */}
        <div className="absolute top-4 left-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="glass shadow-lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="absolute bottom-4 right-4">
          <KeyboardShortcutsHelp />
        </div>
      </div>
    </DndContext>
  );
};

export default Editor;
