import CurrencyInput from "react-currency-input-field";

import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Info, PlusCircle, MinusCircle } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const AmountInput = ({
  value,
  onChange,
  placeholder,
  disabled,
}: Props) => {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const onReverseValue = () => {
    if (!value) {
      return;
    }

    const newValue = parseFloat(value) * -1;
    onChange(newValue.toString());
  };

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              onClick={onReverseValue}
              className={cn(
                "absolute bg-slate-400 hover:bg-slate-500 top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition" ,
                isIncome && "bg-emerald-500 hover:bg-emerald-600",
                isExpense && "bg-red-500 hover:bg-red-600"
              )}
            >
              {!parsedValue && <Info className="w-3 h-3 text-white" />}
              {isIncome && <PlusCircle className="w-3 h-3 text-white" />}
              {isExpense && <MinusCircle className="w-3 h-3 text-white" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Use [+] for Income and [-] for Expenses
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        prefix="$"
        className="flex h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
        placeholder={placeholder}
        value={value}
        decimalsLimit={2}
        decimalScale={2}
        onValueChange={onChange}
        disabled={disabled}
      />
      <p className = "text-sm text-muted-foreground mt-2">{isIncome && "This will count as an Income"}{isExpense && "This will count as an Expense"}</p>
    </div>
  );
};
