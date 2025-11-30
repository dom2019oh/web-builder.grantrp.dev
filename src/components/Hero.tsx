import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Liquid gradient background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern-subtle opacity-30" />
      
      {/* Liquid ambient glows */}
      <motion.div 
        className="absolute top-20 left-20 w-[600px] h-[600px] rounded-full blur-[120px] animate-liquid-morph"
        style={{
          background: 'radial-gradient(circle, rgba(182, 236, 255, 0.15) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-[600px] h-[600px] rounded-full blur-[120px] animate-liquid-morph"
        style={{
          background: 'radial-gradient(circle, rgba(194, 140, 255, 0.12) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.6, 0.4, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Liquid glass badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-liquid border-glass-border-bright mb-8 hover-lift hover-glow group"
          >
            <Sparkles className="h-4 w-4 text-primary animate-pulse-glow" />
            <span className="text-sm font-medium bg-gradient-liquid bg-clip-text text-transparent">
              Grant Development™ Liquid Glass AI Builder
            </span>
          </motion.div>
          
          {/* Holographic title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight"
          >
            <span className="block mb-3 bg-gradient-liquid bg-clip-text text-transparent animate-holographic">
              Build Stunning
            </span>
            <span className="block bg-gradient-chrome bg-clip-text text-transparent">
              Websites in Minutes
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Create, customize, and deploy professional websites with our AI-powered liquid-glass builder. 
            No coding required. Premium templates included.
          </motion.p>
          
          {/* Liquid glass CTA buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/signup">
              <Button 
                size="lg" 
                variant="liquid"
                className="text-lg px-10 py-6 h-auto font-semibold shadow-glow hover-lift"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="#templates">
              <Button 
                size="lg" 
                variant="outline" 
                className="glass-liquid border-glass-border-bright hover-glow text-lg px-10 py-6 h-auto font-semibold transition-liquid"
              >
                View Templates
              </Button>
            </a>
          </motion.div>

          {/* Floating liquid orbs */}
          <div className="relative mt-20 h-64">
            <motion.div
              className="absolute left-1/4 top-0 w-32 h-32 glass-chrome rounded-full shadow-glow"
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute right-1/4 top-10 w-24 h-24 glass-liquid rounded-full shadow-glow-violet"
              animate={{
                y: [0, -40, 0],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;