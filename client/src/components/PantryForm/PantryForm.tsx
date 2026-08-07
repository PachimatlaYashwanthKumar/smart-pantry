import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import productService from "../../services/product.service";
import type { Product } from "../../services/product.service";

export interface PantryFormData {
  productId: string;
  quantity: number;
  unit: string;
  minimumStock: number;
  expiryDate: string;
  location: string;
}

interface PantryFormProps {
  initialData?: PantryFormData;
  onSubmit: (
    data: PantryFormData
  ) => Promise<void>;
  onCancel: () => void;
}

export default function PantryForm({
  initialData,
  onSubmit,
  onCancel,
}: PantryFormProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const [form, setForm] =
    useState<PantryFormData>({
      productId:
        initialData?.productId ?? "",
      quantity:
        initialData?.quantity ?? 1,
      unit: initialData?.unit ?? "",
      minimumStock:
        initialData?.minimumStock ?? 1,
      expiryDate:
        initialData?.expiryDate?.substring(
          0,
          10
        ) ?? "",
      location:
        initialData?.location ?? "",
    });

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await productService.getProducts();
        if (mounted) setProducts(data);
      } catch {
        toast.error("Failed to load products.");
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  function updateField(
    field: keyof PantryFormData,
    value: string | number
  ) {
    const updated = {
      ...form,
      [field]: value,
    };

    if (field === "productId") {
      const product = products.find(
        (p) => p._id === value
      );

      if (product) {
        updated.unit =
          product.defaultUnit;
      }
    }

    setForm(updated);
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block">
            Product
          </label>

          <select
            value={form.productId}
            onChange={(e) =>
              updateField(
                "productId",
                e.target.value
              )
            }
            className="w-full rounded border p-2"
            required
          >
            <option value="">
              Select Product
            </option>

            {products.map((product) => (
              <option
                key={product._id}
                value={product._id}
              >
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block">
            Quantity
          </label>

          <input
            type="number"
            min={1}
            value={form.quantity}
            onChange={(e) =>
              updateField(
                "quantity",
                Number(
                  e.target.value
                )
              )
            }
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block">
            Unit
          </label>

          <input
            value={form.unit}
            readOnly
            className="w-full rounded border bg-gray-100 p-2"
          />
        </div>

        <div>
          <label className="mb-1 block">
            Minimum Stock
          </label>

          <input
            type="number"
            min={1}
            value={form.minimumStock}
            onChange={(e) =>
              updateField(
                "minimumStock",
                Number(
                  e.target.value
                )
              )
            }
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block">
            Expiry Date
          </label>

          <input
            type="date"
            value={form.expiryDate}
            onChange={(e) =>
              updateField(
                "expiryDate",
                e.target.value
              )
            }
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block">
            Location
          </label>

          <input
            value={form.location}
            onChange={(e) =>
              updateField(
                "location",
                e.target.value
              )
            }
            className="w-full rounded border p-2"
          />
        </div>
      </div>

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
          className="rounded bg-green-600 px-5 py-2 text-white"
        >
          {loading
            ? "Saving..."
            : "Save Pantry"}
        </button>
      </div>
    </form>
  );
}