import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import NotFoundPage from "../pages/404";
import { useSelector } from "react-redux";

const EmailVerifiedProtectedRoutes = () => {
  const token = useSelector((state) => state.auth.token?.access_token);
  const user = useSelector((state) => state.auth.userInfo?.email_verified_at);

  if (!token) {
    return <NotFoundPage />;
  }

  if (!user) {
    return <Navigate to="/email-verify" replace />;
  }

  return <Outlet />;
};

export default EmailVerifiedProtectedRoutes;
