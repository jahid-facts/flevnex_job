import { Icon } from "@iconify/react";
import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { theme } from "../../../theme";
import ArcDesign from "./GaugeChart";

const DashboardCard = ({ icon, title, subTitle, countNumber, color }) => {
  const rgbaColor = (opacity) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  return (
    <Card
      sx={{
        boxShadow: theme.palette.boxShadow,
        borderRadius: "10px",
        position: "relative",
        width: "100%",
        height: "100%",
        bgcolor: "#ffffff",
      }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={3}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Box
            p={2}
            mr={2}
            width={"60px"}
            height={"60px"}
            borderRadius={"50px"}
            bgcolor={rgbaColor(0.2)}
            display={"flex"}
            textAlign={"center"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Icon icon={icon} style={{ fontSize: "30px", color: color }} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={"bold"}>
              {countNumber}
            </Typography>
            <Typography
              variant="body1"
              fontWeight={"600"}
              fontSize={"12px"}
              color={"#7f7f7f"}
            >
              {subTitle} {title}
            </Typography>
          </Box>
        </Box>
        <Box>
          <ArcDesign color={color} value={80} />
        </Box>
      </Box>
    </Card>
  );
};

export default DashboardCard;
