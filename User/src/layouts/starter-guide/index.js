import React from "react";

import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const StarterGuide = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox p={3}>
        <Grid container spacing={1}>
          <div>Here will be the content of starter guide</div>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
};

export default StarterGuide;
