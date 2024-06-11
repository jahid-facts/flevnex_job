import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetAuthUserQuery } from "../redux/api/authApiSlice";
import { useSelector } from "react-redux";

const LoginProtectedRoute = () => {
  const { data: user, isLoading, isError } = useGetAuthUserQuery();
  const token = useSelector((state) => state.auth.token?.access_token);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !token) {
    return <Outlet />;
  }

  const userRole = user?.data?.role?.name;
  if (userRole === "applicant") {
    return <Navigate to="/membership" replace />;
  }

  return <Navigate to="/profile" replace />;
};

export default LoginProtectedRoute;
