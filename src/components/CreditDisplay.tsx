import { Coins, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useCredits } from '@/hooks/useCredits';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';

export const CreditDisplay = () => {
  const { credits, loading, isLowCredits, buyCredits } = useCredits();

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 glass glass-glow rounded-full">
        <Coins className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">...</span>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`flex items-center gap-2 px-3 py-1.5 glass glass-glow rounded-full transition-all hover:scale-105 cursor-pointer ${
            isLowCredits ? 'ring-2 ring-destructive ring-offset-2 animate-pulse' : ''
          }`}
        >
          <Coins className={`w-4 h-4 ${isLowCredits ? 'text-destructive' : 'text-primary'}`} />
          <span className={`text-sm font-medium ${isLowCredits ? 'text-destructive' : ''}`}>
            {credits.toLocaleString()}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 glass glass-glow border-border/50" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-lg mb-1">Credit Balance</h4>
            <p className="text-sm text-muted-foreground">
              {isLowCredits
                ? 'Your credit balance is low. Add more to keep building.'
                : 'Use credits for all builder actions and AI features.'}
            </p>
          </div>

          <div className="flex items-center justify-between p-3 glass rounded-lg">
            <span className="text-2xl font-bold">{credits.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">credits</span>
          </div>

          <Button
            onClick={() => window.location.href = '/billing'}
            variant="default"
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Credits
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
