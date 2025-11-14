import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link as LinkIcon, Sparkles, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ImageManagerProps {
  onImageSelect: (url: string) => void;
  onCostCheck: (cost: number, action: string, callback: () => void) => void;
}

export const ImageManager = ({ onImageSelect, onCostCheck }: ImageManagerProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlSubmit = () => {
    if (!imageUrl.trim()) {
      toast.error("Please enter an image URL");
      return;
    }
    onImageSelect(imageUrl);
    toast.success("Image added!");
    setImageUrl("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setIsUploading(true);
    try {
      // Create a storage bucket if it doesn't exist
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("project-assets")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("project-assets")
        .getPublicUrl(fileName);

      onImageSelect(urlData.publicUrl);
      toast.success("Image uploaded!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    onCostCheck(5, "AI Image Generation", async () => {
      setIsGenerating(true);
      try {
        const { data, error } = await supabase.functions.invoke("generate-image", {
          body: { prompt: aiPrompt },
        });

        if (error) throw error;

        if (data?.imageUrl) {
          onImageSelect(data.imageUrl);
          toast.success("Image generated successfully!");
          setAiPrompt("");
        }
      } catch (error) {
        console.error("AI generation error:", error);
        toast.error("Failed to generate image");
      } finally {
        setIsGenerating(false);
      }
    });
  };

  return (
    <Card className="glass glass-glow p-6">
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Image Manager</h3>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3 glass">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="ai">AI Generate</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <div>
            <Label>Upload Image File</Label>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="glass"
              disabled={isUploading}
            />
          </div>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full glass glass-glow"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </>
            )}
          </Button>
        </TabsContent>

        <TabsContent value="url" className="space-y-4">
          <div>
            <Label>Image URL</Label>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="glass"
            />
          </div>
          <Button onClick={handleUrlSubmit} className="w-full glass glass-glow">
            <LinkIcon className="w-4 h-4 mr-2" />
            Add Image
          </Button>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <div>
            <Label>Image Description</Label>
            <Input
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="A beautiful sunset over mountains..."
              className="glass"
            />
          </div>
          <Button
            onClick={handleAIGenerate}
            disabled={isGenerating || !aiPrompt.trim()}
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
                Generate (5 credits)
              </>
            )}
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
