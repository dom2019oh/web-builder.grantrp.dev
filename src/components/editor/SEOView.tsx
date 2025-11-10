import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const SEOView = () => {
  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">SEO Settings</h3>
        <p className="text-xs text-muted-foreground">
          Optimize your site for search engines and social media.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-xs">Site Title</Label>
          <Input placeholder="Your Site Title" className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">Max 60 characters</p>
        </div>

        <div>
          <Label className="text-xs">Meta Description</Label>
          <Textarea 
            placeholder="Brief description of your site" 
            rows={3} 
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground mt-1">Max 160 characters</p>
        </div>

        <div>
          <Label className="text-xs">Keywords</Label>
          <Input placeholder="keyword1, keyword2, keyword3" className="mt-2" />
        </div>

        <div>
          <Label className="text-xs">Favicon</Label>
          <div className="mt-2 p-4 border-2 border-dashed rounded-md text-center cursor-pointer hover:bg-muted/50">
            <p className="text-sm text-muted-foreground">Upload favicon</p>
          </div>
        </div>

        <div>
          <Label className="text-xs">Social Share Image</Label>
          <div className="mt-2 p-4 border-2 border-dashed rounded-md text-center cursor-pointer hover:bg-muted/50">
            <p className="text-sm text-muted-foreground">Upload image (1200x630)</p>
          </div>
        </div>
      </div>

      <Button className="w-full" size="sm">Save SEO Settings</Button>
    </div>
  );
};
