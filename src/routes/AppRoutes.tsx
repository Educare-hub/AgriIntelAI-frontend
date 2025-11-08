import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../components/Dashboard/Dashboard";
import MarketTrends from "../components/Dashboard/MarketTrends";
import WeatherAnalytics from "../components/Dashboard/WeatherAnalytics";
import Products from "../components/Dashboard/Products";
import Community from "../components/Dashboard/Community";
import Profile from "../components/Dashboard/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/market-trends"
        element={
          <ProtectedRoute>
            <MarketTrends />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/weather"
        element={
          <ProtectedRoute>
            <WeatherAnalytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/community"
        element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
