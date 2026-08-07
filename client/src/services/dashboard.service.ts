import api from "./api";

export interface DashboardSummary {
  [x: string]: string | number | null;
  totalItems: string | number;
  totalProducts: number;
  totalPurchases: number;
  totalPantryItems: number;
  inventoryQuantity: number;
  totalSpent: number;
  averagePurchaseValue: number;
  lastPurchaseDate: string | null;
  lowStockItems: number;
  expiringItems: number;
}

class DashboardService {
  async getSummary(): Promise<DashboardSummary> {
    const response = await api.get("/dashboard/summary");

    return response.data.data;
  }

  // Alias for React Query
  async getDashboard(): Promise<DashboardSummary> {
    return this.getSummary();
  }
}

export default new DashboardService();