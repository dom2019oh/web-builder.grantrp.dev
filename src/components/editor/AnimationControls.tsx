import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";

interface AnimationControlsProps {
  onAnimationChange: (animation: any) => void;
}

export const AnimationControls = ({ onAnimationChange }: AnimationControlsProps) => {
  const animations = [
    { value: "none", label: "None" },
    { value: "fade-in", label: "Fade In" },
    { value: "slide-up", label: "Slide Up" },
    { value: "slide-down", label: "Slide Down" },
    { value: "slide-left", label: "Slide Left" },
    { value: "slide-right", label: "Slide Right" },
    { value: "scale-in", label: "Scale In" },
    { value: "bounce", label: "Bounce" },
    { value: "rotate", label: "Rotate" },
    { value: "flip", label: "Flip" },
  ];

  const timingFunctions = [
    { value: "ease", label: "Ease" },
    { value: "linear", label: "Linear" },
    { value: "ease-in", label: "Ease In" },
    { value: "ease-out", label: "Ease Out" },
    { value: "ease-in-out", label: "Ease In Out" },
  ];

  return (
    <Card className="glass glass-glow p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-primary" />
        <h4 className="font-semibold">Animation</h4>
      </div>

      <div className="space-y-3">
        <div>
          <Label className="text-xs">Animation Type</Label>
          <Select
            defaultValue="none"
            onValueChange={(value) =>
              onAnimationChange({ type: value })
            }
          >
            <SelectTrigger className="glass h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass glass-glow">
              {animations.map((anim) => (
                <SelectItem key={anim.value} value={anim.value}>
                  {anim.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs">Duration (seconds)</Label>
          <Slider
            defaultValue={[0.3]}
            min={0.1}
            max={3}
            step={0.1}
            onValueChange={(value) =>
              onAnimationChange({ duration: value[0] })
            }
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-xs">Delay (seconds)</Label>
          <Slider
            defaultValue={[0]}
            min={0}
            max={2}
            step={0.1}
            onValueChange={(value) =>
              onAnimationChange({ delay: value[0] })
            }
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-xs">Timing Function</Label>
          <Select
            defaultValue="ease"
            onValueChange={(value) =>
              onAnimationChange({ timing: value })
            }
          >
            <SelectTrigger className="glass h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass glass-glow">
              {timingFunctions.map((func) => (
                <SelectItem key={func.value} value={func.value}>
                  {func.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};
