import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora Background with animated gradients - ENHANCED */}
      <div className="absolute inset-0 bg-gradient-aurora-magenta aurora-animate opacity-40" 
           style={{ backgroundSize: '200% 200%' }} />
      <div className="absolute inset-0 bg-gradient-aurora-teal aurora-animate opacity-30" 
           style={{ backgroundSize: '200% 200%', animationDirection: 'reverse', animationDuration: '25s' }} />
      
      {/* Grid overlay with aurora reflection */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(55,231,247,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(211,77,254,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Floating orbs - ENHANCED */}
      <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-aurora-cyan/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-aurora-magenta/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aurora-violet/15 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Glass morphism tag - ENHANCED */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass glass-glow mb-8 hover:shadow-glow-magenta hover:scale-105 transition-all duration-300 border border-aurora-cyan/20">
            <Sparkles className="h-4 w-4 text-aurora-cyan animate-pulse" />
            <span className="text-sm font-medium bg-gradient-button bg-clip-text text-transparent">Grant Development™ - AI Website Builder</span>
          </div>
          
          {/* Hero title with gradient text - ENHANCED */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="block mb-2 drop-shadow-[0_0_30px_rgba(55,231,247,0.3)]">Build Stunning Websites</span>
            <span className="bg-gradient-button bg-clip-text text-transparent aurora-animate drop-shadow-[0_0_40px_rgba(211,77,254,0.4)]" style={{ backgroundSize: '200% 200%' }}>
              In Minutes
            </span>
          </h1>
          
          <p className="text-xl text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Create, customize, and deploy professional websites with our AI-assisted builder. 
            No coding required. Start from €3.99/month.
          </p>
          
          {/* Glass morphism buttons - ENHANCED */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-gradient-button hover:shadow-glow-magenta hover:scale-110 transition-all duration-300 text-lg px-10 py-6 border-0 shadow-glow text-white font-semibold relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-aurora-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
            <a href="#templates">
              <Button 
                size="lg" 
                variant="outline" 
                className="glass glass-glow hover:shadow-glow-magenta hover:scale-110 transition-all duration-300 text-lg px-10 py-6 border-aurora-cyan/30 backdrop-blur-xl group"
              >
                <span className="bg-gradient-button bg-clip-text text-transparent group-hover:scale-105 transition-transform">View Templates</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;