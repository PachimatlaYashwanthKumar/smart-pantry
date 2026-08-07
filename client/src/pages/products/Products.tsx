import { useState } from "react";
import toast from "react-hot-toast";

import ProductForm from "../../components/ProductForm/ProductForm";

import {
  useProducts,
  useDeleteProduct,
} from "../../hooks/useProducts";

import {
  Loader,
  EmptyState,
  PageHeader,
  ConfirmDialog,
  SearchInput,
  Table,
} from "../../components/ui";

import type { Product } from "../../services/product.service";

export default function Products() {
  const { data: products = [], isLoading } =
    useProducts();

  const deleteMutation =
    useDeleteProduct();

  const [search, setSearch] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [deleteId, setDeleteId] =
    useState<string | null>(null);

  const filtered = products.filter((p) =>
    p.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  async function confirmDelete() {
    if (!deleteId) return;

    try {
      await deleteMutation.mutateAsync(deleteId);

      toast.success(
        "Product deleted successfully"
      );
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteId(null);
    }
  }

  if (isLoading) return <Loader />;

  return (
    <div>
      <PageHeader
        title="Products"
        subtitle="Manage your products"
        action={
          <button
            onClick={() =>
              setShowForm(true)
            }
            className="rounded-lg bg-green-600 px-5 py-2 text-white"
          >
            + Add Product
          </button>
        }
      />

      <div className="mb-5">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search products..."
        />
      </div>

      {(showForm || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onSuccess={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {filtered.length === 0 ? (
        <EmptyState
          title="No Products"
          description="Create your first product."
        />
      ) : (
        <Table
          headers={[
            "Name",
            "Category",
            "Brand",
            "Unit",
            "Actions",
          ]}
        >
          {filtered.map((product) => (
            <tr
              key={product._id}
              className="border-t"
            >
              <td className="px-6 py-4">
                {product.name}
              </td>

              <td className="px-6 py-4">
                {product.category}
              </td>

              <td className="px-6 py-4">
                {product.brand}
              </td>

              <td className="px-6 py-4">
                {product.defaultUnit}
              </td>

              <td className="space-x-2 px-6 py-4">
                <button
                  onClick={() =>
                    setEditingProduct(
                      product
                    )
                  }
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    setDeleteId(
                      product._id
                    )
                  }
                  className="rounded bg-red-600 px-3 py-1 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </Table>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        onConfirm={confirmDelete}
        onCancel={() =>
          setDeleteId(null)
        }
      />
    </div>
  );
}