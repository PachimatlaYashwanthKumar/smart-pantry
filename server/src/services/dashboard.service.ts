import mongoose from "mongoose";

import productRepository from "../repositories/product.repository";
import purchaseRepository from "../repositories/purchase.repository";
import pantryRepository from "../repositories/pantry.repository";

class DashboardService {
  async getSummary(userId: string) {
  const userObjectId = new mongoose.Types.ObjectId(userId);

  const [
    products,
    purchases,
    pantryItems,
    lowStockItems,
    expiringItems,
  ] = await Promise.all([
    productRepository.findAll(userId),
    purchaseRepository.findAllByUser(userId),
    pantryRepository.findAllByUser(userObjectId),
    pantryRepository.findLowStock(userObjectId),
    pantryRepository.findExpiring(
      userObjectId,
      (() => {
        const d = new Date();
        d.setDate(d.getDate() + 7);
        return d;
      })()
    ),
  ]);

  const inventoryQuantity = pantryItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalSpent = purchases.reduce(
    (sum, purchase) => sum + purchase.totalAmount,
    0
  );

  const averagePurchaseValue =
    purchases.length === 0
      ? 0
      : totalSpent / purchases.length;

  const lastPurchaseDate =
    purchases.length > 0
      ? purchases[0].purchaseDate
      : null;

  return {
    totalProducts: products.length,

    totalPurchases: purchases.length,

    totalPantryItems: pantryItems.length,

    inventoryQuantity,

    totalSpent,

    averagePurchaseValue,

    lastPurchaseDate,

    lowStockItems: lowStockItems.length,

    expiringItems: expiringItems.length,
  };
}
}

export default new DashboardService();