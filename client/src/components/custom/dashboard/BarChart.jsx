import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Card } from "@mui/material";
import { theme } from "../../../theme";

export default function ChartsOverview() {
  return (
    <Card
      sx={{
        boxShadow: theme.palette.boxShadow,
        borderRadius: "10px",
        padding: "20px 10PX",
        position: "relative",
        width: "100%",
        height: "100%",
        bgcolor: "#ffffff",
      }}
    >
      <BarChart
        series={[
          { data: [35, 44, 24, 34] },
          { data: [51, 6, 49, 30] },
          { data: [15, 25, 30, 50] },
          { data: [60, 50, 15, 25] },
        ]}
        height={290}
        xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </Card>
  );
}
