import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Globe, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InteractiveLighting from "@/components/InteractiveLighting";

const Dashboard = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <InteractiveLighting />
      {/* Aurora background */}
      <div className="absolute inset-0 bg-gradient-aurora-magenta aurora-animate opacity-20" style={{ backgroundSize: '200% 200%' }} />
      
      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-12 relative z-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Projects</h2>
          <p className="text-foreground/70">Create and manage your websites</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="glass glass-glow hover:shadow-glow-magenta transition-all duration-300 cursor-pointer group border-0">
            <CardHeader>
              <div className="w-full h-40 glass rounded-lg mb-4 flex items-center justify-center group-hover:bg-gradient-button/10 transition-colors">
                <Plus className="h-12 w-12 text-aurora-cyan group-hover:scale-110 transition-transform" />
              </div>
              <CardTitle className="text-foreground">Create New Website</CardTitle>
              <CardDescription className="text-foreground/70">Start with a template or from scratch</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;