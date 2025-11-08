import { useEffect, useState } from "react";
import WeatherAnalytics from "./WeatherAnalytics";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Product {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}

interface MarketData {
  date: string;
  price: number;
  quantity: number;
}

export default function HackathonDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/products");
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

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const addProduct = async (product: Product) => {
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error("Failed to add product");
      await fetchProducts();
      showToast(`${product.name} added successfully!`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const avgPrice = products.length
    ? (products.reduce((acc, p) => acc + p.price, 0) / products.length).toFixed(2)
    : 0;

  const lowStock = products.some((p) => p.quantity < 5);

  // Voice alert for low stock
  useEffect(() => {
    if (lowStock) {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(
        "Warning! Some products are low in stock."
      );
      synth.speak(utter);
    }
  }, [lowStock]);

  const chartData: MarketData[] = products.map((p) => ({
    date: new Date().toLocaleDateString(),
    price: p.price,
    quantity: p.quantity,
  }));

  // --------------------------
  // Custom Dot for LineChart
  // --------------------------
  const CustomDot = (props: any) => {
    if (props.value == null) return null;
    return (
      <circle
        cx={props.cx}
        cy={props.cy}
        r={props.value > 1000 ? 6 : 4}
        fill={props.value > 1000 ? "red" : "#8884d8"}
      />
    );
  };

  return (
    <div className="p-6 space-y-6 relative">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded shadow z-50">
          {toast}
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-cyan-100 p-4 rounded shadow hover:shadow-lg transition">
          <h3 className="font-bold text-lg">Total Products</h3>
          <p className="text-2xl">{products.length}</p>
        </div>
        <div className="bg-coramed-100 p-4 rounded shadow hover:shadow-lg transition">
          <h3 className="font-bold text-lg">Avg Price</h3>
          <p className="text-2xl">{avgPrice} Ksh</p>
        </div>
        <div
          className={`p-4 rounded shadow hover:shadow-lg transition ${
            lowStock ? "bg-red-100 animate-pulse" : "bg-green-100"
          }`}
        >
          <h3 className="font-bold text-lg">Stock Alert</h3>
          <p className="text-2xl">{lowStock ? "Low Stock!" : "OK"}</p>
        </div>
      </div>

      {/* Weather & Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeatherAnalytics />
        <Products addProduct={addProduct} products={products} />
      </div>

      {/* Market Trends */}
      <div className="dashboard-box p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">📈 Market Trends</h2>
        {loading && <p>Loading analytics...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && chartData.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                strokeWidth={2}
                dot={<CustomDot />}
              />
              <Line type="monotone" dataKey="quantity" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

// --------------------------
// Products.tsx
// --------------------------
interface ProductsProps {
  addProduct: (product: Product) => void;
  products: Product[];
}

function Products({ addProduct, products }: ProductsProps) {
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    price: 0,
    quantity: 0,
  });

  const handleAdd = () => {
    if (!newProduct.name) return alert("Product name is required!");
    if (newProduct.price <= 0 || newProduct.quantity <= 0)
      return alert("Price & quantity must be > 0!");
    addProduct(newProduct);
    setNewProduct({ name: "", price: 0, quantity: 0 });
  };

  return (
    <div className="dashboard-box p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">🌽 My Products</h2>

      <div className="space-y-2 mb-4">
        <div>
          <label className="block font-medium">Product Name</label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Price (Ksh)</label>
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: +e.target.value })
            }
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Quantity</label>
          <input
            type="number"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity: +e.target.value })
            }
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-2 px-4 py-2 bg-coramed-500 text-white rounded hover:bg-coramed-600 transition"
        >
          Add Product
        </button>
      </div>

      <div className="result-box mt-4">
        <h3 className="font-semibold mb-2">🧺 Product List</h3>
        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1">
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
