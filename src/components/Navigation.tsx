import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon } from "lucide-react";
import logo from "@/assets/logo-color.png";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-premium border-b border-border/50 transition-smooth">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover-lift group">
            <img src={logo} alt="Grant Development Logo" className="h-10 w-10 transition-transform group-hover:scale-110" />
            <span className="text-xl font-display font-semibold bg-gradient-primary bg-clip-text text-transparent">
              Grant Development™
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth">
              Home
            </Link>
            <Link to="/dashboard" className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth">
              Projects
            </Link>
            <Link to="/credits" className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth">
              Pricing
            </Link>
            <Link to="/template-market" className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth">
              Templates
            </Link>
            <Link to="/contact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-smooth">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground/80 hover:text-primary hover-lift"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {!user && (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-sm font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-primary shadow-glow hover-lift hover-glow text-sm font-medium">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-strong border-border/50">
              <div className="flex flex-col gap-6 mt-8">
                <Link to="/" onClick={() => setOpen(false)} className="text-foreground/80 hover:text-primary transition-smooth text-lg font-medium">
                  Home
                </Link>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="text-foreground/80 hover:text-primary transition-smooth text-lg font-medium">
                  Projects
                </Link>
                <Link to="/credits" onClick={() => setOpen(false)} className="text-foreground/80 hover:text-primary transition-smooth text-lg font-medium">
                  Pricing
                </Link>
                <Link to="/template-market" onClick={() => setOpen(false)} className="text-foreground/80 hover:text-primary transition-smooth text-lg font-medium">
                  Templates
                </Link>
                <Link to="/contact" onClick={() => setOpen(false)} className="text-foreground/80 hover:text-primary transition-smooth text-lg font-medium">
                  Contact
                </Link>
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className="text-foreground hover:text-primary justify-start"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-5 w-5 mr-2" /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5 mr-2" /> Dark Mode
                    </>
                  )}
                </Button>
                {!user && (
                  <div className="flex flex-col gap-3 mt-4">
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <Button variant="ghost" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-gradient-primary shadow-glow">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
