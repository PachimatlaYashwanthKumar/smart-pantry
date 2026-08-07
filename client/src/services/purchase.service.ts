import api from "./api";

export interface PurchaseItem {
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface Purchase {
  _id: string;
  store: string;
  purchaseDate: string;
  totalAmount: number;
  notes?: string;
  items: PurchaseItem[];
}

class PurchaseService {
  async getPurchases() {
    const response = await api.get("/purchases");
    return response.data.data as Purchase[];
  }

  async createPurchase(data: Omit<Purchase, "_id" | "totalAmount">) {
    const response = await api.post("/purchases", data);
    return response.data.data;
  }

  async updatePurchase(
    id: string,
    data: Partial<Purchase>
  ) {
    const response = await api.put(
      `/purchases/${id}`,
      data
    );

    return response.data.data;
  }

  async deletePurchase(id: string) {
    await api.delete(`/purchases/${id}`);
  }
}

export default new PurchaseService();