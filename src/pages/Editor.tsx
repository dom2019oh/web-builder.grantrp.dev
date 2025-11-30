import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Search, Bell, Monitor, Tablet, Smartphone, Edit3, Undo, Redo, Eye, Layout as LayoutIcon, Grid3X3, Layers as LayersIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { useCredits, CREDIT_COSTS } from "@/hooks/useCredits";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DraggableComponent } from "@/components/editor/DraggableComponent";
import { LayerPanel } from "@/components/editor/LayerPanel";
import { ComponentLibrary } from "@/components/editor/ComponentLibrary";
import { useEditorHistory } from "@/hooks/useEditorHistory";
import { motion, AnimatePresence } from "framer-motion";

interface Component {
  id: string;
  component_type: string;
  props: any;
  z_index?: number;
}

const Editor = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { canPublish } = useSubscription();
  const { deductCredits, hasEnoughCredits, credits } = useCredits();
  
  const [projectName, setProjectName] = useState("");
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [rightPanel, setRightPanel] = useState<"library" | "layers" | null>("library");
  
  const { addToHistory, undo, redo, canUndo, canRedo } = useEditorHistory(components);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (!user || !projectId) return;
    loadProject();
  }, [projectId, user]);

  useEffect(() => {
    addToHistory(components);
  }, [components]);

  const loadProject = async () => {
    if (!user || !projectId) {
      navigate("/login");
      return;
    }

    try {
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (projectError || !project) {
        toast.error("Project not found");
        navigate("/dashboard");
        return;
      }

      if (project.user_id !== user.id) {
        toast.error("Access denied");
        navigate("/dashboard");
        return;
      }

      setProjectName(project.name);

      const { data: componentsData } = await supabase
        .from("project_components")
        .select("*")
        .eq("project_id", projectId);

      setComponents(componentsData || []);
    } catch (error) {
      console.error("Error loading project", error);
      toast.error("Failed to load project");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleUndo = () => {
    const previousState = undo();
    if (previousState) {
      setComponents(previousState);
      syncComponentsToDatabase(previousState);
    }
  };

  const handleRedo = () => {
    const nextState = redo();
    if (nextState) {
      setComponents(nextState);
      syncComponentsToDatabase(nextState);
    }
  };

  const syncComponentsToDatabase = async (comps: Component[]) => {
    try {
      await supabase
        .from("project_components")
        .delete()
        .eq("project_id", projectId);

      if (comps.length > 0) {
        await supabase
          .from("project_components")
          .insert(comps.map(c => ({ 
            ...c, 
            project_id: projectId,
            component_id: c.id
          })));
      }
    } catch (error) {
      console.error("Error syncing:", error);
    }
  };

  const handleAddComponent = async (template: any) => {
    if (!hasEnoughCredits(CREDIT_COSTS.ADD_COMPONENT)) {
      toast.error("Insufficient credits!");
      navigate("/credits");
      return;
    }

    const success = await deductCredits("Add Component", CREDIT_COSTS.ADD_COMPONENT);
    if (!success) return;

    try {
      const newComponent = {
        project_id: projectId,
        component_type: template.type,
        component_id: `component-${Date.now()}`,
        props: template.props,
        z_index: components.length,
      };

      const { data, error } = await supabase
        .from("project_components")
        .insert(newComponent)
        .select()
        .single();

      if (error) throw error;
      setComponents([...components, data]);
      toast.success(`${template.name} added`);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add component");
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
      setSelectedId(null);
      toast.success("Component deleted");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete");
    }
  };

  const handleUpdateComponent = async (id: string, props: any) => {
    try {
      const { error } = await supabase
        .from("project_components")
        .update({ props })
        .eq("id", id);

      if (error) throw error;
      setComponents(components.map((c) => (c.id === id ? { ...c, props } : c)));
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update");
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        syncComponentsToDatabase(newItems);
        return newItems;
      });
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", projectId);

      if (error) throw error;
      toast.success("Project saved");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save");
    }
  };

  const handlePublish = async () => {
    if (!canPublish()) {
      toast.error("Upgrade to publish");
      return;
    }

    if (!hasEnoughCredits(CREDIT_COSTS.PUBLISH_SUBDOMAIN)) {
      toast.error("Insufficient credits!");
      navigate("/credits");
      return;
    }

    const success = await deductCredits("Publish", CREDIT_COSTS.PUBLISH_SUBDOMAIN);
    if (!success) return;

    try {
      const { error } = await supabase
        .from("projects")
        .update({ 
          published: true,
          published_at: new Date().toISOString(),
        })
        .eq("id", projectId);

      if (error) throw error;
      toast.success("Project published!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to publish");
    }
  };

  const selectedComponent = components.find((c) => c.id === selectedId);

  const getDeviceWidth = () => {
    switch (deviceView) {
      case "mobile": return "max-w-[375px]";
      case "tablet": return "max-w-[768px]";
      default: return "max-w-7xl";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Loading editor...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <header className="h-16 border-b border-border/50 glass backdrop-blur-premium flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-2 hover-lift">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Exit</span>
          </Button>
          
          <div className="flex items-center gap-2 pl-4 border-l border-border/50">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 w-9 p-0" 
              onClick={handleUndo}
              disabled={!canUndo}
              title="Undo (Cmd+Z)"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 w-9 p-0" 
              onClick={handleRedo}
              disabled={!canRedo}
              title="Redo (Cmd+Shift+Z)"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-display font-semibold bg-gradient-primary bg-clip-text text-transparent">
            {projectName}
          </span>
          <span className="text-xs text-muted-foreground hidden sm:inline">• Editor</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 glass border border-border/50 rounded-xl p-1">
            <Button 
              variant={deviceView === "desktop" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => setDeviceView("desktop")}
              title="Desktop View"
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button 
              variant={deviceView === "tablet" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => setDeviceView("tablet")}
              title="Tablet View"
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button 
              variant={deviceView === "mobile" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => setDeviceView("mobile")}
              title="Mobile View"
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          
          <Button onClick={handleSave} size="sm" className="gap-2 bg-gradient-primary hover-lift hover-glow">
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Save</span>
          </Button>
          
          <Button onClick={handlePublish} size="sm" className="gap-2 bg-gradient-secondary hover-lift hover-glow">
            Publish
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Canvas */}
        <main className="flex-1 overflow-y-auto bg-muted/30 relative">
          <div className={`${getDeviceWidth()} mx-auto p-8 transition-smooth`}>
            <div className="glass-strong rounded-2xl shadow-premium-lg min-h-[800px] p-8 border border-border/30">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={components.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-4 pl-8">
                    <AnimatePresence mode="popLayout">
                      {components.map((component) => (
                        <DraggableComponent
                          key={component.id}
                          component={component}
                          isSelected={selectedId === component.id}
                          onClick={() => setSelectedId(component.id)}
                          onUpdate={(props) => handleUpdateComponent(component.id, props)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </SortableContext>
              </DndContext>

              {components.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center h-[600px] border-2 border-dashed border-border/50 rounded-2xl glass-soft"
                >
                  <div className="text-center max-w-sm">
                    <Edit3 className="h-16 w-16 text-primary/50 mx-auto mb-6" />
                    <h3 className="text-xl font-display font-semibold mb-2">Start Building</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Add components from the library to create your page
                    </p>
                    <Button
                      onClick={() => setRightPanel("library")}
                      className="bg-gradient-primary hover-lift hover-glow"
                    >
                      <Grid3X3 className="h-4 w-4 mr-2" />
                      Open Component Library
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </main>

        {/* Right Panel - Component Library or Layers */}
        <AnimatePresence mode="wait">
          {rightPanel && (
            <motion.aside
              key={rightPanel}
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-80 relative"
            >
              {/* Panel Tabs */}
              <div className="absolute top-0 -left-12 flex flex-col gap-2 z-10">
                <Button
                  variant={rightPanel === "library" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-10 w-10 p-0 glass border border-border/50"
                  onClick={() => setRightPanel(rightPanel === "library" ? null : "library")}
                  title="Component Library"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={rightPanel === "layers" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-10 w-10 p-0 glass border border-border/50"
                  onClick={() => setRightPanel(rightPanel === "layers" ? null : "layers")}
                  title="Layers"
                >
                  <LayersIcon className="h-4 w-4" />
                </Button>
              </div>

              {rightPanel === "library" && (
                <ComponentLibrary onAddComponent={handleAddComponent} />
              )}
              
              {rightPanel === "layers" && (
                <LayerPanel
                  components={components}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  onDelete={handleDeleteComponent}
                  onReorder={setComponents}
                />
              )}
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Floating Panel Toggle (when closed) */}
        {!rightPanel && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="absolute top-20 right-4 flex flex-col gap-2 z-10"
          >
            <Button
              variant="secondary"
              size="sm"
              className="h-10 w-10 p-0 glass-strong border border-border/50 shadow-premium hover-lift"
              onClick={() => setRightPanel("library")}
              title="Component Library"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="h-10 w-10 p-0 glass-strong border border-border/50 shadow-premium hover-lift"
              onClick={() => setRightPanel("layers")}
              title="Layers"
            >
              <LayersIcon className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Editor;
