// src/pages/Register.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
  const [form, setForm] = useState({ phone: "", email: "", password: "", role: "farmer" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form);
      alert("Registration saved (mock). You can now log in.");
      navigate("/login");
    } catch (err: any) {
      alert("Registration failed: " + (err.message || "Unknown"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-box">
      <h1 className="title">Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Phone (required)</label>
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        <label>Email (optional)</label>
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <label>Password</label>
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <label>Role</label>
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="farmer">Farmer</option>
          <option value="broker">Broker</option>
          <option value="admin">Admin</option>
        </select>
        <button className="analyze-btn" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
