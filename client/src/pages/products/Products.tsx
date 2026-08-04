import { useEffect, useState } from "react";
import productService, { type Product } from "../../services/product.service";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProducts();
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Products
      </h1>

      <div className="rounded-lg bg-white shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Brand</th>
              <th className="p-4 text-left">Unit</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b"
              >
                <td className="p-4">
                  {product.name}
                </td>

                <td className="p-4">
                  {product.category}
                </td>

                <td className="p-4">
                  {product.brand}
                </td>

                <td className="p-4">
                  {product.defaultUnit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}