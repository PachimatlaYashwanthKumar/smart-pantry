import Product, { IProduct } from "../models/product";

class ProductRepository {
  async create(productData: Partial<IProduct>) {
    return await Product.create(productData);
  }

  async findAll(userId: string) {
    return await Product.find({
      userId,
      isActive: true,
    });
  }

  async findById(id: string) {
    return await Product.findById(id);
  }

  async update(id: string, data: Partial<IProduct>) {
    return await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string) {
    return await Product.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      {
        new: true,
      }
    );
  }
}

export default new ProductRepository();