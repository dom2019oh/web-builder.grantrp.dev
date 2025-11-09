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
      {/* Aurora background layer */}
      <div className="absolute inset-0 bg-gradient-aurora-teal opacity-15 aurora-animate" style={{ backgroundSize: '200% 200%' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-xl text-foreground/70">
            Powerful features to bring your vision to life
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="glass glass-glow hover:shadow-glow-magenta transition-all duration-300 group border-0"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-button flex items-center justify-center mb-4 shadow-glow group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-foreground">{feature.title}</CardTitle>
                <CardDescription className="text-foreground/70">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;