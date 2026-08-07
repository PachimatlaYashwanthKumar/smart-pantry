import { useState } from "react";

interface ConsumeStockModalProps {
  productName: string;
  currentQuantity: number;
  onSubmit: (quantity: number) => Promise<void>;
  onCancel: () => void;
}

export default function ConsumeStockModal({
  productName,
  currentQuantity,
  onSubmit,
  onCancel,
}: ConsumeStockModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (quantity <= 0) return;

    if (quantity > currentQuantity) {
      alert("Quantity exceeds available stock.");
      return;
    }

    setLoading(true);

    try {
      await onSubmit(quantity);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold">
          Consume Stock
        </h2>

        <p className="mb-2 text-gray-600">
          Product
        </p>

        <p className="mb-5 font-semibold">
          {productName}
        </p>

        <p className="mb-5 text-sm text-gray-500">
          Available Quantity:
          <span className="ml-2 font-bold">
            {currentQuantity}
          </span>
        </p>

        <form onSubmit={handleSubmit}>
          <label className="mb-2 block font-medium">
            Quantity to Consume
          </label>

          <input
            type="number"
            min={1}
            max={currentQuantity}
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
            className="mb-6 w-full rounded border p-3"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded border px-5 py-2"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="rounded bg-red-600 px-5 py-2 text-white"
            >
              {loading
                ? "Updating..."
                : "Consume"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}