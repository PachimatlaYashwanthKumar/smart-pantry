import { useCallback, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

import ProductForm from "../../components/ProductForm/ProductForm";
import ProductTable from "../../components/ProductTable/ProductTable";
import DeleteDialog from "../../components/DeleteDialog/DeleteDialog";

import productService, {
  type Product,
} from "../../services/product.service";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [deleteProductId, setDeleteProductId] =
    useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

      const data =
        await productService.getProducts();

      setProducts(data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      await loadProducts();
    }

    void fetchProducts();
  }, [loadProducts]);

  async function handleDelete() {
    if (!deleteProductId) return;

    try {
      await productService.deleteProduct(
        deleteProductId
      );

      toast.success(
        "Product deleted successfully"
      );

      setDeleteProductId(null);

      loadProducts();
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete product");
    }
  }

  function handleEdit(product: Product) {
    setEditingProduct(product);

    setShowForm(true);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <button
          onClick={() =>
            setShowForm(!showForm)
          }
          className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          <FiPlus />

          {showForm
            ? "Close"
            : "Add Product"}
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <ProductForm
            product={editingProduct}
            onSuccess={() => {
              setShowForm(false);

              setEditingProduct(null);

              loadProducts();
            }}
            onCancel={() => {
              setShowForm(false);

              setEditingProduct(null);
            }}
          />
        </div>
      )}

      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          Loading...
        </div>
      ) : (
        <ProductTable
          products={products}
          onDelete={(id) =>
            setDeleteProductId(id)
          }
          onEdit={handleEdit}
        />
      )}

      <DeleteDialog
        open={!!deleteProductId}
        onCancel={() =>
          setDeleteProductId(null)
        }
        onConfirm={handleDelete}
      />
    </div>
  );
}