import type { ReactNode } from "react";
import Card from "../Card/Card";

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  color?: string;
}

export default function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  color = "bg-green-100 text-green-600",
}: SummaryCardProps) {
  return (
    <Card className="h-40">
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              {title}
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {value}
            </h2>
          </div>

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
          >
            {icon}
          </div>
        </div>

        {subtitle && (
          <p className="text-sm text-gray-500">
            {subtitle}
          </p>
        )}
      </div>
    </Card>
  );
}