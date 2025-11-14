import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Layout, Plus } from "lucide-react";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  category: string;
  preview: string;
  components: any[];
}

interface LayoutTemplatesProps {
  onSelectTemplate: (template: Template) => void;
  onCostCheck: (cost: number, action: string, callback: () => void) => void;
}

export const LayoutTemplates = ({ onSelectTemplate, onCostCheck }: LayoutTemplatesProps) => {
  const templates: Template[] = [
    {
      id: "hero-1",
      name: "Hero Banner",
      category: "Headers",
      preview: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=200&fit=crop",
      components: [],
    },
    {
      id: "features-1",
      name: "Features Grid",
      category: "Features",
      preview: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=200&fit=crop",
      components: [],
    },
    {
      id: "pricing-1",
      name: "Pricing Table",
      category: "Pricing",
      preview: "https://images.unsplash.com/photo-1554224311-beee4c45c785?w=400&h=200&fit=crop",
      components: [],
    },
    {
      id: "testimonial-1",
      name: "Testimonials",
      category: "Social Proof",
      preview: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop",
      components: [],
    },
    {
      id: "cta-1",
      name: "Call to Action",
      category: "CTA",
      preview: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop",
      components: [],
    },
    {
      id: "gallery-1",
      name: "Image Gallery",
      category: "Media",
      preview: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=200&fit=crop",
      components: [],
    },
    {
      id: "team-1",
      name: "Team Section",
      category: "About",
      preview: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop",
      components: [],
    },
    {
      id: "blog-1",
      name: "Blog Grid",
      category: "Blog",
      preview: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop",
      components: [],
    },
  ];

  const categories = Array.from(new Set(templates.map((t) => t.category)));

  const handleSelectTemplate = (template: Template) => {
    onCostCheck(8, "Add Layout Template", () => {
      onSelectTemplate(template);
      toast.success(`${template.name} template added!`);
    });
  };

  return (
    <Card className="glass glass-glow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Layout className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Layout Templates</h3>
      </div>

      <ScrollArea className="h-96">
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">{category}</h4>
              <div className="grid grid-cols-2 gap-3">
                {templates
                  .filter((t) => t.category === category)
                  .map((template) => (
                    <Card
                      key={template.id}
                      className="glass group cursor-pointer hover:scale-105 transition-all overflow-hidden"
                      onClick={() => handleSelectTemplate(template)}
                    >
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={template.preview}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button size="sm" className="glass glass-glow">
                            <Plus className="w-4 h-4 mr-2" />
                            Add (8 credits)
                          </Button>
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-medium text-center">{template.name}</p>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
