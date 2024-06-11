import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import {
  useGetAuthUserQuery,
  useLogoutMutation,
} from "../redux/api/authApiSlice";
import { logout } from "../redux/features/auth/authSlice";

const ProtectedRoute = ({ allowedRoles }) => {
  const dispatch = useDispatch();
  const { data: user, isLoading, isError } = useGetAuthUserQuery();
  const [logoutApi] = useLogoutMutation();

  useEffect(() => {
    if (isError || !user) {
      logoutApi().unwrap();
      dispatch(logout());
    }
    // eslint-disable-next-line
  }, [isError, user, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user?.data?.role?.name;
  const userHasRequiredRole = allowedRoles.includes(userRole);

  if (!userHasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
