interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl bg-white py-20 text-center shadow">
      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-3 text-gray-500">
        {description}
      </p>
    </div>
  );
}