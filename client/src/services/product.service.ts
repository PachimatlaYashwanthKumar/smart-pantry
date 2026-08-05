import api from "./api";

export interface Product {
  _id: string;
  name: string;
  category: string;
  brand?: string;
  defaultUnit: string;
}

export interface ProductInput {
  name: string;
  category: string;
  brand?: string;
  defaultUnit: string;
}

const productService = {
  async getProducts(): Promise<Product[]> {
    const response = await api.get("/products");
    return response.data.data;
  },

  async createProduct(
    product: ProductInput
  ): Promise<Product> {
    const response = await api.post(
      "/products",
      product
    );

    return response.data.data;
  },

  async getProductById(
    id: string
  ): Promise<Product> {
    const response = await api.get(
      `/products/${id}`
    );

    return response.data.data;
  },

  async updateProduct(
    id: string,
    product: ProductInput
  ): Promise<Product> {
    const response = await api.put(
      `/products/${id}`,
      product
    );

    return response.data.data;
  },

  async deleteProduct(
    id: string
  ): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};

export default productService;