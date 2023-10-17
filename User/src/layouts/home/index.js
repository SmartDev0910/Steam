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

import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";

// Data
import { MembersWhiteList, AuthSteam } from "actions/membersAction";

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

function Home() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [isWhiteListed, setIsWhiteListed] = useState(false);
  const [isSteamConnected, setIsSteamConnected] = useState(false);
  const [isDiscordConnected, setIsDiscordConnected] = useState(false);

  const handleConnectSteam = async () => {
    setLoading(true);
    const response = await AuthSteam();
    if (response?.status === 200) {
      console.log("------------", response?.data);
      setIsSteamConnected(true);
    } else {
      toast.error("API Failed");
    }
    setLoading(false);
  };

  const handleConnectDiscord = async () => {
    // setIsDiscordConnected(true);
  };

  const getInitData = async () => {
    setLoading(true);
    const response = await MembersWhiteList(JSON.parse(localStorage.getItem("currentUser"))?._id);
    if (response?.status === 200) {
      setIsWhiteListed(response?.data);
    } else {
      toast.error("API Failed");
    }

    if (JSON.parse(localStorage.getItem("currentUser"))?.steam64) setIsSteamConnected(true);

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
          <Rings color="#4FC0AE" height={240} width={240} />
        </div>
      )}
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
        <SoftBox
          sx={{
            width: "100%",
            height: "calc(100vh - 190px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container direction="column" alignItems="center" justifyContent="center">
            <Grid item lg="12">
              <SoftBox
                sx={{
                  width: "300px",
                  height: "64px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: isSteamConnected ? "none" : "1px solid #4FC0AE",
                  backgroundColor: isSteamConnected ? "#4FC0AE" : "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={handleConnectSteam}
              >
                <SoftTypography sx={{ color: isSteamConnected ? "#fff" : "#4FC0AE" }}>
                  {isSteamConnected ? "Connected Steam Account" : "Connect to Steam Account"}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item lg="12" mt="20px">
              <SoftBox
                sx={{
                  width: "300px",
                  height: "64px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: isDiscordConnected ? "none" : "1px solid #4FC0AE",
                  backgroundColor: isDiscordConnected ? "#4FC0AE" : "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={handleConnectDiscord}
              >
                <SoftTypography sx={{ color: isDiscordConnected ? "#fff" : "#4FC0AE" }}>
                  {isDiscordConnected ? "Connected Discord Account" : "Connect to Discord Account"}
                </SoftTypography>
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default Home;
