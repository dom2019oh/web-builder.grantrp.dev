import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InteractiveLighting from "@/components/InteractiveLighting";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview_image: string | null;
}

const TemplateGallery = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (import.meta.env.DEV) {
        console.error('Debug:', error);
      }
      toast.error("Failed to load templates");
    } else {
      setTemplates(data || []);
    }
    setLoading(false);
  };

  const handleCloneTemplate = async (template: Template) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          user_id: user.id,
          name: `${template.name} - My Version`,
          description: template.description,
          template_id: template.id,
          content: {},
        }
      ])
      .select()
      .single();

    if (error) {
      if (import.meta.env.DEV) {
        console.error('Debug:', error);
      }
      toast.error("Failed to clone template");
    } else {
      toast.success("Template cloned! Starting your project...");
      navigate(`/dashboard`);
    }
  };

  const categories = ["all", "business", "portfolio", "blog", "ecommerce", "gaming"];
  
  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  if (authLoading || loading) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <InteractiveLighting />
      <div className="absolute inset-0 bg-gradient-aurora-magenta aurora-animate opacity-20" style={{ backgroundSize: '200% 200%' }} />
      
      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Template Gallery</h1>
          <p className="text-foreground/70">Choose a professionally designed template to start your website</p>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="glass">
            {categories.map(cat => (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="capitalize"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className="glass glass-glow hover:shadow-glow transition-all duration-300 group border-0"
            >
              <CardHeader>
                <div className="w-full h-48 glass rounded-lg mb-4 flex items-center justify-center relative overflow-hidden bg-gradient-subtle">
                  <div className="absolute inset-0 bg-gradient-aurora-magenta opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <span className="text-6xl font-bold text-foreground/20 group-hover:scale-110 transition-transform">
                    {template.category[0].toUpperCase()}
                  </span>
                </div>
                <CardTitle className="text-foreground">{template.name}</CardTitle>
                <CardDescription className="text-foreground/70">{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 glass hover:bg-accent"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button 
                  onClick={() => handleCloneTemplate(template)}
                  className="flex-1 bg-gradient-button hover:opacity-90 text-white border-0"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TemplateGallery;
