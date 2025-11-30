import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Loader2, Image, Type, Layout, Wand2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCredits, CREDIT_COSTS } from "@/hooks/useCredits";
import { motion } from "framer-motion";

interface AIGenerationPanelProps {
  onGenerate: (type: string, content: any) => void;
}

export const AIGenerationPanel = ({ onGenerate }: AIGenerationPanelProps) => {
  const [prompt, setPrompt] = useState("");
  const [generationType, setGenerationType] = useState<"content" | "image" | "section" | "layout">("content");
  const [contentType, setContentType] = useState("heading");
  const [isGenerating, setIsGenerating] = useState(false);
  const { deductCredits, hasEnoughCredits, credits } = useCredits();

  const getCreditCost = () => {
    switch (generationType) {
      case "content":
        return CREDIT_COSTS.AI_TEXT_GENERATION;
      case "image":
        return CREDIT_COSTS.AI_IMAGE_GENERATION;
      case "section":
        return CREDIT_COSTS.AI_LAYOUT_GENERATION;
      case "layout":
        return CREDIT_COSTS.AI_LAYOUT_GENERATION;
      default:
        return 0;
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    const cost = getCreditCost();
    if (!hasEnoughCredits(cost)) {
      toast.error(`Insufficient credits. Need ${cost} credits.`);
      return;
    }

    setIsGenerating(true);

    try {
      if (generationType === "content") {
        const { data, error } = await supabase.functions.invoke("generate-content", {
          body: { prompt, type: contentType },
        });

        if (error) throw error;

        await deductCredits("AI Text Generation", cost, { type: contentType, prompt });
        
        onGenerate("content", {
          type: contentType,
          content: data.content,
        });

        toast.success("Content generated!");
      } else if (generationType === "image") {
        const { data, error } = await supabase.functions.invoke("generate-image", {
          body: { prompt },
        });

        if (error) throw error;

        await deductCredits("AI Image Generation", cost, { prompt });
        
        onGenerate("image", {
          imageUrl: data.imageUrl,
        });

        toast.success("Image generated!");
      } else if (generationType === "section") {
        const { data, error } = await supabase.functions.invoke("generate-content", {
          body: { 
            prompt: `Generate a complete website section with heading, content, and call-to-action for: ${prompt}`,
            type: "blog"
          },
        });

        if (error) throw error;

        await deductCredits("AI Section Generation", cost, { prompt });
        
        onGenerate("section", {
          content: data.content,
        });

        toast.success("Section generated!");
      } else if (generationType === "layout") {
        const { data, error } = await supabase.functions.invoke("generate-content", {
          body: { 
            prompt: `Generate a complete page layout structure for: ${prompt}. Include hero, features, and call-to-action sections.`,
            type: "blog"
          },
        });

        if (error) throw error;

        await deductCredits("AI Layout Generation", cost, { prompt });
        
        onGenerate("layout", {
          content: data.content,
        });

        toast.success("Layout generated!");
      }

      setPrompt("");
    } catch (error: any) {
      console.error("Generation error:", error);
      if (error.message?.includes("429")) {
        toast.error("Rate limit reached. Please try again later.");
      } else if (error.message?.includes("402")) {
        toast.error("AI service requires payment. Please contact support.");
      } else {
        toast.error("Failed to generate. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col bg-glass border-glass shadow-glass backdrop-blur-glass">
        <div className="p-6 border-b border-glass">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">AI Generation</h3>
              <p className="text-sm text-muted-foreground">Create with AI • {credits} credits</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Generation Type</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={generationType === "content" ? "default" : "outline"}
                className="h-auto py-3 flex flex-col items-center gap-2 transition-smooth hover-lift"
                onClick={() => setGenerationType("content")}
              >
                <Type className="w-5 h-5" />
                <span className="text-xs">Text Content</span>
                <span className="text-xs text-muted-foreground">{CREDIT_COSTS.AI_TEXT_GENERATION} credits</span>
              </Button>

              <Button
                variant={generationType === "image" ? "default" : "outline"}
                className="h-auto py-3 flex flex-col items-center gap-2 transition-smooth hover-lift"
                onClick={() => setGenerationType("image")}
              >
                <Image className="w-5 h-5" />
                <span className="text-xs">AI Image</span>
                <span className="text-xs text-muted-foreground">{CREDIT_COSTS.AI_IMAGE_GENERATION} credits</span>
              </Button>

              <Button
                variant={generationType === "section" ? "default" : "outline"}
                className="h-auto py-3 flex flex-col items-center gap-2 transition-smooth hover-lift"
                onClick={() => setGenerationType("section")}
              >
                <Layout className="w-5 h-5" />
                <span className="text-xs">Section</span>
                <span className="text-xs text-muted-foreground">{CREDIT_COSTS.AI_LAYOUT_GENERATION} credits</span>
              </Button>

              <Button
                variant={generationType === "layout" ? "default" : "outline"}
                className="h-auto py-3 flex flex-col items-center gap-2 transition-smooth hover-lift"
                onClick={() => setGenerationType("layout")}
              >
                <Wand2 className="w-5 h-5" />
                <span className="text-xs">Full Layout</span>
                <span className="text-xs text-muted-foreground">{CREDIT_COSTS.AI_LAYOUT_GENERATION} credits</span>
              </Button>
            </div>
          </div>

          {generationType === "content" && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Content Type</Label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger className="bg-background/50 border-glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="heading">Heading</SelectItem>
                  <SelectItem value="paragraph">Paragraph</SelectItem>
                  <SelectItem value="list">Bullet List</SelectItem>
                  <SelectItem value="cta">Call-to-Action</SelectItem>
                  <SelectItem value="description">Description</SelectItem>
                  <SelectItem value="blog">Blog Section</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Prompt</Label>
            <Textarea
              placeholder={
                generationType === "content"
                  ? "Describe the content you want to generate..."
                  : generationType === "image"
                  ? "Describe the image you want to create..."
                  : generationType === "section"
                  ? "Describe the section (e.g., pricing table, testimonials)..."
                  : "Describe the page layout you want..."
              }
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              className="resize-none bg-background/50 border-glass"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-gradient-primary hover:opacity-90 transition-smooth hover-lift"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate ({getCreditCost()} credits)
              </>
            )}
          </Button>

          {!hasEnoughCredits(getCreditCost()) && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">
                Insufficient credits. You need {getCreditCost()} credits but only have {credits}.
              </p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
