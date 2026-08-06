import mongoose from "mongoose";
import PantryItem, {
  IPantryItem,
} from "../models/PantryItem";

class PantryRepository {
  async create(
    pantryData: Partial<IPantryItem>
  ) {
    return PantryItem.create(pantryData);
  }

  async findAllByUser(
  userId: mongoose.Types.ObjectId
) {
    return PantryItem.find({ userId })
      .populate("productId")
      .sort({
        createdAt: -1,
      });
  }

  async findById(id: string) {
    return PantryItem.findById(id).populate(
      "productId"
    );
  }

  async findByProduct(
    userId: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId
  ) {
    return PantryItem.findOne({
      userId,
      productId,
    });
  }

  async update(
    id: string,
    pantryData: Partial<IPantryItem>
  ) {
    return PantryItem.findByIdAndUpdate(
      id,
      pantryData,
      {
        returnDocument: "after",
      }
    );
  }

  async delete(id: string) {
    return PantryItem.findByIdAndDelete(id);
  }

  async findLowStock(userId: mongoose.Types.ObjectId) {
    const items = await PantryItem.find({
      userId,
    }).populate("productId");

    return items.filter(
      (item) =>
        item.quantity <= item.minimumStock
    );
  }

  async createStock(
  pantryData: Partial<IPantryItem>
) {
  return PantryItem.create(pantryData);
}

  async increaseStock(
  userId: mongoose.Types.ObjectId,
  productId: mongoose.Types.ObjectId,
  quantity: number
) {
  return PantryItem.findOneAndUpdate(
    {
      userId,
      productId,
    },
    {
      $inc: {
        quantity,
      },
    },
    {
      returnDocument: "after",
    }
  );
}

  async findExpiring(
    userId: mongoose.Types.ObjectId,
    date: Date
  ) {
    return PantryItem.find({
      userId,
      expiryDate: {
        $lte: date,
      },
    }).populate("productId");
  }
}

export default new PantryRepository();