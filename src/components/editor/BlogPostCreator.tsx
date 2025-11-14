import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Save, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface BlogPostCreatorProps {
  onSave: (post: any) => void;
  onCostCheck: (cost: number, action: string, callback: () => void) => void;
}

export const BlogPostCreator = ({ onSave, onCostCheck }: BlogPostCreatorProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [aiTopic, setAiTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = [
    { value: "general", label: "General" },
    { value: "technology", label: "Technology" },
    { value: "business", label: "Business" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "health", label: "Health & Wellness" },
    { value: "travel", label: "Travel" },
  ];

  const handleAIGenerate = async () => {
    if (!aiTopic.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    onCostCheck(8, "AI Blog Post Generation", async () => {
      setIsGenerating(true);
      try {
        const { data, error } = await supabase.functions.invoke("generate-content", {
          body: {
            prompt: `Write a comprehensive blog post about: ${aiTopic}. Include an engaging introduction, 3-4 main points with explanations, and a conclusion.`,
            type: "blog",
          },
        });

        if (error) throw error;

        if (data?.content) {
          const generatedTitle = aiTopic
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          setTitle(generatedTitle);
          setContent(data.content);
          toast.success("Blog post generated!");
          setAiTopic("");
        }
      } catch (error) {
        console.error("Generation error:", error);
        toast.error("Failed to generate blog post");
      } finally {
        setIsGenerating(false);
      }
    });
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in title and content");
      return;
    }

    onSave({
      title,
      content,
      category,
      date: new Date().toISOString(),
      slug: title.toLowerCase().replace(/\s+/g, "-"),
    });

    toast.success("Blog post saved!");
    setTitle("");
    setContent("");
    setCategory("general");
  };

  return (
    <Card className="glass glass-glow p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Blog Post Creator</h3>
        </div>
        <Button onClick={handleSave} size="sm" className="glass glass-glow">
          <Save className="w-4 h-4 mr-2" />
          Save Post
        </Button>
      </div>

      <Card className="glass p-4 space-y-3">
        <Label>AI Generate Blog Post</Label>
        <div className="flex gap-2">
          <Input
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
            placeholder="Enter blog topic..."
            className="glass"
            disabled={isGenerating}
          />
          <Button
            onClick={handleAIGenerate}
            disabled={isGenerating || !aiTopic.trim()}
            className="glass glass-glow"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate (8 credits)
              </>
            )}
          </Button>
        </div>
      </Card>

      <div>
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog post title..."
          className="glass"
        />
      </div>

      <div>
        <Label>Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="glass">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="glass glass-glow">
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Content</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog post content here..."
          className="glass min-h-64"
        />
      </div>
    </Card>
  );
};
