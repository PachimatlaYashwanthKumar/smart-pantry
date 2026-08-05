import Purchase, {
  IPurchase,
} from "../models/Purchase";

class PurchaseRepository {
  async create(
    purchaseData: Partial<IPurchase>
  ) {
    return Purchase.create(purchaseData);
  }

  async findAllByUser(
    userId: string
  ) {
    return Purchase.find({
      userId,
    }).sort({
      purchaseDate: -1,
    });
  }

  async findById(id: string) {
    return Purchase.findById(id);
  }

  async update(
    id: string,
    purchaseData: Partial<IPurchase>
  ) {
    return Purchase.findByIdAndUpdate(
      id,
      purchaseData,
      {
        new: true,
      }
    );
  }

  async delete(id: string) {
    return Purchase.findByIdAndDelete(id);
  }
}

export default new PurchaseRepository();