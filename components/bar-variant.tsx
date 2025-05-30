import { format } from "date-fns";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { CustomTooltip } from "./custom-toolkit";

type Props = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const BarVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => format(value, "dd MMM")}
          dataKey="date"
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="income"
          fill = "#3d82f6"
          className="drop-shadow-sm"
        />
        <Bar 
          dataKey="expenses"
          fill = "#f43f5e"
          className="drop-shadow-sm"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
