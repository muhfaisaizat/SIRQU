//protectedRoute.js

import React from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const getCurrentRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    if (decoded.exp < currentTime) {
      // Token is expired
      localStorage.removeItem("token");
      return null;
    }

    return decoded.role;
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};

const ProtectedRoute = ({ element, role, ...rest }) => {
  const currentRole = getCurrentRole();
  const location = useLocation();

  if (!currentRole) {
    return <Navigate to="/" />;
  }

  if (role && currentRole !== role) {
    if (currentRole === "Admin") {
      return <Navigate to="/admin-panel" />;
    }else if (role === "Kasir") {
      return <Navigate to="/admin-panel" />;
    }else {
      return <Navigate to="/" />;
    }
  }

  return element;
};


export default ProtectedRoute;