import { useState } from "react";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

import type {
  Product,
  ProductInput,
} from "../../services/product.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductInput) => void | Promise<void>;
  initialData?: Product | null;
}

export default function ProductModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [form, setForm] = useState<ProductInput>(() => ({
    name: initialData?.name ?? "",
    category: initialData?.category ?? "",
    brand: initialData?.brand ?? "",
    defaultUnit: initialData?.defaultUnit ?? "",
  }));

  if (!open) return null;

  function update<K extends keyof ProductInput>(
    key: K,
    value: ProductInput[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    await onSubmit(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold">
          {initialData
            ? "Edit Product"
            : "Add Product"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            label="Product Name"
            value={form.name}
            onChange={(e) =>
              update("name", e.target.value)
            }
          />

          <Input
            label="Category"
            value={form.category}
            onChange={(e) =>
              update(
                "category",
                e.target.value
              )
            }
          />

          <Input
            label="Brand"
            value={form.brand}
            onChange={(e) =>
              update("brand", e.target.value)
            }
          />

          <Input
            label="Default Unit"
            value={form.defaultUnit}
            onChange={(e) =>
              update(
                "defaultUnit",
                e.target.value
              )
            }
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              className="w-auto bg-gray-300 text-gray-700 hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="w-auto"
            >
              {initialData
                ? "Update Product"
                : "Create Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}