import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { CREDIT_PACKS } from "@/hooks/useCredits";

const usageExamples = [
  "Add components and sections",
  "Create new pages",
  "AI text generation",
  "AI layout generation",
  "AI image generation",
  "Publish to subdomain",
  "Connect custom domain",
  "Export projects",
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 bg-gradient-aurora-teal opacity-20 aurora-animate" style={{ backgroundSize: '200% 200%' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Pay As You Build</h2>
          <p className="text-xl text-foreground/70">
            Credits give you complete control over what you spend
          </p>
        </div>
        
        <div className="space-y-12">
          {/* Free Tier Info */}
          <div className="glass glass-glow p-8 rounded-[22px] max-w-3xl mx-auto text-center border-0">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-aurora-teal bg-clip-text text-transparent">
              Start Building for Free
            </h3>
            <p className="text-foreground/80 mb-6">
              Get 100 free credits when you sign up. Create unlimited drafts, use AI features, and only pay for what you build.
              No subscriptions, no hidden fees — just simple, transparent pricing.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-foreground/60">
              <Coins className="w-4 h-4" />
              <span>€1 = 100 credits • Credits never expire</span>
            </div>
          </div>

          {/* Credit Packs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {CREDIT_PACKS.map((pack, index) => (
              <Card 
                key={pack.priceId} 
                className={`glass glass-glow hover:shadow-glow-magenta transition-all duration-300 relative border-0 ${
                  index === 1 ? 'ring-2 ring-aurora-cyan shadow-glow' : ''
                }`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-button rounded-full text-sm font-semibold shadow-glow">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">{pack.name}</CardTitle>
                  <CardDescription className="text-foreground/70">{pack.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold bg-gradient-aurora-teal bg-clip-text text-transparent">
                      €{pack.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-foreground/80">
                    <Coins className="w-5 h-5 text-aurora-cyan" />
                    <span className="text-lg font-semibold">{pack.credits.toLocaleString()} credits</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/60 mb-4">Use credits for:</p>
                  <ul className="space-y-2">
                    {usageExamples.slice(0, 5).map((example, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-aurora-cyan flex-shrink-0" />
                        <span className="text-xs text-foreground/70">{example}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/credits" className="w-full">
                    <Button 
                      className={`w-full ${
                        index === 1
                          ? 'bg-gradient-button border-0 shadow-glow hover:shadow-glow-magenta' 
                          : 'glass hover:bg-gradient-button hover:border-0'
                      } transition-all hover:scale-105`}
                      variant={index === 1 ? 'default' : 'outline'}
                    >
                      Buy Credits
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass glass-glow p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-gradient-button rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-semibold mb-2">No Subscriptions</h4>
                <p className="text-sm text-foreground/70">Buy credits once, use them anytime</p>
              </div>
              <div className="glass glass-glow p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-gradient-button rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coins className="w-6 h-6" />
                </div>
                <h4 className="font-semibold mb-2">Credits Never Expire</h4>
                <p className="text-sm text-foreground/70">Your balance stays with you forever</p>
              </div>
              <div className="glass glass-glow p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-gradient-button rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">€</span>
                </div>
                <h4 className="font-semibold mb-2">Transparent Pricing</h4>
                <p className="text-sm text-foreground/70">Only pay for what you build</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;