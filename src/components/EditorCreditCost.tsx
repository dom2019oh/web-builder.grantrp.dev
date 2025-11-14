import { Coins } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface EditorCreditCostProps {
  action: string;
  cost: number;
}

const EditorCreditCost = ({ action, cost }: EditorCreditCostProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="inline-flex items-center gap-1 px-2 py-1 glass rounded-full text-xs">
          <Coins className="w-3 h-3 text-primary" />
          <span className="font-semibold text-primary">{cost}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">{action} costs {cost} credits</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default EditorCreditCost;
