import Card from "../Card/Card";

interface Props {
  count: number;
}

export default function LowStockCard({
  count,
}: Props) {
  return (
    <Card>
      <h2 className="mb-4 text-xl font-semibold">
        ⚠️ Low Stock
      </h2>

      <p className="text-5xl font-bold text-red-600">
        {count}
      </p>

      <p className="mt-3 text-gray-500">
        Items need replenishment
      </p>
    </Card>
  );
}