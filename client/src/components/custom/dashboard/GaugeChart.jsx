import * as React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const settings = {
  width: 80,
  height: 80,
};

export default function ArcDesign({value, color}) {
  return (
    <Gauge
      {...settings}
      value={value}
      cornerRadius="100%"
      innerRadius="70%"
      outerRadius="100%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 10,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: color,
        },
      })}
    />
  );
}
