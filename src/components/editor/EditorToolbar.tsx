import { Button } from "@/components/ui/button";
import { 
  Save, 
  Undo, 
  Redo, 
  Monitor, 
  Tablet, 
  Smartphone,
  Eye,
  Code,
  Settings,
  Sparkles
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditorToolbarProps {
  projectName: string;
  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isSaving: boolean;
  viewMode: "desktop" | "tablet" | "mobile";
  onViewModeChange: (mode: "desktop" | "tablet" | "mobile") => void;
  previewMode: boolean;
  onPreviewToggle: () => void;
}

const EditorToolbar = ({
  projectName,
  onSave,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  isSaving,
  viewMode,
  onViewModeChange,
  previewMode,
  onPreviewToggle,
}: EditorToolbarProps) => {
  return (
    <div className="glass border-b border-border">
      <div className="px-4 py-2 flex items-center justify-between">
        {/* Left: Project Name */}
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold truncate max-w-[200px]">
            {projectName || "Untitled Project"}
          </h1>
          <div className="h-4 w-px bg-border" />
          <span className="text-xs text-muted-foreground">Editor</span>
        </div>

        {/* Center: View Mode & Actions */}
        <div className="flex items-center gap-1">
          {/* Undo/Redo */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onUndo}
                disabled={!canUndo}
              >
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onRedo}
                disabled={!canRedo}
              >
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo (Ctrl+Shift+Z)</TooltipContent>
          </Tooltip>

          <div className="h-4 w-px bg-border mx-2" />

          {/* View Modes */}
          <div className="flex items-center gap-1 p-1 rounded-md bg-muted/50">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === "desktop" ? "default" : "ghost"}
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onViewModeChange("desktop")}
                >
                  <Monitor className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Desktop View</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === "tablet" ? "default" : "ghost"}
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onViewModeChange("tablet")}
                >
                  <Tablet className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tablet View</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === "mobile" ? "default" : "ghost"}
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onViewModeChange("mobile")}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mobile View</TooltipContent>
            </Tooltip>
          </div>

          <div className="h-4 w-px bg-border mx-2" />

          {/* Preview Mode */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={previewMode ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={onPreviewToggle}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Preview Mode</TooltipContent>
          </Tooltip>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={onSave}
            disabled={isSaving}
          >
            <Save className="mr-2 h-3.5 w-3.5" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button
            size="sm"
            className="h-8 bg-gradient-button border-0"
          >
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorToolbar;
