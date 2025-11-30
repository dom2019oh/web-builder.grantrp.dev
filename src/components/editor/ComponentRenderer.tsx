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
          <div className="relative">
            <textarea
              ref={inputRef as any}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={() => handleBlur(field)}
              onKeyDown={(e) => handleKeyDown(e, field)}
              className={`${className} glass-strong border-2 border-primary outline-none rounded-xl px-3 py-2 shadow-glow w-full`}
              rows={3}
            />
            <div className="absolute -top-8 right-0 glass-strong border border-border/50 rounded-lg px-2 py-1 text-xs text-muted-foreground">
              Enter to save • Esc to cancel
            </div>
          </div>
        );
      }
      return (
        <div className="relative">
          <input
            ref={inputRef as any}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => handleBlur(field)}
            onKeyDown={(e) => handleKeyDown(e, field)}
            className={`${className} glass-strong border-2 border-primary outline-none rounded-xl px-3 py-2 shadow-glow w-full`}
          />
          <div className="absolute -top-8 right-0 glass-strong border border-border/50 rounded-lg px-2 py-1 text-xs text-muted-foreground">
            Enter to save • Esc to cancel
          </div>
        </div>
      );
    }

    return (
      <div
        onDoubleClick={(e) => handleDoubleClick(e, field, text)}
        className={`${className} cursor-text hover:bg-primary/5 hover:ring-1 hover:ring-primary/20 rounded-xl px-3 py-1 transition-smooth relative group`}
        title="Double-click to edit"
      >
        {text}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="absolute top-0 right-0 text-[10px] text-primary/60 bg-primary/10 px-1.5 py-0.5 rounded-bl-md rounded-tr-xl">
            Edit
          </div>
        </div>
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
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className={`p-6 rounded-2xl border-2 transition-smooth cursor-pointer relative group ${
        isSelected 
          ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-glow ring-1 ring-primary/20" 
          : "border-border/50 bg-background/50 hover:border-primary/50 hover:shadow-md"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider glass-soft px-2 py-1 rounded-lg">
          {component.component_type}
        </div>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="h-2 w-2 rounded-full bg-primary shadow-glow"
          />
        )}
      </div>
      {renderContent()}
    </motion.div>
  );
};
