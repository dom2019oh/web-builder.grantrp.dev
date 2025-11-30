import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Type, Layout, Sparkles, Settings, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  ChevronDown, ChevronUp, Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InspectorPanelProps {
  component: any;
  onUpdate: (props: any) => void;
  onDelete: () => void;
}

export const InspectorPanel = ({ component, onUpdate, onDelete }: InspectorPanelProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    typography: true,
    colors: true,
    spacing: false,
    layout: false,
    effects: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateProp = (key: string, value: any) => {
    onUpdate({ ...component.props, [key]: value });
  };

  const updateStyle = (styleKey: string, styleValue: any) => {
    const currentStyle = component.props.style || {};
    onUpdate({ 
      ...component.props, 
      style: { ...currentStyle, [styleKey]: styleValue } 
    });
  };

  const props = component.props || {};
  const style = props.style || {};

  return (
    <div className="h-full flex flex-col glass-strong border-l border-border/30">
      {/* Header */}
      <div className="p-6 border-b border-border/30">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-display font-semibold bg-gradient-primary bg-clip-text text-transparent">
            Inspector
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            onClick={onDelete}
            title="Delete Component"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {component.component_type}
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <Tabs defaultValue="style" className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass">
            <TabsTrigger value="style" className="gap-2">
              <Type className="h-3.5 w-3.5" />
              Style
            </TabsTrigger>
            <TabsTrigger value="layout" className="gap-2">
              <Layout className="h-3.5 w-3.5" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="effects" className="gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Effects
            </TabsTrigger>
          </TabsList>

          {/* STYLE TAB */}
          <TabsContent value="style" className="space-y-4 mt-4">
            {/* Typography Section */}
            <CollapsibleSection
              title="Typography"
              icon={<Type className="h-4 w-4" />}
              expanded={expandedSections.typography}
              onToggle={() => toggleSection("typography")}
            >
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Font Size</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[parseInt(style.fontSize) || 16]}
                      min={8}
                      max={96}
                      step={1}
                      onValueChange={([value]) => updateStyle("fontSize", `${value}px`)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={parseInt(style.fontSize) || 16}
                      onChange={(e) => updateStyle("fontSize", `${e.target.value}px`)}
                      className="w-16 h-8 text-xs glass"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Font Weight</Label>
                  <Select
                    value={style.fontWeight || "400"}
                    onValueChange={(value) => updateStyle("fontWeight", value)}
                  >
                    <SelectTrigger className="glass">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-strong">
                      <SelectItem value="300">Light (300)</SelectItem>
                      <SelectItem value="400">Regular (400)</SelectItem>
                      <SelectItem value="500">Medium (500)</SelectItem>
                      <SelectItem value="600">Semibold (600)</SelectItem>
                      <SelectItem value="700">Bold (700)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Text Align</Label>
                  <div className="flex gap-1 glass rounded-xl p-1">
                    {[
                      { value: "left", icon: AlignLeft },
                      { value: "center", icon: AlignCenter },
                      { value: "right", icon: AlignRight },
                      { value: "justify", icon: AlignJustify },
                    ].map(({ value, icon: Icon }) => (
                      <Button
                        key={value}
                        variant={style.textAlign === value ? "secondary" : "ghost"}
                        size="sm"
                        className="h-8 w-full"
                        onClick={() => updateStyle("textAlign", value)}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Line Height</Label>
                  <Slider
                    value={[parseFloat(style.lineHeight) || 1.5]}
                    min={1}
                    max={3}
                    step={0.1}
                    onValueChange={([value]) => updateStyle("lineHeight", value.toString())}
                  />
                  <span className="text-xs text-muted-foreground">{parseFloat(style.lineHeight) || 1.5}</span>
                </div>
              </div>
            </CollapsibleSection>

            {/* Colors Section */}
            <CollapsibleSection
              title="Colors"
              icon={<div className="h-4 w-4 rounded-full bg-gradient-primary" />}
              expanded={expandedSections.colors}
              onToggle={() => toggleSection("colors")}
            >
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Text Color</Label>
                  <Input
                    type="color"
                    value={style.color || "#000000"}
                    onChange={(e) => updateStyle("color", e.target.value)}
                    className="h-10 glass"
                  />
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Background</Label>
                  <Input
                    type="color"
                    value={style.backgroundColor || "#ffffff"}
                    onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                    className="h-10 glass"
                  />
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Opacity</Label>
                  <Slider
                    value={[parseFloat(style.opacity) || 1]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={([value]) => updateStyle("opacity", value.toString())}
                  />
                  <span className="text-xs text-muted-foreground">{Math.round((parseFloat(style.opacity) || 1) * 100)}%</span>
                </div>
              </div>
            </CollapsibleSection>

            {/* Borders & Radius */}
            <CollapsibleSection
              title="Borders & Radius"
              icon={<div className="h-4 w-4 border-2 border-primary rounded" />}
              expanded={expandedSections.borders}
              onToggle={() => toggleSection("borders")}
            >
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Border Radius</Label>
                  <div className="flex items-center gap-2">
                    <Slider
                      value={[parseInt(style.borderRadius) || 0]}
                      min={0}
                      max={50}
                      step={1}
                      onValueChange={([value]) => updateStyle("borderRadius", `${value}px`)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={parseInt(style.borderRadius) || 0}
                      onChange={(e) => updateStyle("borderRadius", `${e.target.value}px`)}
                      className="w-16 h-8 text-xs glass"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Border Width</Label>
                  <Slider
                    value={[parseInt(style.borderWidth) || 0]}
                    min={0}
                    max={10}
                    step={1}
                    onValueChange={([value]) => updateStyle("borderWidth", `${value}px`)}
                  />
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Border Color</Label>
                  <Input
                    type="color"
                    value={style.borderColor || "#000000"}
                    onChange={(e) => updateStyle("borderColor", e.target.value)}
                    className="h-10 glass"
                  />
                </div>
              </div>
            </CollapsibleSection>
          </TabsContent>

          {/* LAYOUT TAB */}
          <TabsContent value="layout" className="space-y-4 mt-4">
            <CollapsibleSection
              title="Spacing"
              icon={<Layout className="h-4 w-4" />}
              expanded={expandedSections.spacing}
              onToggle={() => toggleSection("spacing")}
            >
              <div className="space-y-3">
                {["padding", "margin"].map((spacing) => (
                  <div key={spacing}>
                    <Label className="text-xs text-muted-foreground mb-2 block capitalize">
                      {spacing}
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Top", "Right", "Bottom", "Left"].map((side) => (
                        <div key={side}>
                          <Label className="text-xs text-muted-foreground mb-1 block">{side}</Label>
                          <Input
                            type="number"
                            placeholder="0"
                            value={parseInt(style[`${spacing}${side}`]) || ""}
                            onChange={(e) => updateStyle(`${spacing}${side}`, `${e.target.value}px`)}
                            className="h-8 text-xs glass"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Dimensions"
              icon={<Layout className="h-4 w-4" />}
              expanded={expandedSections.dimensions}
              onToggle={() => toggleSection("dimensions")}
            >
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Width</Label>
                  <Input
                    type="text"
                    placeholder="auto"
                    value={style.width || ""}
                    onChange={(e) => updateStyle("width", e.target.value)}
                    className="glass"
                  />
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Height</Label>
                  <Input
                    type="text"
                    placeholder="auto"
                    value={style.height || ""}
                    onChange={(e) => updateStyle("height", e.target.value)}
                    className="glass"
                  />
                </div>

                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Max Width</Label>
                  <Input
                    type="text"
                    placeholder="none"
                    value={style.maxWidth || ""}
                    onChange={(e) => updateStyle("maxWidth", e.target.value)}
                    className="glass"
                  />
                </div>
              </div>
            </CollapsibleSection>
          </TabsContent>

          {/* EFFECTS TAB */}
          <TabsContent value="effects" className="space-y-4 mt-4">
            <CollapsibleSection
              title="Shadow"
              icon={<Sparkles className="h-4 w-4" />}
              expanded={expandedSections.shadow}
              onToggle={() => toggleSection("shadow")}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Enable Shadow</Label>
                  <Switch
                    checked={!!style.boxShadow}
                    onCheckedChange={(checked) => 
                      updateStyle("boxShadow", checked ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none")
                    }
                  />
                </div>
                {style.boxShadow && style.boxShadow !== "none" && (
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">Shadow Preset</Label>
                    <Select
                      value={style.boxShadow}
                      onValueChange={(value) => updateStyle("boxShadow", value)}
                    >
                      <SelectTrigger className="glass">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-strong">
                        <SelectItem value="0 1px 3px 0 rgba(0, 0, 0, 0.1)">Small</SelectItem>
                        <SelectItem value="0 4px 6px -1px rgba(0, 0, 0, 0.1)">Medium</SelectItem>
                        <SelectItem value="0 10px 15px -3px rgba(0, 0, 0, 0.1)">Large</SelectItem>
                        <SelectItem value="0 20px 25px -5px rgba(0, 0, 0, 0.1)">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Transform"
              icon={<Sparkles className="h-4 w-4" />}
              expanded={expandedSections.transform}
              onToggle={() => toggleSection("transform")}
            >
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Scale</Label>
                  <Slider
                    value={[parseFloat(style.scale) || 1]}
                    min={0.5}
                    max={2}
                    step={0.1}
                    onValueChange={([value]) => updateStyle("transform", `scale(${value})`)}
                  />
                  <span className="text-xs text-muted-foreground">{parseFloat(style.scale) || 1}x</span>
                </div>
              </div>
            </CollapsibleSection>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Collapsible Section Component
interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const CollapsibleSection = ({ title, icon, expanded, onToggle, children }: CollapsibleSectionProps) => {
  return (
    <div className="glass rounded-xl border border-border/30 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-muted/20 transition-smooth"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{title}</span>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-3 pt-0 border-t border-border/20">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
