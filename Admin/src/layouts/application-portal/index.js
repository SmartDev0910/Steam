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
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { Rings } from "react-loader-spinner";
import Alert from '@mui/material/Alert';

import DevIcon from "assets/images/dev-icon.png";
import WhitelistIcon from "assets/images/whitelist-icon.png";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { ApplicationTypesAll } from "actions/applicationsAction";

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

function ApplicationPortal() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [myApplicationTypes, setMyApplicationTypes] = useState([]);

  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertVisible, setAlertVisible] = useState("none");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg, isError) => {
    setAlertVisible("visible");
    setAlertSeverity(isError ? "error" : "success");
    setAlertMessage(msg);
  }

  const getInitData = async () => {
    setLoading(true);
    await resetApplicationTypes();
    setLoading(false);
  };

  const resetApplicationTypes = async () => {
    const applicationTypesRes = await ApplicationTypesAll();
    if (applicationTypesRes?.status === 200) {
      if (applicationTypesRes?.data?.length) {
        setMyApplicationTypes(applicationTypesRes?.data);
      } else {
        setMyApplicationTypes([]);
      }
    } else {
      showAlert("Technical Error Encountered", true);
    }
  }

  const getApplicationLogo = (index) => {
    switch (myApplicationTypes[index].permission) {
      case "whitelist":
        return WhitelistIcon;
      case "developer":
        return DevIcon;
      default:
        return WhitelistIcon;
    }
  }

  useEffect(() => {
    getInitData();
  }, []);

  const listApplicants = (index) => {
    const myRole = JSON.parse(localStorage.getItem("currentUser"))?.role;
    if (myRole == "1" || myRole == "2" || myRole == "3")
      navigate(`/application-portal/list?application_type_id=${myApplicationTypes[index]._id}`);
    else
      showAlert("You don't have permission to review applications", true);
  }

  const createNewApplicationType = () => {
    const myRole = JSON.parse(localStorage.getItem("currentUser"))?.role;
    if (myRole == "1" || myRole == "2" || myRole == "3")
      navigate(`/application-portal/create`);
    else
      showAlert("You don't have permission to create a new application", true);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {loading && (
        <div className={classes.loadingOverlay}>
          <Rings color="#4FC0AE" height={120} width={120} />
        </div>
      )}
      <Alert severity={alertSeverity} onClose={() => { setAlertVisible("none") }} sx={{ display: alertVisible }}>{alertMessage}</Alert>
      <SoftBox p={3}>
        <Grid container spacing={1}>
          {
            Array.from(
              { length: parseInt(myApplicationTypes.length) },
              (_, i) => 0 + i
            ).map((index) => {
              return (
                <Grid item lg={6} key={index} sx={{display:"flex", justifyContent:"center"}}>
                  <Card
                    sx={{
                      width: "80%",
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
                    onClick={() => listApplicants(index)}
                  >
                    <SoftAvatar src={getApplicationLogo(index)} sx={{ width: "70px", height: "90px" }} />
                    <SoftTypography sx={{ mt: "10px" }}>{myApplicationTypes[index].title}</SoftTypography>
                  </Card>
                </Grid>
              )
            })
          }
          <Grid item lg={6} sx={{display:"flex", justifyContent:"center"}}>
            <Card
              sx={{
                width: "80%",
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
              onClick={() => createNewApplicationType()}
            >
              <AddCircleOutlineOutlinedIcon sx={{ width: "70px", height: "90px" }} />
              <SoftTypography sx={{ mt: "10px" }}>New Application</SoftTypography>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ApplicationPortal;
