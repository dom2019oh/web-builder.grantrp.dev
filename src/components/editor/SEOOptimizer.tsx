import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, CheckCircle, AlertCircle, Info } from "lucide-react";
import { toast } from "sonner";

interface SEOOptimizerProps {
  onSave: (seoData: any) => void;
}

export const SEOOptimizer = ({ onSave }: SEOOptimizerProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [ogImage, setOgImage] = useState("");

  const calculateScore = () => {
    let score = 0;
    if (title.length >= 30 && title.length <= 60) score += 25;
    if (description.length >= 120 && description.length <= 160) score += 25;
    if (keywords.split(",").length >= 3) score += 25;
    if (ogImage) score += 25;
    return score;
  };

  const score = calculateScore();

  const checks = [
    {
      label: "Title Length",
      status: title.length >= 30 && title.length <= 60 ? "pass" : title.length > 0 ? "warn" : "fail",
      message: `${title.length}/60 characters (ideal: 30-60)`,
    },
    {
      label: "Description Length",
      status: description.length >= 120 && description.length <= 160 ? "pass" : description.length > 0 ? "warn" : "fail",
      message: `${description.length}/160 characters (ideal: 120-160)`,
    },
    {
      label: "Keywords",
      status: keywords.split(",").filter(k => k.trim()).length >= 3 ? "pass" : keywords.length > 0 ? "warn" : "fail",
      message: `${keywords.split(",").filter(k => k.trim()).length} keywords (minimum: 3)`,
    },
    {
      label: "Social Media Image",
      status: ogImage ? "pass" : "fail",
      message: ogImage ? "Image set" : "Add an Open Graph image",
    },
  ];

  const handleSave = () => {
    onSave({
      title,
      description,
      keywords: keywords.split(",").map(k => k.trim()),
      ogImage,
    });
    toast.success("SEO settings saved!");
  };

  return (
    <Card className="glass glass-glow p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">SEO Optimizer</h3>
        </div>
        <Badge variant={score >= 75 ? "default" : score >= 50 ? "secondary" : "destructive"}>
          Score: {score}/100
        </Badge>
      </div>

      <div>
        <Progress value={score} className="h-2" />
      </div>

      <div className="space-y-4">
        {checks.map((check) => (
          <div key={check.label} className="flex items-start gap-3 glass p-3 rounded-lg">
            {check.status === "pass" && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
            {check.status === "warn" && <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />}
            {check.status === "fail" && <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{check.label}</p>
              <p className="text-xs text-muted-foreground">{check.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <Label>Page Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your Awesome Website | Brand Name"
            className="glass"
            maxLength={60}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {title.length}/60 characters
          </p>
        </div>

        <div>
          <Label>Meta Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A brief description of your page that appears in search results..."
            className="glass"
            maxLength={160}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {description.length}/160 characters
          </p>
        </div>

        <div>
          <Label>Keywords (comma-separated)</Label>
          <Input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="web design, website builder, no code"
            className="glass"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {keywords.split(",").filter(k => k.trim()).length} keywords
          </p>
        </div>

        <div>
          <Label>Open Graph Image URL</Label>
          <Input
            value={ogImage}
            onChange={(e) => setOgImage(e.target.value)}
            placeholder="https://example.com/og-image.jpg"
            className="glass"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Recommended: 1200×630px
          </p>
        </div>

        <Button onClick={handleSave} className="w-full glass glass-glow">
          Save SEO Settings
        </Button>
      </div>
    </Card>
  );
};
