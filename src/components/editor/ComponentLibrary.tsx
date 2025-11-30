import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Layout, Type, Image as ImageIcon, Video, FormInput, Sparkles, Grid3X3 } from "lucide-react";
import { motion } from "framer-motion";

interface ComponentLibraryProps {
  onAddComponent: (template: any) => void;
}

const componentCategories = {
  structure: {
    name: "Structure",
    icon: Layout,
    components: [
      { type: "hero", name: "Hero Section", icon: "🎯", props: { content: "Welcome to Your Site", subtitle: "Build something amazing", ctaText: "Get Started" } },
      { type: "columns", name: "2 Columns", icon: "📊", props: { content: "Two Column Layout", leftContent: "Left content here", rightContent: "Right content here" } },
      { type: "gallery", name: "Image Gallery", icon: "🎨", props: { content: "Gallery", columns: 3, images: [{}, {}, {}] } },
    ]
  },
  content: {
    name: "Content",
    icon: Type,
    components: [
      { type: "heading", name: "Heading", icon: "📝", props: { content: "New Heading", level: "h2" } },
      { type: "text", name: "Paragraph", icon: "📄", props: { content: "Add your text content here..." } },
      { type: "text", name: "Quote", icon: "💬", props: { content: "\"Inspiring quote goes here...\"" } },
    ]
  },
  media: {
    name: "Media",
    icon: ImageIcon,
    components: [
      { type: "image", name: "Image", icon: "🖼️", props: { imageUrl: "", caption: "Image caption" } },
      { type: "video", name: "Video", icon: "🎥", props: { content: "Video Player", videoUrl: "", caption: "Video description" } },
      { type: "gallery", name: "Photo Grid", icon: "🎨", props: { content: "Photo Grid", columns: 4, images: Array(8).fill({}) } },
    ]
  },
  interactive: {
    name: "Interactive",
    icon: FormInput,
    components: [
      { type: "form", name: "Contact Form", icon: "📋", props: { content: "Contact Us", fields: ["name", "email", "message"] } },
      { type: "form", name: "Newsletter", icon: "📧", props: { content: "Subscribe", fields: ["email"] } },
      { type: "form", name: "Survey", icon: "📊", props: { content: "Quick Survey", fields: ["name", "email", "message"] } },
    ]
  }
};

export const ComponentLibrary = ({ onAddComponent }: ComponentLibraryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("structure");

  const filteredComponents = Object.entries(componentCategories).reduce((acc, [key, category]) => {
    const filtered = category.components.filter(comp =>
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[key] = { ...category, components: filtered };
    }
    return acc;
  }, {} as typeof componentCategories);

  return (
    <div className="h-full flex flex-col glass border-l border-border/50">
      <div className="p-4 border-b border-border/50 space-y-3">
        <div className="flex items-center gap-2">
          <Grid3X3 className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-display font-semibold">Component Library</h3>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 glass border-border/50"
          />
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start px-4 glass h-auto py-2 gap-1">
          {Object.entries(componentCategories).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <TabsTrigger
                key={key}
                value={key}
                className="flex items-center gap-2 text-xs data-[state=active]:bg-primary/10"
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <ScrollArea className="flex-1">
          {Object.entries(filteredComponents).map(([key, category]) => (
            <TabsContent key={key} value={key} className="p-3 space-y-2 mt-0">
              {category.components.map((component, index) => (
                <motion.div
                  key={`${component.type}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-3 px-3 glass border-border/50 hover:border-primary/50 hover-lift group"
                    onClick={() => onAddComponent(component)}
                  >
                    <span className="text-2xl">{component.icon}</span>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">{component.name}</p>
                      <p className="text-xs text-muted-foreground">{component.type}</p>
                    </div>
                    <Sparkles className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </motion.div>
              ))}
            </TabsContent>
          ))}
        </ScrollArea>
      </Tabs>
    </div>
  );
};
