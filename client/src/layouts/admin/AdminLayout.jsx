import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import SideBar from "./partials/SideBar";
import TopBar from "./partials/TopBar";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Check if theme is available before accessing breakpoints
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const location = useLocation().pathname;
  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  return (
    <Box sx={{ display: "flex" }} position="relative">
      {drawerOpen && (
        <Box
          onClick={toggleDrawer}
          bgcolor="#00000050"
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex={999}
        ></Box>
      )}
      <SideBar setOpen={setDrawerOpen} open={drawerOpen} />
      <Box
        px={2}
        pt={4}
        pb={8}
        sx={{
          // background: "#d0d5da",
          background: "#f4f9ff",
          minHeight: "100vh",
          width: "-webkit-fill-available",
          marginLeft: isMdScreen ? "260px" : "0",
          transition: "0.3s ease-in-out",
        }}
      >
        <TopBar setOpen={setDrawerOpen} open={drawerOpen} />
        <Outlet />
      </Box>
      <Box
        textAlign={"center"}
        position={"fixed"}
        bottom={0}
        left={0}
        right={0}
        zIndex={99}
        boxShadow={"0px -11px 40px 4px rgba(112, 144, 176, 0.18)"}
        sx={{
          background: "#fff",
        }}
      >
        <Typography
          py={2}
          variant="body1"
          fontWeight={"600"}
          fontSize={"12px"}
          color={"#7f7f7f"}
        >
          Copyright &copy; 2024{" "}
          <Link className="text-primary" to={"http://www.google.com"} target="_blank">
           Company name
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminLayout;
