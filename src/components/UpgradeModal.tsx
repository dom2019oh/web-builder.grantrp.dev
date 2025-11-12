import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature?: string;
}

const plans = [
  {
    name: "Starter",
    price: "€4.99",
    priceId: "price_1SSjKhLW3HLLN5bgVRRYAgbA",
    description: "Perfect for personal projects",
    features: [
      "1 published website",
      "Subdomain hosting",
      "SSL certificate",
      "Basic analytics",
      "Full AI builder access",
      "Remove watermark",
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
    "1 published website",
    "SSL certificate",
    "Permanent hosting",
    "No recurring fees",
  ],
};

export const UpgradeModal = ({ open, onOpenChange, feature }: UpgradeModalProps) => {
  const navigate = useNavigate();

  const handleSubscribe = async (priceId: string) => {
    // Create checkout session and redirect to Stripe
    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: { priceId }
    });

    if (error) {
      console.error('Error creating checkout:', error);
      return;
    }

    if (data?.url) {
      window.location.href = data.url;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto glass glass-glow border-aurora-cyan/20">
        <DialogHeader>
          <DialogTitle className="text-3xl bg-gradient-aurora-teal bg-clip-text text-transparent flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-aurora-cyan" />
            Upgrade to {feature ? `Unlock ${feature}` : 'Pro'}
          </DialogTitle>
          <DialogDescription className="text-foreground/70 text-lg">
            Choose the perfect plan for your needs
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Subscription Plans */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Monthly Subscriptions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`glass glass-glow hover:shadow-glow-magenta transition-all duration-300 relative border-0 ${
                    plan.popular ? 'ring-2 ring-aurora-cyan shadow-glow' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-button rounded-full text-sm font-semibold shadow-glow">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
                    <CardDescription className="text-foreground/70">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold bg-gradient-aurora-teal bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      <span className="text-foreground/60">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-aurora-cyan flex-shrink-0" />
                          <span className="text-sm text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => handleSubscribe(plan.priceId)}
                      className={`w-full ${
                        plan.popular
                          ? 'bg-gradient-button border-0 shadow-glow hover:shadow-glow-magenta'
                          : 'glass hover:bg-gradient-button hover:border-0'
                      } transition-all hover:scale-105`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      Subscribe Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* One-Time Option */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">One-Time Payment</h3>
            <Card className="glass glass-glow border-0 max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">{oneTimeOption.name}</CardTitle>
                <CardDescription className="text-foreground/70">{oneTimeOption.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold bg-gradient-aurora-teal bg-clip-text text-transparent">
                    {oneTimeOption.price}
                  </span>
                  <span className="text-foreground/60"> one-time</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {oneTimeOption.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-aurora-cyan flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleSubscribe(oneTimeOption.priceId)}
                  className="w-full glass hover:bg-gradient-button hover:border-0 transition-all hover:scale-105"
                  variant="outline"
                >
                  Purchase Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button onClick={() => onOpenChange(false)} variant="ghost">
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Missing import
import { supabase } from '@/integrations/supabase/client';
