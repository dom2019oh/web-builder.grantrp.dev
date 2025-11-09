import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InteractiveLighting from "@/components/InteractiveLighting";
import { z } from "zod";

const projectSettingsSchema = z.object({
  name: z.string().trim().min(1, "Project name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().trim().max(500, "Description must be less than 500 characters").optional().or(z.literal("")),
  seoTitle: z.string().trim().max(60, "SEO title must be less than 60 characters").optional().or(z.literal("")),
  seoDescription: z.string().trim().max(160, "SEO description must be less than 160 characters").optional().or(z.literal("")),
  faviconUrl: z.string().trim().max(500, "URL is too long").url("Must be a valid URL").optional().or(z.literal(""))
});

const ProjectSettings = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("id");
  const { user, loading: authLoading } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (projectId && user) {
      fetchProject();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [projectId, user, authLoading]);

  const fetchProject = async () => {
    if (!projectId) return;

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (error) {
      if (import.meta.env.DEV) {
        console.error('Debug:', error);
      }
      toast.error("Failed to load project");
    } else if (data) {
      setProjectName(data.name);
      setDescription(data.description || "");
      setSeoTitle(data.seo_title || "");
      setSeoDescription(data.seo_description || "");
      setFaviconUrl(data.favicon_url || "");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!projectId || !user) return;

    // Validate input
    const validation = projectSettingsSchema.safeParse({
      name: projectName,
      description,
      seoTitle,
      seoDescription,
      faviconUrl
    });

    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from('projects')
      .update({
        name: validation.data.name,
        description: validation.data.description || null,
        seo_title: validation.data.seoTitle || null,
        seo_description: validation.data.seoDescription || null,
        favicon_url: validation.data.faviconUrl || null,
      })
      .eq('id', projectId)
      .eq('user_id', user.id);

    if (error) {
      if (import.meta.env.DEV) {
        console.error('Debug:', error);
      }
      toast.error("Failed to save settings");
    } else {
      toast.success("Settings saved successfully!");
    }
    setSaving(false);
  };

  if (authLoading || loading) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <InteractiveLighting />
      <div className="absolute inset-0 bg-gradient-aurora-magenta aurora-animate opacity-20" style={{ backgroundSize: '200% 200%' }} />
      
      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-12 relative z-10 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <h1 className="text-4xl font-bold mb-2">Project Settings</h1>
        <p className="text-foreground/70 mb-8">Manage your website metadata and SEO settings</p>

        <div className="space-y-6">
          <Card className="glass glass-glow border-0">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update your project name and description</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="My Awesome Website"
                  className="glass"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A brief description of your website"
                  className="glass"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glass glass-glow border-0">
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your website for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Best Website for..."
                  className="glass"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">{seoTitle.length}/60 characters</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder="Describe your website for search engines"
                  className="glass"
                  rows={3}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground">{seoDescription.length}/160 characters</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass glass-glow border-0">
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>Customize your website's appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="faviconUrl">Favicon URL</Label>
                <Input
                  id="faviconUrl"
                  value={faviconUrl}
                  onChange={(e) => setFaviconUrl(e.target.value)}
                  placeholder="https://example.com/favicon.ico"
                  className="glass"
                />
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-button hover:opacity-90 text-white border-0"
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectSettings;
