import {
  EmailOutlined,
  Menu,
  NotificationsActiveOutlined,
} from "@mui/icons-material";
import { Badge, Box, Grid, InputBase } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import AvatarMenu from "./Avater";
import { theme } from "../../../theme";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    border:"none",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const TopBar = ({ setOpen, open }) => {
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
      <Box
        borderRadius={"10px"}
        mb={3}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        position={"sticky"}
        top={0}
        left={0}
        right={0}
        zIndex={99}
        boxShadow={theme.palette.boxShadow}
        sx={{
          background: "#fff",
          backdropFilter: "blur(1px)",
        }}
      >
        <Search
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <SearchIconWrapper>
            <Search />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <Grid container spacing={2} alignItems="end">
          <Grid item xs={12} position={"sticky"} top={0} left={0} right={0}>
            <Box
              display={"flex"}
              alignItems={"end"}
              justifyContent={"flex-end"}
              borderRadius={"30px"}
              p={1}
              pl={{ md: 2 }}
              sx={{
                float: "right",
                width: { xs: "-webkit-fill-available", md: "fit-content" },
              }}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{ width: { xs: "100%", md: "auto" } }}
              >
                <Box
                  color="inherit"
                  aria-label="Open sidebar"
                  edge="start"
                  onClick={toggleDrawer}
                  sx={{
                    cursor: "pointer",
                    display: { xs: "block", md: "none" },
                    ml: 2,
                  }}
                >
                  <Menu />
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Link to={"/admin/profile"}>
                    <Badge
                      max={9}
                      badgeContent={10}
                      color="secondary"
                      sx={{
                        marginRight: "30px",
                      }}
                    >
                      <NotificationsActiveOutlined
                        sx={{ fontSize: "21px" }}
                        color="action"
                      />
                    </Badge>
                  </Link>
                  <Link to={"/admin/profile"}>
                    <Badge
                      max={9}
                      badgeContent={10}
                      color="secondary"
                      sx={{
                        marginRight: "30px",
                      }}
                    >
                      <EmailOutlined sx={{ fontSize: "21px" }} color="action" />
                    </Badge>
                  </Link>
                  <AvatarMenu />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TopBar;
