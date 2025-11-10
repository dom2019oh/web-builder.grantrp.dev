import { LucideIcon, Type, Image, Layout, Columns, Video, Mail } from "lucide-react";

export interface ComponentTemplate {
  id: string;
  name: string;
  type: string;
  icon: LucideIcon;
  props: any;
  preview: string;
}

export const componentTemplates: ComponentTemplate[] = [
  {
    id: "hero",
    name: "Hero Section",
    type: "hero",
    icon: Layout,
    preview: "Full-width hero with headline and CTA",
    props: {
      content: "Expert Design Solutions for Modern Challenges",
      subtitle: "Transform your vision into reality with our cutting-edge design services",
      ctaText: "Get Started",
      backgroundStyle: "gradient"
    }
  },
  {
    id: "text-block",
    name: "Text Block",
    type: "text",
    icon: Type,
    preview: "Simple text content block",
    props: {
      content: "Add your text content here. This is a flexible text block that can contain paragraphs, lists, and formatted text."
    }
  },
  {
    id: "heading",
    name: "Heading",
    type: "heading",
    icon: Type,
    preview: "Large heading text",
    props: {
      content: "Your Heading Here",
      level: "h2"
    }
  },
  {
    id: "image",
    name: "Image",
    type: "image",
    icon: Image,
    preview: "Single image with caption",
    props: {
      content: "Image placeholder",
      imageUrl: "",
      caption: "Image caption"
    }
  },
  {
    id: "image-gallery",
    name: "Image Gallery",
    type: "gallery",
    icon: Columns,
    preview: "Grid of images",
    props: {
      content: "Image Gallery",
      images: [
        { url: "", caption: "Image 1" },
        { url: "", caption: "Image 2" },
        { url: "", caption: "Image 3" }
      ],
      columns: 3
    }
  },
  {
    id: "two-column",
    name: "Two Columns",
    type: "columns",
    icon: Columns,
    preview: "Two column layout",
    props: {
      content: "Two Column Section",
      leftContent: "Left column content goes here",
      rightContent: "Right column content goes here"
    }
  },
  {
    id: "video",
    name: "Video",
    type: "video",
    icon: Video,
    preview: "Video embed",
    props: {
      content: "Video Section",
      videoUrl: "",
      caption: "Video description"
    }
  },
  {
    id: "contact-form",
    name: "Contact Form",
    type: "form",
    icon: Mail,
    preview: "Simple contact form",
    props: {
      content: "Contact Us",
      fields: ["name", "email", "message"]
    }
  }
];
