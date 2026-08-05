import { useState } from "react";
import toast from "react-hot-toast";

import Card from "../Card/Card";
import Input from "../Input/Input";
import Button from "../Button/Button";

import productService, {
  type Product,
  type ProductInput,
} from "../../services/product.service";

interface Props {
  product?: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({
  product,
  onSuccess,
  onCancel,
}: Props) {
  const [formData, setFormData] = useState<ProductInput>(() => ({
    name: product?.name ?? "",
    category: product?.category ?? "",
    brand: product?.brand ?? "",
    defaultUnit: product?.defaultUnit ?? "",
  }));

  const [loading, setLoading] = useState(false);

  function handleChange(
    field: keyof ProductInput,
    value: string
  ) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      if (product) {
        await productService.updateProduct(
          product._id,
          formData
        );

        toast.success(
          "Product updated successfully"
        );
      } else {
        await productService.createProduct(
          formData
        );

        toast.success(
          "Product created successfully"
        );
      }

      onSuccess();
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {product
            ? "Edit Product"
            : "Add Product"}
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Product Name"
            value={formData.name}
            onChange={(e) =>
              handleChange(
                "name",
                e.target.value
              )
            }
          />

          <Input
            label="Category"
            value={formData.category}
            onChange={(e) =>
              handleChange(
                "category",
                e.target.value
              )
            }
          />

          <Input
            label="Brand"
            value={formData.brand ?? ""}
            onChange={(e) =>
              handleChange(
                "brand",
                e.target.value
              )
            }
          />

          <Input
            label="Unit"
            value={formData.defaultUnit}
            onChange={(e) =>
              handleChange(
                "defaultUnit",
                e.target.value
              )
            }
          />
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : product
              ? "Update Product"
              : "Save Product"}
          </Button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border px-6 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </Card>
  );
}