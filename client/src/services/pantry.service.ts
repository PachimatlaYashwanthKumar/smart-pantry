import api from "./api";

export interface PantryItem {
  _id: string;
  quantity: number;
  unit: string;
  minimumStock: number;
  expiryDate?: string;
  location?: string;

  productId: {
    _id: string;
    name: string;
    category: string;
    brand: string;
    defaultUnit: string;
  };
}

class PantryService {
  async getPantry() {
    const response = await api.get("/pantry");
    return response.data.data as PantryItem[];
  }

  async createPantry(data: Partial<PantryItem>) {
    const response = await api.post(
      "/pantry",
      data
    );

    return response.data.data;
  }

  async updatePantry(
    id: string,
    data: Partial<PantryItem>
  ) {
    const response = await api.put(
      `/pantry/${id}`,
      data
    );

    return response.data.data;
  }

  async consumeStock(
    id: string,
    quantity: number
  ) {
    const response = await api.patch(
      `/pantry/${id}/consume`,
      {
        quantity,
      }
    );

    return response.data.data;
  }

  async deletePantry(id: string) {
    await api.delete(`/pantry/${id}`);
  }

  async getLowStock() {
    const response = await api.get(
      "/pantry/low-stock"
    );

    return response.data.data;
  }

  async getExpiring() {
    const response = await api.get(
      "/pantry/expiring"
    );

    return response.data.data;
  }
}

export default new PantryService();