import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface AIContentGeneratorProps {
  onGenerate: (content: string, type: string) => void;
  onCostCheck: (cost: number, action: string, callback: () => void) => void;
}

export const AIContentGenerator = ({ onGenerate, onCostCheck }: AIContentGeneratorProps) => {
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState("paragraph");
  const [isGenerating, setIsGenerating] = useState(false);

  const contentTypes = [
    { value: "paragraph", label: "Paragraph", cost: 3 },
    { value: "heading", label: "Heading", cost: 2 },
    { value: "list", label: "Bullet List", cost: 3 },
    { value: "cta", label: "Call to Action", cost: 2 },
    { value: "description", label: "Product Description", cost: 4 },
    { value: "blog", label: "Blog Post", cost: 8 },
  ];

  const selectedType = contentTypes.find(t => t.value === contentType);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    onCostCheck(selectedType?.cost || 3, "AI Text Generation", async () => {
      setIsGenerating(true);
      try {
        const { data, error } = await supabase.functions.invoke("generate-content", {
          body: { prompt, type: contentType },
        });

        if (error) throw error;

        if (data?.content) {
          onGenerate(data.content, contentType);
          toast.success("Content generated successfully!");
          setPrompt("");
        }
      } catch (error) {
        console.error("AI generation error:", error);
        toast.error("Failed to generate content");
      } finally {
        setIsGenerating(false);
      }
    });
  };

  return (
    <Card className="glass glass-glow p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">AI Content Generator</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Content Type</Label>
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger className="glass">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass glass-glow">
              {contentTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label} ({type.cost} credits)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Prompt</Label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to generate..."
            className="glass min-h-24"
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full glass glass-glow"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate ({selectedType?.cost} credits)
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};
