import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const templates = [
  {
    name: "Portfolio",
    description: "Showcase your work beautifully",
    category: "Creative",
  },
  {
    name: "Business",
    description: "Professional company website",
    category: "Corporate",
  },
  {
    name: "Roleplay HQ",
    description: "Perfect for GTA RP communities",
    category: "Gaming",
  },
  {
    name: "Agency",
    description: "Modern agency landing page",
    category: "Marketing",
  },
];

const Templates = () => {
  return (
    <section id="templates" className="py-24 relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-aurora-violet/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-40 right-10 w-72 h-72 bg-aurora-teal/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose Your Template</h2>
          <p className="text-xl text-foreground/70">
            Start with a professionally designed template
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <Card 
              key={index} 
              className="glass glass-glow hover:shadow-glow transition-all duration-300 group border-0 overflow-hidden"
            >
              <CardHeader>
                <div className="w-full h-48 glass rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-aurora-magenta opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <span className="text-6xl font-bold text-foreground/20 group-hover:scale-110 transition-transform">{template.category[0]}</span>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-foreground">{template.name}</CardTitle>
                    <CardDescription className="text-foreground/70">{template.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full glass hover:bg-gradient-button hover:text-white hover:border-0 transition-all">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates;