import type {
  Product,
} from "../../services/product.service";

import ProductCard from "./ProductCard";

interface Props {
  products: Product[];

  onEdit: (product: Product) => void;

  onDelete: (id: string) => void;
}

export default function ProductGrid({
  products,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="grid gap-5">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}