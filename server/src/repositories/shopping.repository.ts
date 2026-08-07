import Shopping, {
  IShopping,
} from "../models/Shopping";

class ShoppingRepository {
  async create(
    data: Partial<IShopping>
  ) {
    return Shopping.create(data);
  }

  async findAll(
    userId: string
  ) {
    return Shopping.find({
      userId,
    })
      .populate("productId")
      .sort({
        completed: 1,
        createdAt: -1,
      });
  }

  async findById(id: string) {
    return Shopping.findById(id);
  }

  async update(
    id: string,
    data: Partial<IShopping>
  ) {
    return Shopping.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );
  }

  async delete(id: string) {
    return Shopping.findByIdAndDelete(
      id
    );
  }

  async findByProduct(
    userId: string,
    productId: string
  ) {
    return Shopping.findOne({
      userId,
      productId,
    });
  }
}

export default new ShoppingRepository();