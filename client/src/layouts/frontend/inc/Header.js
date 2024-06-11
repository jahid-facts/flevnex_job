import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginRegister from "../../../components/login_register/LoginRegister";
import { useAuth } from "../../../utils/authorization";
import { Avatar } from "@mui/material";
import { useGetAuthUserQuery } from "../../../redux/api/authApiSlice";
import Loader from "../../../components/custom/Loader";
import { assets } from "../../../assets";

export default function Header() {
  const { data, isLoading } = useGetAuthUserQuery();
  const { authToken, authUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const publicUrl = process.env.PUBLIC_URL;
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleNavLinkClick = () => {
    if (isNavbarOpen) {
      setIsNavbarOpen(false);
    }
  };

  const handleTogglerClick = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <header className="header navbar-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="nav-inner">
                <nav className="navbar navbar-expand-lg">
                  <Link className="navbar-brand" to="/">
                    <img src={assets.logo} alt="Logo" />
                  </Link>
                  <button
                    className={`navbar-toggler ${isNavbarOpen ? "active" : ""}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded={isNavbarOpen}
                    aria-label="Toggle navigation"
                    onClick={handleTogglerClick}
                  >
                    <span className="toggler-icon" />
                    <span className="toggler-icon" />
                    <span className="toggler-icon" />
                  </button>
                  <div
                    className={`collapse navbar-collapse sub-menu-bar ${
                      isNavbarOpen ? "show" : ""
                    }`}
                    id="navbarSupportedContent"
                  >
                    <ul id="nav" className="navbar-nav ms-auto">
                      {authToken && (
                        <>
                          {authUser?.role_id === 10 ? (
                            <li className="nav-item">
                              <Link
                                className="page-scroll"
                                style={{ paddingTop: "18px" }}
                                to="dashboard/user-profile"
                                onClick={handleNavLinkClick}
                              >
                                <Avatar
                                  src={
                                    data?.data?.image
                                      ? data.data.image
                                      : assets.avatar
                                  }
                                  sizes="sm"
                                  sx={{ width: 32, height: 32 }}
                                />
                              </Link>
                            </li>
                          ) : (
                            <li className="nav-item">
                              <Link
                                className="page-scroll"
                                to="/admin/dashboard"
                                onClick={handleNavLinkClick}
                              >
                                Dashboard
                              </Link>
                            </li>
                          )}
                        </>
                      )}
                      {!authToken && (
                        <li className="nav-item loginButtonSm rounded">
                          <span
                            className="rounded"
                            onClick={() => setShowModal(true)}
                          >
                           Login <span className="dir-part" />
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>

                  {!authToken && (
                    <div
                      className="button loginButtonBG"
                      onClick={() => setShowModal(true)}
                    >
                      <span className="btn white-bg mouse-dir">
                        Login <span className="dir-part" />
                      </span>
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
      <LoginRegister show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
}
