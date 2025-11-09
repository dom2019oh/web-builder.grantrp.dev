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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Choose Your Template</h2>
          <p className="text-xl text-muted-foreground">
            Start with a professionally designed template
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <Card 
              key={index} 
              className="border-border bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300 group"
            >
              <CardHeader>
                <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                  <span className="text-6xl opacity-20">{template.category[0]}</span>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
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