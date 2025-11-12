import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "€4.99",
    priceId: "price_1SSjKhLW3HLLN5bgVRRYAgbA",
    description: "Perfect for personal projects",
    features: [
      "1 published website",
      "Subdomain hosting (example.grantrp.dev)",
      "SSL certificate",
      "Basic analytics",
      "Full AI builder access",
      "Remove Grant Development™ watermark",
    ],
  },
  {
    name: "Pro",
    price: "€12.99",
    priceId: "price_1SSjKhLW3HLLN5bgifDnQeHL",
    description: "For professionals and growing businesses",
    features: [
      "3 published websites",
      "Custom domain support",
      "SSL certificate",
      "Advanced analytics",
      "Priority support",
      "Full AI builder access",
    ],
    popular: true,
  },
  {
    name: "Business",
    price: "€16.99",
    priceId: "price_1SSjKiLW3HLLN5bgMCQYLtEO",
    description: "For agencies and businesses",
    features: [
      "6 published websites",
      "Custom domain support",
      "White-label option",
      "Team collaboration",
      "SSL certificate",
      "Advanced analytics",
      "Priority support",
    ],
  },
];

const oneTimeOption = {
  name: "One-Time Publish",
  price: "€2.99",
  priceId: "price_1SSjKjLW3HLLN5bgkozGbW9V",
  description: "Publish once, keep forever",
  features: [
    "1 published website permanently",
    "SSL certificate",
    "Permanent hosting",
    "No recurring fees",
  ],
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 bg-gradient-aurora-teal opacity-20 aurora-animate" style={{ backgroundSize: '200% 200%' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-foreground/70">
            Choose the plan that fits your needs
          </p>
        </div>
        
        <div className="space-y-12">
          {/* Free Tier Info */}
          <div className="glass glass-glow p-8 rounded-[22px] max-w-3xl mx-auto text-center border-0">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-aurora-teal bg-clip-text text-transparent">
              Start Building for Free
            </h3>
            <p className="text-foreground/80 mb-6">
              Access the full editor, create 1 draft website with preview on your-project.grantrp.dev domain. 
              Limited to 3 AI generations per project. Upgrade anytime to publish your site.
            </p>
          </div>

          {/* Subscription Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`glass glass-glow hover:shadow-glow-magenta transition-all duration-300 relative border-0 ${
                plan.popular ? 'ring-2 ring-aurora-cyan shadow-glow' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-button rounded-full text-sm font-semibold shadow-glow">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                <CardDescription className="text-foreground/70">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold bg-gradient-aurora-teal bg-clip-text text-transparent">{plan.price}</span>
                  <span className="text-foreground/60">/month</span>
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
                        ? 'bg-gradient-button border-0 shadow-glow hover:shadow-glow-magenta' 
                        : 'glass hover:bg-gradient-button hover:border-0'
                    } transition-all hover:scale-105`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* One-Time Option */}
        <div className="max-w-md mx-auto mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center text-foreground">One-Time Payment Option</h3>
          <Card className="glass glass-glow border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">{oneTimeOption.name}</CardTitle>
              <CardDescription className="text-foreground/70">{oneTimeOption.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold bg-gradient-aurora-teal bg-clip-text text-transparent">
                  {oneTimeOption.price}
                </span>
                <span className="text-foreground/60"> one-time</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {oneTimeOption.features.map((feature, i) => (
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
                  className="w-full glass hover:bg-gradient-button hover:border-0 transition-all hover:scale-105"
                  variant="outline"
                >
                  Get Started
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;