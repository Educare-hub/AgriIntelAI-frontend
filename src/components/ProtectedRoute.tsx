import { useContext, type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}
