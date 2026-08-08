import Card from "../Card/Card";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: {
    month: string;
    spent: number;
  }[];
}

export default function MonthlyChart({
  data,
}: Props) {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        Monthly Spending
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="spent"
            stroke="#16a34a"
            strokeWidth={3}
            dot={{
              r: 5,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}