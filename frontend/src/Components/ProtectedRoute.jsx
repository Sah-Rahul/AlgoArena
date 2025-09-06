// src/Components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    toast.error("Please login to access this page");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
