import {
  FiBox,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import Card from "../Card/Card";
import Button from "../Button/Button";

import type {
  Product,
} from "../../services/product.service";

interface Props {
  product: Product;

  onEdit: (product: Product) => void;

  onDelete: (id: string) => void;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="rounded-2xl bg-green-100 p-4 text-green-600">
            <FiBox size={28} />
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              {product.name}
            </h3>

            <p className="mt-2 text-gray-500">
              Category: {product.category}
            </p>

            <p className="text-gray-500">
              Brand: {product.brand || "-"}
            </p>

            <p className="text-gray-500">
              Unit: {product.defaultUnit}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            className="w-auto bg-blue-600 hover:bg-blue-700"
            onClick={() =>
              onEdit(product)
            }
          >
            <FiEdit2 />
          </Button>

          <Button
            className="w-auto bg-red-600 hover:bg-red-700"
            onClick={() =>
              onDelete(product._id)
            }
          >
            <FiTrash2 />
          </Button>
        </div>
      </div>
    </Card>
  );
}
