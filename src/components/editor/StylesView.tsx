import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export const StylesView = () => {
  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-4">Site Styles</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Customize your site's appearance with colors, fonts, and spacing.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-xs">Primary Color</Label>
          <div className="flex gap-2 mt-2">
            <div className="w-10 h-10 rounded-md bg-primary border-2 border-border cursor-pointer" />
            <div className="w-10 h-10 rounded-md bg-secondary border border-border cursor-pointer" />
            <div className="w-10 h-10 rounded-md bg-accent border border-border cursor-pointer" />
          </div>
        </div>

        <div>
          <Label className="text-xs">Font Family</Label>
          <select className="w-full mt-2 p-2 text-sm border rounded-md bg-background">
            <option>Inter</option>
            <option>Roboto</option>
            <option>Open Sans</option>
            <option>Playfair Display</option>
          </select>
        </div>

        <div>
          <Label className="text-xs">Font Size</Label>
          <Slider defaultValue={[16]} max={24} min={12} step={1} className="mt-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>12px</span>
            <span>24px</span>
          </div>
        </div>

        <div>
          <Label className="text-xs">Spacing</Label>
          <Slider defaultValue={[16]} max={32} min={8} step={4} className="mt-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Tight</span>
            <span>Loose</span>
          </div>
        </div>

        <div>
          <Label className="text-xs">Border Radius</Label>
          <Slider defaultValue={[8]} max={24} min={0} step={2} className="mt-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Sharp</span>
            <span>Round</span>
          </div>
        </div>
      </div>

      <Button className="w-full" size="sm">Apply Changes</Button>
    </div>
  );
};
