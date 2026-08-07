import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import productService from "../../services/product.service";
import type { Product } from "../../services/product.service";

export interface ShoppingFormData {
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
}

interface ShoppingItem {
  productId?: { _id: string } | string;
  productName?: string;
  quantity?: number;
  unit?: string;
}

interface ShoppingFormProps {
  shopping?: ShoppingItem;
  onSubmit: (
    data: ShoppingFormData
  ) => Promise<void>;
  onCancel: () => void;
}

export default function ShoppingForm({
  shopping,
  onSubmit,
  onCancel,
}: ShoppingFormProps) {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState<ShoppingFormData>({
      productId: (() => {
        const pid = shopping?.productId;
        if (!pid) return "";
        return typeof pid === "string" ? pid : pid._id;
      })(),
      productName:
        shopping?.productName ?? "",
      quantity:
        shopping?.quantity ?? 1,
      unit:
        shopping?.unit ?? "",
    });

  useEffect(() => {
    async function loadProducts() {
      try {
        const data =
          await productService.getProducts();

        setProducts(data);
      } catch {
        toast.error(
          "Failed to load products."
        );
      }
    }

    loadProducts();
  }, []);

  function handleProductChange(
    id: string
  ) {
    const product = products.find(
      (p) => p._id === id
    );

    if (!product) return;

    setForm({
      ...form,
      productId: product._id,
      productName: product.name,
      unit: product.defaultUnit,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      await onSubmit(form);

      toast.success(
        shopping
          ? "Shopping item updated."
          : "Shopping item created."
      );
    } catch {
      toast.error(
        "Unable to save shopping item."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Product
          </label>

          <select
            value={form.productId}
            onChange={(e) =>
              handleProductChange(
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
            required
          >
            <option value="">
              Select Product
            </option>

            {products.map(
              (product) => (
                <option
                  key={product._id}
                  value={product._id}
                >
                  {product.name}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Quantity
          </label>

          <input
            type="number"
            min={1}
            value={form.quantity}
            onChange={(e) =>
              setForm({
                ...form,
                quantity: Number(
                  e.target.value
                ),
              })
            }
            className="w-full rounded-lg border p-3"
          />
        </div>
                <div>
          <label className="mb-2 block font-medium">
            Unit
          </label>

          <input
            value={form.unit}
            readOnly
            className="w-full rounded-lg border bg-gray-100 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Product Name
          </label>

          <input
            value={form.productName}
            readOnly
            className="w-full rounded-lg border bg-gray-100 p-3"
          />
        </div>
      </div>

      <div className="rounded-lg bg-gray-100 p-4">
        <h2 className="text-xl font-semibold">
          Shopping Summary
        </h2>

        <div className="mt-3 flex justify-between">
          <span>Product</span>

          <span className="font-semibold">
            {form.productName || "--"}
          </span>
        </div>

        <div className="mt-2 flex justify-between">
          <span>Quantity</span>

          <span className="font-semibold">
            {form.quantity}
          </span>
        </div>

        <div className="mt-2 flex justify-between">
          <span>Unit</span>

          <span className="font-semibold">
            {form.unit || "--"}
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-6 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading
            ? "Saving..."
            : shopping
            ? "Update Shopping Item"
            : "Save Shopping Item"}
        </button>
      </div>
    </form>
  );
}