import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Globe, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 bg-gradient-aurora-magenta aurora-animate opacity-50" style={{ backgroundSize: '200% 200%' }} />
      
      <header className="glass border-b border-white/10 relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-aurora-cyan animate-pulse" />
            <h1 className="text-xl font-bold">Grant Development</h1>
          </div>
          <Button variant="outline" className="glass hover:bg-gradient-button hover:text-white hover:border-0 transition-all">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
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
    </div>
  );
};

export default Dashboard;