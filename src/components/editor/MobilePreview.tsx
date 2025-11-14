import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Tablet, Monitor, QrCode, Share2, Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

interface MobilePreviewProps {
  projectUrl: string;
}

export const MobilePreview = ({ projectUrl }: MobilePreviewProps) => {
  const [deviceMode, setDeviceMode] = useState<"mobile" | "tablet" | "desktop">("mobile");
  const [showQR, setShowQR] = useState(false);

  const deviceDimensions = {
    mobile: { width: "375px", height: "667px" },
    tablet: { width: "768px", height: "1024px" },
    desktop: { width: "100%", height: "100%" },
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied to clipboard!");
  };

  const shareProject = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Preview My Project",
          text: "Check out my website!",
          url: projectUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      copyToClipboard(projectUrl);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="glass glass-glow p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Device Preview</h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={deviceMode === "mobile" ? "default" : "outline"}
              onClick={() => setDeviceMode("mobile")}
              className="glass"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={deviceMode === "tablet" ? "default" : "outline"}
              onClick={() => setDeviceMode("tablet")}
              className="glass"
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={deviceMode === "desktop" ? "default" : "outline"}
              onClick={() => setDeviceMode("desktop")}
              className="glass"
            >
              <Monitor className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <Dialog open={showQR} onOpenChange={setShowQR}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="glass flex-1">
                <QrCode className="w-4 h-4 mr-2" />
                QR Code
              </Button>
            </DialogTrigger>
            <DialogContent className="glass glass-glow">
              <DialogHeader>
                <DialogTitle>Scan to Preview on Device</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="bg-white p-4 rounded-lg">
                  <QRCodeSVG value={projectUrl} size={256} />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Scan this QR code with your phone camera to preview your site on a real device
                </p>
                <div className="flex gap-2 w-full">
                  <Button
                    onClick={() => copyToClipboard(projectUrl)}
                    variant="outline"
                    className="glass flex-1"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button onClick={shareProject} className="glass glass-glow flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            size="sm"
            onClick={() => copyToClipboard(projectUrl)}
            variant="outline"
            className="glass"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Link
          </Button>

          <Button size="sm" onClick={shareProject} className="glass glass-glow">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        <div className="glass rounded-lg overflow-hidden border border-border">
          <div
            className="mx-auto transition-all duration-300 bg-background"
            style={{
              width: deviceDimensions[deviceMode].width,
              height: deviceMode === "desktop" ? "600px" : deviceDimensions[deviceMode].height,
              maxWidth: "100%",
            }}
          >
            <iframe
              src={projectUrl}
              className="w-full h-full border-0"
              title="Project Preview"
            />
          </div>
        </div>

        <div className="mt-4 text-xs text-muted-foreground text-center">
          <p>Preview URL: {projectUrl}</p>
          <p className="mt-1">Test on real devices by scanning the QR code</p>
        </div>
      </Card>
    </div>
  );
};
