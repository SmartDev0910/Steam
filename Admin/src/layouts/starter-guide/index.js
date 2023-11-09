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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { Rings } from "react-loader-spinner";

import Alert from '@mui/material/Alert';

import { StarterGuidesAll, CreateStarterGuide, StarterGuideUpdate } from "actions/starterGuidesAction";

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

function StarterGuide() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [myStarterGuideOld, setMyStarterGuideOld] = useState("");
  const [myStarterGuide, setMyStarterGuide] = useState("");
  const [isEditStarterGuide, setIsEditStarterGuide] = useState(false);

  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertVisible, setAlertVisible] = useState("none");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg, isError) => {
    setAlertVisible("visible");
    setAlertSeverity(isError ? "error" : "success");
    setAlertMessage(msg);
  }

  const handleSaveStarterGuide = async () => {
    setLoading(true);
    const res = await CreateStarterGuide(
      { content: myStarterGuideOld }
    );
    if (res?.status === 200) {
      showAlert("Successfully updated", false);

      setMyStarterGuide(myStarterGuideOld);

      setIsEditStarterGuide(false);
    } else {
      showAlert("Technical error encountered", true);
    }
    setLoading(false);
  };

  const resetStarterGuides = async () => {
      const starterGuidesRes = await StarterGuidesAll();
      if (starterGuidesRes?.status === 200) {
        if (starterGuidesRes?.data?.length > 0) {
          setMyStarterGuide(starterGuidesRes?.data[0].content);
        }
      } else {
        showAlert("Technical Error Encountered", true);
      }
  }

  const getInitData = async () => {
    setLoading(true);
    await resetStarterGuides();
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
      <Alert severity={alertSeverity} onClose={() => { setAlertVisible("none") }} sx={{ display: alertVisible }}>{alertMessage}</Alert>
      <SoftBox py={3} mx="20px">
        <Grid item lg={12} sx={{ display: "flex", justifyContent: "flex-end", mb: "10px" }}>
        {isEditStarterGuide ? (
          ""
        ) : (
          <SoftButton
            variant="gradient"
            color={"primary"}
            onClick={() => {setIsEditStarterGuide(true);}}
          >
            Edit
          </SoftButton>
        )}
        </Grid>
        <Card>
          <SoftBox
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >
            {isEditStarterGuide ? (
              <SoftInput
                value={myStarterGuideOld}
                onChange={(e) => setMyStarterGuideOld(e.target.value)}
              />
            ) : (
              <SoftTypography variant="h6" color={"dark"} margin={"20px"} lineHeight={"70px"} >
                {myStarterGuide === "" ? "No content. Please add now." : myStarterGuide}
              </SoftTypography>
            )}
          </SoftBox>
        </Card>
      </SoftBox>
      {isEditStarterGuide ? (
        <SoftBox sx={{ display: "flex", justifyContent: "center" }} mt="30px">
          <SoftButton variant="gradient" color="info" onClick={handleSaveStarterGuide}>
            Save
          </SoftButton>
          <SoftBox width="20px"></SoftBox>
          <SoftButton
            variant="outlined"
            color="info"
            onClick={() => {
              setIsEditStarterGuide(false);
            }}
          >
            Cancel
          </SoftButton>
        </SoftBox>
      ) : (
        ""
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default StarterGuide;
