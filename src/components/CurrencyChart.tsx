import { HistoricalDataPoint } from "@/types/currency";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: HistoricalDataPoint[];
}

const CurrencyChart: React.FC<Props> = ({ data }) => {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  };

  const formatFullDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={formatDate} />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip
          formatter={(v: number) => [v.toFixed(4), "Rate"]}
          labelFormatter={formatFullDate}
        />
        <Line
          type="monotone"
          dataKey="rate"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ fill: "#3b82f6", r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CurrencyChart;