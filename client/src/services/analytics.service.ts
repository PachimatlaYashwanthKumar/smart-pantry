import api from "./api";

export interface AnalyticsSummary {
  totalSpent: number;
  averagePurchase: number;
  totalPurchases: number;
  highestPurchase: number;
}

export interface MonthlySpending {
  _id: {
    year: number;
    month: number;
  };
  totalSpent: number;
  purchaseCount: number;
}

const analyticsService = {
  async getSummary(): Promise<AnalyticsSummary> {
    const response = await api.get("/analytics/summary");
    return response.data.data;
  },

  async getMonthlySpending(): Promise<
    MonthlySpending[]
  > {
    const response = await api.get(
      "/analytics/monthly-spending"
    );

    return response.data.data;
  },
};

export default analyticsService;