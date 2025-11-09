import { useDroppable } from "@dnd-kit/core";
import CanvasComponent from "./CanvasComponent";

interface Component {
  id: string;
  component_id: string;
  component_type: string;
  props: any;
  position_x: number;
  position_y: number;
  width: number;
  height: number;
  z_index: number;
}

interface EditorCanvasProps {
  components: Component[];
  selectedComponent: string | null;
  onSelectComponent: (id: string | null) => void;
  onDeleteComponent: (id: string) => void;
}

const EditorCanvas = ({
  components,
  selectedComponent,
  onSelectComponent,
  onDeleteComponent,
}: EditorCanvasProps) => {
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  return (
    <div
      ref={setNodeRef}
      className="relative min-h-[calc(100vh-200px)] p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onSelectComponent(null);
        }
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid grid-cols-[repeat(auto-fill,50px)] grid-rows-[repeat(auto-fill,50px)] h-full w-full opacity-20">
          {Array.from({ length: 1000 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-border/30" />
          ))}
        </div>
      </div>

      <div className="relative">
        {components.map((component) => (
          <CanvasComponent
            key={component.id}
            component={component}
            isSelected={selectedComponent === component.id}
            onSelect={() => onSelectComponent(component.id)}
          />
        ))}
      </div>

      {components.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="text-lg mb-2">Your canvas is empty</p>
            <p className="text-sm">Drag components from the left panel to get started</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorCanvas;
