import { Link } from "react-router-dom";
import logo from "@/assets/logo-white.png";

const Footer = () => {
  return (
    <footer className="relative glass glass-glow border-t border-border mt-20 overflow-hidden">
      {/* Aurora background effects */}
      <div className="absolute inset-0 bg-gradient-aurora-magenta-cyan opacity-5 aurora-animate pointer-events-none" style={{ backgroundSize: '200% 200%' }} />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Grant Development Logo" className="h-10 w-10" />
              <span className="text-xl font-bold bg-gradient-aurora-magenta bg-clip-text text-transparent">
                Grant Development™
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              AI-powered website builder connected to web-builder.grantrp.dev. 
              Create stunning websites with cutting-edge technology.
            </p>
          </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/#templates" className="text-muted-foreground hover:text-primary transition-colors">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link to="/#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-use" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/refunds-cancellations" className="text-muted-foreground hover:text-primary transition-colors">
                  Refunds & Cancellations
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/intellectual-property" className="text-muted-foreground hover:text-primary transition-colors">
                  Intellectual Property
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Grant Development™. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              Connected to web-builder.grantrp.dev
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
