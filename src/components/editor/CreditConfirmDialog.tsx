import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Coins } from "lucide-react";

interface CreditConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  action: string;
  cost: number;
  currentCredits: number;
  description?: string;
}

export const CreditConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
  action,
  cost,
  currentCredits,
  description,
}: CreditConfirmDialogProps) => {
  const hasEnoughCredits = currentCredits >= cost;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="glass glass-glow">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-primary" />
            Confirm Action
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description || `This action will use credits from your balance.`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="glass p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Action:</span>
              <span className="font-semibold">{action}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Cost:</span>
              <span className="font-bold text-primary flex items-center gap-1">
                <Coins className="w-4 h-4" />
                {cost} credits
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Current Balance:</span>
              <span className="font-semibold">{currentCredits.toLocaleString()} credits</span>
            </div>
            <div className="flex justify-between items-center border-t border-border/50 pt-2 mt-2">
              <span className="text-sm text-muted-foreground">New Balance:</span>
              <span className={`font-bold ${hasEnoughCredits ? 'text-green-500' : 'text-destructive'}`}>
                {Math.max(0, currentCredits - cost).toLocaleString()} credits
              </span>
            </div>
          </div>

          {!hasEnoughCredits && (
            <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-3">
              <p className="text-sm text-destructive font-medium">
                Insufficient credits! Please add more credits to continue.
              </p>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={!hasEnoughCredits}
            className="glass glass-glow"
          >
            Confirm & Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
