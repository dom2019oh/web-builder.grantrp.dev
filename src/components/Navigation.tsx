import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import logo from "@/assets/logo-color.png";
import { useState } from "react";

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass glass-glow border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="Grant Development Logo" className="h-10 w-10" />
            <span className="text-xl font-bold bg-gradient-aurora-magenta bg-clip-text text-transparent">
              Grant Development™
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Projects
            </Link>
            <a href="/#templates" className="text-foreground hover:text-primary transition-colors">
              Catalog
            </a>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-foreground">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </Link>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass border-border">
              <div className="flex flex-col gap-6 mt-8">
                <Link to="/" onClick={() => setOpen(false)} className="text-foreground hover:text-primary transition-colors text-lg">
                  Home
                </Link>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="text-foreground hover:text-primary transition-colors text-lg">
                  Projects
                </Link>
                <a href="/#templates" onClick={() => setOpen(false)} className="text-foreground hover:text-primary transition-colors text-lg">
                  Catalog
                </a>
                <Link to="/contact" onClick={() => setOpen(false)} className="text-foreground hover:text-primary transition-colors text-lg">
                  Contact
                </Link>
                <div className="flex flex-col gap-3 mt-4">
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full text-foreground">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
