import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Image, FileText, Film } from "lucide-react";

export const AssetsView = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Assets</h3>
        <Button size="sm" variant="outline" className="h-8 gap-2">
          <Upload className="h-3 w-3" />
          Upload
        </Button>
      </div>

      <Input placeholder="Search assets..." className="h-8" />

      <div className="space-y-3">
        <div>
          <div className="text-xs text-muted-foreground mb-2 uppercase font-semibold">Images</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-square bg-muted rounded-md flex items-center justify-center border-2 border-dashed cursor-pointer hover:bg-muted/80">
              <Image className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="aspect-square bg-muted rounded-md flex items-center justify-center border-2 border-dashed cursor-pointer hover:bg-muted/80">
              <Image className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs text-muted-foreground mb-2 uppercase font-semibold">Documents</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50 cursor-pointer hover:bg-muted">
              <FileText className="h-4 w-4" />
              <span className="text-sm flex-1">document.pdf</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs text-muted-foreground mb-2 uppercase font-semibold">Videos</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50 cursor-pointer hover:bg-muted">
              <Film className="h-4 w-4" />
              <span className="text-sm flex-1">video.mp4</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          Upload and manage images, videos, and documents for your site.
        </p>
      </div>
    </div>
  );
};
