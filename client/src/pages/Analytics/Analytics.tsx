import { useEffect, useMemo, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import analyticsService, {
  type AnalyticsSummary,
  type MonthlySpending,
} from "../../services/analytics.service";

import StatCard from "../../components/StatCard/StatCard";

const COLORS = [
  "#16a34a",
  "#2563eb",
  "#f59e0b",
  "#dc2626",
  "#9333ea",
  "#0ea5e9",
];

export default function Analytics() {
  const [summary, setSummary] =
    useState<AnalyticsSummary>();

  const [monthly, setMonthly] =
    useState<MonthlySpending[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadAnalytics() {
    try {
      const summaryData =
        await analyticsService.getSummary();

      const monthlyData =
        await analyticsService.getMonthlySpending();

      setSummary(summaryData);

      setMonthly(monthlyData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnalytics();
  }, []);

  const monthlyGraph =
    useMemo(() => {
      return monthly.map((item) => ({
        month:
          item._id.month +
          "/" +
          item._id.year,

        spent: item.totalSpent,

        purchases:
          item.purchaseCount,
      }));
    }, [monthly]);

  const pieData =
    useMemo(() => {
      return monthlyGraph.map(
        (item) => ({
          name: item.month,
          value: item.spent,
        })
      );
    }, [monthlyGraph]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading Analytics...
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="py-20 text-center">
        Failed to load analytics.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-500">
          Spending insights
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Spent"
          value={`€${summary.totalSpent.toFixed(
            2
          )}`}
        />

        <StatCard
          title="Purchases"
          value={summary.totalPurchases}
        />

        <StatCard
          title="Average"
          value={`€${summary.averagePurchase.toFixed(
            2
          )}`}
        />

        <StatCard
          title="Highest"
          value={`€${summary.highestPurchase.toFixed(
            2
          )}`}
        />
      </div>
            <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Spending */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-5 text-xl font-bold">
            Monthly Spending
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <LineChart
              data={monthlyGraph}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="spent"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Purchase Count */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-5 text-xl font-bold">
            Monthly Purchases
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart
              data={monthlyGraph}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="purchases"
                fill="#2563eb"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Spending Distribution */}
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-bold">
          Spending Distribution
        </h2>

        <ResponsiveContainer
          width="100%"
          height={400}
        >
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={140}
              label
            >
              {pieData.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Summary */}
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-5 text-xl font-bold">
          Monthly Summary
        </h2>

        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th className="py-3 text-left">
                Month
              </th>

              <th className="py-3 text-center">
                Purchases
              </th>

              <th className="py-3 text-center">
                Total Spent
              </th>
            </tr>
          </thead>

          <tbody>
            {monthlyGraph.map(
              (item) => (
                <tr
                  key={item.month}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3">
                    {item.month}
                  </td>

                  <td className="py-3 text-center">
                    {
                      item.purchases
                    }
                  </td>

                  <td className="py-3 text-center font-semibold text-green-600">
                    €
                    {item.spent.toFixed(
                      2
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}