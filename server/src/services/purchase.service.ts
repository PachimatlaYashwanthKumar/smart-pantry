import mongoose, { Types } from "mongoose";

import { IPurchase } from "../models/Purchase";
import purchaseRepository from "../repositories/purchase.repository";
import pantryRepository from "../repositories/pantry.repository";
import ApiError from "../utils/ApiError";

class PurchaseService {
  async create(
    userId: string,
    purchaseData: Partial<IPurchase>
  ) {
    const totalAmount =
      purchaseData.items?.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      ) ?? 0;

    const purchase = await purchaseRepository.create({
      ...purchaseData,
      userId: new Types.ObjectId(userId),
      totalAmount,
    });

    const userObjectId = new mongoose.Types.ObjectId(userId);

    for (const item of purchase.items) {
      const existing =
        await pantryRepository.findByProduct(
          userObjectId,
          item.productId
        );

      if (existing) {
        await pantryRepository.increaseStock(
          userObjectId,
          item.productId,
          item.quantity
        );
      } else {
        await pantryRepository.createStock({
          userId: userObjectId,
          productId: item.productId,
          quantity: item.quantity,
          unit: item.unit,
          minimumStock: 1,
        });
      }
    }

    return purchase;
  }

  async getAll(userId: string) {
    return purchaseRepository.findAllByUser(userId);
  }

  async getById(id: string) {
    const purchase =
      await purchaseRepository.findById(id);

    if (!purchase) {
      throw new ApiError(
        404,
        "Purchase not found"
      );
    }

    return purchase;
  }

  async update(
    id: string,
    purchaseData: Partial<IPurchase>
  ) {
    const existingPurchase =
      await purchaseRepository.findById(id);

    if (!existingPurchase) {
      throw new ApiError(
        404,
        "Purchase not found"
      );
    }

    const items =
      purchaseData.items ??
      existingPurchase.items;

    const totalAmount = items.reduce(
      (sum, item) =>
        sum + item.quantity * item.price,
      0
    );

    const updatedPurchase =
      await purchaseRepository.update(id, {
        ...purchaseData,
        totalAmount,
      });

    if (!updatedPurchase) {
      throw new ApiError(
        404,
        "Purchase not found"
      );
    }

    return updatedPurchase;
  }

  async delete(id: string) {
    const purchase =
      await purchaseRepository.delete(id);

    if (!purchase) {
      throw new ApiError(
        404,
        "Purchase not found"
      );
    }

    return purchase;
  }
}

export default new PurchaseService();