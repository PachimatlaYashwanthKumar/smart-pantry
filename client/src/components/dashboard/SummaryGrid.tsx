import {
  FiArchive,
  FiBox,
  FiShoppingCart,
  FiTrendingUp,
} from "react-icons/fi";

import SummaryCard from "./SummaryCard";

import type { DashboardSummary } from "../../services/dashboard.service";

interface Props {
  summary: DashboardSummary;
}

export default function SummaryGrid({
  summary,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Products"
        value={summary.totalProducts}
        subtitle="Registered products"
        icon={<FiBox size={28} />}
      />

      <SummaryCard
        title="Pantry"
        value={summary.totalPantryItems}
        subtitle="Items available"
        icon={<FiArchive size={28} />}
        color="bg-blue-100 text-blue-600"
      />

      <SummaryCard
        title="Purchases"
        value={summary.totalPurchases}
        subtitle="Purchase history"
        icon={<FiShoppingCart size={28} />}
        color="bg-orange-100 text-orange-600"
      />

      <SummaryCard
        title="Inventory"
        value={summary.inventoryQuantity}
        subtitle="Total quantity"
        icon={<FiTrendingUp size={28} />}
        color="bg-purple-100 text-purple-600"
      />
    </div>
  );
}