import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../components/ui/PageHeader/PageHeader";
import SearchBar from "../../components/ui/SearchBar";
import Button from "../../components/Button/Button";
import Loader from "../../components/ui/Loader/Loader";

import ProductGrid from "../../components/Products/ProductGrid";
import ProductModal from "./ProductModal";

import productService from "../../services/product.service";

import type {
  Product,
  ProductInput,
} from "../../services/product.service";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [editing, setEditing] =
    useState<Product | null>(null);

  async function loadProducts() {
    try {
      const data =
        await productService.getProducts();

      setProducts(data);
    } catch {
      toast.error(
        "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await productService.getProducts();

        setProducts(data);
      } catch {
        toast.error("Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    void fetchProducts();
  }, []);

  async function handleCreate(
    data: ProductInput
  ) {
    try {
      await productService.createProduct(
        data
      );

      toast.success("Product created.");

      setOpen(false);

      loadProducts();
    } catch {
      toast.error(
        "Failed to create product."
      );
    }
  }

  async function handleUpdate(
    data: ProductInput
  ) {
    if (!editing) return;

    try {
      await productService.updateProduct(
        editing._id,
        data
      );

      toast.success("Product updated.");

      setEditing(null);

      setOpen(false);

      loadProducts();
    } catch {
      toast.error(
        "Failed to update product."
      );
    }
  }

  async function handleDelete(id: string) {
    if (
      !window.confirm(
        "Delete this product?"
      )
    )
      return;

    try {
      await productService.deleteProduct(
        id
      );

      toast.success("Deleted.");

      loadProducts();
    } catch {
      toast.error(
        "Delete failed."
      );
    }
  }

  const filteredProducts =
    useMemo(() => {
      return products.filter((p) =>
        p.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }, [products, search]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Products"
        subtitle="Manage your product catalog"
        action={
          <Button
            className="w-auto"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            + Add Product
          </Button>
        }
      />

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search products..."
      />

      <ProductGrid
        products={filteredProducts}
        onEdit={(product) => {
          setEditing(product);
          setOpen(true);
        }}
        onDelete={handleDelete}
      />

      <ProductModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        initialData={editing}
        onSubmit={
          editing
            ? handleUpdate
            : handleCreate
        }
      />
    </div>
  );
}