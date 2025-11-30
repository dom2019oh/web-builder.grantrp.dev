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
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10"
      >
        <div className="glass rounded-lg p-1.5 border border-border/50 hover:border-primary/50 transition-smooth">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      <ComponentRenderer
        component={component}
        isSelected={isSelected}
        onClick={onClick}
        onUpdate={onUpdate}
      />
    </div>
  );
};
