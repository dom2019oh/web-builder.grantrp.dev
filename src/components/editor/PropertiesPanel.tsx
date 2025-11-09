import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Trash2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

interface PropertiesPanelProps {
  component: Component | null;
  onUpdate: (updates: Partial<Component>) => void;
  onDelete: () => void;
  onAIGenerate: () => void;
}

const PropertiesPanel = ({ component, onUpdate, onDelete, onAIGenerate }: PropertiesPanelProps) => {
  const [localProps, setLocalProps] = useState(component?.props || {});

  useEffect(() => {
    setLocalProps(component?.props || {});
  }, [component]);

  if (!component) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <p className="text-sm">Select a component to edit its properties</p>
      </div>
    );
  }

  const handlePropChange = async (key: string, value: any) => {
    const newProps = { ...localProps, [key]: value };
    setLocalProps(newProps);
    onUpdate({ props: newProps });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Properties</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-xs text-muted-foreground">Component Type</Label>
          <p className="text-sm font-medium capitalize">{component.component_type.replace('-', ' ')}</p>
        </div>

        <div className="space-y-2">
          <Label>Position X</Label>
          <Input
            type="number"
            value={component.position_x}
            onChange={(e) => onUpdate({ position_x: parseInt(e.target.value) || 0 })}
          />
        </div>

        <div className="space-y-2">
          <Label>Position Y</Label>
          <Input
            type="number"
            value={component.position_y}
            onChange={(e) => onUpdate({ position_y: parseInt(e.target.value) || 0 })}
          />
        </div>

        <div className="space-y-2">
          <Label>Width</Label>
          <Slider
            value={[component.width]}
            onValueChange={([value]) => onUpdate({ width: value })}
            min={100}
            max={800}
            step={10}
          />
          <span className="text-xs text-muted-foreground">{component.width}px</span>
        </div>

        <div className="space-y-2">
          <Label>Height</Label>
          <Slider
            value={[component.height]}
            onValueChange={([value]) => onUpdate({ height: value })}
            min={50}
            max={600}
            step={10}
          />
          <span className="text-xs text-muted-foreground">{component.height}px</span>
        </div>

        {component.component_type === "button-variants" && (
          <div className="space-y-2">
            <Label>Button Text</Label>
            <Input
              value={localProps.buttonText || "Click me"}
              onChange={(e) => handlePropChange("buttonText", e.target.value)}
              placeholder="Button text"
            />
          </div>
        )}

        {component.component_type === "glass-card" && (
          <>
            <div className="space-y-2">
              <Label>Card Title</Label>
              <Input
                value={localProps.title || "Glass Card"}
                onChange={(e) => handlePropChange("title", e.target.value)}
                placeholder="Card title"
              />
            </div>
            <div className="space-y-2">
              <Label>Card Description</Label>
              <Input
                value={localProps.description || "Beautiful glassmorphism effect"}
                onChange={(e) => handlePropChange("description", e.target.value)}
                placeholder="Card description"
              />
            </div>
          </>
        )}

        {component.component_type === "input-field" && (
          <>
            <div className="space-y-2">
              <Label>Label</Label>
              <Input
                value={localProps.label || "Email"}
                onChange={(e) => handlePropChange("label", e.target.value)}
                placeholder="Input label"
              />
            </div>
            <div className="space-y-2">
              <Label>Placeholder</Label>
              <Input
                value={localProps.placeholder || "you@example.com"}
                onChange={(e) => handlePropChange("placeholder", e.target.value)}
                placeholder="Input placeholder"
              />
            </div>
          </>
        )}

        <div className="pt-4 border-t">
          <Button
            onClick={onAIGenerate}
            className="w-full bg-gradient-button"
            size="sm"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Enhance with AI
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
