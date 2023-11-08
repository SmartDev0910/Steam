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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

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

import { CreateApplicationType } from "actions/applicationsAction";

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

function NewApplication() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [applicationTypeTitle, setApplicationTypeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [roleValue, setRoleValue] = useState('administrator');
  const [permissionValue, setPermissionValue] = useState('whitelist');

  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertVisible, setAlertVisible] = useState("none");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg, isError) => {
    setAlertVisible("visible");
    setAlertSeverity(isError ? "error" : "success");
    setAlertMessage(msg);
  }

  const handleRoleChange = async (event) => {
    setRoleValue(event.target.value);
  };

  const handlePermissionChange = async (event) => {
    setPermissionValue(event.target.value);
  };

  const getInitData = async () => {
    setLoading(true);
    setLoading(false);
  };

  useEffect(() => {
    getInitData();
  }, []);

  const handleCreateNewApplication = async () => {
    const newAppRes = await CreateApplicationType({title: applicationTypeTitle, userGr
    : roleValue, permission: permissionValue});
    if (newAppRes?.status === 200) {
      showAlert("Successfully created a new application", false);
      navigate(`/application-portal`);
    } else {
      showAlert("Technical Error Encountered", true);
    }
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
      <Grid container spacing={1} alignItems="center" sx={{ padding: "10px", marginTop: "50px" }}>
        <Grid item lg={2}></Grid>
        <Grid item lg={3}>
          <SoftTypography ml="30px" mb="15px">Title</SoftTypography>
        </Grid>
        <Grid item lg={0}></Grid>
        <Grid item lg={4}>
          <SoftInput
            value={applicationTypeTitle}
            onChange={(e) => setApplicationTypeTitle(e.target.value)}
          />
        </Grid>
        <Grid item lg={2}></Grid>
      </Grid>
      <Grid container spacing={1} alignItems="center" sx={{ padding: "10px" }}>
        <Grid item lg={2}></Grid>
        <Grid item lg={3}>
          <SoftTypography ml="30px" mb="15px">User Group</SoftTypography>
        </Grid>
        <Grid item lg={0}></Grid>
        <Grid item lg={4} ml="20px">
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={roleValue}
              onChange={(e) => handleRoleChange(e)}
            >
              <FormControlLabel value="app team" control={<Radio />} label="AppTeam" />
              <FormControlLabel value="moderator" control={<Radio />} label="Moderator" />
              <FormControlLabel value="administrator" control={<Radio />} label="Administrator" />
              <FormControlLabel value="superadmin" control={<Radio />} label="Superadmin" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item lg={2}></Grid>
      </Grid>
      <Grid container spacing={1} alignItems="center" sx={{ padding: "10px" }}>
        <Grid item lg={2}></Grid>
        <Grid item lg={3}>
          <SoftTypography ml="30px" mb="15px">Permission</SoftTypography>
        </Grid>
        <Grid item lg={0}></Grid>
        <Grid item lg={4} ml="20px">
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={permissionValue}
              onChange={(e) => handlePermissionChange(e)}
            >
              <FormControlLabel value="whitelist" control={<Radio />} label="Whitelist" />
              <FormControlLabel value="developer" control={<Radio />} label="Developer" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item lg={2}></Grid>
      </Grid>
      <Grid container spacing={1} alignItems="center" sx={{ padding: "10px" }}>
        <Grid item lg={2}></Grid>
        <Grid item lg={3}>
        </Grid>
        <Grid item lg={0}></Grid>
        <Grid item lg={4}>
          <SoftButton
            variant="gradient"
            color={"primary"}
            onClick={() => handleCreateNewApplication()}
          >
            Submit
          </SoftButton>
        </Grid>
        <Grid item lg={2}></Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default NewApplication;
