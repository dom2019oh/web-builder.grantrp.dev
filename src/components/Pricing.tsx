import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "€3.99",
    description: "Perfect for personal projects",
    features: [
      "1 website",
      "Subdomain only",
      "AI-assisted builder",
      "SSL certificate",
      "Basic analytics",
    ],
  },
  {
    name: "Pro",
    price: "€7.99",
    description: "For professionals and small businesses",
    features: [
      "3 websites",
      "Custom domain support",
      "AI-assisted builder",
      "SSL certificate",
      "Advanced analytics",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Business",
    price: "€14.99",
    description: "For agencies and growing businesses",
    features: [
      "10 websites",
      "Custom domain support",
      "White-label option",
      "SSL certificate",
      "Advanced analytics",
      "Priority support",
      "Team collaboration",
    ],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Aurora background - ENHANCED */}
      <div className="absolute inset-0 bg-gradient-aurora-teal opacity-25 aurora-animate" style={{ backgroundSize: '200% 200%' }} />
      <div className="absolute inset-0 bg-gradient-aurora-magenta opacity-15 aurora-animate" style={{ backgroundSize: '200% 200%', animationDirection: 'reverse', animationDuration: '30s' }} />
      
      {/* Floating particles */}
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-aurora-violet/15 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-aurora-cyan/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-button bg-clip-text text-transparent" style={{ backgroundSize: '200% 200%' }}>Simple, Transparent Pricing</h2>
          <p className="text-xl text-foreground/80">
            Choose the plan that fits your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`glass glass-glow hover:shadow-glow-magenta transition-all duration-500 relative border backdrop-blur-xl animate-fade-in hover:-translate-y-2 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-aurora-cyan shadow-glow border-aurora-cyan/30' : 'border-aurora-magenta/10'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-gradient-button rounded-full text-sm font-semibold shadow-glow-magenta animate-pulse border border-aurora-cyan/30">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                <CardDescription className="text-foreground/70">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold bg-gradient-button bg-clip-text text-transparent drop-shadow-glow">{plan.price}</span>
                  <span className="text-foreground/70">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-aurora-cyan flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                  <Link to="/signup" className="w-full">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-gradient-button border-0 shadow-glow-magenta hover:shadow-glow text-white hover:scale-110' 
                          : 'glass hover:bg-gradient-button hover:border-0 hover:shadow-glow border-aurora-cyan/20 hover:scale-105'
                      } transition-all duration-300`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;