import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (!isAuthenticated) {
    alert("⚠️ Please log in to access this page!"); // ✅ Show alert if not logged in
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
