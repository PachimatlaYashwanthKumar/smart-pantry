import ProductRow from "../ProductRow/ProductRow";
import type { Product } from "../../services/product.service";

interface Props {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
}

export default function ProductTable({
  products,
  onDelete,
  onEdit,
}: Props) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <p className="text-gray-500">
          No products found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Brand</th>
            <th className="p-4 text-left">Unit</th>
            <th className="p-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product._id}
              product={product}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}