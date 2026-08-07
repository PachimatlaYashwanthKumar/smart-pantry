import api from "./api";

export interface ShoppingItem {
  _id: string;

  productId: {
    _id: string;
    name: string;
    category: string;
    brand: string;
    defaultUnit: string;
  };

  productName: string;

  quantity: number;

  unit: string;

  completed: boolean;

  createdAt: string;

  updatedAt: string;
}

class ShoppingService {
  async getShopping() {
    const response = await api.get("/shopping");

    return response.data.data as ShoppingItem[];
  }

  async createShopping(
    data: Partial<ShoppingItem>
  ) {
    const response = await api.post(
      "/shopping",
      data
    );

    return response.data.data;
  }

  async updateShopping(
    id: string,
    data: Partial<ShoppingItem>
  ) {
    const response = await api.put(
      `/shopping/${id}`,
      data
    );

    return response.data.data;
  }

  async toggleShopping(id: string) {
    const response = await api.patch(
      `/shopping/${id}/toggle`
    );

    return response.data.data;
  }

  async deleteShopping(id: string) {
    await api.delete(`/shopping/${id}`);
  }

  async generateShopping() {
    const response = await api.post(
      "/shopping/generate"
    );

    return response.data;
  }
}

export default new ShoppingService();