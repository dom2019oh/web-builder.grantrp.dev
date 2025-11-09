import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Component {
  id: string;
  component_id: string;
  component_type: string;
  props: any;
  position_x: number;
  position_y: number;
  width: number;
  height: number;
  z_index: number;
}

interface CanvasComponentProps {
  component: Component;
  isSelected: boolean;
  onSelect: () => void;
}

const CanvasComponent = ({ component, isSelected, onSelect }: CanvasComponentProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: component.id,
    data: { isExisting: true },
  });

  const style = {
    position: "absolute" as const,
    left: component.position_x,
    top: component.position_y,
    width: component.width,
    minHeight: component.height,
    zIndex: component.z_index,
    transform: CSS.Translate.toString(transform),
  };

  const renderComponent = () => {
    const props = component.props || {};
    
    switch (component.component_type) {
      case "button-variants":
        return (
          <div className="flex flex-wrap gap-2">
            <Button size="sm">{props.buttonText || "Primary"}</Button>
            <Button size="sm" variant="secondary">Secondary</Button>
            <Button size="sm" variant="outline">Outline</Button>
          </div>
        );
      
      case "glass-card":
        return (
          <Card className="glass glass-glow border-0 p-4">
            <h3 className="font-semibold mb-2">{props.title || "Glass Card"}</h3>
            <p className="text-sm text-muted-foreground">{props.description || "Beautiful glassmorphism effect"}</p>
          </Card>
        );
      
      case "input-field":
        return (
          <div className="space-y-2">
            <Label>{props.label || "Email"}</Label>
            <Input type="email" placeholder={props.placeholder || "you@example.com"} />
          </div>
        );
      
      case "badges":
        return (
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        );
      
      default:
        return (
          <Card className="glass border-0 p-4">
            <p className="text-sm">Component: {component.component_type}</p>
          </Card>
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={`cursor-move transition-all animate-fade-in ${
        isSelected ? "ring-2 ring-primary ring-offset-2 shadow-lg" : "hover:shadow-md"
      }`}
    >
      {renderComponent()}
    </div>
  );
};

export default CanvasComponent;
