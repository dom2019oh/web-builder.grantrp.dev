import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ComponentRendererProps {
  component: {
    id: string;
    component_type: string;
    props: any;
  };
  isSelected: boolean;
  onClick: () => void;
  onUpdate: (props: any) => void;
}

export const ComponentRenderer = ({ component, isSelected, onClick, onUpdate }: ComponentRendererProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = (e: React.MouseEvent, field: string, value: string) => {
    e.stopPropagation();
    setEditValue(value);
    setIsEditing(true);
  };

  const handleBlur = (field: string) => {
    if (editValue !== component.props?.[field]) {
      onUpdate({ ...component.props, [field]: editValue });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: string) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleBlur(field);
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditValue("");
    }
  };

  const renderEditableText = (text: string, field: string, className: string, multiline = false) => {
    if (isEditing && isSelected) {
      if (multiline) {
        return (
          <textarea
            ref={inputRef as any}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => handleBlur(field)}
            onKeyDown={(e) => handleKeyDown(e, field)}
            className={`${className} bg-primary/10 border-2 border-primary outline-none rounded-md px-2`}
            rows={3}
          />
        );
      }
      return (
        <input
          ref={inputRef as any}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => handleBlur(field)}
          onKeyDown={(e) => handleKeyDown(e, field)}
          className={`${className} bg-primary/10 border-2 border-primary outline-none rounded-md px-2`}
        />
      );
    }

    return (
      <div
        onDoubleClick={(e) => handleDoubleClick(e, field, text)}
        className={`${className} cursor-text hover:bg-primary/5 rounded-md px-2 transition-colors`}
        title="Double-click to edit"
      >
        {text}
      </div>
    );
  };

  const renderContent = () => {
    switch (component.component_type) {
      case "hero":
        return (
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-12 text-center">
            {renderEditableText(component.props?.content || "Hero Heading", "content", "text-4xl font-bold mb-4")}
            {component.props?.subtitle && renderEditableText(component.props.subtitle, "subtitle", "text-lg text-muted-foreground mb-6")}
            {component.props?.ctaText && (
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold">
                {component.props.ctaText}
              </button>
            )}
          </div>
        );

      case "heading":
        const HeadingTag = component.props?.level || "h2";
        const headingClasses = {
          h1: "text-4xl font-bold",
          h2: "text-3xl font-bold",
          h3: "text-2xl font-bold"
        };
        return (
          <div className="py-2">
            {renderEditableText(component.props?.content || "Heading", "content", headingClasses[HeadingTag as keyof typeof headingClasses])}
          </div>
        );

      case "text":
        return (
          <div className="prose prose-sm max-w-none">
            {renderEditableText(component.props?.content || "Text content", "content", "", true)}
          </div>
        );

      case "image":
        return (
          <div className="space-y-2">
            <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
              {component.props?.imageUrl ? (
                <img src={component.props.imageUrl} alt={component.props?.caption} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <span className="text-muted-foreground">Click to add image</span>
              )}
            </div>
            {component.props?.caption && (
              <p className="text-sm text-muted-foreground text-center">{component.props.caption}</p>
            )}
          </div>
        );

      case "gallery":
        const columns = component.props?.columns || 3;
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{component.props?.content}</h3>
            <div className={`grid grid-cols-${columns} gap-4`}>
              {component.props?.images?.map((img: any, idx: number) => (
                <div key={idx} className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                  {img.url ? (
                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <span className="text-sm text-muted-foreground">Image {idx + 1}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case "columns":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{component.props?.content}</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p>{component.props?.leftContent}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p>{component.props?.rightContent}</p>
              </div>
            </div>
          </div>
        );

      case "video":
        return (
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{component.props?.content}</h3>
            <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
              <span className="text-muted-foreground">Video Player</span>
            </div>
            {component.props?.caption && (
              <p className="text-sm text-muted-foreground">{component.props.caption}</p>
            )}
          </div>
        );

      case "form":
        return (
          <div className="space-y-4 p-6 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-semibold">{component.props?.content}</h3>
            <div className="space-y-3">
              {component.props?.fields?.includes("name") && (
                <input type="text" placeholder="Name" className="w-full p-2 rounded border" />
              )}
              {component.props?.fields?.includes("email") && (
                <input type="email" placeholder="Email" className="w-full p-2 rounded border" />
              )}
              {component.props?.fields?.includes("message") && (
                <textarea placeholder="Message" rows={4} className="w-full p-2 rounded border" />
              )}
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md">Submit</button>
            </div>
          </div>
        );

      default:
        return <p>{component.props?.content || "Empty component"}</p>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
        isSelected 
          ? "border-primary bg-primary/5 shadow-glow" 
          : "border-border bg-background hover:border-primary/50"
      }`}
      onClick={onClick}
    >
      <div className="text-xs font-medium text-muted-foreground mb-2 uppercase">
        {component.component_type}
      </div>
      {renderContent()}
    </motion.div>
  );
};
