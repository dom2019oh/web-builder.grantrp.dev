import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Image, FileText, Film, Trash2, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Asset {
  id: string;
  name: string;
  url: string;
  type: "image" | "document" | "video";
  size: number;
  created_at: string;
}

export const AssetsManager = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedAssets: Asset[] = [];

    for (const file of Array.from(files)) {
      try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `project-assets/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from("project-assets")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("project-assets")
          .getPublicUrl(filePath);

        const assetType = file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("video/")
          ? "video"
          : "document";

        uploadedAssets.push({
          id: fileName,
          name: file.name,
          url: publicUrl,
          type: assetType,
          size: file.size,
          created_at: new Date().toISOString(),
        });

        toast.success(`${file.name} uploaded successfully`);
      } catch (error: any) {
        toast.error(`Failed to upload ${file.name}: ${error.message}`);
      }
    }

    setAssets([...uploadedAssets, ...assets]);
    setUploading(false);
  };

  const handleDelete = async (asset: Asset) => {
    try {
      const { error } = await supabase.storage
        .from("project-assets")
        .remove([`project-assets/${asset.id}`]);

      if (error) throw error;

      setAssets(assets.filter((a) => a.id !== asset.id));
      toast.success("Asset deleted");
    } catch (error: any) {
      toast.error(`Failed to delete: ${error.message}`);
    }
  };

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const imageAssets = filteredAssets.filter((a) => a.type === "image");
  const documentAssets = filteredAssets.filter((a) => a.type === "document");
  const videoAssets = filteredAssets.filter((a) => a.type === "video");

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Assets</h3>
        <label htmlFor="file-upload">
          <Button size="sm" variant="outline" className="h-8 gap-2" disabled={uploading} asChild>
            <span>
              <Upload className="h-3 w-3" />
              {uploading ? "Uploading..." : "Upload"}
            </span>
          </Button>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      <Input
        placeholder="Search assets..."
        className="h-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="space-y-3">
        {imageAssets.length > 0 && (
          <div>
            <div className="text-xs text-muted-foreground mb-2 uppercase font-semibold">
              Images ({imageAssets.length})
            </div>
            <div className="grid grid-cols-2 gap-2">
              <AnimatePresence>
                {imageAssets.map((asset) => (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="group relative aspect-square bg-muted rounded-lg overflow-hidden border"
                  >
                    <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => window.open(asset.url, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-destructive"
                        onClick={() => handleDelete(asset)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {documentAssets.length > 0 && (
          <div>
            <div className="text-xs text-muted-foreground mb-2 uppercase font-semibold">
              Documents ({documentAssets.length})
            </div>
            <div className="space-y-1">
              <AnimatePresence>
                {documentAssets.map((asset) => (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-2 p-2 rounded-md bg-muted/50 hover:bg-muted group"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="text-sm flex-1 truncate">{asset.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                      onClick={() => handleDelete(asset)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {videoAssets.length > 0 && (
          <div>
            <div className="text-xs text-muted-foreground mb-2 uppercase font-semibold">
              Videos ({videoAssets.length})
            </div>
            <div className="space-y-1">
              <AnimatePresence>
                {videoAssets.map((asset) => (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-2 p-2 rounded-md bg-muted/50 hover:bg-muted group"
                  >
                    <Film className="h-4 w-4" />
                    <span className="text-sm flex-1 truncate">{asset.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                      onClick={() => handleDelete(asset)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {filteredAssets.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Upload className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No assets yet. Upload files to get started.</p>
          </div>
        )}
      </div>

      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          Upload and manage images, videos, and documents for your site.
        </p>
      </div>
    </div>
  );
};
