import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-600 font-semibold">
        Checking Authentication...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
