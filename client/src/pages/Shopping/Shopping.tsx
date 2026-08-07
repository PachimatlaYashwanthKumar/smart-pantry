import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import shoppingService from "../../services/shopping.service";
import type { ShoppingItem } from "../../services/shopping.service";

import ShoppingForm from "../../components/ShoppingForm/ShoppingForm";
import type { ShoppingFormData } from "../../components/ShoppingForm/ShoppingForm";

export default function Shopping() {
  const [items, setItems] = useState<
    ShoppingItem[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [editingItem, setEditingItem] =
    useState<ShoppingItem | undefined>();

  async function loadShopping() {
    try {
      const data =
        await shoppingService.getShopping();

      setItems(data);
    } catch {
      toast.error(
        "Failed to load shopping list."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await loadShopping();
    })();
  }, []);

  async function createItem(
    data: ShoppingFormData
  ) {
    try {
      const formattedData = {
        ...data,
        productId: typeof data.productId === 'string' 
          ? JSON.parse(data.productId)
          : data.productId,
      };
      await shoppingService.createShopping(
        formattedData
      );

      toast.success(
        "Shopping item added."
      );

      setShowForm(false);

      await loadShopping();
    } catch {
      toast.error(
        "Failed to create item."
      );
    }
  }

  async function updateItem(
    data: ShoppingFormData
  ) {
    if (!editingItem) return;

    try {
      const formattedData = {
        ...data,
        productId: typeof data.productId === 'string' 
          ? JSON.parse(data.productId)
          : data.productId,
      };
      await shoppingService.updateShopping(
        editingItem._id,
        formattedData
      );

      toast.success(
        "Shopping item updated."
      );

      setEditingItem(undefined);

      await loadShopping();
    } catch {
      toast.error(
        "Update failed."
      );
    }
  }

  async function deleteItem(
    id: string
  ) {
    if (
      !window.confirm(
        "Delete shopping item?"
      )
    )
      return;

    try {
      await shoppingService.deleteShopping(
        id
      );

      toast.success(
        "Shopping item deleted."
      );

      await loadShopping();
    } catch {
      toast.error(
        "Delete failed."
      );
    }
  }

  async function toggleItem(
    id: string
  ) {
    try {
      await shoppingService.toggleShopping(
        id
      );

      await loadShopping();
    } catch {
      toast.error(
        "Unable to update item."
      );
    }
  }

  async function generateList() {
    try {
      const result =
        await shoppingService.generateShopping();

      toast.success(result.message);

      await loadShopping();
    } catch {
      toast.error(
        "Failed to generate shopping list."
      );
    }
  }

  const filtered =
    useMemo(() => {
      return items.filter((item) =>
        item.productName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    }, [items, search]);

  const completed =
    filtered.filter(
      (item) => item.completed
    ).length;

  const pending =
    filtered.length - completed;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Shopping List
          </h1>

          <p className="text-gray-500">
            Manage shopping items
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={generateList}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            Auto Generate
          </button>

          <button
            onClick={() =>
              setShowForm(true)
            }
            className="rounded-lg bg-green-600 px-5 py-2 text-white"
          >
            + Add Item
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow">
          <p>Total Items</p>

          <h2 className="mt-3 text-3xl font-bold">
            {filtered.length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p>Pending</p>

          <h2 className="mt-3 text-3xl font-bold text-orange-500">
            {pending}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <p>Completed</p>

          <h2 className="mt-3 text-3xl font-bold text-green-600">
            {completed}
          </h2>
        </div>
      </div>

      <input
        placeholder="Search product..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full rounded-lg border px-4 py-3"
      />

      {(showForm ||
        editingItem) && (
        <div className="rounded-xl bg-white p-6 shadow">
          <ShoppingForm
            shopping={editingItem}
            onSubmit={
              editingItem
                ? updateItem
                : createItem
            }
            onCancel={() => {
              setShowForm(false);
              setEditingItem(undefined);
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

              <th className="px-6 py-4 text-center">
                Quantity
              </th>

              <th className="px-6 py-4 text-center">
                Unit
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
                  colSpan={5}
                  className="py-10 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-gray-500"
                >
                  No shopping items found.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {item.productName}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.quantity}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.unit}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.completed ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Purchased
                      </span>
                    ) : (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="space-x-2 px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        toggleItem(item._id)
                      }
                      className={`rounded px-3 py-1 text-sm text-white ${
                        item.completed
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {item.completed
                        ? "Undo"
                        : "Done"}
                    </button>

                    <button
                      onClick={() =>
                        setEditingItem(item)
                      }
                      className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteItem(item._id)
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
    </div>
  );
}