import { Close, Dashboard, List, Payments, People } from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { theme } from "../../../theme";
import { Link, useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "./sidebar.css";
import { SubMenuCustom } from "./SubMenuCustom";
import { SubMenuItem } from "./SubMenuItem";
import { assets } from "../../../assets";

const SideBar = ({ setOpen, open }) => {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  useEffect(() => {
    if (!isMdScreen) {
      setOpen(false);
    }
  }, [isMdScreen, setOpen]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const location = useLocation();

  const collapsed = false;
  const breakPoint = true;

  return (
    <>
      <Box sx={{ display: "flex" }} position={"relative"}>
        {isMdScreen ||
          (open && (
            <IconButton
              color="inherit"
              aria-label="Open sidebar"
              edge="start"
              onClick={toggleDrawer}
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                  position: "absolute",
                  top: "35px",
                  left: "330px",
                  zIndex: 9999,
                },
              }}
            >
              <Close />
            </IconButton>
          ))}
        <Drawer
          sx={{
            zIndex: 1000,
            position: "absolute",
            width: "270px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "260px",
              boxSizing: "border-box",
              overflowY: "auto",
              borderRight: "0px",
              boxShadow: theme.palette.boxShadow,
            },
            "& .MuiDrawer-paper::-webkit-scrollbar": {
              width: "3px", // Width of the scrollbar
            },
            "& .MuiDrawer-paper::-webkit-scrollbar-track": {
              background: "#f1f1f1", // Track color
            },
            "& .MuiDrawer-paper::-webkit-scrollbar-thumb": {
              background: "#888", // Thumb color
            },
            display: isMdScreen ? "block" : open ? "block" : "none", // Show on md and larger screens, hide on xs screens unless open
          }}
          variant="persistent"
          anchor="left"
          open={isMdScreen || open} // Open on md and larger screens and when the open state is true
        >
          <Sidebar width="100%" collapsed={collapsed} breakPoint={breakPoint}>
            <div className="py-4 text-center bg-success">
              <Link to="/">
                <img
                  style={{ width: "100%", padding: "10px" }}
                  src={assets.logo}
                  alt=""
                />
              </Link>
            </div>
            <Divider />
            <Menu className="min-h-screen bg-white">
              <Link to="/admin/dashboard" className="w-100">
                <MenuItem
                  href="/admin"
                  icon={<Dashboard sx={{ fontSize: "20px" }} />}
                  className={`${
                    location.pathname === "/admin/dashboard"
                      ? "fw-semibold text-success bg-success bg-opacity-10"
                      : "text-secondary"
                  }`}
                  active={location.pathname === "/admin/dashboard"}
                >
                  Dashboard
                </MenuItem>
              </Link>
              <Divider />
              <Link to="/admin/patients" className="w-100">
                <MenuItem
                  icon={<People sx={{ fontSize: "20px" }} />}
                  className={`${
                    location.pathname === "/admin/patients"
                      ? "fw-semibold text-success bg-success bg-opacity-10"
                      : "text-secondary"
                  }`}
                  active={location.pathname === "/admin/patients"}
                >
                  Patients
                </MenuItem>
              </Link>
              <Divider />
            </Menu>
          </Sidebar>
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;
