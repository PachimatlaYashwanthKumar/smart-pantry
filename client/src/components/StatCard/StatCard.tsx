interface StatCardProps {
  title: string;
  value: number | string;
  color?: string;
}

export default function StatCard({
  title,
  value,
  color = "text-green-600",
}: StatCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg">
      <p className="text-sm text-gray-500">
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