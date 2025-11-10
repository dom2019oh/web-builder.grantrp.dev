import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Paintbrush, 
  Type, 
  Layout, 
  Sparkles,
  Trash2,
  Copy,
  Eye,
  EyeOff
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface StylePanelProps {
  component: Component | null;
  onUpdate: (updates: Partial<Component>) => void;
  onDelete: () => void;
  onAIGenerate: () => void;
  onDuplicate?: () => void;
}

const StylePanel = ({
  component,
  onUpdate,
  onDelete,
  onAIGenerate,
  onDuplicate,
}: StylePanelProps) => {
  if (!component) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold">Properties</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Select an element to edit
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center text-muted-foreground">
            <Layout className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No element selected</p>
            <p className="text-xs mt-1">Click on an element to edit its properties</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Properties</h2>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onDuplicate}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onDelete}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
            <Layout className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{component.component_type}</p>
            <p className="text-xs text-muted-foreground">Component</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ScrollArea className="flex-1">
        <Tabs defaultValue="style" className="w-full">
          <TabsList className="w-full rounded-none border-b border-border bg-transparent h-auto p-0">
            <TabsTrigger 
              value="style" 
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <Paintbrush className="h-3.5 w-3.5 mr-1.5" />
              Style
            </TabsTrigger>
            <TabsTrigger 
              value="layout"
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <Layout className="h-3.5 w-3.5 mr-1.5" />
              Layout
            </TabsTrigger>
          </TabsList>

          {/* Style Tab */}
          <TabsContent value="style" className="p-4 space-y-4 mt-0">
            {/* AI Enhancement */}
            <Button
              onClick={onAIGenerate}
              className="w-full bg-gradient-button border-0"
              size="sm"
            >
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              AI Enhance
            </Button>

            <Separator />

            {/* Background Color */}
            <div className="space-y-2">
              <Label className="text-xs">Background</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={component.props?.backgroundColor || "#ffffff"}
                  onChange={(e) =>
                    onUpdate({
                      props: { ...component.props, backgroundColor: e.target.value },
                    })
                  }
                  className="w-12 h-9 p-1"
                />
                <Input
                  value={component.props?.backgroundColor || "#ffffff"}
                  onChange={(e) =>
                    onUpdate({
                      props: { ...component.props, backgroundColor: e.target.value },
                    })
                  }
                  className="flex-1 h-9 text-xs"
                />
              </div>
            </div>

            {/* Text Color */}
            <div className="space-y-2">
              <Label className="text-xs">Text Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={component.props?.color || "#000000"}
                  onChange={(e) =>
                    onUpdate({
                      props: { ...component.props, color: e.target.value },
                    })
                  }
                  className="w-12 h-9 p-1"
                />
                <Input
                  value={component.props?.color || "#000000"}
                  onChange={(e) =>
                    onUpdate({
                      props: { ...component.props, color: e.target.value },
                    })
                  }
                  className="flex-1 h-9 text-xs"
                />
              </div>
            </div>

            {/* Font Size */}
            <div className="space-y-2">
              <Label className="text-xs">Font Size</Label>
              <Select
                value={component.props?.fontSize || "16"}
                onValueChange={(value) =>
                  onUpdate({
                    props: { ...component.props, fontSize: value },
                  })
                }
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12px</SelectItem>
                  <SelectItem value="14">14px</SelectItem>
                  <SelectItem value="16">16px</SelectItem>
                  <SelectItem value="18">18px</SelectItem>
                  <SelectItem value="20">20px</SelectItem>
                  <SelectItem value="24">24px</SelectItem>
                  <SelectItem value="32">32px</SelectItem>
                  <SelectItem value="48">48px</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Border Radius */}
            <div className="space-y-2">
              <Label className="text-xs">Border Radius</Label>
              <Slider
                value={[component.props?.borderRadius || 0]}
                onValueChange={([value]) =>
                  onUpdate({
                    props: { ...component.props, borderRadius: value },
                  })
                }
                max={50}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground text-right">
                {component.props?.borderRadius || 0}px
              </p>
            </div>

            {/* Opacity */}
            <div className="space-y-2">
              <Label className="text-xs">Opacity</Label>
              <Slider
                value={[component.props?.opacity || 100]}
                onValueChange={([value]) =>
                  onUpdate({
                    props: { ...component.props, opacity: value },
                  })
                }
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground text-right">
                {component.props?.opacity || 100}%
              </p>
            </div>
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="p-4 space-y-4 mt-0">
            {/* Width */}
            <div className="space-y-2">
              <Label className="text-xs">Width</Label>
              <Input
                type="number"
                value={component.width}
                onChange={(e) =>
                  onUpdate({ width: parseInt(e.target.value) || 300 })
                }
                className="h-9 text-xs"
              />
            </div>

            {/* Height */}
            <div className="space-y-2">
              <Label className="text-xs">Height</Label>
              <Input
                type="number"
                value={component.height}
                onChange={(e) =>
                  onUpdate({ height: parseInt(e.target.value) || 200 })
                }
                className="h-9 text-xs"
              />
            </div>

            <Separator />

            {/* Position X */}
            <div className="space-y-2">
              <Label className="text-xs">Position X</Label>
              <Input
                type="number"
                value={Math.round(component.position_x)}
                onChange={(e) =>
                  onUpdate({ position_x: parseInt(e.target.value) || 0 })
                }
                className="h-9 text-xs"
              />
            </div>

            {/* Position Y */}
            <div className="space-y-2">
              <Label className="text-xs">Position Y</Label>
              <Input
                type="number"
                value={Math.round(component.position_y)}
                onChange={(e) =>
                  onUpdate({ position_y: parseInt(e.target.value) || 0 })
                }
                className="h-9 text-xs"
              />
            </div>

            <Separator />

            {/* Z-Index */}
            <div className="space-y-2">
              <Label className="text-xs">Layer Order</Label>
              <Input
                type="number"
                value={component.z_index}
                onChange={(e) =>
                  onUpdate({ z_index: parseInt(e.target.value) || 0 })
                }
                className="h-9 text-xs"
              />
              <p className="text-xs text-muted-foreground">
                Higher values appear on top
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
};

export default StylePanel;
