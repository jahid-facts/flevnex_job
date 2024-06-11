import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetAuthUserQuery } from "../redux/api/authApiSlice";
import { logout } from "../redux/authSlice"; // Assuming you have a logout action in your authSlice

const ProtectedRoute = ({ allowedRoles, requiredPermissions }) => {
  const dispatch = useDispatch();
  const { data: user, isLoading, isError } = useGetAuthUserQuery();

  useEffect(() => {
    if (isError || !user) {
      dispatch(logout());
    }
  }, [isError, user, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user?.data?.role?.name;
  const userPermissions = user?.data?.permissions || [];

  const userHasRequiredRole = allowedRoles.includes(userRole);
  const userHasRequiredPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!userHasRequiredRole || !userHasRequiredPermissions) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

{
  /* <Route
  element={<ProtectedRoute allowedRoles={['Admin']} requiredPermissions={['VIEW_DASHBOARD']} />}
>
  <Route path="admin/dashboard" element={<Dashboard />} />
</Route>

<Route
  element={<ProtectedRoute allowedRoles={['Admin']} requiredPermissions={['MANAGE_USERS']} />}
>
  <Route path="admin/users" element={<Users />} />
</Route> */
}
