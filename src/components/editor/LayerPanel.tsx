import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, EyeOff, Lock, Unlock, Trash2, Layers, ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Component {
  id: string;
  component_type: string;
  props: any;
  z_index?: number;
}

interface LayerPanelProps {
  components: Component[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onReorder: (components: Component[]) => void;
}

export const LayerPanel = ({ components, selectedId, onSelect, onDelete, onReorder }: LayerPanelProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [hiddenLayers, setHiddenLayers] = useState<Set<string>>(new Set());
  const [lockedLayers, setLockedLayers] = useState<Set<string>>(new Set());

  const toggleVisibility = (id: string) => {
    setHiddenLayers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleLock = (id: string) => {
    setLockedLayers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const sortedComponents = [...components].sort((a, b) => (b.z_index || 0) - (a.z_index || 0));

  const getComponentIcon = (type: string) => {
    switch (type) {
      case "hero": return "🎯";
      case "heading": return "📝";
      case "text": return "📄";
      case "image": return "🖼️";
      case "gallery": return "🎨";
      case "video": return "🎥";
      case "form": return "📋";
      case "columns": return "📊";
      default: return "🔷";
    }
  };

  return (
    <div className="h-full flex flex-col glass border-l border-border/50">
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-display font-semibold">Layers</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-hidden"
          >
            <ScrollArea className="h-full">
              <div className="p-2 space-y-1">
                {sortedComponents.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <Layers className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No layers yet</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Add components to see them here</p>
                  </div>
                ) : (
                  sortedComponents.map((component, index) => (
                    <motion.div
                      key={component.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`group flex items-center gap-2 p-2 rounded-lg transition-smooth hover-lift ${
                        selectedId === component.id
                          ? "bg-primary/10 border border-primary/30"
                          : "hover:bg-muted/50"
                      } ${hiddenLayers.has(component.id) ? "opacity-40" : ""}`}
                      onClick={() => !lockedLayers.has(component.id) && onSelect(component.id)}
                    >
                      <div className="flex-1 flex items-center gap-2 min-w-0">
                        <span className="text-lg">{getComponentIcon(component.component_type)}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {component.component_type}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {component.props?.content?.substring(0, 30) || "No content"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleVisibility(component.id);
                          }}
                        >
                          {hiddenLayers.has(component.id) ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLock(component.id);
                          }}
                        >
                          {lockedLayers.has(component.id) ? (
                            <Lock className="h-3.5 w-3.5" />
                          ) : (
                            <Unlock className="h-3.5 w-3.5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(component.id);
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
