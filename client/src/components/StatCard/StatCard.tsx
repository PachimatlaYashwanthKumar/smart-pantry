interface StatCardProps {
  title: string;
  value: string | number;
  color?: string;
}

export default function StatCard({
  title,
  value,
  color = "text-green-600",
}: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow transition-all hover:-translate-y-1 hover:shadow-lg">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <h2
        className={`mt-3 text-4xl font-bold ${color}`}
      >
        {value}
      </h2>
    </div>
  );
}