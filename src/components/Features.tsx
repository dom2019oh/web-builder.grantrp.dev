import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Zap, Globe, Lock } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Design",
    description: "Let AI generate beautiful layouts and content tailored to your needs",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Build and deploy your website in minutes, not days or weeks",
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description: "Use your own domain or get a free subdomain on grantrp.dev",
  },
  {
    icon: Lock,
    title: "Secure & Reliable",
    description: "SSL certificates, automated backups, and 99.9% uptime guarantee",
  },
];

const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Aurora background layer - ENHANCED */}
      <div className="absolute inset-0 bg-gradient-aurora-teal opacity-20 aurora-animate" style={{ backgroundSize: '200% 200%' }} />
      <div className="absolute inset-0 bg-gradient-aurora-magenta opacity-15 aurora-animate" style={{ backgroundSize: '200% 200%', animationDirection: 'reverse' }} />
      
      {/* Floating particles */}
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-aurora-cyan/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-aurora-magenta/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-button bg-clip-text text-transparent" style={{ backgroundSize: '200% 200%' }}>Everything You Need</h2>
          <p className="text-xl text-foreground/80">
            Powerful features to bring your vision to life
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="glass glass-glow hover:shadow-glow-magenta transition-all duration-500 group border border-aurora-cyan/10 hover:border-aurora-magenta/30 backdrop-blur-xl animate-fade-in hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-button flex items-center justify-center mb-4 shadow-glow group-hover:shadow-glow-magenta group-hover:scale-125 group-hover:rotate-6 transition-all duration-300">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-foreground group-hover:text-aurora-cyan transition-colors">{feature.title}</CardTitle>
                <CardDescription className="text-foreground/70 group-hover:text-foreground/90 transition-colors">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;