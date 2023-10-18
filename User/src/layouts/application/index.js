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

import { CreateApplication } from "actions/applicationAction";

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

function FansEditDetail() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async () => {
    if (JSON.parse(localStorage.getItem("currentUser"))?.steam64 === "") {
      toast.error("Please Connect Steam Account");
    } else if (firstName === "" || lastName === "" || age === "") {
      toast.error("Please Input All Fields");
    } else {
      const applicationData = {
        firstName: firstName,
        lastName: lastName,
        age: age,
      };

      const response = await CreateApplication(
        JSON.parse(localStorage.getItem("currentUser"))?.steam64,
        applicationData
      );
      if (response?.status === 200) {
        toast.success("Application Submitted!");
      } else {
        toast.error("API Failed");
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {loading && (
        <div className={classes.loadingOverlay}>
          <Rings color="#4FC0AE" height={120} width={120} />
        </div>
      )}
      <SoftBox py={3}>
        <Card sx={{ padding: "20px", marginTop: "20px" }}>
          <Grid container spacing={3} alignItems="center" sx={{ padding: "10px" }}>
            <Grid item container lg={12}>
              <Grid item lg={12}>
                <SoftTypography variant="h5" fontWeight="bold" color={"dark"}>
                  Application
                </SoftTypography>
              </Grid>
              {JSON.parse(localStorage.getItem("currentUser"))?.steam64 === "" ? (
                <Grid item lg={12}>
                  <SoftBox
                    sx={{
                      width: "66%",
                      height: "56px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#ffebf5",
                      marginTop: "20px",
                      paddingLeft: "20px",
                    }}
                  >
                    <SoftTypography sx={{ fontSize: 18, color: "#EC4899" }}>
                      You does not yet connect the steam account!
                    </SoftTypography>
                  </SoftBox>
                </Grid>
              ) : (
                ""
              )}

              <Grid
                xs={12}
                md={12}
                lg={12}
                container
                spacing={2}
                sx={{ marginTop: "10px", fontSize: "12px" }}
              >
                <Grid item xs={12} md={4} lg={4} sx={{ marginBottom: 2 }}>
                  <SoftTypography variant="h6" color={"dark"} sx={{ marginBottom: 1 }}>
                    First Name
                  </SoftTypography>
                  <SoftInput
                    icon={false}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid xs={12} md={12} lg={12} container spacing={2} sx={{ fontSize: "12px" }}>
                <Grid item xs={12} md={4} lg={4} sx={{ marginBottom: 2 }}>
                  <SoftTypography variant="h6" color={"dark"} sx={{ marginBottom: 1 }}>
                    Last Name
                  </SoftTypography>
                  <SoftInput
                    icon={false}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={4} sx={{ marginBottom: 2 }}>
                  <SoftTypography variant="h6" color={"dark"} sx={{ marginBottom: 1 }}>
                    Age
                  </SoftTypography>
                  <SoftInput icon={false} value={age} onChange={(e) => setAge(e.target.value)} />
                </Grid>
              </Grid>
              <Grid
                xs={12}
                md={12}
                lg={12}
                container
                spacing={2}
                sx={{ fontSize: "12px", marginTop: "1px" }}
              >
                <Grid item xs={12} md={4} lg={4}>
                  <SoftButton
                    rel="noreferrer"
                    variant="gradient"
                    color="success"
                    sx={{ width: "40%" }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </SoftButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default FansEditDetail;
