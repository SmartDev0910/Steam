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
import { useNavigate, useLocation } from "react-router-dom";

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
import SoftInput from "components/SoftInput";
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
import { ChangePassword, MembersUpdate } from "actions/membersAction";
import { ListRoleById } from "actions/rolesAction";
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
  const discordID = queryParams.get("discordID");

  const [controller, dispatch] = useClubAdminController();
  const [loading, setLoading] = useState(false);
  const [fullNameOld, setFullNameOld] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailOld, setEmailOld] = useState("");
  const [email, setEmail] = useState("");
  const [passwordLastChanged, setPasswordLastChanged] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [role, setRole] = useState("");
  const [isSteamConnected, setIsSteamConnected] = useState(false);
  const [isDiscordConnected, setIsDiscordConnected] = useState(false);
  const [isOpenNamePane, setIsOpenNamePane] = useState(false);
  const [isOpenPasswordPane, setIsOpenPasswordPane] = useState(false);
  const [isEditNameAndEmail, setIsEditNameAndEmail] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isTwoStepVerification, setIsTwoSteamVerification] = useState(false);

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
    ListRoleById
    const roleDetailRes = await ListRoleById(JSON.parse(localStorage.getItem("currentUser"))?.role);
    let roleName = "ordinary";
    if (roleDetailRes?.status === 200) {
      roleName = roleDetailRes.data.name;
    }
    let memberData = {
      name: JSON.parse(localStorage.getItem("currentUser"))?.name,
      email: JSON.parse(localStorage.getItem("currentUser"))?.email,
      role: JSON.parse(localStorage.getItem("currentUser"))?.role,
      ipAddress: JSON.parse(localStorage.getItem("currentUser"))?.ipAddress,
      isBanned: JSON.parse(localStorage.getItem("currentUser"))?.isBanned,
      isWhiteListed: JSON.parse(localStorage.getItem("currentUser"))?.isWhiteListed,
      password: JSON.parse(localStorage.getItem("currentUser"))?.password,
      passwordLastChanged: JSON.parse(localStorage.getItem("currentUser"))?.passwordLastChanged,
      steam64: JSON.parse(localStorage.getItem("currentUser"))?.steam64,
      discordID: JSON.parse(localStorage.getItem("currentUser"))?.discordID,
    };
    setFullName(memberData.name)
    setFullNameOld(memberData.name)
    setEmail(memberData.email)
    setEmailOld(memberData.email)
    setRole(roleName)
    setPasswordLastChanged(memberData.passwordLastChanged?.substring(0, 10))

    const mySteam64 = JSON.parse(localStorage.getItem("currentUser"))?.steam64
    const myDiscord = JSON.parse(localStorage.getItem("currentUser"))?.discordID

    if (mySteam64 && mySteam64.length > 0) setIsSteamConnected(true);
    if (myDiscord && myDiscord.length > 0) setIsDiscordConnected(true);

    if (steam64) {
      memberData.steam64 = steam64;

      const resUser = await MembersUpdate(
        JSON.parse(localStorage.getItem("currentUser"))?._id,
        {steam64}
      );
      if (resUser?.status === 200) {
        toast.success("Connected");
        setAuthentication(dispatch, JSON.stringify(resUser?.data));
        setIsSteamConnected(true);
      } else {
        toast.error("Technical error encountered");
      }
      navigate("/profile-settings");
    }

    if (discordID) {
      memberData.discordID = discordID;

      const resUser = await MembersUpdate(
        JSON.parse(localStorage.getItem("currentUser"))?._id,
        {discordID}
      );
      if (resUser?.status === 200) {
        toast.success("Connected");
        setAuthentication(dispatch, JSON.stringify(resUser?.data));
        setIsDiscordConnected(true);
      } else {
        toast.error("Technical error encountered");
      }
      navigate("/profile-settings");
    }

    setLoading(false);
  };

  useEffect(() => {
    getInitData();
  }, []);

  const handleSaveUserName = async () => {
    setLoading(true);
    const resUser = await MembersUpdate(
      JSON.parse(localStorage.getItem("currentUser"))?._id,
      { name: fullNameOld, emailOld }
    );
    if (resUser?.status === 200) {
      toast.success("Successfully updated");

      setFullName(fullNameOld)
      setEmail(emailOld)

      const memberData = JSON.parse(localStorage.getItem("currentUser"));
      memberData.name = fullNameOld;
      memberData.email = emailOld;
      localStorage.setItem("currentUser", JSON.stringify(memberData))

      setIsEditNameAndEmail(false);
    } else {
      toast.error("Technical error encountered");
    }
    setLoading(false);
  };

  const handleChangePassword = async () => {
    setLoading(true);
    const resUser = await ChangePassword(
      JSON.parse(localStorage.getItem("currentUser"))?._id,
      { currentPassword, newPassword }
    );
    if (resUser?.status === 200) {
      toast.success("Successfully updated");
      const memberData = JSON.parse(localStorage.getItem("currentUser"));
      memberData.passwordLastChanged = resUser.data.passwordLastChanged.substring(0, 10)
      localStorage.setItem("currentUser", JSON.stringify(memberData))

      setIsChangePassword(false);
    } else if (resUser?.status === 401) {
      toast.error("Current password is incorrect")
    } else {
      toast.error("Technical error encountered")
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {loading && (
        <div className={classes.loadingOverlay}>
          <Rings color="#1383C3" height={240} width={240} />
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
                <SoftTypography>Connect Your Account</SoftTypography>
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
            <Accordion
              expanded={isOpenNamePane}
              onChange={() => setIsOpenNamePane(!isOpenNamePane)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <SoftBox sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                  <SoftTypography>Your Name and Email</SoftTypography>
                  {isEditNameAndEmail ? (
                    ""
                  ) : (
                    <SoftTypography
                      color={"info"}
                      mr="20px"
                      onClick={() => {
                        setIsEditNameAndEmail(true);
                        setIsOpenNamePane(true);
                      }}
                    >
                      Edit
                    </SoftTypography>
                  )}
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
                          <SoftTypography ml="30px" sx={{ marginTop: "10px" }}>
                            Email
                          </SoftTypography>
                        </SoftBox>
                      </Grid>
                      <Grid item lg={1}></Grid>
                      <Grid item lg={4}>
                        <SoftBox
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                          }}
                        >
                          {isEditNameAndEmail ? (
                            <>
                              <SoftInput
                                value={fullNameOld}
                                onChange={(e) => setFullNameOld(e.target.value)}
                              />
                              <SoftInput
                                sx={{ marginTop: "10px" }}
                                value={emailOld}
                                onChange={(e) => setEmailOld(e.target.value)}
                              />
                            </>
                          ) : (
                            <>
                              <SoftTypography ml="30px">{fullName}</SoftTypography>
                              <SoftTypography ml="30px" sx={{ marginTop: "10px" }}>
                                {email}
                              </SoftTypography>
                            </>
                          )}
                        </SoftBox>
                      </Grid>
                      <Grid item lg={2}></Grid>
                    </Grid>
                  </SoftBox>
                  {isEditNameAndEmail ? (
                    <SoftBox sx={{ display: "flex", justifyContent: "center" }} mt="30px">
                      <SoftButton variant="gradient" color="info" onClick={handleSaveUserName}>
                        Save
                      </SoftButton>
                      <SoftBox width="20px"></SoftBox>
                      <SoftButton
                        variant="outlined"
                        color="info"
                        onClick={() => {
                          setIsEditNameAndEmail(false);
                          // setIsOpenNamePane(false);
                        }}
                      >
                        Cancel
                      </SoftButton>
                    </SoftBox>
                  ) : (
                    ""
                  )}
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
            <Accordion
              expanded={isOpenPasswordPane}
              onChange={() => setIsOpenPasswordPane(!isOpenPasswordPane)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <SoftBox sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                  <SoftTypography>Your Password</SoftTypography>
                  {isChangePassword ? (
                    ""
                  ) : (
                    <SoftTypography
                      color={"info"}
                      mr="20px"
                      onClick={() => {
                        setIsChangePassword(true);
                        setIsOpenPasswordPane(true);
                      }}
                    >
                      Change
                    </SoftTypography>
                  )}
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
                  {isChangePassword ? (
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
                          <SoftTypography ml="30px" sx={{ marginTop: "10px" }}>Current Password</SoftTypography>
                          <SoftTypography ml="30px" sx={{ marginTop: "20px" }}>
                            New Password
                          </SoftTypography>
                        </SoftBox>
                      </Grid>
                      <Grid item lg={4}>
                        <SoftBox
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                          }}
                        >
                          <SoftInput
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                          />
                          <SoftInput
                            sx={{ marginTop: "10px" }}
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </SoftBox>
                      </Grid>
                      <Grid item lg={2}></Grid>
                    </Grid>
                  ) : (
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
                          <SoftTypography ml="30px">{passwordLastChanged}</SoftTypography>
                        </SoftBox>
                      </Grid>
                    </Grid>
                  )}
                </SoftBox>
                {isChangePassword ? (
                  <SoftBox sx={{ display: "flex", justifyContent: "center" }} mt="30px">
                    <SoftButton variant="gradient" color="info" onClick={handleChangePassword}>
                      Change
                    </SoftButton>
                    <SoftBox width="20px"></SoftBox>
                    <SoftButton
                      variant="outlined"
                      color="info"
                      onClick={() => {
                        setIsChangePassword(false);
                        // setIsOpenPasswordPane(false);
                      }}
                    >
                      Cancel
                    </SoftButton>
                  </SoftBox>
                ) : (
                  ""
                )}
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
                  <SoftTypography>Your Role</SoftTypography>
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
                    <Grid item lg="12" mt="10px">
                      <SoftTypography>
                        {role === "superadmin" ? "Super Admin" : role}
                      </SoftTypography>
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
