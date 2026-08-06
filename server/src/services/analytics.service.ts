import Purchase from "../models/Purchase";

class AnalyticsService {
  async getMonthlySpending(userId: string) {
    return Purchase.aggregate([
      {
        $match: {
          userId: Purchase.db.base.Types.ObjectId.createFromHexString(userId),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$purchaseDate" },
            month: { $month: "$purchaseDate" },
          },
          totalSpent: {
            $sum: "$totalAmount",
          },
          purchaseCount: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
  }

  async getSummary(userId: string) {
    const summary = await Purchase.aggregate([
      {
        $match: {
          userId: Purchase.db.base.Types.ObjectId.createFromHexString(userId),
        },
      },
      {
        $group: {
          _id: null,
          totalSpent: {
            $sum: "$totalAmount",
          },
          averagePurchase: {
            $avg: "$totalAmount",
          },
          totalPurchases: {
            $sum: 1,
          },
          highestPurchase: {
            $max: "$totalAmount",
          },
        },
      },
    ]);

    return summary[0] ?? {
      totalSpent: 0,
      averagePurchase: 0,
      totalPurchases: 0,
      highestPurchase: 0,
    };
  }
}

export default new AnalyticsService();