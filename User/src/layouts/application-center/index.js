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
import { useNavigate } from "react-router-dom";

// @mui material components
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { Rings } from "react-loader-spinner";
import { toast } from "react-toastify";

import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";

const useStyles = makeStyles({
  loadingOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    transform: "translate(-50%, -50%)",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: "100",
  },
});

function ApplicationCenter() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getInitData = async () => {
    setLoading(true);
    setLoading(false);
  };

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {loading && (
        <div className={classes.loadingOverlay}>
          <Rings color="#4FC0AE" height={120} width={120} />
        </div>
      )}
      <SoftBox p={3}>
        <Grid container spacing={3}>
          <Grid item lg={6}>
            <Card
              sx={{
                width: "500px",
                height: "240px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "2px solid grey",
                float: "right",
              }}
              onClick={() => navigate("/application-center/whitelist-application")}
            >
              <TaskOutlinedIcon sx={{ width: "70px", height: "90px" }} />
              <SoftTypography sx={{ mt: "10px" }}>Whitelist Application</SoftTypography>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Card
              sx={{
                width: "500px",
                height: "240px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid grey",
                cursor: "pointer",
                float: "left",
              }}
            >
              <CodeOutlinedIcon sx={{ width: "70px", height: "90px" }} />
              <SoftTypography sx={{ mt: "10px" }}>Dev Application</SoftTypography>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Card
              sx={{
                width: "500px",
                height: "240px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "2px solid grey",
                float: "right",
              }}
              onClick={() => navigate("/application-center/whitelist-application")}
            >
              <TaskOutlinedIcon sx={{ width: "70px", height: "90px" }} />
              <SoftTypography sx={{ mt: "10px" }}>Application 3</SoftTypography>
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Card
              sx={{
                width: "500px",
                height: "240px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid grey",
                cursor: "pointer",
                float: "left",
              }}
            >
              <TaskOutlinedIcon sx={{ width: "70px", height: "90px" }} />
              <SoftTypography sx={{ mt: "10px" }}>Application 4</SoftTypography>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ApplicationCenter;
