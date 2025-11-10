interface ComponentRendererProps {
  component: {
    id: string;
    component_type: string;
    props: any;
  };
  isSelected: boolean;
  onClick: () => void;
}

export const ComponentRenderer = ({ component, isSelected, onClick }: ComponentRendererProps) => {
  const renderContent = () => {
    switch (component.component_type) {
      case "hero":
        return (
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-12 text-center">
            <h1 className="text-4xl font-bold mb-4">{component.props?.content}</h1>
            {component.props?.subtitle && (
              <p className="text-lg text-muted-foreground mb-6">{component.props.subtitle}</p>
            )}
            {component.props?.ctaText && (
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold">
                {component.props.ctaText}
              </button>
            )}
          </div>
        );

      case "heading":
        const HeadingTag = component.props?.level || "h2";
        return (
          <div className="py-2">
            {HeadingTag === "h1" && <h1 className="text-4xl font-bold">{component.props?.content}</h1>}
            {HeadingTag === "h2" && <h2 className="text-3xl font-bold">{component.props?.content}</h2>}
            {HeadingTag === "h3" && <h3 className="text-2xl font-bold">{component.props?.content}</h3>}
          </div>
        );

      case "text":
        return (
          <div className="prose prose-sm max-w-none">
            <p>{component.props?.content}</p>
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
    <div
      className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
        isSelected 
          ? "border-primary bg-primary/5" 
          : "border-border bg-background hover:border-primary/50"
      }`}
      onClick={onClick}
    >
      <div className="text-xs font-medium text-muted-foreground mb-2 uppercase">
        {component.component_type}
      </div>
      {renderContent()}
    </div>
  );
};
