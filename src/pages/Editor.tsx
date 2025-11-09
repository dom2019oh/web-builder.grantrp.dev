import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Templates from "@/components/Templates";
import Footer from "@/components/Footer";

interface Section {
  id: string;
  label: string;
  component: React.ComponentType;
  enabled: boolean;
}

const AVAILABLE_SECTIONS: Omit<Section, "enabled">[] = [
  { id: "hero", label: "Hero Section", component: Hero },
  { id: "features", label: "Features Section", component: Features },
  { id: "templates", label: "Templates Section", component: Templates },
  { id: "pricing", label: "Pricing Section", component: Pricing },
  { id: "faq", label: "FAQ Section", component: FAQ },
  { id: "footer", label: "Footer Section", component: Footer },
];

const Editor = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projectName, setProjectName] = useState("");
  const [sections, setSections] = useState<Section[]>(
    AVAILABLE_SECTIONS.map(s => ({ ...s, enabled: s.id === "hero" }))
  );
  const [isSaving, setIsSaving] = useState(false);

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

      if (project.content && typeof project.content === 'object' && 'sections' in project.content) {
        const enabledSectionIds = project.content.sections as string[];
        setSections(prev => 
          prev.map(s => ({ ...s, enabled: enabledSectionIds.includes(s.id) }))
        );
      }
    } catch (error) {
      console.error("Error loading project:", error);
      toast.error("Failed to load project");
    }
  };

  const toggleSection = (sectionId: string) => {
    setSections(prev => 
      prev.map(s => s.id === sectionId ? { ...s, enabled: !s.enabled } : s)
    );
  };


  const handleSave = async () => {
    setIsSaving(true);
    try {
      const enabledSectionIds = sections.filter(s => s.enabled).map(s => s.id);
      
      const { error } = await supabase
        .from("projects")
        .update({ 
          content: { sections: enabledSectionIds },
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

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Sidebar - Back to Dashboard */}
      <div className="w-16 bg-muted/30 border-r border-border flex items-start justify-center pt-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/dashboard")}
          className="hover:bg-accent"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 overflow-auto bg-background">
        {/* Top Header */}
        <div className="sticky top-0 z-40 glass border-b border-border">
          <div className="px-6 py-3 flex items-center justify-between">
            <h1 className="text-lg font-semibold">{projectName || "Untitled Project"}</h1>
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

        {/* Website Preview */}
        <div className="bg-background">
          {sections.filter(s => s.enabled).map((section) => {
            const Component = section.component;
            return <Component key={section.id} />;
          })}
          
          {sections.filter(s => s.enabled).length === 0 && (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <p className="text-lg text-muted-foreground mb-2">Your website is empty</p>
                <p className="text-sm text-muted-foreground">Enable sections from the right panel to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Section Toggles */}
      <div className="w-80 bg-muted/30 border-l border-border p-6 overflow-auto">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Sections</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Toggle sections to customize your website
            </p>
          </div>

          <div className="space-y-3">
            {sections.map((section) => (
              <div
                key={section.id}
                className="flex items-center space-x-3 p-3 rounded-lg glass hover:glass-glow transition-all cursor-pointer"
                onClick={() => toggleSection(section.id)}
              >
                <Checkbox
                  id={section.id}
                  checked={section.enabled}
                  onCheckedChange={() => toggleSection(section.id)}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor={section.id}
                  className="text-sm font-medium cursor-pointer flex-1"
                >
                  {section.label}
                </Label>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Drag sections to reorder (coming soon)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
