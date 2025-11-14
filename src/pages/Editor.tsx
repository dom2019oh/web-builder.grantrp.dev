import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Trash2, Search, Bell, Monitor, Tablet, Smartphone, Edit3, Home as HomeIcon, Layout, Palette, Image, Settings as SettingsIcon, Plus, Undo, Redo, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { useCredits, CREDIT_COSTS } from "@/hooks/useCredits";
import { componentTemplates } from "@/components/editor/ComponentTemplates";
import { ComponentRenderer } from "@/components/editor/ComponentRenderer";
import { PagesManager } from "@/components/editor/PagesManager";
import { StylesView } from "@/components/editor/StylesView";
import { AssetsManager } from "@/components/editor/AssetsManager";
import { SEOView } from "@/components/editor/SEOView";
import { SettingsView } from "@/components/editor/SettingsView";
import { UpgradeModal } from "@/components/UpgradeModal";
import EditorCreditCost from "@/components/EditorCreditCost";
import { CreditConfirmDialog } from "@/components/editor/CreditConfirmDialog";
import { AIContentGenerator } from "@/components/editor/AIContentGenerator";
import { ImageManager } from "@/components/editor/ImageManager";
import { FormBuilder } from "@/components/editor/FormBuilder";
import { AnimationControls } from "@/components/editor/AnimationControls";
import { AdvancedStylePanel } from "@/components/editor/AdvancedStylePanel";
import { BlogPostCreator } from "@/components/editor/BlogPostCreator";

