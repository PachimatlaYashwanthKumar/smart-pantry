import { useEffect, useState } from "react";

import ProductForm from "../../components/ProductForm/ProductForm";
import productService, {
  type Product,
} from "../../services/product.service";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts(showLoading = true) {
    try {
      if (showLoading) {
        setLoading(true);
      }

      const data = await productService.getProducts();

      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchProducts() {
      await loadProducts(false);
    }

    void fetchProducts();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await productService.deleteProduct(id);

      await loadProducts();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Products
      </h1>

      <ProductForm
        onProductAdded={loadProducts}
      />

      <div className="mt-8 rounded-xl bg-white shadow">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No products found.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Brand
                </th>

                <th className="p-4 text-left">
                  Unit
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    {product.name}
                  </td>

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
                      className="rounded bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      className="rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}