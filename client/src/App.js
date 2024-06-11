// App.js
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Frontend page elements
import FrontendLayout from "./layouts/frontend/FrontendLayout";
import Home from "./pages/frontend/Home";
import UserPanelLayout from "./layouts/frontend/UserPanelLayout";
import Profile from "./pages/frontend/userPanel/Profile";
import Applications from "./pages/frontend/userPanel/Applications";
import ApplicationForCopyright from "./pages/frontend/userPanel/ApplicationForCopyright";
import CuktiPottro from "./pages/frontend/userPanel/CuktiPottro";
import ForgotPassword from "./pages/frontend/ForgotPassword";
import ResetPassword from "./pages/frontend/ResetPassword";
import About from "./pages/frontend/About";
import Rules from "./pages/frontend/Rules";
import Documents from "./pages/frontend/Document";
import FAQ from "./pages/frontend/Faq";
import Contact from "./pages/frontend/Contact";
import Kormodetails from "./pages/frontend/Kormodetails";
import NotFoundPage from "./pages/404";
import EmailVerified from "./pages/EmailVerified";
import EmailVerify from "./pages/EmailVerify";

import { Buffer } from "buffer";
import AdminLayout from "./layouts/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import User from "./pages/admin/user/User";
import Patient from "./pages/admin/patient/Patient";
window.Buffer = Buffer;

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  return (
    <Routes>
      {/* Frontend User Panel */}
      <Route path="/" element={<UserPanelLayout />}>
        <Route path="dashboard/user-profile" element={<Profile />} />
        <Route path="dashboard/applicant" element={<Applications />} />
        <Route
          path="dashboard/user-profile/add"
          element={<ApplicationForCopyright />}
        />
        <Route
          path="dashboard/user-profile/agreement-form-add"
          element={<CuktiPottro />}
        />
      </Route>

      {/* Frontend page elements */}
      <Route path="/" exact element={<FrontendLayout />}>
        <Route index element={<Home />} />
        <Route path="copyright" element={<About />} />
        <Route path="rules" element={<Rules />} />
        <Route path="documents" element={<Documents />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
        <Route path="details/:slug" element={<Kormodetails />} />
        {/* auth / */}
        <Route path="verification-email" element={<EmailVerified />} />
        <Route path="verify-email" element={<EmailVerify />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* admin layout  */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<User />} />
        <Route path="patients" element={<Patient />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
