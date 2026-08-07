import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import PantryForm, {
  type PantryFormData,
} from "../../components/PantryForm/PantryForm";
import ConsumeStockModal from "../../components/PantryForm/ConsumeStockModal";

import pantryService, {
  type PantryItem,
} from "../../services/pantry.service";

export default function Pantry() {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingItem, setEditingItem] =
    useState<PantryItem | null>(null);

  const [consumeItem, setConsumeItem] =
    useState<PantryItem | null>(null);

  async function loadPantry() {
    try {
      const data =
        await pantryService.getPantry();

      setItems(data);
    } catch {
      toast.error(
        "Failed to load pantry items."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    queueMicrotask(() => {
      void loadPantry();
    });
  }, []);

  async function handleCreate(
    data: PantryFormData
  ) {
    try {
      await pantryService.createPantry({
        productId: {
          _id: data.productId,
          name: "",
          category: "",
          brand: "",
          defaultUnit: "",
        },
        quantity: data.quantity,
        unit: data.unit,
        minimumStock: data.minimumStock,
        expiryDate: data.expiryDate,
        location: data.location,
      });

      toast.success(
        "Pantry item created."
      );

      setShowForm(false);

      await loadPantry();
    } catch {
      toast.error(
        "Failed to create pantry item."
      );
    }
  }

  async function handleUpdate(
    data: PantryFormData
  ) {
    if (!editingItem) return;

    try {
      await pantryService.updatePantry(
        editingItem._id,
        {
          productId: {
            _id: data.productId,
            name: "",
            category: "",
            brand: "",
            defaultUnit: "",
          },
          quantity: data.quantity,
          unit: data.unit,
          minimumStock:
            data.minimumStock,
          expiryDate:
            data.expiryDate,
          location: data.location,
        }
      );

      toast.success(
        "Pantry updated."
      );

      setEditingItem(null);

      await loadPantry();
    } catch {
      toast.error(
        "Update failed."
      );
    }
  }

  async function handleDelete(
    id: string
  ) {
    if (
      !window.confirm(
        "Delete this pantry item?"
      )
    )
      return;

    try {
      await pantryService.deletePantry(
        id
      );

      toast.success(
        "Deleted successfully."
      );

      await loadPantry();
    } catch {
      toast.error(
        "Delete failed."
      );
    }
  }

  async function handleConsume(
    quantity: number
  ) {
    if (!consumeItem) return;

    try {
      await pantryService.consumeStock(
        consumeItem._id,
        quantity
      );

      toast.success(
        "Stock consumed."
      );

      setConsumeItem(null);

      await loadPantry();
    } catch {
      toast.error(
        "Failed to consume stock."
      );
    }
  }

  const filteredItems =
    useMemo(() => {
      return items.filter((item) =>
        item.productId.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    }, [items, search]);

  function isLowStock(
    item: PantryItem
  ) {
    return (
      item.quantity <=
      item.minimumStock
    );
  }

  function isExpiring(
    expiry?: string
  ) {
    if (!expiry) return false;

    const today = new Date();

    const expiryDate =
      new Date(expiry);

    const days =
      (expiryDate.getTime() -
        today.getTime()) /
      (1000 * 60 * 60 * 24);

    return days <= 7;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Pantry
          </h1>

          <p className="text-gray-500">
            Manage your pantry
            inventory
          </p>
        </div>

        <button
          onClick={() =>
            setShowForm(true)
          }
          className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
        >
          + Add Pantry Item
        </button>
      </div>

      <input
        placeholder="Search product..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full rounded-lg border px-4 py-3"
      />

      {(showForm || editingItem) && (
        <div className="rounded-xl bg-white p-6 shadow">
          <PantryForm
            initialData={
              editingItem
                ? {
                    productId:
                      editingItem
                        .productId._id,
                    quantity:
                      editingItem.quantity,
                    unit:
                      editingItem.unit,
                    minimumStock:
                      editingItem.minimumStock,
                    expiryDate:
                      editingItem.expiryDate ??
                      "",
                    location:
                      editingItem.location ??
                      "",
                  }
                : undefined
            }
            onSubmit={
              editingItem
                ? handleUpdate
                : handleCreate
            }
            onCancel={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
          />
        </div>
      )}
            <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">
                Product
              </th>

              <th className="px-6 py-4 text-left">
                Category
              </th>

              <th className="px-6 py-4 text-center">
                Quantity
              </th>

              <th className="px-6 py-4 text-center">
                Minimum
              </th>

              <th className="px-6 py-4 text-center">
                Expiry
              </th>

              <th className="px-6 py-4 text-center">
                Location
              </th>

              <th className="px-6 py-4 text-center">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : filteredItems.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-center text-gray-500"
                >
                  No pantry items found.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {item.productId.name}
                  </td>

                  <td className="px-6 py-4">
                    {item.productId.category}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.quantity}{" "}
                    {item.unit}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.minimumStock}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.expiryDate
                      ? new Date(
                          item.expiryDate
                        ).toLocaleDateString()
                      : "--"}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.location ||
                      "--"}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {isLowStock(
                      item
                    ) ? (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                        Low Stock
                      </span>
                    ) : isExpiring(
                        item.expiryDate
                      ) ? (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        Expiring
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        In Stock
                      </span>
                    )}
                  </td>

                  <td className="space-x-2 px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        setConsumeItem(
                          item
                        )
                      }
                      className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                    >
                      Consume
                    </button>

                    <button
                      onClick={() =>
                        setEditingItem(
                          item
                        )
                      }
                      className="rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          item._id
                        )
                      }
                      className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {consumeItem && (
        <ConsumeStockModal
          productName={
            consumeItem.productId.name
          }
          currentQuantity={
            consumeItem.quantity
          }
          onSubmit={
            handleConsume
          }
          onCancel={() =>
            setConsumeItem(null)
          }
        />
      )}
    </div>
  );
}