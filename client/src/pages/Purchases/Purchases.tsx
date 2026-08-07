import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import purchaseService, {
  type Purchase,
} from "../../services/purchase.service";

import PurchaseForm, {
  type PurchaseFormData,
} from "../../components/PurchaseForm/PurchaseForm";

export default function Purchases() {
  const [purchases, setPurchases] = useState<
    Purchase[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [editingPurchase, setEditingPurchase] =
    useState<Purchase | null>(null);

  async function loadPurchases() {
    try {
      const data =
        await purchaseService.getPurchases();

      setPurchases(data);
    } catch {
      toast.error(
        "Failed to load purchases."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadPurchases();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  async function createPurchase(
    purchase: PurchaseFormData
  ) {
    try {
      await purchaseService.createPurchase(
        purchase
      );

      toast.success(
        "Purchase added successfully."
      );

      setShowForm(false);

      await loadPurchases();
    } catch {
      toast.error(
        "Unable to create purchase."
      );
    }
  }

  async function updatePurchase(
    purchase: PurchaseFormData
  ) {
    if (!editingPurchase) return;

    try {
      await purchaseService.updatePurchase(
        editingPurchase._id,
        purchase
      );

      toast.success(
        "Purchase updated."
      );

      setEditingPurchase(null);

      await loadPurchases();
    } catch {
      toast.error(
        "Update failed."
      );
    }
  }

  async function deletePurchase(
    id: string
  ) {
    if (
      !window.confirm(
        "Delete this purchase?"
      )
    )
      return;

    try {
      await purchaseService.deletePurchase(
        id
      );

      toast.success(
        "Purchase deleted."
      );

      await loadPurchases();
    } catch {
      toast.error(
        "Delete failed."
      );
    }
  }

  const filtered =
    useMemo(() => {
      return purchases.filter((purchase) =>
        purchase.store
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    }, [purchases, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Purchases
          </h1>

          <p className="text-gray-500">
            Manage purchase history
          </p>
        </div>

        <button
          onClick={() =>
            setShowForm(true)
          }
          className="rounded-lg bg-green-600 px-5 py-2 text-white"
        >
          + Add Purchase
        </button>
      </div>

      <input
        placeholder="Search Store..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full rounded-lg border px-4 py-3"
      />

      {(showForm ||
        editingPurchase) && (
        <div className="rounded-xl bg-white p-6 shadow">
          <PurchaseForm
            purchase={
              editingPurchase
                ? (editingPurchase as PurchaseFormData)
                : undefined
            }
            onSubmit={
              editingPurchase
                ? updatePurchase
                : createPurchase
            }
            onCancel={() => {
              setShowForm(false);
              setEditingPurchase(
                null
              );
            }}
          />
        </div>
      )}
            <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">
                Store
              </th>

              <th className="px-6 py-4 text-center">
                Date
              </th>

              <th className="px-6 py-4 text-center">
                Items
              </th>

              <th className="px-6 py-4 text-center">
                Total (€)
              </th>

              <th className="px-6 py-4 text-center">
                Notes
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
                  colSpan={6}
                  className="py-12 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-gray-500"
                >
                  No purchases found.
                </td>
              </tr>
            ) : (
              filtered.map((purchase) => (
                <tr
                  key={purchase._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {purchase.store}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {new Date(
                      purchase.purchaseDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {purchase.items.length}
                  </td>

                  <td className="px-6 py-4 text-center font-semibold text-green-600">
                    €
                    {purchase.totalAmount.toFixed(
                      2
                    )}
                  </td>

                  <td className="max-w-xs truncate px-6 py-4 text-center">
                    {purchase.notes ||
                      "--"}
                  </td>

                  <td className="space-x-2 px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        setEditingPurchase(
                          purchase
                        )
                      }
                      className="rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deletePurchase(
                          purchase._id
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

          {!loading &&
            filtered.length > 0 && (
              <tfoot className="border-t bg-gray-50 font-semibold">
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-right"
                  >
                    Total Spent
                  </td>

                  <td className="px-6 py-4 text-center text-green-700">
                    €
                    {filtered
                      .reduce(
                        (
                          total,
                          purchase
                        ) =>
                          total +
                          purchase.totalAmount,
                        0
                      )
                      .toFixed(2)}
                  </td>

                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            )}
        </table>
      </div>
    </div>
  );
}