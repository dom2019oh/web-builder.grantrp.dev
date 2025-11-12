import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { AlertTriangle, Coins } from 'lucide-react';

interface LowCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCredits: () => void;
  currentCredits: number;
}

export const LowCreditsModal = ({
  isOpen,
  onClose,
  onAddCredits,
  currentCredits,
}: LowCreditsModalProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="glass glass-glow border-border/50">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 glass rounded-xl">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            </div>
            <AlertDialogTitle className="text-xl">Low Credits</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base">
            You have less than 50 credits remaining. Add more to keep building without interruption.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4 p-4 glass rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Balance</span>
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-primary" />
              <span className="font-semibold">{currentCredits} credits</span>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="glass">Continue</AlertDialogCancel>
          <AlertDialogAction onClick={onAddCredits} className="glass glass-glow">
            <Coins className="w-4 h-4 mr-2" />
            Add Credits
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
