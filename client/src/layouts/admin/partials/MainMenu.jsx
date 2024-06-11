import { Close, Dashboard, ForkRightOutlined, Home } from "@mui/icons-material";
import { Box, Drawer, IconButton, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { theme } from "../../../theme";
import { Link, useLocation } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./sidebar.css";

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

  // const [activeItem, setActiveItem] = useState(false);

  const location = useLocation();

  // useEffect(() => {
  //   // Extract the path from the location object
  //   const currentPath = location.pathname;

  //   // Find the matching sidebar content item based on the path
  //   const matchingItem = sidebarContent.find(
  //     (item) => item.path === currentPath
  //   );

  //   // Update the active item
  //   setActiveItem(matchingItem);
  // }, [location.pathname]);

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
            <div className="border-b p-5">
              <Link to="/">
                <img
                  className="max-h-24 m-auto"
                  src={
                    "https://images.vexels.com/media/users/3/142789/isolated/preview/2bfb04ad814c4995f0c537c68db5cd0b-multicolor-swirls-circle-logo.png"
                  }
                  alt=""
                />
              </Link>
            </div>
            <Menu className="min-h-screen bg-white">
              <Link to="/">
                <MenuItem
                  icon={<Dashboard sx={{ fontSize: "20px" }} />}
                  className={`${
                    location.pathname === "/" ? "bg-blue-50 font-semibold" : ""
                  }`}
                  active={location.pathname === "/"}
                >
                  Dashboard
                </MenuItem>
              </Link>
              <SubMenu
                label="Home"
                icon={<Home sx={{ fontSize: "20px" }} />}
                className={`${
                  location.pathname === "/logo-web-portal" ||
                  location.pathname === "/top-slider" ||
                  location.pathname === "/top-banner" ||
                  location.pathname === "/activity-slider" ||
                  location.pathname === "/top-banner"
                    ? " bg-blue-50"
                    : ""
                }`}
              >
                <Link to="/top-slider">
                  <MenuItem
                    icon={
                      <span
                        className={
                          location.pathname === "/top-slider"
                            ? "dot-green"
                            : "dot-slate"
                        }
                      />
                    }
                    className={
                      location.pathname === "/top-slider"
                        ? "font-semibold bg-slate-100"
                        : ""
                    }
                  >
                    Top slider
                  </MenuItem>
                </Link>
                <MenuItem
                  icon={
                    <span
                      className={
                        location.pathname === ""
                          ? "dot-green"
                          : "dot-slate"
                      }
                    />
                  }
                >
                  Latest news
                </MenuItem>
                <Link to="/top-banner">
                  <MenuItem
                    icon={
                      <span
                        className={
                          location.pathname === "/top-banner"
                            ? "dot-green"
                            : "dot-slate"
                        }
                      />
                    }
                    className={
                      location.pathname === "/top-banner"
                        ? "font-semibold bg-slate-100"
                        : ""
                    }
                  >
                    Top banner
                  </MenuItem>
                </Link>
               
                <Link to="/activity-slider">
                  <MenuItem
                    icon={
                      <span
                        className={
                          location.pathname === "/activity-slider"
                            ? "dot-green"
                            : "dot-slate"
                        }
                      />
                    }
                    className={
                      location.pathname === "/activity-slider"
                        ? "font-semibold bg-slate-100"
                        : ""
                    }
                  >
                    Activity slider
                  </MenuItem>
                </Link>
                <MenuItem
                  icon={
                    <span
                      className={
                        location.pathname === ""
                          ? "dot-green"
                          : "dot-slate"
                      }
                    />
                  }
                >
                  {" "}
                  Recent activity
                </MenuItem>
                <Link to="/logo-web-portal">
                  <MenuItem
                    icon={
                      <span
                        className={
                          location.pathname === "/logo-web-portal"
                            ? "dot-green"
                            : "dot-slate"
                        }
                      />
                    }
                    className={
                      location.pathname === "/logo-web-portal"
                        ? "font-semibold bg-slate-100"
                        : ""
                    }
                  >
                    Logo and web portal
                  </MenuItem>
                </Link>
              </SubMenu>
              <SubMenu
                label="Right bar"
                icon={<ForkRightOutlined sx={{ fontSize: "20px" }} />}
                className={`${
                  location.pathname === "/officer" ||
                  location.pathname === "/rightbar-other" ||
                  location.pathname === "/important-link"
                    ? " bg-blue-50"
                    : ""
                }`}
              >
                <Link to="/officer">
                  <MenuItem
                    icon={
                      <span
                        className={
                          location.pathname === "/officer"
                            ? "dot-green"
                            : "dot-slate"
                        }
                      />
                    }
                    className={
                      location.pathname === "/officer"
                        ? "font-semibold bg-slate-100"
                        : ""
                    }
                  >
                    Officer section
                  </MenuItem>
                </Link>
                <Link to="/important-link">
                  <MenuItem
                    icon={
                      <span
                        className={
                          location.pathname === "/important-link"
                            ? "dot-green"
                            : "dot-slate"
                        }
                      />
                    }
                    className={
                      location.pathname === "/important-link"
                        ? "font-semibold bg-slate-100"
                        : ""
                    }
                  >
                    Important link
                  </MenuItem>
                </Link>
                <Link to="/rightbar-other">
                  <MenuItem
                    icon={
                      <span
                        className={
                          location.pathname === "/rightbar-other"
                            ? "dot-green"
                            : "dot-slate"
                        }
                      />
                    }
                    className={
                      location.pathname === "/rightbar-other"
                        ? "font-semibold bg-slate-100"
                        : ""
                    }
                  >
                    Other section
                  </MenuItem>
                </Link>
              </SubMenu>
            </Menu>
          </Sidebar>
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;
