import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Type, Layout, Box } from "lucide-react";

interface AdvancedStylePanelProps {
  onStyleChange: (styles: any) => void;
}

export const AdvancedStylePanel = ({ onStyleChange }: AdvancedStylePanelProps) => {
  return (
    <Card className="glass glass-glow p-4">
      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass h-9">
          <TabsTrigger value="colors" className="text-xs">
            <Palette className="w-3 h-3 mr-1" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="text-xs">
            <Type className="w-3 h-3 mr-1" />
            Text
          </TabsTrigger>
          <TabsTrigger value="layout" className="text-xs">
            <Layout className="w-3 h-3 mr-1" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="spacing" className="text-xs">
            <Box className="w-3 h-3 mr-1" />
            Space
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-3 mt-4">
          <div>
            <Label className="text-xs">Background</Label>
            <div className="flex gap-2 mt-1">
              <Input
                type="color"
                defaultValue="#ffffff"
                onChange={(e) => onStyleChange({ backgroundColor: e.target.value })}
                className="w-12 h-8 p-1"
              />
              <Input
                type="text"
                placeholder="#ffffff"
                className="glass h-8 text-sm flex-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs">Text Color</Label>
            <div className="flex gap-2 mt-1">
              <Input
                type="color"
                defaultValue="#000000"
                onChange={(e) => onStyleChange({ color: e.target.value })}
                className="w-12 h-8 p-1"
              />
              <Input
                type="text"
                placeholder="#000000"
                className="glass h-8 text-sm flex-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs">Border Color</Label>
            <div className="flex gap-2 mt-1">
              <Input
                type="color"
                defaultValue="#e5e7eb"
                onChange={(e) => onStyleChange({ borderColor: e.target.value })}
                className="w-12 h-8 p-1"
              />
              <Input
                type="text"
                placeholder="#e5e7eb"
                className="glass h-8 text-sm flex-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs">Opacity</Label>
            <Slider
              defaultValue={[100]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) =>
                onStyleChange({ opacity: value[0] / 100 })
              }
              className="mt-2"
            />
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-3 mt-4">
          <div>
            <Label className="text-xs">Font Family</Label>
            <Select
              defaultValue="inter"
              onValueChange={(value) => onStyleChange({ fontFamily: value })}
            >
              <SelectTrigger className="glass h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass glass-glow">
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="poppins">Poppins</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
                <SelectItem value="montserrat">Montserrat</SelectItem>
                <SelectItem value="playfair">Playfair Display</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Font Size (px)</Label>
            <Input
              type="number"
              defaultValue="16"
              min="8"
              max="96"
              onChange={(e) => onStyleChange({ fontSize: `${e.target.value}px` })}
              className="glass h-8 text-sm"
            />
          </div>

          <div>
            <Label className="text-xs">Font Weight</Label>
            <Select
              defaultValue="400"
              onValueChange={(value) => onStyleChange({ fontWeight: value })}
            >
              <SelectTrigger className="glass h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass glass-glow">
                <SelectItem value="300">Light (300)</SelectItem>
                <SelectItem value="400">Normal (400)</SelectItem>
                <SelectItem value="500">Medium (500)</SelectItem>
                <SelectItem value="600">Semibold (600)</SelectItem>
                <SelectItem value="700">Bold (700)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Line Height</Label>
            <Slider
              defaultValue={[1.5]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(value) =>
                onStyleChange({ lineHeight: value[0] })
              }
              className="mt-2"
            />
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-3 mt-4">
          <div>
            <Label className="text-xs">Display</Label>
            <Select
              defaultValue="block"
              onValueChange={(value) => onStyleChange({ display: value })}
            >
              <SelectTrigger className="glass h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass glass-glow">
                <SelectItem value="block">Block</SelectItem>
                <SelectItem value="flex">Flex</SelectItem>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="inline-block">Inline Block</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Width</Label>
            <Input
              type="text"
              placeholder="auto"
              onChange={(e) => onStyleChange({ width: e.target.value })}
              className="glass h-8 text-sm"
            />
          </div>

          <div>
            <Label className="text-xs">Height</Label>
            <Input
              type="text"
              placeholder="auto"
              onChange={(e) => onStyleChange({ height: e.target.value })}
              className="glass h-8 text-sm"
            />
          </div>

          <div>
            <Label className="text-xs">Border Radius (px)</Label>
            <Slider
              defaultValue={[0]}
              min={0}
              max={50}
              step={1}
              onValueChange={(value) =>
                onStyleChange({ borderRadius: `${value[0]}px` })
              }
              className="mt-2"
            />
          </div>
        </TabsContent>

        <TabsContent value="spacing" className="space-y-3 mt-4">
          <div>
            <Label className="text-xs">Padding (px)</Label>
            <Slider
              defaultValue={[16]}
              min={0}
              max={100}
              step={4}
              onValueChange={(value) =>
                onStyleChange({ padding: `${value[0]}px` })
              }
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-xs">Margin (px)</Label>
            <Slider
              defaultValue={[0]}
              min={0}
              max={100}
              step={4}
              onValueChange={(value) =>
                onStyleChange({ margin: `${value[0]}px` })
              }
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-xs">Gap (px)</Label>
            <Slider
              defaultValue={[8]}
              min={0}
              max={50}
              step={2}
              onValueChange={(value) =>
                onStyleChange({ gap: `${value[0]}px` })
              }
              className="mt-2"
            />
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
