import { useDraggable } from "@dnd-kit/core";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Layout,
  Type,
  Image as ImageIcon,
  Square,
  Grid,
  List,
  Video,
  Mail,
  MessageSquare,
  Calendar,
  ShoppingCart,
  Star,
  Users,
  Award,
  FileText,
  Map,
  Clock,
} from "lucide-react";

interface PaletteItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  description: string;
}

const DraggableItem = ({ item }: { item: PaletteItem }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: item.id,
    data: { isNew: true, type: item.id },
  });

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`glass border-0 cursor-move hover:glass-glow transition-all group ${
        isDragging ? "opacity-50 scale-95" : ""
      }`}
    >
      <CardHeader className="p-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

const SectionPalette = () => {
  const sections: PaletteItem[] = [
    {
      id: "hero-section",
      name: "Hero Section",
      icon: <Layout className="h-5 w-5" />,
      category: "sections",
      description: "Full-width hero with headline and CTA",
    },
    {
      id: "features-grid",
      name: "Features Grid",
      icon: <Grid className="h-5 w-5" />,
      category: "sections",
      description: "Showcase features in a grid layout",
    },
    {
      id: "testimonials",
      name: "Testimonials",
      icon: <MessageSquare className="h-5 w-5" />,
      category: "sections",
      description: "Customer reviews and testimonials",
    },
    {
      id: "pricing-table",
      name: "Pricing Table",
      icon: <ShoppingCart className="h-5 w-5" />,
      category: "sections",
      description: "Pricing plans comparison",
    },
    {
      id: "team-section",
      name: "Team Section",
      icon: <Users className="h-5 w-5" />,
      category: "sections",
      description: "Team member profiles",
    },
    {
      id: "cta-banner",
      name: "CTA Banner",
      icon: <Star className="h-5 w-5" />,
      category: "sections",
      description: "Call-to-action banner",
    },
  ];

  const elements: PaletteItem[] = [
    {
      id: "heading",
      name: "Heading",
      icon: <Type className="h-5 w-5" />,
      category: "elements",
      description: "Text heading (H1-H6)",
    },
    {
      id: "paragraph",
      name: "Paragraph",
      icon: <FileText className="h-5 w-5" />,
      category: "elements",
      description: "Text paragraph",
    },
    {
      id: "button",
      name: "Button",
      icon: <Square className="h-5 w-5" />,
      category: "elements",
      description: "Interactive button",
    },
    {
      id: "image",
      name: "Image",
      icon: <ImageIcon className="h-5 w-5" />,
      category: "elements",
      description: "Image block",
    },
    {
      id: "video",
      name: "Video",
      icon: <Video className="h-5 w-5" />,
      category: "elements",
      description: "Video embed",
    },
    {
      id: "divider",
      name: "Divider",
      icon: <List className="h-5 w-5" />,
      category: "elements",
      description: "Horizontal divider",
    },
  ];

  const forms: PaletteItem[] = [
    {
      id: "contact-form",
      name: "Contact Form",
      icon: <Mail className="h-5 w-5" />,
      category: "forms",
      description: "Contact form with fields",
    },
    {
      id: "newsletter",
      name: "Newsletter",
      icon: <Mail className="h-5 w-5" />,
      category: "forms",
      description: "Email signup form",
    },
    {
      id: "booking-form",
      name: "Booking Form",
      icon: <Calendar className="h-5 w-5" />,
      category: "forms",
      description: "Appointment booking",
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-semibold">Add Elements</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Drag elements onto the canvas
        </p>
      </div>

      <ScrollArea className="flex-1">
        <Tabs defaultValue="sections" className="w-full">
          <TabsList className="w-full rounded-none border-b border-border bg-transparent h-auto p-0">
            <TabsTrigger 
              value="sections" 
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Sections
            </TabsTrigger>
            <TabsTrigger 
              value="elements"
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Elements
            </TabsTrigger>
            <TabsTrigger 
              value="forms"
              className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Forms
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sections" className="p-3 space-y-2 mt-0">
            {sections.map((item) => (
              <DraggableItem key={item.id} item={item} />
            ))}
          </TabsContent>

          <TabsContent value="elements" className="p-3 space-y-2 mt-0">
            {elements.map((item) => (
              <DraggableItem key={item.id} item={item} />
            ))}
          </TabsContent>

          <TabsContent value="forms" className="p-3 space-y-2 mt-0">
            {forms.map((item) => (
              <DraggableItem key={item.id} item={item} />
            ))}
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
};

export default SectionPalette;
