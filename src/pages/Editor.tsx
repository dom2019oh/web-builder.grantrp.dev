import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Trash2, Search, Bell, Monitor, Tablet, Smartphone, Edit3, Home as HomeIcon, Layout, Palette, Image, Settings, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { componentTemplates } from "@/components/editor/ComponentTemplates";
import { ComponentRenderer } from "@/components/editor/ComponentRenderer";
import { PagesView } from "@/components/editor/PagesView";
import { StylesView } from "@/components/editor/StylesView";
import { AssetsView } from "@/components/editor/AssetsView";
import { SEOView } from "@/components/editor/SEOView";

interface Component {
  id: string;
  component_type: string;
  props: any;
}

const Editor = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projectName, setProjectName] = useState("");
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<"components" | "pages" | "styles" | "assets" | "seo">("components");
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showTemplates, setShowTemplates] = useState(false);

  useEffect(() => {
    if (!user || !projectId) {
      return;
    }
    loadProject();
  }, [projectId, user]);

  const loadProject = async () => {
    if (!user || !projectId) {
      console.log("Editor: No user or projectId", { user: !!user, projectId });
      navigate("/login");
      return;
    }

    console.log("Editor: Loading project", projectId);
    
    try {
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      console.log("Editor: Project fetch result", { project: !!project, error: projectError });

      if (projectError || !project) {
        console.error("Editor: Project not found", projectError);
        toast.error("Project not found");
        navigate("/dashboard");
        return;
      }

      if (project.user_id !== user.id) {
        console.error("Editor: Access denied", { projectUserId: project.user_id, userId: user.id });
        toast.error("Access denied");
        navigate("/dashboard");
        return;
      }

      setProjectName(project.name);

      const { data: componentsData } = await supabase
        .from("project_components")
        .select("*")
        .eq("project_id", projectId);

      console.log("Editor: Components loaded", componentsData?.length || 0);
      setComponents(componentsData || []);
    } catch (error) {
      console.error("Editor: Error loading project", error);
      toast.error("Failed to load project");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComponent = async () => {
    setShowTemplates(true);
  };

  const handleAddTemplateComponent = async (template: any) => {
    try {
      const newComponent = {
        project_id: projectId,
        component_type: template.type,
        component_id: `component-${Date.now()}`,
        props: template.props,
        position_x: 0,
        position_y: 0,
        width: 300,
        height: 100,
        z_index: components.length,
      };

      const { data, error } = await supabase
        .from("project_components")
        .insert(newComponent)
        .select()
        .single();

      if (error) throw error;
      setComponents([...components, data]);
      setShowTemplates(false);
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
      toast.error("Failed to delete component");
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

  const selectedComponent = components.find((c) => c.id === selectedId);

  const getDeviceWidth = () => {
    switch (deviceView) {
      case "mobile": return "max-w-[375px]";
      case "tablet": return "max-w-[768px]";
      default: return "max-w-6xl";
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-background">Loading...</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar */}
      <header className="h-14 border-b bg-background flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Exit
          </Button>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Bell className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Grant Dev</span>
          <span className="text-sm font-medium">{projectName}</span>
          <span className="text-xs text-muted-foreground">• Published</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border rounded-md p-1 bg-muted/30">
            <Button 
              variant={deviceView === "desktop" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-7 w-7 p-0"
              onClick={() => setDeviceView("desktop")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button 
              variant={deviceView === "tablet" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-7 w-7 p-0"
              onClick={() => setDeviceView("tablet")}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button 
              variant={deviceView === "mobile" ? "secondary" : "ghost"} 
              size="sm" 
              className="h-7 w-7 p-0"
              onClick={() => setDeviceView("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleSave} size="sm" className="gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-56 border-r bg-background overflow-y-auto">
          <div className="p-4">
            <div className="space-y-1 mb-6">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 text-sm font-medium"
                onClick={() => navigate("/dashboard")}
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Button>
            </div>
            
            <div className="space-y-1">
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Website
              </div>
              <Button 
                variant={activeView === "pages" ? "secondary" : "ghost"} 
                className="w-full justify-start gap-2 text-sm pl-4"
                onClick={() => setActiveView("pages")}
              >
                <Layout className="h-4 w-4" />
                Pages
              </Button>
              <Button 
                variant={activeView === "styles" ? "secondary" : "ghost"} 
                className="w-full justify-start gap-2 text-sm pl-4"
                onClick={() => setActiveView("styles")}
              >
                <Palette className="h-4 w-4" />
                Styles
              </Button>
              <Button 
                variant={activeView === "assets" ? "secondary" : "ghost"} 
                className="w-full justify-start gap-2 text-sm pl-4"
                onClick={() => setActiveView("assets")}
              >
                <Image className="h-4 w-4" />
                Assets
              </Button>
              <Button 
                variant={activeView === "seo" ? "secondary" : "ghost"} 
                className="w-full justify-start gap-2 text-sm pl-4"
                onClick={() => setActiveView("seo")}
              >
                <Settings className="h-4 w-4" />
                SEO / AIO
              </Button>
            </div>

            {activeView === "components" && (
              <div className="mt-6 space-y-1">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Components
                </div>
                <Button onClick={handleAddComponent} variant="outline" size="sm" className="w-full gap-2">
                  <Plus className="h-3 w-3" />
                  Add Component
                </Button>
                <div className="space-y-1 mt-2">
                  {components.map((component) => (
                    <div
                      key={component.id}
                      className={`flex items-center justify-between p-2 pl-4 rounded-md cursor-pointer hover:bg-muted transition-colors text-sm ${
                        selectedId === component.id ? "bg-muted border border-primary" : ""
                      }`}
                      onClick={() => setSelectedId(component.id)}
                    >
                      <span className="truncate flex-1">{component.component_type}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteComponent(component.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {components.length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-4">
                      No components yet
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeView === "pages" && <PagesView />}
            {activeView === "styles" && <StylesView />}
            {activeView === "assets" && <AssetsView />}
            {activeView === "seo" && <SEOView />}
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 overflow-y-auto bg-muted/20 relative">
          <div className={`${getDeviceWidth()} mx-auto p-8 transition-all duration-300`}>
            <div className="bg-background rounded-lg shadow-lg min-h-[800px] p-8">
              <div className="space-y-4">
                {components.map((component) => (
                  <ComponentRenderer
                    key={component.id}
                    component={component}
                    isSelected={selectedId === component.id}
                    onClick={() => setSelectedId(component.id)}
                  />
                ))}
                {components.length === 0 && (
                  <div className="flex items-center justify-center h-64 border-2 border-dashed border-border rounded-lg">
                    <div className="text-center">
                      <Edit3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Click "Add Component" to start building
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Component Templates Modal */}
          {showTemplates && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-background border rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Choose a Component</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowTemplates(false)}>
                    ✕
                  </Button>
                </div>
                <div className="overflow-y-auto p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {componentTemplates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => handleAddTemplateComponent(template)}
                        className="p-4 border-2 rounded-lg hover:border-primary transition-all text-left hover:shadow-md group"
                      >
                        <div className="flex flex-col items-center text-center space-y-2">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <template.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{template.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">{template.preview}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Right Properties Panel */}
        <aside className="w-80 border-l bg-background overflow-y-auto">
          <div className="p-4">
            {selectedComponent ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Properties</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="type" className="text-xs uppercase text-muted-foreground font-semibold">
                        Component Type
                      </Label>
                      <Input
                        id="type"
                        value={selectedComponent.component_type}
                        disabled
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="content" className="text-xs uppercase text-muted-foreground font-semibold">
                        Content
                      </Label>
                      <Textarea
                        id="content"
                        value={selectedComponent.props?.content || ""}
                        onChange={(e) =>
                          handleUpdateComponent(selectedComponent.id, {
                            ...selectedComponent.props,
                            content: e.target.value,
                          })
                        }
                        className="mt-2"
                        rows={8}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteComponent(selectedComponent.id)}
                    className="w-full gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Component
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Edit3 className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  Select a component to edit its properties
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Editor;
