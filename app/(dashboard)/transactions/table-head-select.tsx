import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props = {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
};

const options = ["amount", "payee", "date"];

export const TableHeadSelect = ({
  columnIndex,
  onChange,
  selectedColumns,
}: Props) => {
  const currentSelection = selectedColumns[`column_${columnIndex}`];
  return (
    <div>
      <Select
        value={currentSelection || ""}
        onValueChange={(value) => onChange(columnIndex, value)}
      >
        <SelectTrigger
          className={cn(
            "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize ",
            currentSelection && "text-blue-500"
          )}
        >
          <SelectValue placeholder="Skip" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Skip">Skip</SelectItem>
          {options.map((option, index) => {
            const disabled = Object.values(selectedColumns).includes(option) && selectedColumns[`column_${columnIndex}`] !== option;
            return (
              <SelectItem key={index} value={option} className="capitalize" disabled={disabled}>
                {option}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
