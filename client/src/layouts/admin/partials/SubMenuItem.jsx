import { Adjust } from "@mui/icons-material";
import { Divider } from "@mui/material";
import React from "react";
import { MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

export const SubMenuItem = ({ title, url }) => {
  const location = useLocation();
  return (
    <>
      <Link to={url} className="w-100">
        <MenuItem
          icon={
            location.pathname === url ? (
              <Adjust className="fs-6 text-success" />
            ) : (
              <Adjust className="fs-6 text-secondary" />
            )
          }
          className={
            location.pathname === url
              ? "fw-semibold text-success  bg-success bg-opacity-10"
              : "text-secondary"
          }
          active={location.pathname === url}
        >
          {title}
        </MenuItem>
      </Link>
      <Divider />
    </>
  );
};
