import mongoose from "mongoose";

import { IShopping } from "../models/Shopping";

import shoppingRepository from "../repositories/shopping.repository";
import pantryRepository from "../repositories/pantry.repository";

import ApiError from "../utils/ApiError";

class ShoppingService {
  async create(
    userId: string,
    data: Partial<IShopping>
  ) {
    if (!data.productId) {
      throw new ApiError(
        400,
        "Product is required"
      );
    }

    const existing =
      await shoppingRepository.findByProduct(
        userId,
        data.productId.toString()
      );

    if (existing) {
      existing.quantity +=
        data.quantity ?? 1;

      return existing.save();
    }

    return shoppingRepository.create({
      ...data,
      userId:
        new mongoose.Types.ObjectId(
          userId
        ),
      productId:
        data.productId instanceof
        mongoose.Types.ObjectId
          ? data.productId
          : new mongoose.Types.ObjectId(
              data.productId
            ),
    });
  }

  async getAll(userId: string) {
    return shoppingRepository.findAll(
      userId
    );
  }

  async getById(id: string) {
    const item =
      await shoppingRepository.findById(
        id
      );

    if (!item) {
      throw new ApiError(
        404,
        "Shopping item not found"
      );
    }

    return item;
  }

  async update(
    id: string,
    data: Partial<IShopping>
  ) {
    const item =
      await shoppingRepository.update(
        id,
        data
      );

    if (!item) {
      throw new ApiError(
        404,
        "Shopping item not found"
      );
    }

    return item;
  }

  async delete(id: string) {
    const item =
      await shoppingRepository.delete(id);

    if (!item) {
      throw new ApiError(
        404,
        "Shopping item not found"
      );
    }

    return item;
  }

  async toggle(id: string) {
    const item =
      await shoppingRepository.findById(
        id
      );

    if (!item) {
      throw new ApiError(
        404,
        "Shopping item not found"
      );
    }

    item.completed =
      !item.completed;

    return item.save();
  }

  async generate(
    userId: string
  ) {
    const pantry =
      await pantryRepository.findLowStock(
        new mongoose.Types.ObjectId(
          userId
        )
      );

    let created = 0;
        for (const item of pantry) {
      const exists =
        await shoppingRepository.findByProduct(
          userId,
          item.productId._id.toString()
        );

      if (exists) {
        continue;
      }

      const requiredQuantity =
        Math.max(
          item.minimumStock - item.quantity,
          1
        );

      const productName = (item.productId as any)?.name ?? '';

      await shoppingRepository.create({
        userId:
          new mongoose.Types.ObjectId(
            userId
          ),

        productId:
          item.productId._id,

        productName,

        quantity: requiredQuantity,

        unit: item.unit,

        completed: false,
      });

      created++;
    }

    return {
      message:
        "Shopping list generated successfully",
      created,
    };
  }
}

export default new ShoppingService();