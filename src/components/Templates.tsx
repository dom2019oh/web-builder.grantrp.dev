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
      {/* Aurora background layers - ENHANCED */}
      <div className="absolute inset-0 bg-gradient-aurora-magenta opacity-15 aurora-animate" style={{ backgroundSize: '200% 200%' }} />
      
      {/* Floating orbs - ENHANCED */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-aurora-violet/15 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-aurora-teal/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-aurora-cyan/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-button bg-clip-text text-transparent" style={{ backgroundSize: '200% 200%' }}>Choose Your Template</h2>
          <p className="text-xl text-foreground/80">
            Start with a professionally designed template
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <Card 
              key={index} 
              className="glass glass-glow hover:shadow-glow-magenta transition-all duration-500 group border border-aurora-magenta/10 hover:border-aurora-cyan/30 overflow-hidden backdrop-blur-xl animate-fade-in hover:-translate-y-3 hover:rotate-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-full h-48 glass rounded-lg mb-4 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-aurora-dark/50 to-transparent">
                  <div className="absolute inset-0 bg-gradient-aurora-magenta opacity-0 group-hover:opacity-40 transition-opacity duration-500 aurora-animate" style={{ backgroundSize: '200% 200%' }} />
                  <span className="text-7xl font-bold text-foreground/20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 drop-shadow-glow">{template.category[0]}</span>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-foreground group-hover:text-aurora-cyan transition-colors">{template.name}</CardTitle>
                    <CardDescription className="text-foreground/70 group-hover:text-foreground/90 transition-colors">{template.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full glass hover:bg-gradient-button hover:text-white hover:border-0 hover:shadow-glow-magenta transition-all duration-300 border-aurora-cyan/20 group-hover:scale-105">
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