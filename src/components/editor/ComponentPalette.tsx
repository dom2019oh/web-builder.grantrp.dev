import { useDraggable } from "@dnd-kit/core";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Square, Type, Image, Layout } from "lucide-react";

interface PaletteItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
}

const DraggableItem = ({ item }: { item: PaletteItem }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
    data: { isNew: true },
  });

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`glass border-0 cursor-move hover:glass-glow transition-all ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <CardHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center">
            {item.icon}
          </div>
          <div>
            <CardTitle className="text-sm">{item.name}</CardTitle>
            <p className="text-xs text-muted-foreground">{item.category}</p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

const ComponentPalette = () => {
  const components: PaletteItem[] = [
    {
      id: "button-variants",
      name: "Buttons",
      icon: <Square className="h-4 w-4" />,
      category: "UI",
    },
    {
      id: "glass-card",
      name: "Glass Card",
      icon: <Layout className="h-4 w-4" />,
      category: "Layout",
    },
    {
      id: "input-field",
      name: "Input Field",
      icon: <Type className="h-4 w-4" />,
      category: "Forms",
    },
    {
      id: "badges",
      name: "Badges",
      icon: <Badge className="h-4 w-4" />,
      category: "UI",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-2">Components</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Drag components onto the canvas
        </p>
      </div>

      <div className="space-y-2">
        {components.map((item) => (
          <DraggableItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ComponentPalette;
