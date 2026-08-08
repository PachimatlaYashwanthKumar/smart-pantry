import Card from "../Card/Card";

interface Props {
  count: number;
}

export default function ExpiringSoonCard({
  count,
}: Props) {
  return (
    <Card>
      <h2 className="mb-4 text-xl font-semibold">
        ⏳ Expiring Soon
      </h2>

      <p className="text-5xl font-bold text-orange-500">
        {count}
      </p>

      <p className="mt-3 text-gray-500">
        Check pantry items
      </p>
    </Card>
  );
}