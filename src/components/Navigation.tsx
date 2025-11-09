import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-color.png";

const Navigation = () => {
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
            <a href="#templates" className="text-foreground hover:text-primary transition-colors">
              Catalog
            </a>
            <Link to="/login" className="text-foreground hover:text-primary transition-colors">
              Portal
            </Link>
          </div>

          <div className="flex items-center gap-4">
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
