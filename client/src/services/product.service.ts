import api from "./api";

export interface Product {
  _id: string;
  name: string;
  category: string;
  brand?: string;
  defaultUnit: string;
}

const productService = {
  async getProducts() {
    const response = await api.get("/products");
    return response.data.data;
  },

  async createProduct(product: Omit<Product, "_id">) {
    const response = await api.post("/products", product);
    return response.data.data;
  },
};

export default productService;