interface StatCardProps {
  title: string;
  value: number;
  color?: string;
}

export default function StatCard({
  title,
  value,
  color = "text-green-600",
}: StatCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h3 className="text-sm text-gray-500">
        {title}
      </h3>

      <p className={`mt-3 text-3xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}