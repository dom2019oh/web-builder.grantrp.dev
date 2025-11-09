import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora Background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-aurora-magenta aurora-animate opacity-90" 
           style={{ backgroundSize: '200% 200%' }} />
      
      {/* Grid overlay with aurora reflection */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-aurora-cyan/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-aurora-magenta/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Glass morphism tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glass-glow mb-8 hover:shadow-glow transition-all">
            <Sparkles className="h-4 w-4 text-aurora-cyan animate-pulse" />
            <span className="text-sm font-medium">Grant Development™ - AI Website Builder</span>
          </div>
          
          {/* Hero title with gradient text */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="block mb-2">Build Stunning Websites</span>
            <span className="bg-gradient-aurora-teal bg-clip-text text-transparent animate-pulse" style={{ backgroundSize: '200% 200%' }}>
              In Minutes
            </span>
          </h1>
          
          <p className="text-xl text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Create, customize, and deploy professional websites with our AI-assisted builder. 
            No coding required. Start from €3.99/month.
          </p>
          
          {/* Glass morphism buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-gradient-button hover:shadow-glow hover:scale-105 transition-all text-lg px-8 border-0 shadow-glow"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="#templates">
              <Button 
                size="lg" 
                variant="outline" 
                className="glass glass-glow hover:shadow-glow-magenta hover:scale-105 transition-all text-lg px-8"
              >
                View Templates
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;