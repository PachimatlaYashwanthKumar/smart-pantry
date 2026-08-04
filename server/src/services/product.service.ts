import { IProduct } from "../models/product";
import productRepository from "../repositories/product.repository";
import ApiError from "../utils/ApiError";

class ProductService {
  async createProduct(productData: Partial<IProduct>) {
    return await productRepository.create(productData);
  }

  async getProducts(userId: string) {
    return await productRepository.findAll(userId);
  }

  async getProduct(id: string) {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return product;
  }

  async updateProduct(
    id: string,
    data: Partial<IProduct>
  ) {
    const product = await productRepository.update(id, data);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return product;
  }

  async deleteProduct(id: string) {
    const product = await productRepository.delete(id);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return product;
  }
}

export default new ProductService();