interface Component {
  id: string;
  component_type: string;
  props: any;
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
  const [activeView, setActiveView] = useState<"components" | "pages" | "styles" | "assets" | "seo" | "settings">("components");
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showTemplates, setShowTemplates] = useState(false);
  const [propertyTab, setPropertyTab] = useState<"content" | "style" | "layout" | "animation">("content");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [creditConfirm, setCreditConfirm] = useState<{
    open: boolean;
    action: string;
    cost: number;
    callback: () => void;
  }>({ open: false, action: "", cost: 0, callback: () => {} });

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

  const handleCostCheck = (cost: number, action: string, callback: () => void) => {
    if (!hasEnoughCredits(cost)) {
      toast.error("Insufficient credits! Please add more credits.");
      navigate("/credits");
      return;
    }
    setCreditConfirm({ open: true, action, cost, callback });
  };

  const handleConfirmAction = async () => {
    const success = await deductCredits(creditConfirm.action, creditConfirm.cost);
    if (success) {
      creditConfirm.callback();
    }
    setCreditConfirm({ open: false, action: "", cost: 0, callback: () => {} });
  };

  const handleAddComponent = async () => {
    handleCostCheck(CREDIT_COSTS.ADD_COMPONENT, "Add Component", () => {
      setShowTemplates(true);
    });
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

  const handlePublish = async () => {
    if (!canPublish()) {
      setShowUpgradeModal(true);
      return;
    }

    try {
      const { error } = await supabase
        .from("projects")
        .update({ 
          published: true,
          published_at: new Date().toISOString(),
        })
        .eq("id", projectId);

      if (error) throw error;
      toast.success("Project published successfully!");
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
      default: return "max-w-6xl";
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-background">Loading...</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navigation Bar - Aurora Glass Theme */}
      <header className="h-14 border-b border-border/50 glass glass-glow flex items-center justify-between px-4 sticky top-0 z-50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-2 hover:bg-primary/10">
            <ArrowLeft className="h-4 w-4" />
            Exit
          </Button>
          <div className="flex items-center gap-2 pl-4 border-l border-border/50">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Undo">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Redo">
              <Redo className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 pl-4 border-l border-border/50">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Search">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Grant Development™</span>
          <span className="text-sm font-semibold bg-gradient-aurora-magenta bg-clip-text text-transparent">{projectName}</span>
          <span className="text-xs text-aurora-cyan">• Editor View</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 border border-border/50 rounded-xl p-1 glass">
            <Button 
              variant={deviceView === "desktop" ? "secondary" : "ghost"} 
              size="sm" 
              className={`h-8 w-8 p-0 rounded-lg transition-all ${deviceView === "desktop" ? "shadow-glow" : ""}`}
              onClick={() => setDeviceView("desktop")}
              title="Desktop View"
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button 
              variant={deviceView === "tablet" ? "secondary" : "ghost"} 
              size="sm" 
              className={`h-8 w-8 p-0 rounded-lg transition-all ${deviceView === "tablet" ? "shadow-glow" : ""}`}
              onClick={() => setDeviceView("tablet")}
              title="Tablet View"
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button 
              variant={deviceView === "mobile" ? "secondary" : "ghost"} 
              size="sm" 
              className={`h-8 w-8 p-0 rounded-lg transition-all ${deviceView === "mobile" ? "shadow-glow" : ""}`}
              onClick={() => setDeviceView("mobile")}
              title="Mobile View"
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" className="gap-2 border-border/50 hover:border-primary/50">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSave} size="sm" className="gap-2 bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button 
            onClick={handlePublish} 
            size="sm" 
            className="gap-2 bg-gradient-button border-0 shadow-glow hover:shadow-glow-magenta transition-all"
          >
            Publish
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Aurora Glass Theme */}
        <aside className="w-56 border-r border-border/50 glass overflow-y-auto">
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
                <SettingsIcon className="h-4 w-4" />
                SEO / AIO
              </Button>
              <Button 
                variant={activeView === "settings" ? "secondary" : "ghost"} 
                className="w-full justify-start gap-2 text-sm pl-4"
                onClick={() => setActiveView("settings")}
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
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

              {activeView === "pages" && <PagesManager />}
              {activeView === "styles" && <StylesView />}
              {activeView === "assets" && <AssetsManager />}
            {activeView === "seo" && <SEOView />}
            {activeView === "settings" && <SettingsView />}
          </div>
        </aside>

        {/* Main Canvas - Aurora Glass Theme */}
        <main className="flex-1 overflow-y-auto relative" style={{ background: "rgba(14, 20, 30, 0.3)" }}>
          <div className={`${getDeviceWidth()} mx-auto p-8 transition-all duration-300`}>
            <div className="glass glass-glow rounded-[22px] shadow-card min-h-[800px] p-8 border border-border/30">
              <div className="space-y-4">
                {components.map((component) => (
                  <ComponentRenderer
                    key={component.id}
                    component={component}
                    isSelected={selectedId === component.id}
                    onClick={() => setSelectedId(component.id)}
                    onUpdate={(props) => handleUpdateComponent(component.id, props)}
                  />
                ))}
                {components.length === 0 && (
                  <div className="flex items-center justify-center h-64 border-2 border-dashed border-border/50 rounded-[22px] glass">
                    <div className="text-center">
                      <Edit3 className="h-12 w-12 text-aurora-cyan mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Click "Add Component" to start building
                      </p>
                    </div>
                  </div>
                )}
                {components.length > 0 && (
                  <div className="mt-8 flex justify-center">
                    <Button 
                      onClick={handleAddComponent} 
                      variant="outline" 
                      size="lg" 
                      className="gap-2 border-2 border-dashed border-primary/50 hover:border-primary hover:shadow-glow transition-all rounded-xl"
                    >
                      <Plus className="h-5 w-5" />
                      Add Section
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Component Templates Modal - Aurora Glass Theme */}
          {showTemplates && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
              <div className="glass glass-glow border border-border/50 rounded-[22px] shadow-card max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-border/50 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold bg-gradient-aurora-magenta bg-clip-text text-transparent">Choose a Component</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowTemplates(false)} className="hover:bg-destructive/20">
                    ✕
                  </Button>
                </div>
                <div className="overflow-y-auto p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {componentTemplates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => handleAddTemplateComponent(template)}
                        className="p-4 border-2 border-border/50 rounded-xl hover:border-primary transition-all text-left hover:shadow-glow glass group"
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

        {/* Right Properties Panel - Aurora Glass Theme */}
        <aside className="w-80 border-l border-border/50 glass overflow-y-auto">
          <div className="p-4">
            {selectedComponent ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Properties</h3>
                  <div className="flex gap-1 mb-4 p-1 glass rounded-lg border border-border/50">
                    <Button
                      variant={propertyTab === "content" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setPropertyTab("content")}
                      className="flex-1 text-xs"
                    >
                      Content
                    </Button>
                    <Button
                      variant={propertyTab === "style" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setPropertyTab("style")}
                      className="flex-1 text-xs"
                    >
                      Style
                    </Button>
                    <Button
                      variant={propertyTab === "layout" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setPropertyTab("layout")}
                      className="flex-1 text-xs"
                    >
                      Layout
                    </Button>
                    <Button
                      variant={propertyTab === "animation" ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setPropertyTab("animation")}
                      className="flex-1 text-xs"
                    >
                      Animation
                    </Button>
                  </div>
                  {propertyTab === "content" && (
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
                  )}
                  {propertyTab === "style" && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">Style options coming soon...</p>
                    </div>
                  )}
                  {propertyTab === "layout" && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">Layout options coming soon...</p>
                    </div>
                  )}
                  {propertyTab === "animation" && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">Animation options coming soon...</p>
                    </div>
                  )}
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
      
      {/* Component Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass glass-glow p-6 rounded-[22px] max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add Component</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowTemplates(false)}>✕</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {componentTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => {
                    handleAddTemplateComponent(template);
                    setShowTemplates(false);
                  }}
                  className="glass glass-glow p-4 rounded-xl cursor-pointer hover:shadow-glow-magenta transition-all group"
                >
                  <h4 className="font-semibold mb-2 group-hover:text-aurora-cyan transition-colors">
                    {template.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{template.preview}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Upgrade Modal */}
      <UpgradeModal 
        open={showUpgradeModal} 
        onOpenChange={setShowUpgradeModal}
        feature="Publishing"
      />
    </div>
  );
};

export default Editor;
