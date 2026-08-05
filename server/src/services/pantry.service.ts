import mongoose from "mongoose";

import { IPantryItem } from "../models/PantryItem";
import pantryRepository from "../repositories/pantry.repository";
import ApiError from "../utils/ApiError";

class PantryService {
  async create(
    userId: string,
    data: Partial<IPantryItem>
  ) {
    if (!data.productId) {
      throw new ApiError(400, "Product is required");
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const productObjectId =
      data.productId instanceof mongoose.Types.ObjectId
        ? data.productId
        : new mongoose.Types.ObjectId(data.productId);

    const existing =
      await pantryRepository.findByProduct(
        userObjectId,
        productObjectId
      );

    if (existing) {
      existing.quantity += data.quantity ?? 0;

      if (data.expiryDate) {
        existing.expiryDate = data.expiryDate;
      }

      if (data.location) {
        existing.location = data.location;
      }

      if (data.minimumStock !== undefined) {
        existing.minimumStock = data.minimumStock;
      }

      return existing.save();
    }

    return pantryRepository.create({
      ...data,
      userId: userObjectId,
      productId: productObjectId,
    });
  }

  async getAll(userId: string) {
    return pantryRepository.findAllByUser(
      new mongoose.Types.ObjectId(userId)
    );
  }

  async getById(id: string) {
    const item = await pantryRepository.findById(id);

    if (!item) {
      throw new ApiError(
        404,
        "Pantry item not found"
      );
    }

    return item;
  }

  async update(
    id: string,
    data: Partial<IPantryItem>
  ) {
    if (data.productId) {
      data.productId =
        data.productId instanceof
        mongoose.Types.ObjectId
          ? data.productId
          : new mongoose.Types.ObjectId(
              data.productId
            );
    }

    const item =
      await pantryRepository.update(id, data);

    if (!item) {
      throw new ApiError(
        404,
        "Pantry item not found"
      );
    }

    return item;
  }

  async delete(id: string) {
    const item =
      await pantryRepository.delete(id);

    if (!item) {
      throw new ApiError(
        404,
        "Pantry item not found"
      );
    }

    return item;
  }

  async consume(
    id: string,
    quantity: number
  ) {
    const item =
      await pantryRepository.findById(id);

    if (!item) {
      throw new ApiError(
        404,
        "Pantry item not found"
      );
    }

    if (quantity <= 0) {
      throw new ApiError(
        400,
        "Quantity must be greater than zero"
      );
    }

    if (item.quantity < quantity) {
      throw new ApiError(
        400,
        "Insufficient stock"
      );
    }

    item.quantity -= quantity;

    return item.save();
  }

  async lowStock(userId: string) {
    return pantryRepository.findLowStock(
      new mongoose.Types.ObjectId(userId)
    );
  }

  async expiring(userId: string) {
    const next7Days = new Date();

    next7Days.setDate(
      next7Days.getDate() + 7
    );

    return pantryRepository.findExpiring(
      new mongoose.Types.ObjectId(userId),
      next7Days
    );
  }
}

export default new PantryService();