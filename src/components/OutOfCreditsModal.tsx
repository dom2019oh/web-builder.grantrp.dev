import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { XCircle, Coins } from 'lucide-react';

interface OutOfCreditsModalProps {
  isOpen: boolean;
  onAddCredits: () => void;
}

export const OutOfCreditsModal = ({
  isOpen,
  onAddCredits,
}: OutOfCreditsModalProps) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="glass glass-glow border-border/50">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 glass rounded-xl">
              <XCircle className="w-6 h-6 text-destructive" />
            </div>
            <AlertDialogTitle className="text-xl">Out of Credits</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base">
            You've run out of credits. Buy a pack now to continue building your website.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4 p-4 glass rounded-xl border-2 border-destructive/20">
          <div className="flex items-center justify-center gap-2 text-destructive">
            <Coins className="w-5 h-5" />
            <span className="font-semibold text-lg">0 credits remaining</span>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogAction onClick={onAddCredits} className="w-full glass glass-glow">
            <Coins className="w-4 h-4 mr-2" />
            Buy Credits Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
