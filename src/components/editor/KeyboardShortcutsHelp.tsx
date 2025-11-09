import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Keyboard } from "lucide-react";

const KeyboardShortcutsHelp = () => {
  const shortcuts = [
    { keys: ["Ctrl", "Z"], mac: ["⌘", "Z"], description: "Undo" },
    { keys: ["Ctrl", "Shift", "Z"], mac: ["⌘", "⇧", "Z"], description: "Redo" },
    { keys: ["Ctrl", "Y"], mac: ["⌘", "Y"], description: "Redo (alternative)" },
    { keys: ["Ctrl", "S"], mac: ["⌘", "S"], description: "Save project" },
    { keys: ["Delete"], mac: ["⌫"], description: "Delete selected component" },
    { keys: ["Backspace"], mac: ["⌫"], description: "Delete selected component" },
  ];

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" title="Keyboard shortcuts">
          <Keyboard className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-0">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg glass hover:glass-glow transition-all">
              <span className="text-sm text-muted-foreground">{shortcut.description}</span>
              <div className="flex gap-1">
                {(isMac ? shortcut.mac : shortcut.keys).map((key, i) => (
                  <kbd
                    key={i}
                    className="px-2 py-1 text-xs font-mono bg-muted rounded border border-border"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcutsHelp;
