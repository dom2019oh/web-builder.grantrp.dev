import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { ComponentRenderer } from "./ComponentRenderer";

interface DraggableComponentProps {
  component: any;
  isSelected: boolean;
  onClick: () => void;
  onUpdate: (props: any) => void;
}

export const DraggableComponent = ({ 
  component, 
  isSelected, 
  onClick, 
  onUpdate 
}: DraggableComponentProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    scale: isDragging ? 1.02 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`relative group transition-smooth ${
        isDragging ? "shadow-glow ring-2 ring-primary/50" : ""
      }`}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-smooth cursor-grab active:cursor-grabbing z-10"
      >
        <div className="glass-strong rounded-xl p-2 border border-border/50 hover:border-primary hover:shadow-glow transition-smooth">
          <GripVertical className="h-4 w-4 text-primary" />
        </div>
      </div>
      
      {/* Drag indicator */}
      {isDragging && (
        <div className="absolute inset-0 glass-strong rounded-xl border-2 border-primary animate-pulse pointer-events-none z-20" />
      )}
      
      <ComponentRenderer
        component={component}
        isSelected={isSelected}
        onClick={onClick}
        onUpdate={onUpdate}
      />
    </div>
  );
};
