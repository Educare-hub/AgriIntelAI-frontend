import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import api from "../../services/api";

export default function MarketTrends() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/market-insights");
        setData(res.data || []);
      } catch (err) {
        console.error("Failed to fetch market trends:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading market trends...</p>;
  if (!data.length) return <p>No market data available.</p>;

  return (
    <div className="dashboard-box">
      <h2 className="title">📈 Market Trends</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="demand" stroke="#2e7d32" />
          <Line type="monotone" dataKey="supply" stroke="#81c784" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
