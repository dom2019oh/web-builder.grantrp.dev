import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Settings as SettingsIcon } from "lucide-react";

export const SettingsView = () => {
  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="text-sm font-semibold mb-4">Project Settings</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Configure your project preferences and options.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-xs mb-3 block">General</Label>
          <div className="space-y-3">
            <div>
              <Label htmlFor="project-name" className="text-xs text-muted-foreground">
                Project Name
              </Label>
              <Input
                id="project-name"
                placeholder="My Awesome Project"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="project-domain" className="text-xs text-muted-foreground">
                Custom Domain
              </Label>
              <Input
                id="project-domain"
                placeholder="mywebsite.com"
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <Label className="text-xs mb-3 block">Features</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Auto-save</p>
                <p className="text-xs text-muted-foreground">Automatically save changes</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Version History</p>
                <p className="text-xs text-muted-foreground">Track all changes</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Responsive Mode</p>
                <p className="text-xs text-muted-foreground">Optimize for all devices</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <Label className="text-xs mb-3 block">Advanced</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Developer Mode</p>
                <p className="text-xs text-muted-foreground">Enable code editing</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Performance Monitor</p>
                <p className="text-xs text-muted-foreground">Show performance metrics</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity" size="sm">
          Save Settings
        </Button>
      </div>
    </div>
  );
};
