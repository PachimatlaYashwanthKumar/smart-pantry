import { useEffect, useMemo, useState } from "react";

import PageHeader from "../../components/ui/PageHeader/PageHeader";

import SummaryGrid from "../../components/dashboard/SummaryGrid";
import MonthlyChart from "../../components/dashboard/MonthlyChart";
import QuickActions from "../../components/dashboard/QuickActions";
import LowStockCard from "../../components/dashboard/LowStockCard";
import ExpiringSoonCard from "../../components/dashboard/ExpiringSoonCard";
import RecentPurchases from "../../components/dashboard/RecentPurchases";

import dashboardService from "../../services/dashboard.service";
import analyticsService from "../../services/analytics.service";
import purchaseService from "../../services/purchase.service";

import type { DashboardSummary } from "../../services/dashboard.service";
import type { MonthlySpending } from "../../services/analytics.service";
import type { Purchase } from "../../services/purchase.service";

import Loader from "../../components/ui/Loader/Loader";

export default function Dashboard() {
  const [summary, setSummary] =
    useState<DashboardSummary | null>(null);

  const [chart, setChart] =
    useState<MonthlySpending[]>([]);

  const [purchases, setPurchases] =
    useState<Purchase[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [
          summaryData,
          chartData,
          purchaseData,
        ] = await Promise.all([
          dashboardService.getSummary(),
          analyticsService.getMonthlySpending(),
          purchaseService.getPurchases(),
        ]);

        setSummary(summaryData);
        setChart(chartData);
        setPurchases(purchaseData);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const graph = useMemo(
    () =>
      chart.map((item) => ({
        month:
          item._id.month +
          "/" +
          item._id.year,

        spent: item.totalSpent,
      })),
    [chart]
  );

  if (loading) {
    return <Loader />;
  }

  if (!summary) {
    return (
      <div className="p-8 text-red-600">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back 👋 Here's an overview of your pantry."
      />

      <SummaryGrid summary={summary} />

      <QuickActions />

      <MonthlyChart data={graph} />

      <div className="grid gap-6 lg:grid-cols-2">
        <LowStockCard
          count={summary.lowStockItems}
        />

        <ExpiringSoonCard
          count={summary.expiringItems}
        />
      </div>

      <RecentPurchases
        purchases={purchases}
      />
    </div>
  );
}