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
import { Link, useNavigate, useLocation } from "react-router-dom";

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

import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";

// Data
import { MembersUpdate } from "actions/membersAction";
import { REACT_APP_SERVER_IP } from "actions/config";
import { useClubAdminController, setAuthentication } from "context";

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

function MyAccount() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const steam64 = queryParams.get("steam64");
  const discordId = queryParams.get("discordId");

  const [controller, dispatch] = useClubAdminController();
  const [loading, setLoading] = useState(false);
  const [isWhiteListed, setIsWhiteListed] = useState(false);
  const [isSteamConnected, setIsSteamConnected] = useState(false);
  const [isDiscordConnected, setIsDiscordConnected] = useState(false);

  const handleConnectSteam = () => {
    if (isSteamConnected) {
      return;
    } else {
      window.open(`${REACT_APP_SERVER_IP}api/auth/steam`, "_self");
    }
  };

  const handleConnectDiscord = () => {
    if (isDiscordConnected) {
      return;
    } else {
      window.open(`${REACT_APP_SERVER_IP}api/auth/discord`, "_self");
    }
  };

  const getInitData = async () => {
    setLoading(true);

    let memberData = {
      email: JSON.parse(localStorage.getItem("currentUser"))?.email,
      ipAddress: JSON.parse(localStorage.getItem("currentUser"))?.ipAddress,
      isBanned: JSON.parse(localStorage.getItem("currentUser"))?.isBanned,
      isWhiteListed: JSON.parse(localStorage.getItem("currentUser"))?.isWhiteListed,
      password: JSON.parse(localStorage.getItem("currentUser"))?.password,
      steam64: JSON.parse(localStorage.getItem("currentUser"))?.steam64,
      discordId: JSON.parse(localStorage.getItem("currentUser"))?.discordId,
    };

    if (JSON.parse(localStorage.getItem("currentUser"))?.steam64) setIsSteamConnected(true);
    if (JSON.parse(localStorage.getItem("currentUser"))?.discordId) setIsDiscordConnected(true);

    if (steam64) {
      memberData.steam64 = steam64;

      const resUser = await MembersUpdate(
        JSON.parse(localStorage.getItem("currentUser"))?._id,
        memberData
      );
      if (resUser?.status === 200) {
        toast.success("Connected");
        setAuthentication(dispatch, JSON.stringify(resUser?.data));
        setIsSteamConnected(true);
      } else {
        toast.error("API Failed");
      }
      navigate("/my-account");
    }

    if (discordId) {
      memberData.discordId = discordId;

      const resUser = await MembersUpdate(
        JSON.parse(localStorage.getItem("currentUser"))?._id,
        memberData
      );
      if (resUser?.status === 200) {
        toast.success("Connected");
        setAuthentication(dispatch, JSON.stringify(resUser?.data));
        setIsDiscordConnected(true);
      } else {
        toast.error("API Failed");
      }
      navigate("/my-account");
    }

    setLoading(false);
  };

  useEffect(() => {
    getInitData();
  }, []);
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
          py: 3,
          px: 4,
        }}
      >
        <SoftBox sx={{ width: "100%" }}>
          <SoftTypography sx={{ color: "#5a5c63", fontWeight: "700", fontSize: "28px" }}>
            My Account
          </SoftTypography>
        </SoftBox>
      </Card>
      <SoftBox py={3}>
        <Grid container spacing={"20px"}>
          <Grid item lg={6}>
            <Card sx={{ py: 3, px: 4 }}>
              <SoftBox sx={{ height: "calc(100vh - 320px)" }}>
                <SoftBox sx={{ display: "flex" }}>
                  <SoftTypography sx={{ color: "#b1b1b1", fontWeight: "600", fontSize: "24px" }}>
                    Account Detail
                  </SoftTypography>
                </SoftBox>
                <SoftBox sx={{ display: "flex", marginTop: "20px" }}>
                  <SoftTypography sx={{ color: "#000", marginRight: "10px" }}>
                    Email:
                  </SoftTypography>
                  <SoftTypography sx={{ color: "#858585" }}>
                    {JSON.parse(localStorage.getItem("currentUser"))?.email}
                  </SoftTypography>
                </SoftBox>
                <SoftBox sx={{ display: "flex", marginTop: "10px" }}>
                  <SoftTypography sx={{ color: "#000", marginRight: "10px" }}>
                    Steam64:
                  </SoftTypography>
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
            </Card>
          </Grid>
          <Grid item lg={6}>
            <Card sx={{ py: 3, px: 4 }}>
              <SoftBox
                sx={{
                  width: "100%",
                  height: "calc(100vh - 320px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid container direction="column" alignItems="center" justifyContent="center">
                  <Grid item lg="12">
                    <SoftBox
                      sx={{
                        width: "500px",
                        height: "64px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: isSteamConnected ? "none" : "1px solid #4FC0AE",
                        backgroundColor: isSteamConnected ? "#ebfffc" : "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={handleConnectSteam}
                    >
                      {isSteamConnected ? (
                        <CheckCircleOutlinedIcon
                          sx={{ color: "#4FC0AE", width: "32px", height: "32px", mr: "6px" }}
                        />
                      ) : (
                        ""
                      )}
                      <SoftTypography sx={{ color: "#4FC0AE" }}>
                        {isSteamConnected ? "Connected Steam Account" : "Connect to Steam Account"}
                      </SoftTypography>
                    </SoftBox>
                  </Grid>
                  <Grid item lg="12" mt={"20px"}>
                    <SoftBox
                      sx={{
                        width: "500px",
                        height: "64px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: isDiscordConnected ? "none" : "1px solid #4FC0AE",
                        backgroundColor: isDiscordConnected ? "#ebfffc" : "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={handleConnectDiscord}
                    >
                      {isDiscordConnected ? (
                        <CheckCircleOutlinedIcon
                          sx={{ color: "#4FC0AE", width: "32px", height: "32px", mr: "6px" }}
                        />
                      ) : (
                        ""
                      )}
                      <SoftTypography sx={{ color: "#4FC0AE" }}>
                        {isDiscordConnected
                          ? "Connected Discord Account"
                          : "Connect to Discord Account"}
                      </SoftTypography>
                    </SoftBox>
                  </Grid>
                </Grid>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MyAccount;
