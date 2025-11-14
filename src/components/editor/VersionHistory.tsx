import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, RotateCcw, Save, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Version {
  id: string;
  timestamp: Date;
  description: string;
  author: string;
  components: any[];
}

interface VersionHistoryProps {
  onRestore: (version: Version) => void;
  onSaveVersion: (description: string) => void;
}

export const VersionHistory = ({ onRestore, onSaveVersion }: VersionHistoryProps) => {
  const [versions, setVersions] = useState<Version[]>([
    {
      id: "1",
      timestamp: new Date(Date.now() - 3600000),
      description: "Initial design",
      author: "You",
      components: [],
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 1800000),
      description: "Added hero section",
      author: "You",
      components: [],
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 600000),
      description: "Updated color scheme",
      author: "You",
      components: [],
    },
  ]);

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveDescription, setSaveDescription] = useState("");

  const handleSaveVersion = () => {
    if (!saveDescription.trim()) {
      toast.error("Please enter a description");
      return;
    }

    const newVersion: Version = {
      id: Date.now().toString(),
      timestamp: new Date(),
      description: saveDescription,
      author: "You",
      components: [],
    };

    setVersions([newVersion, ...versions]);
    onSaveVersion(saveDescription);
    setSaveDescription("");
    setShowSaveDialog(false);
    toast.success("Version saved!");
  };

  const handleRestore = (version: Version) => {
    onRestore(version);
    toast.success(`Restored version: ${version.description}`);
  };

  return (
    <Card className="glass glass-glow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Version History</h3>
        </div>
        <Button
          size="sm"
          onClick={() => setShowSaveDialog(!showSaveDialog)}
          className="glass glass-glow"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Version
        </Button>
      </div>

      {showSaveDialog && (
        <Card className="glass p-4 mb-4 space-y-3">
          <input
            type="text"
            value={saveDescription}
            onChange={(e) => setSaveDescription(e.target.value)}
            placeholder="Describe this version..."
            className="w-full px-3 py-2 glass rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowSaveDialog(false)}
              className="glass flex-1"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSaveVersion}
              className="glass glass-glow flex-1"
            >
              Save
            </Button>
          </div>
        </Card>
      )}

      <ScrollArea className="h-96">
        <div className="space-y-3">
          {versions.map((version, index) => (
            <Card
              key={version.id}
              className="glass p-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm">{version.description}</p>
                    {index === 0 && <Badge variant="secondary" className="text-xs">Current</Badge>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(version.timestamp, { addSuffix: true })}
                    </span>
                    <span>by {version.author}</span>
                  </div>
                </div>
                {index !== 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRestore(version)}
                    className="glass ml-2"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Restore
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
