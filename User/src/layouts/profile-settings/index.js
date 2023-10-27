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
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function ProfileSettings() {
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
          mx: "24px",
        }}
      >
        <SoftBox sx={{ width: "100%" }}>
          <SoftTypography variant="h5" fontWeight="bold" color={"dark"}>
            Profile Settings
          </SoftTypography>
        </SoftBox>
      </Card>
      <SoftBox py={3} mx="24px">
        <Card sx={{ py: 3, px: 4 }}>
          <SoftBox
            sx={{
              width: "100%",
              mb: "20px",
            }}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <SoftTypography>Connect your Account</SoftTypography>
              </AccordionSummary>
              <AccordionDetails>
                <SoftBox
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid container direction="column" alignItems="center" justifyContent="center">
                    <Grid item lg="12">
                      <SoftBox
                        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                      >
                        <SoftBox
                          sx={{
                            width: "500px",
                            height: "64px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: isSteamConnected ? "none" : "1px solid #1383C3",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={handleConnectSteam}
                        >
                          <SoftTypography>
                            {isSteamConnected
                              ? "Connected Steam Account"
                              : "Connect to Steam Account"}
                          </SoftTypography>
                        </SoftBox>
                        {isSteamConnected ? (
                          <CheckCircleOutlinedIcon
                            sx={{ color: "#35b34c", width: "42px", height: "42px", ml: "20px" }}
                          />
                        ) : (
                          ""
                        )}
                      </SoftBox>
                    </Grid>
                    <Grid item lg="12" mt="10px">
                      <SoftBox
                        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                      >
                        <SoftBox
                          sx={{
                            width: "500px",
                            height: "64px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: isDiscordConnected ? "none" : "1px solid #1383C3",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={handleConnectDiscord}
                        >
                          <SoftTypography>
                            {isDiscordConnected
                              ? "Connected Discord Account"
                              : "Connect to Discord Account"}
                          </SoftTypography>
                        </SoftBox>
                        {isDiscordConnected ? (
                          <CheckCircleOutlinedIcon
                            sx={{ color: "#35b34c", width: "42px", height: "42px", ml: "20px" }}
                          />
                        ) : (
                          ""
                        )}
                      </SoftBox>
                    </Grid>
                  </Grid>
                </SoftBox>
              </AccordionDetails>
            </Accordion>
          </SoftBox>
          <SoftBox
            sx={{
              width: "100%",
              mb: "20px",
            }}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <SoftBox sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                  <SoftTypography>Your Name and Email</SoftTypography>
                  <SoftTypography color={"info"} mr="20px">
                    Edit
                  </SoftTypography>
                </SoftBox>
              </AccordionSummary>
              <AccordionDetails>
                <SoftBox
                  sx={{
                    width: "100%",
                    py: "20px",
                  }}
                >
                  <SoftBox
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Grid container>
                      <Grid item lg={2}></Grid>
                      <Grid item lg={3}>
                        <SoftBox
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                          }}
                        >
                          <SoftTypography ml="30px">Full Name</SoftTypography>
                          <SoftTypography ml="30px">Email</SoftTypography>
                        </SoftBox>
                      </Grid>
                      <Grid item lg={1}></Grid>
                      <Grid item lg={6}>
                        <SoftBox
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                          }}
                        >
                          <SoftTypography ml="30px">John Doe</SoftTypography>
                          <SoftTypography ml="30px">JohnDoe@gmail.com</SoftTypography>
                        </SoftBox>
                      </Grid>
                    </Grid>
                  </SoftBox>
                </SoftBox>
              </AccordionDetails>
            </Accordion>
          </SoftBox>
          <SoftBox
            sx={{
              width: "100%",
              mb: "20px",
            }}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <SoftBox sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                  <SoftTypography>Your Password</SoftTypography>
                  <SoftTypography color={"info"} mr="20px">
                    Change
                  </SoftTypography>
                </SoftBox>
              </AccordionSummary>
              <AccordionDetails>
                <SoftBox
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: "20px",
                  }}
                >
                  <Grid container>
                    <Grid item lg={2}></Grid>
                    <Grid item lg={3}>
                      <SoftBox
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <SoftTypography ml="30px">Last Changed</SoftTypography>
                      </SoftBox>
                    </Grid>
                    <Grid item lg={1}></Grid>
                    <Grid item lg={6}>
                      <SoftBox
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          flexDirection: "column",
                        }}
                      >
                        <SoftTypography ml="30px">18 sep, 2023</SoftTypography>
                      </SoftBox>
                    </Grid>
                  </Grid>
                </SoftBox>
              </AccordionDetails>
            </Accordion>
          </SoftBox>
          <SoftBox
            sx={{
              width: "100%",
              mb: "20px",
            }}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <SoftBox sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                  <SoftTypography>Two-Step Verification</SoftTypography>
                  <SoftTypography color={"info"} mr="20px">
                    Turn On
                  </SoftTypography>
                </SoftBox>
              </AccordionSummary>
              <AccordionDetails>
                <SoftBox
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    px: "20px",
                    py: "20px",
                  }}
                >
                  <Grid container direction="column">
                    <Grid item lg="12">
                      <SoftTypography sx={{ color: "grey" }}>
                        What is two-step verification?
                      </SoftTypography>
                    </Grid>
                    <Grid item lg="12" mt="10px">
                      <SoftTypography>
                        Two-step verification is a way to use account more securely. When you
                        perform certain account-related actions, we&apos;ll send a code to your
                        mobile phone that you enter to verify it&apos;s you.
                      </SoftTypography>
                    </Grid>
                  </Grid>
                </SoftBox>
              </AccordionDetails>
            </Accordion>
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProfileSettings;
