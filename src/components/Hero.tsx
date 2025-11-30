import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern-subtle opacity-40" />
      
      {/* Ambient glows */}
      <motion.div 
        className="absolute top-20 left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Premium badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/50 mb-8 hover-lift hover-glow"
          >
            <Sparkles className="h-4 w-4 text-primary animate-pulse-glow" />
            <span className="text-sm font-medium bg-gradient-primary bg-clip-text text-transparent">
              Grant Development™ AI Website Builder
            </span>
          </motion.div>
          
          {/* Hero title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight"
          >
            <span className="block mb-2">Build Stunning</span>
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Websites in Minutes
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Create, customize, and deploy professional websites with our AI-powered builder. 
            No coding required. Premium templates included.
          </motion.p>
          
          {/* Premium CTA buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover-lift hover-glow shadow-premium text-lg px-10 py-6 h-auto font-medium"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="#templates">
              <Button 
                size="lg" 
                variant="outline" 
                className="glass border-border/50 hover-lift hover:border-primary/50 text-lg px-10 py-6 h-auto font-medium transition-smooth"
              >
                View Templates
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
