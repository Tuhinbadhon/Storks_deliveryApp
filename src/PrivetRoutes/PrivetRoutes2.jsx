import React, { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import useAuth from "../hooks/useAuth";

//this route is use for registration page
//if anyone tries to access registration page after login it wont let that happen

const PrivateRoutes2 = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <span className="loading mx-auto loading-spinner text-warning"></span>
    );
  }

  if (!user) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateRoutes2;
