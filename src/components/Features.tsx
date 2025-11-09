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
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-xl text-muted-foreground">
            Powerful features to bring your vision to life
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-border bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;