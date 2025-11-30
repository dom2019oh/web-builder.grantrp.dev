import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon, Sparkles } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Projects" },
    { path: "/credits", label: "Pricing" },
    { path: "/template-market", label: "Templates" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="glass-liquid rounded-2xl border-glass-border-bright shadow-glow transition-liquid">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center space-x-3 hover-scale group">
            <div className="relative h-10 w-10 rounded-xl glass-chrome p-2 shadow-glow group-hover:shadow-premium-lg transition-liquid">
              <Sparkles className="h-full w-full text-primary animate-pulse-glow" />
            </div>
            <span className="text-xl font-display font-bold bg-gradient-liquid bg-clip-text text-transparent">
              Grant Development
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-liquid relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-liquid group-hover:w-full transition-liquid" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover-glow"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {!user ? (
              <>
                <Link to="/login" className="hidden sm:block">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="liquid" className="hover-lift">Get Started</Button>
                </Link>
              </>
            ) : (
              <Link to="/dashboard">
                <Button variant="liquid" className="hover-lift">Dashboard</Button>
              </Link>
            )}

            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] glass-liquid border-glass-border-bright">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="text-lg font-medium text-muted-foreground hover:text-primary transition-liquid px-4 py-2 rounded-xl hover:bg-primary/10"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;