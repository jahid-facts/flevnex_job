import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetAuthUserQuery } from "../redux/api/authApiSlice";

const ProtectedRoute = ({ allowedRoles }) => {
  const { data: user, isLoading, isError } = useGetAuthUserQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !user) {
    return <Navigate to="/" replace />;
  }

  const userRole = user?.data?.role?.name;
  const userHasRequiredRole = allowedRoles.includes(userRole);

  if (!userHasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
