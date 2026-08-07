import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import productService from "../../services/product.service";
import type { Product } from "../../services/product.service";

export interface PurchaseItemInput {
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface PurchaseFormData {
  store: string;
  purchaseDate: string;
  notes: string;
  items: PurchaseItemInput[];
}

interface PurchaseFormProps {
  purchase?: PurchaseFormData;
  onSubmit: (
    data: PurchaseFormData
  ) => Promise<void>;
  onCancel: () => void;
}

export default function PurchaseForm({
  purchase,
  onSubmit,
  onCancel,
}: PurchaseFormProps) {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState<PurchaseFormData>({
      store: purchase?.store ?? "",
      purchaseDate:
        purchase?.purchaseDate?.substring(
          0,
          10
        ) ??
        new Date()
          .toISOString()
          .substring(0, 10),
      notes: purchase?.notes ?? "",
      items:
        purchase?.items ?? [
          {
            productId: "",
            productName: "",
            quantity: 1,
            unit: "",
            price: 0,
          },
        ],
    });

  function loadProducts() {
    return productService
      .getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch(() => {
        toast.error(
          "Unable to load products."
        );
      });
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  function updateItem(
    index: number,
    field: keyof PurchaseItemInput,
    value: PurchaseItemInput[keyof PurchaseItemInput]
  ) {
    const items = [...form.items];

    items[index] = {
      ...items[index],
      [field]: value,
    };

    if (field === "productId") {
      const product = products.find(
        (p) => p._id === value
      );

      if (product) {
        items[index].productName =
          product.name;

        items[index].unit =
          product.defaultUnit;
      }
    }

    setForm({
      ...form,
      items,
    });
  }

  function addItem() {
    setForm({
      ...form,
      items: [
        ...form.items,
        {
          productId: "",
          productName: "",
          quantity: 1,
          unit: "",
          price: 0,
        },
      ],
    });
  }

  function removeItem(
    index: number
  ) {
    const items = [...form.items];

    items.splice(index, 1);

    setForm({
      ...form,
      items,
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
        purchase
          ? "Purchase updated."
          : "Purchase created."
      );
    } catch {
      toast.error(
        "Unable to save purchase."
      );
    } finally {
      setLoading(false);
    }
  }

  const total =
    form.items.reduce(
      (sum, item) =>
        sum +
        item.quantity *
          item.price,
      0
    );
      return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Store
          </label>

          <input
            value={form.store}
            onChange={(e) =>
              setForm({
                ...form,
                store: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Purchase Date
          </label>

          <input
            type="date"
            value={form.purchaseDate}
            onChange={(e) =>
              setForm({
                ...form,
                purchaseDate:
                  e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        {form.items.map(
          (item, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-lg border p-4 md:grid-cols-5"
            >
              <select
                value={item.productId}
                onChange={(e) =>
                  updateItem(
                    index,
                    "productId",
                    e.target.value
                  )
                }
                className="rounded-lg border p-2"
              >
                <option value="">
                  Select Product
                </option>

                {products.map(
                  (product) => (
                    <option
                      key={
                        product._id
                      }
                      value={
                        product._id
                      }
                    >
                      {product.name}
                    </option>
                  )
                )}
              </select>

              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  updateItem(
                    index,
                    "quantity",
                    Number(
                      e.target.value
                    )
                  )
                }
                className="rounded-lg border p-2"
                placeholder="Qty"
              />

              <input
                type="number"
                min={0}
                step="0.01"
                value={item.price}
                onChange={(e) =>
                  updateItem(
                    index,
                    "price",
                    Number(
                      e.target.value
                    )
                  )
                }
                className="rounded-lg border p-2"
                placeholder="Price"
              />

              <input
                value={item.unit}
                readOnly
                className="rounded-lg border bg-gray-100 p-2"
              />

              <button
                type="button"
                onClick={() =>
                  removeItem(index)
                }
                disabled={
                  form.items.length ===
                  1
                }
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Remove
              </button>
            </div>
          )
        )}

        <button
          type="button"
          onClick={addItem}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          + Add Item
        </button>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Notes
        </label>

        <textarea
          rows={4}
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes:
                e.target.value,
            })
          }
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4">
        <h2 className="text-xl font-bold">
          Total Amount
        </h2>

        <h2 className="text-2xl font-bold text-green-600">
          €
          {total.toFixed(2)}
        </h2>
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
          className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
        >
          {loading
            ? "Saving..."
            : purchase
            ? "Update Purchase"
            : "Save Purchase"}
        </button>
      </div>
    </form>
  );
}