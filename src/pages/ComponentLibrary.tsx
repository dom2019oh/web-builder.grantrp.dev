import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InteractiveLighting from "@/components/InteractiveLighting";

interface Component {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: JSX.Element;
  code: string;
}

const ComponentLibrary = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const components: Component[] = [
    {
      id: "glass-card",
      name: "Glass Card",
      description: "Beautiful glassmorphism card with Aurora gradient",
      category: "cards",
      preview: (
        <Card className="glass glass-glow border-0 w-full">
          <CardHeader>
            <CardTitle>Glass Card</CardTitle>
            <CardDescription>With gradient glow effect</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">This is a beautiful glass card component.</p>
          </CardContent>
        </Card>
      ),
      code: `<Card className="glass glass-glow border-0">
  <CardHeader>
    <CardTitle>Glass Card</CardTitle>
    <CardDescription>With gradient glow effect</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Your content here</p>
  </CardContent>
</Card>`,
    },
    {
      id: "gradient-button",
      name: "Gradient Button",
      description: "Button with Aurora gradient background",
      category: "buttons",
      preview: (
        <Button className="bg-gradient-button hover:opacity-90 text-white border-0">
          Click Me
        </Button>
      ),
      code: `<Button className="bg-gradient-button hover:opacity-90 text-white border-0">
  Click Me
</Button>`,
    },
    {
      id: "hero-section",
      name: "Hero Section",
      description: "Landing page hero with gradient text",
      category: "sections",
      preview: (
        <div className="glass p-8 rounded-lg text-center">
          <h1 className="text-4xl font-bold bg-gradient-aurora-magenta bg-clip-text text-transparent mb-4">
            Build Your Dream Website
          </h1>
          <p className="text-foreground/70 mb-6">
            Create stunning websites with our AI-powered builder
          </p>
          <Button className="bg-gradient-button hover:opacity-90 text-white border-0">
            Get Started
          </Button>
        </div>
      ),
      code: `<div className="glass p-8 rounded-lg text-center">
  <h1 className="text-4xl font-bold bg-gradient-aurora-magenta bg-clip-text text-transparent mb-4">
    Build Your Dream Website
  </h1>
  <p className="text-foreground/70 mb-6">
    Create stunning websites with our AI-powered builder
  </p>
  <Button className="bg-gradient-button hover:opacity-90 text-white border-0">
    Get Started
  </Button>
</div>`,
    },
    {
      id: "feature-card",
      name: "Feature Card",
      description: "Card for showcasing features",
      category: "cards",
      preview: (
        <Card className="glass border-0 hover:glass-glow transition-all">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-gradient-aurora-cyan flex items-center justify-center mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <CardTitle>Amazing Feature</CardTitle>
            <CardDescription>Description of your feature</CardDescription>
          </CardHeader>
        </Card>
      ),
      code: `<Card className="glass border-0 hover:glass-glow transition-all">
  <CardHeader>
    <div className="w-12 h-12 rounded-full bg-gradient-aurora-cyan flex items-center justify-center mb-4">
      <span className="text-2xl">✨</span>
    </div>
    <CardTitle>Amazing Feature</CardTitle>
    <CardDescription>Description of your feature</CardDescription>
  </CardHeader>
</Card>`,
    },
    {
      id: "input-field",
      name: "Glass Input",
      description: "Input field with glass effect",
      category: "forms",
      preview: (
        <div className="space-y-2 w-full">
          <label className="text-sm font-medium">Email</label>
          <input 
            type="email" 
            placeholder="you@example.com"
            className="glass w-full px-3 py-2 rounded-md"
          />
        </div>
      ),
      code: `<div className="space-y-2">
  <label className="text-sm font-medium">Email</label>
  <input 
    type="email" 
    placeholder="you@example.com"
    className="glass w-full px-3 py-2 rounded-md"
  />
</div>`,
    },
  ];

  const categories = ["all", "cards", "buttons", "forms", "sections"];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <InteractiveLighting />
      <div className="absolute inset-0 bg-gradient-aurora-magenta aurora-animate opacity-20" style={{ backgroundSize: '200% 200%' }} />
      
      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Component Library</h1>
          <p className="text-foreground/70">Browse and copy Aurora-themed UI components for your website</p>
        </div>

        <Tabs defaultValue="all" className="mb-8">
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

          {categories.map(category => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {components
                  .filter(c => category === "all" || c.category === category)
                  .map((component) => (
                    <Card key={component.id} className="glass glass-glow border-0 overflow-hidden">
                      <CardHeader>
                        <CardTitle>{component.name}</CardTitle>
                        <CardDescription>{component.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="glass p-4 rounded-lg">
                          {component.preview}
                        </div>
                        <div className="relative">
                          <pre className="glass p-4 rounded-lg text-xs overflow-x-auto">
                            <code>{component.code}</code>
                          </pre>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2"
                            onClick={() => handleCopy(component.code, component.id)}
                          >
                            {copiedId === component.id ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default ComponentLibrary;
