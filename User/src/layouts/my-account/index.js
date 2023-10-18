/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { makeStyles } from "@mui/styles";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function MyAccount() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          overflow: "visible",
          zIndex: 2,
          mt: 0,
          py: 4,
          px: 4,
        }}
      >
        <SoftBox sx={{ width: "100%" }}>
          <SoftTypography sx={{ color: "#5a5c63", fontWeight: "700", fontSize: "36px" }}>
            My Account
          </SoftTypography>
          <SoftBox sx={{ mt: "20px" }}>
            <SoftBox sx={{ display: "flex" }}>
              <SoftTypography sx={{ color: "#000", marginRight: "10px" }}>Email:</SoftTypography>
              <SoftTypography sx={{ color: "#858585" }}>
                {JSON.parse(localStorage.getItem("currentUser"))?.email}
              </SoftTypography>
            </SoftBox>
            <SoftBox sx={{ display: "flex", marginTop: "10px" }}>
              <SoftTypography sx={{ color: "#000", marginRight: "10px" }}>Steam64:</SoftTypography>
              <SoftTypography sx={{ color: "#858585" }}>
                {JSON.parse(localStorage.getItem("currentUser"))?.steam64
                  ? JSON.parse(localStorage.getItem("currentUser"))?.steam64
                  : "Not connected the steam account"}
              </SoftTypography>
            </SoftBox>
            <SoftBox sx={{ display: "flex", marginTop: "10px" }}>
              <SoftTypography sx={{ color: "#000", marginRight: "10px" }}>
                Discord ID:
              </SoftTypography>
              <SoftTypography sx={{ color: "#858585" }}>
                {JSON.parse(localStorage.getItem("currentUser"))?.discordId
                  ? JSON.parse(localStorage.getItem("currentUser"))?.discordId
                  : "Not connected the discord account"}
              </SoftTypography>
            </SoftBox>
            <SoftBox sx={{ display: "flex", marginTop: "10px" }}>
              <SoftTypography sx={{ color: "#000", marginRight: "10px" }}>
                IP Address:
              </SoftTypography>
              <SoftTypography sx={{ color: "#858585" }}>
                {JSON.parse(localStorage.getItem("currentUser"))?.ipAddress}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default MyAccount;
