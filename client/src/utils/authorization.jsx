import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGetAuthUserQuery } from "../redux/api/authApiSlice";
import Loader from "../components/custom/Loader";
import { useSelector } from "react-redux";

// Custom hook to get authenticated user data
export const useAuth = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.userInfo);
  return { authToken: token ?? null, authUser: user ?? null };
};

// Custom hook to check if the user is an Admin
export const useAdmin = () => {
  const { data: user, isLoading } = useGetAuthUserQuery();
  if (isLoading) {
    return false;
  }
  const userRole = user?.data?.role?.name;
  const isAdmin = userRole === "Admin";
  return isAdmin;
};



// Component to handle application fees page access
export const ApplicationFess = () => {
  const { data, isLoading } = useGetAuthUserQuery();
  const roleMember = data?.data?.role?.name === "applicant";

  if (isLoading) {
    return <Loader />;
  }

  if (roleMember) {
    return <Navigate to="/membership" replace />;
  }

  return <Outlet />;
};
