import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Settings, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InteractiveLighting from "@/components/InteractiveLighting";

interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      if (import.meta.env.DEV) {
        console.error('Debug:', error);
      }
      toast.error("Failed to load projects");
    } else {
      setProjects(data || []);
    }
    setLoadingProjects(false);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)
      .eq('user_id', user!.id);

    if (error) {
      if (import.meta.env.DEV) {
        console.error('Debug:', error);
      }
      toast.error("Failed to delete project");
    } else {
      toast.success("Project deleted");
      fetchProjects();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || loadingProjects) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <InteractiveLighting />
      <div className="absolute inset-0 bg-gradient-aurora-magenta aurora-animate opacity-20" style={{ backgroundSize: '200% 200%' }} />
      
      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-12 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Your Projects</h2>
            <p className="text-foreground/70">Create and manage your websites</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="glass"
          >
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            className="glass glass-glow hover:shadow-glow-magenta transition-all duration-300 cursor-pointer group border-0"
            onClick={() => navigate("/templates")}
          >
            <CardHeader>
              <div className="w-full h-40 glass rounded-lg mb-4 flex items-center justify-center group-hover:bg-gradient-button/10 transition-colors">
                <Plus className="h-12 w-12 text-aurora-cyan group-hover:scale-110 transition-transform" />
              </div>
              <CardTitle className="text-foreground">Create New Website</CardTitle>
              <CardDescription className="text-foreground/70">Start with a template or from scratch</CardDescription>
            </CardHeader>
          </Card>

          {projects.map((project) => (
            <Card 
              key={project.id}
              className="glass glass-glow hover:shadow-glow transition-all duration-300 group border-0"
            >
              <CardHeader>
                <div className="w-full h-40 glass rounded-lg mb-4 flex items-center justify-center bg-gradient-subtle">
                  <span className="text-6xl font-bold text-foreground/20">
                    {project.name[0].toUpperCase()}
                  </span>
                </div>
                <CardTitle className="text-foreground">{project.name}</CardTitle>
                <CardDescription className="text-foreground/70">
                  {project.description || "No description"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 glass"
                  onClick={() => navigate(`/editor/${project.id}`)}
                >
                  Open Editor
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass"
                  onClick={() => navigate(`/settings?id=${project.id}`)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass hover:bg-destructive/10"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            className="glass glass-glow border-0 cursor-pointer hover:shadow-glow transition-all"
            onClick={() => navigate("/templates")}
          >
            <CardHeader>
              <CardTitle>Browse Templates</CardTitle>
              <CardDescription>Explore professionally designed templates</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="glass glass-glow border-0 cursor-pointer hover:shadow-glow transition-all"
            onClick={() => navigate("/components")}
          >
            <CardHeader>
              <CardTitle>Component Library</CardTitle>
              <CardDescription>Copy and use UI components</CardDescription>
            </CardHeader>
          </Card>

          <Card className="glass glass-glow border-0">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Check out our documentation</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;