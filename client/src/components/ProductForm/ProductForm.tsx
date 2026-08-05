import { useState } from "react";
import productService from "../../services/product.service";

interface Props {
  onProductAdded: () => void;
}

export default function ProductForm({
  onProductAdded,
}: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [defaultUnit, setDefaultUnit] =
    useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      await productService.createProduct({
        name,
        category,
        brand,
        defaultUnit,
      });

      setName("");
      setCategory("");
      setBrand("");
      setDefaultUnit("");

      onProductAdded();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-xl bg-white p-6 shadow"
    >
      <h2 className="mb-4 text-xl font-semibold">
        Add Product
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rounded border p-3"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          className="rounded border p-3"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <input
          className="rounded border p-3"
          placeholder="Brand"
          value={brand}
          onChange={(e) =>
            setBrand(e.target.value)
          }
        />

        <input
          className="rounded border p-3"
          placeholder="Unit"
          value={defaultUnit}
          onChange={(e) =>
            setDefaultUnit(e.target.value)
          }
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700"
      >
        {loading
          ? "Saving..."
          : "Save Product"}
      </button>
    </form>
  );
}