import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser({ email: identifier, phone: identifier, password });
      login(res.user);
      localStorage.setItem("token", res.token || res.user.token);
      navigate("/dashboard");
    } catch (err: any) {
      alert("Login failed: " + (err.message || "Unknown"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-box">
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Phone or Email</label>
        <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="analyze-btn" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
      <p>Don’t have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}
