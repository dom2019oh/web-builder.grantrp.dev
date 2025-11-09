import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import EditorCanvas from "@/components/editor/EditorCanvas";
import ComponentPalette from "@/components/editor/ComponentPalette";
import { useAuth } from "@/hooks/useAuth";

interface CanvasComponent {
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
  const [components, setComponents] = useState<CanvasComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (projectId) {
      loadProject();
    }
  }, [projectId, user]);

  const loadProject = async () => {
    try {
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (projectError) throw projectError;
      
      setProjectName(project.name);

      const { data: projectComponents, error: componentsError } = await supabase
        .from("project_components")
        .select("*")
        .eq("project_id", projectId)
        .order("z_index", { ascending: true });

      if (componentsError) throw componentsError;

      setComponents(projectComponents || []);
    } catch (error) {
      console.error("Error loading project:", error);
      toast.error("Failed to load project");
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, delta } = event;
    
    if (active.id.toString().startsWith("palette-")) {
      // Adding new component from palette
      const componentType = active.id.toString().replace("palette-", "");
      const newComponent = {
        component_id: `${componentType}-${Date.now()}`,
        component_type: componentType,
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
          .insert({
            project_id: projectId,
            ...newComponent,
          })
          .select()
          .single();

        if (error) throw error;

        setComponents([...components, data]);
        toast.success("Component added");
      } catch (error) {
        console.error("Error adding component:", error);
        toast.error("Failed to add component");
      }
    } else {
      // Moving existing component
      const componentId = active.id.toString();
      const component = components.find((c) => c.id === componentId);
      
      if (component) {
        const updatedComponent = {
          ...component,
          position_x: Math.max(0, component.position_x + delta.x),
          position_y: Math.max(0, component.position_y + delta.y),
        };

        try {
          const { error } = await supabase
            .from("project_components")
            .update({
              position_x: updatedComponent.position_x,
              position_y: updatedComponent.position_y,
            })
            .eq("id", componentId);

          if (error) throw error;

          setComponents(
            components.map((c) => (c.id === componentId ? updatedComponent : c))
          );
        } catch (error) {
          console.error("Error updating component:", error);
          toast.error("Failed to update component");
        }
      }
    }
  };

  const handleDeleteComponent = async (componentId: string) => {
    try {
      const { error } = await supabase
        .from("project_components")
        .delete()
        .eq("id", componentId);

      if (error) throw error;

      setComponents(components.filter((c) => c.id !== componentId));
      setSelectedComponent(null);
      toast.success("Component deleted");
    } catch (error) {
      console.error("Error deleting component:", error);
      toast.error("Failed to delete component");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("projects")
        .update({ updated_at: new Date().toISOString() })
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

  const handlePreview = () => {
    toast.info("Preview feature coming soon!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <div className="fixed top-20 left-0 right-0 z-40 glass border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-xl font-bold">{projectName}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreview}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-button border-0"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex pt-32">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <aside className="w-64 border-r border-border glass p-4">
            <ComponentPalette />
          </aside>

          <main className="flex-1 overflow-auto bg-muted/30">
            <EditorCanvas
              components={components}
              selectedComponent={selectedComponent}
              onSelectComponent={setSelectedComponent}
              onDeleteComponent={handleDeleteComponent}
            />
          </main>

          {selectedComponent && (
            <aside className="w-80 border-l border-border glass p-4">
              <Card className="glass border-0">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Properties</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteComponent(selectedComponent)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Component properties panel coming soon
                  </p>
                </div>
              </Card>
            </aside>
          )}
        </DndContext>
      </div>
    </div>
  );
};

export default Editor;
