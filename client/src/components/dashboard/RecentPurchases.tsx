import Card from "../Card/Card";

import type {
  Purchase,
} from "../../services/purchase.service";

interface Props {
  purchases: Purchase[];
}

export default function RecentPurchases({
  purchases,
}: Props) {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        Recent Purchases
      </h2>

      {purchases.length === 0 ? (
        <p className="text-gray-500">
          No purchases found.
        </p>
      ) : (
        <div className="space-y-4">
          {purchases
            .slice(0, 5)
            .map((purchase) => (
              <div
                key={purchase._id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div>
                  <p className="font-medium">
                    {purchase.store}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(
                      purchase.purchaseDate
                    ).toLocaleDateString()}
                  </p>
                </div>

                <p className="font-semibold">
                  €
                  {purchase.totalAmount.toFixed(
                    2
                  )}
                </p>
              </div>
            ))}
        </div>
      )}
    </Card>
  );
}