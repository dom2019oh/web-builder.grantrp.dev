import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useCredits } from "@/hooks/useCredits";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InteractiveLighting from "@/components/InteractiveLighting";
import FloatingUIElements from "@/components/FloatingUIElements";
import { Sparkles, Eye, Download, ShoppingCart, Check } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview_image: string;
  content: any;
  price: number;
  features: string[];
  is_free: boolean;
}

const TemplateMarket = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { credits, deductCredits } = useCredits();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [purchaseTemplate, setPurchaseTemplate] = useState<Template | null>(null);

  const categories = ["all", "business", "portfolio", "ecommerce", "blog", "landing"];

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .eq("is_public", true);

      if (error) throw error;

      // Add mock pricing and features for demo
      const templatesWithPricing = data.map((template) => ({
        ...template,
        price: template.category === "business" ? 20 : template.category === "ecommerce" ? 30 : 15,
        is_free: false,
        features: [
          "Fully responsive design",
          "SEO optimized",
          "Easy customization",
          "Mobile-first approach",
          "Fast loading speed",
        ],
      }));

      setTemplates(templatesWithPricing);
    } catch (error: any) {
      toast({
        title: "Error loading templates",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseTemplate = async (template: Template) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to purchase templates",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (template.is_free) {
      await cloneTemplate(template);
    } else {
      setPurchaseTemplate(template);
    }
  };

  const confirmPurchase = async () => {
    if (!purchaseTemplate) return;

    const creditCost = purchaseTemplate.price;
    
    if (credits < creditCost) {
      toast({
        title: "Insufficient credits",
        description: `You need ${creditCost} credits to purchase this template. You have ${credits} credits.`,
        variant: "destructive",
      });
      navigate("/credits");
      return;
    }

    const success = await deductCredits("TEMPLATE_PURCHASE", creditCost, {
      templateId: purchaseTemplate.id,
      templateName: purchaseTemplate.name,
    });

    if (success) {
      await cloneTemplate(purchaseTemplate);
      setPurchaseTemplate(null);
    }
  };

  const cloneTemplate = async (template: Template) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: newProject, error } = await supabase
        .from("projects")
        .insert({
          user_id: user.id,
          name: `${template.name} (Copy)`,
          description: template.description,
          content: template.content,
          template_id: template.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Template added!",
        description: "Template has been added to your projects.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error cloning template",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <InteractiveLighting />
      <FloatingUIElements />
      
      <div className="relative z-10">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-aurora-magenta/20 to-aurora-cyan/20 border border-border backdrop-blur-xl">
                <Sparkles className="w-4 h-4 text-aurora-cyan" />
                <span className="text-sm font-medium">Premium Website Templates</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-aurora-magenta to-aurora-cyan bg-clip-text text-transparent leading-tight">
                Template Marketplace
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose from our collection of professionally designed templates and launch your website in minutes
              </p>
            </div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full mb-12">
              <TabsList className="w-full md:w-auto mx-auto flex flex-wrap justify-center gap-2 h-auto p-2 bg-card/50 backdrop-blur-xl border border-border rounded-3xl">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="capitalize rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-aurora-magenta data-[state=active]:to-aurora-cyan data-[state=active]:text-white"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Templates Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 rounded-3xl bg-card/30 backdrop-blur-xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTemplates.map((template) => (
                  <Card 
                    key={template.id}
                    className="group overflow-hidden border-border/50 bg-card/30 backdrop-blur-xl hover:bg-card/50 transition-all duration-500 rounded-3xl hover:scale-105 hover:shadow-glow"
                  >
                    <CardHeader className="p-0">
                      <div className="relative h-48 overflow-hidden rounded-t-3xl bg-gradient-to-br from-aurora-magenta/20 to-aurora-cyan/20">
                        {template.preview_image ? (
                          <img 
                            src={template.preview_image} 
                            alt={template.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-primary/20">
                            {template.category[0].toUpperCase()}
                          </div>
                        )}
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="rounded-full backdrop-blur-xl"
                            onClick={() => setPreviewTemplate(template)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                        </div>

                        <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-xl rounded-full">
                          {template.category}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 space-y-4">
                      <CardTitle className="text-xl">{template.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {template.description}
                      </CardDescription>

                      <div className="flex flex-wrap gap-2">
                        {template.features.slice(0, 3).map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="rounded-full text-xs">
                            <Check className="w-3 h-3 mr-1" />
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="p-6 pt-0 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary">
                          {template.is_free ? "Free" : `${template.price}`}
                        </span>
                        {!template.is_free && (
                          <span className="text-sm text-muted-foreground">credits</span>
                        )}
                      </div>

                      <Button
                        className="rounded-full bg-gradient-to-r from-aurora-magenta to-aurora-cyan hover:shadow-glow transition-all duration-300"
                        onClick={() => handlePurchaseTemplate(template)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {template.is_free ? "Get Free" : "Purchase"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {filteredTemplates.length === 0 && !loading && (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">No templates found in this category</p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-4xl rounded-3xl bg-card/95 backdrop-blur-xl border-border/50">
          <DialogHeader>
            <DialogTitle className="text-2xl">{previewTemplate?.name}</DialogTitle>
            <DialogDescription>{previewTemplate?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-aurora-magenta/20 to-aurora-cyan/20 overflow-hidden">
              {previewTemplate?.preview_image ? (
                <img 
                  src={previewTemplate.preview_image} 
                  alt={previewTemplate.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-9xl font-bold text-primary/20">
                  {previewTemplate?.category[0].toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-3">Features:</h3>
              <div className="grid grid-cols-2 gap-2">
                {previewTemplate?.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-aurora-cyan" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setPreviewTemplate(null)}
              className="rounded-full"
            >
              Close
            </Button>
            <Button
              className="rounded-full bg-gradient-to-r from-aurora-magenta to-aurora-cyan"
              onClick={() => {
                if (previewTemplate) {
                  handlePurchaseTemplate(previewTemplate);
                  setPreviewTemplate(null);
                }
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Get Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Purchase Confirmation Dialog */}
      <Dialog open={!!purchaseTemplate} onOpenChange={() => setPurchaseTemplate(null)}>
        <DialogContent className="rounded-3xl bg-card/95 backdrop-blur-xl border-border/50">
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              You are about to purchase "{purchaseTemplate?.name}"
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 backdrop-blur-xl">
              <span className="font-medium">Template Price:</span>
              <span className="text-2xl font-bold text-primary">{purchaseTemplate?.price} credits</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 backdrop-blur-xl">
              <span className="font-medium">Your Balance:</span>
              <span className="text-2xl font-bold">{credits} credits</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/10 backdrop-blur-xl border border-primary/20">
              <span className="font-medium">After Purchase:</span>
              <span className="text-2xl font-bold text-primary">
                {credits - (purchaseTemplate?.price || 0)} credits
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setPurchaseTemplate(null)}
              className="rounded-full"
            >
              Cancel
            </Button>
            <Button
              className="rounded-full bg-gradient-to-r from-aurora-magenta to-aurora-cyan"
              onClick={confirmPurchase}
              disabled={credits < (purchaseTemplate?.price || 0)}
            >
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplateMarket;
