import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Moon, Sun, Palette } from "lucide-react";
import { toast } from "sonner";

export const StylesView = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "custom">("dark");

  useEffect(() => {
    const currentTheme = document.body.classList.contains("light") ? "light" : "dark";
    setTheme(currentTheme);
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark" | "custom") => {
    setTheme(newTheme);
    
    if (newTheme === "light") {
      document.body.classList.add("light");
      toast.success("Light theme activated");
    } else if (newTheme === "dark") {
      document.body.classList.remove("light");
      toast.success("Dark theme activated");
    } else {
      document.body.classList.remove("light");
      toast.success("Custom theme selected");
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-4">Site Styles</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Customize your site's appearance with themes, colors, fonts, and spacing.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-xs mb-3 block">Theme Switcher</Label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleThemeChange("light")}
              className={`p-3 rounded-lg border-2 transition-all ${
                theme === "light"
                  ? "border-primary bg-primary/10 shadow-glow"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Sun className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs">Light</span>
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`p-3 rounded-lg border-2 transition-all ${
                theme === "dark"
                  ? "border-primary bg-primary/10 shadow-glow"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Moon className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs">Dark</span>
            </button>
            <button
              onClick={() => handleThemeChange("custom")}
              className={`p-3 rounded-lg border-2 transition-all ${
                theme === "custom"
                  ? "border-primary bg-primary/10 shadow-glow"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Palette className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs">Custom</span>
            </button>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <Label className="text-xs">Primary Color</Label>
          <div className="flex gap-2 mt-2">
            <div className="w-10 h-10 rounded-md bg-primary border-2 border-border cursor-pointer hover:scale-110 transition-transform" />
            <div className="w-10 h-10 rounded-md bg-secondary border border-border cursor-pointer hover:scale-110 transition-transform" />
            <div className="w-10 h-10 rounded-md bg-accent border border-border cursor-pointer hover:scale-110 transition-transform" />
            <div className="w-10 h-10 rounded-md bg-aurora-magenta border border-border cursor-pointer hover:scale-110 transition-transform" />
            <div className="w-10 h-10 rounded-md bg-aurora-cyan border border-border cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>

        <div>
          <Label className="text-xs">Font Family</Label>
          <select className="w-full mt-2 p-2 text-sm border rounded-md bg-background">
            <option>Inter</option>
            <option>Plus Jakarta Sans</option>
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
          <Slider defaultValue={[12]} max={24} min={0} step={2} className="mt-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Sharp</span>
            <span>Round</span>
          </div>
        </div>
      </div>

      <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity" size="sm">
        Apply Changes
      </Button>
    </div>
  );
};
