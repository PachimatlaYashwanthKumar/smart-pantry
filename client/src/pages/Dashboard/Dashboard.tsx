import StatCard from "../../components/StatCard/StatCard";
import Loader from "../../components/ui/Loader/Loader";
import { PageHeader } from "../../components/ui";

import { useDashboard } from "../../hooks/useDashboard";

export default function Dashboard() {
  const {
    data: summary,
    isLoading,
    error,
  } = useDashboard();

  if (isLoading) {
    return <Loader />;
  }

  if (error || !summary) {
    return (
      <div className="py-20 text-center text-red-600">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your Smart Pantry"
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Products"
          value={summary.totalProducts}
        />

        <StatCard
          title="Pantry Items"
          value={summary.totalPantryItems}
        />

        <StatCard
          title="Purchases"
          value={summary.totalPurchases}
        />

        <StatCard
          title="Inventory Qty"
          value={summary.inventoryQuantity}
        />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Spent (€)"
          value={`€${summary.totalSpent.toFixed(2)}`}
        />

        <StatCard
          title="Average Purchase (€)"
          value={`€${summary.averagePurchaseValue.toFixed(
            2
          )}`}
        />

        <StatCard
          title="Low Stock"
          value={summary.lowStockItems}
          color="text-red-600"
        />

        <StatCard
          title="Expiring Soon"
          value={summary.expiringItems}
          color="text-yellow-600"
        />
      </div>

      {summary.lastPurchaseDate && (
        <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">
            Last Purchase
          </h2>

          <p className="text-gray-600">
            {new Date(
              summary.lastPurchaseDate
            ).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}