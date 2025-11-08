import { useEffect, useState } from "react";

interface Product {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    price: 0,
    quantity: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from backend
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product to backend
  const handleAdd = async () => {
    if (!newProduct.name) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) throw new Error("Failed to add product");

      setNewProduct({ name: "", price: 0, quantity: 0 });
      fetchProducts(); // refresh list immediately
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-box p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">🌽 My Products</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {loading && <p className="text-gray-500 mb-2">Loading...</p>}

      <div className="space-y-2 mb-4">
        <label>Product Name</label>
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <label>Price (Ksh)</label>
        <input
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: +e.target.value })}
          className="border p-2 w-full rounded"
        />

        <label>Quantity</label>
        <input
          type="number"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: +e.target.value })}
          className="border p-2 w-full rounded"
        />

        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleAdd}
          disabled={loading}
        >
          Add Product
        </button>
      </div>

      <div className="result-box">
        <h3>🧺 Product List</h3>
        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <ul>
            {products.map((p, i) => (
              <li key={i}>
                {p.name} — {p.quantity} units @ Ksh {p.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
