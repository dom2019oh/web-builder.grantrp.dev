import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, FileText, Home as HomeIcon, Settings, Trash2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Page {
  id: string;
  name: string;
  path: string;
  isHome: boolean;
  created_at: string;
}

export const PagesManager = () => {
  const [pages, setPages] = useState<Page[]>([
    { id: "1", name: "Home", path: "/", isHome: true, created_at: new Date().toISOString() },
    { id: "2", name: "About", path: "/about", isHome: false, created_at: new Date().toISOString() },
    { id: "3", name: "Contact", path: "/contact", isHome: false, created_at: new Date().toISOString() },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newPageName, setNewPageName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddPage = () => {
    if (!newPageName.trim()) {
      toast.error("Please enter a page name");
      return;
    }

    const pagePath = `/${newPageName.toLowerCase().replace(/\s+/g, "-")}`;
    const newPage: Page = {
      id: Date.now().toString(),
      name: newPageName,
      path: pagePath,
      isHome: false,
      created_at: new Date().toISOString(),
    };

    setPages([...pages, newPage]);
    toast.success(`Page "${newPageName}" created`);
    setNewPageName("");
    setDialogOpen(false);
  };

  const handleDeletePage = (page: Page) => {
    if (page.isHome) {
      toast.error("Cannot delete home page");
      return;
    }

    setPages(pages.filter((p) => p.id !== page.id));
    toast.success(`Page "${page.name}" deleted`);
  };

  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Pages</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="h-8 gap-2">
              <Plus className="h-3 w-3" />
              Add Page
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Page</DialogTitle>
              <DialogDescription>
                Add a new page to your website. The URL will be generated automatically.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="page-name">Page Name</Label>
                <Input
                  id="page-name"
                  placeholder="e.g., Services"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddPage()}
                  className="mt-2"
                />
              </div>
              <Button onClick={handleAddPage} className="w-full">
                Create Page
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Input
        placeholder="Search pages..."
        className="h-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="space-y-1">
        <AnimatePresence>
          {filteredPages.map((page) => (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`flex items-center gap-2 p-2 rounded-md group cursor-pointer transition-colors ${
                page.isHome ? "bg-muted" : "hover:bg-muted"
              }`}
            >
              {page.isHome ? (
                <HomeIcon className="h-4 w-4" />
              ) : (
                <FileText className="h-4 w-4" />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">{page.name}</p>
                <p className="text-xs text-muted-foreground">{page.path}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => toast.info(`Opening ${page.name} settings...`)}
                >
                  <Settings className="h-3 w-3" />
                </Button>
                {!page.isHome && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-destructive"
                    onClick={() => handleDeletePage(page)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPages.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No pages found</p>
        </div>
      )}

      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          Manage your site pages, create new pages, and organize navigation structure.
        </p>
      </div>
    </div>
  );
};
