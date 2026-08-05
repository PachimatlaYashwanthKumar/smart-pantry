import {
  FiEdit,
  FiTrash2,
} from "react-icons/fi";

import type { Product } from "../../services/product.service";

interface Props {
  product: Product;
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
}

export default function ProductRow({
  product,
  onDelete,
  onEdit,
}: Props) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">{product.name}</td>

      <td className="p-4">
        {product.category}
      </td>

      <td className="p-4">
        {product.brand || "-"}
      </td>

      <td className="p-4">
        {product.defaultUnit}
      </td>

      <td className="space-x-2 p-4 text-center">
        <button
          onClick={() => onEdit(product)}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          <FiEdit />
        </button>

        <button
          onClick={() =>
            onDelete(product._id)
          }
          className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
        >
          <FiTrash2 />
        </button>
      </td>
    </tr>
  );
}