import { Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { useCredits } from "@/hooks/useCredits";
import { useAuth } from "@/hooks/useAuth";

const FloatingCreditsButton = () => {
  const { user } = useAuth();
  const { credits, loading } = useCredits();

  if (!user || loading) return null;

  return (
    <Link
      to="/credits"
      className="fixed bottom-8 right-8 z-50 glass glass-glow px-6 py-4 rounded-full flex items-center gap-3 hover:scale-110 transition-all duration-300 animate-fade-in group shadow-glow"
    >
      <Coins className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">Credits</span>
        <span className="text-lg font-bold bg-gradient-button bg-clip-text text-transparent">
          {credits.toLocaleString()}
        </span>
      </div>
    </Link>
  );
};

export default FloatingCreditsButton;
