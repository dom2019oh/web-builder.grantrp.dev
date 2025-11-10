import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, FileText, Home as HomeIcon, Settings } from "lucide-react";

export const PagesView = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Pages</h3>
        <Button size="sm" variant="outline" className="h-8 gap-2">
          <Plus className="h-3 w-3" />
          Add Page
        </Button>
      </div>

      <Input placeholder="Search pages..." className="h-8" />

      <div className="space-y-1">
        <div className="flex items-center gap-2 p-2 rounded-md bg-muted cursor-pointer hover:bg-muted/80">
          <HomeIcon className="h-4 w-4" />
          <span className="text-sm flex-1">Home</span>
          <Settings className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer">
          <FileText className="h-4 w-4" />
          <span className="text-sm flex-1">About</span>
          <Settings className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer">
          <FileText className="h-4 w-4" />
          <span className="text-sm flex-1">Contact</span>
          <Settings className="h-3 w-3 text-muted-foreground" />
        </div>
      </div>

      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          Manage your site pages, create new pages, and organize navigation structure.
        </p>
      </div>
    </div>
  );
};
