import { Grid } from "@mui/material";
import React from "react";
import DashboardCard from "../../components/custom/dashboard/DashboardCard";
import ChartsOverview from "../../components/custom/dashboard/BarChart";
import StackedAreaChart from "../../components/custom/dashboard/AreaChart";

const Dashboard = () => {
  return (
    <>
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <h4 className="fs-6 text-secondary">Admin Dashboard</h4>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={1.5}>
            <Grid item xs={12} md={6}>
              <DashboardCard
                icon={"fa:users"}
                title={"Users"}
                subTitle={"Total"}
                countNumber={"54"}
                color={"#ffa502"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DashboardCard
                icon={"tdesign:building"}
                title={"Active property"}
                subTitle={"Total"}
                countNumber={"65"}
                color={"#20bf6b"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DashboardCard
                icon={"tdesign:building"}
                title={"Active property"}
                subTitle={"Total"}
                countNumber={"65"}
                color={"#ff4757"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DashboardCard
                icon={"tdesign:building"}
                title={"Active property"}
                subTitle={"Total"}
                countNumber={"65"}
                color={"#8854d0"}
              />
            </Grid>
            <Grid item xs={12}>
              <ChartsOverview />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <StackedAreaChart />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
