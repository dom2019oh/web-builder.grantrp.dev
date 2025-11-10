import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

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

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (projectId) {
      loadProject();
    }
  }, [projectId, user, navigate]);

  const loadProject = async () => {
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

      if (project.user_id !== user!.id) {
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
      console.error("Error:", error);
      toast.error("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComponent = async () => {
    try {
      const newComponent = {
        project_id: projectId,
        component_type: "text",
        component_id: `component-${Date.now()}`,
        props: { content: "New component" },
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
      toast.success("Component added");
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

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-muted/30 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-semibold">{projectName}</h1>
          </div>
          <Button onClick={handleSave} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-4 p-4 max-w-7xl mx-auto">
        {/* Components List */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={handleAddComponent} className="w-full" size="sm">
              Add Component
            </Button>
            <div className="space-y-1">
              {components.map((component) => (
                <div
                  key={component.id}
                  className={`p-2 rounded border cursor-pointer hover:bg-muted transition-colors ${
                    selectedId === component.id ? "bg-muted border-primary" : ""
                  }`}
                  onClick={() => setSelectedId(component.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm truncate">{component.component_type}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteComponent(component.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              {components.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No components yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Canvas Preview */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 min-h-[400px] bg-muted/20">
              {components.map((component) => (
                <div
                  key={component.id}
                  className={`mb-2 p-3 rounded bg-background border ${
                    selectedId === component.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedId(component.id)}
                >
                  {component.props?.content || "Empty component"}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Properties Panel */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Properties</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedComponent ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={selectedComponent.component_type}
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={selectedComponent.props?.content || ""}
                    onChange={(e) =>
                      handleUpdateComponent(selectedComponent.id, {
                        ...selectedComponent.props,
                        content: e.target.value,
                      })
                    }
                    className="mt-1"
                    rows={5}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteComponent(selectedComponent.id)}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Component
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Select a component to edit
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Editor;
