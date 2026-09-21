import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";

function ProtectedRoute() {
  const { user, loading } = useContext(MyContext);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;