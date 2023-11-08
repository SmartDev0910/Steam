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
import Switch from '@mui/material/Switch';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftBadge from "components/SoftBadge";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

import Select from "react-select";
import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";

// Data
import { MembersAll, MembersUpdate } from "actions/membersAction";
import { ListRoleById } from "actions/rolesAction";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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

function Members() {
  const classes = useStyles();

  const columnsMember = [
    { name: "no", align: "center" },
    // { name: "email", align: "center" },
    { name: "steam64", align: "center" },
    { name: "discord", align: "center" },
    { name: "role", align: "center" },
    // { name: "ip address", align: "center" },
    { name: "action", align: "center" },
  ];

  const columnsApplication = [
    { name: "no", align: "center" },
    { name: "type", align: "center" },
    { name: "status", align: "center" },
    { name: "appliedat", align: "center" },
  ];

  const [rowsMember, setRowsMember] = useState([]);
  const [rowsApplication, setRowsApplication] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMember, setActiveMember] = useState(null);

  const [roleValue, setRoleValue] = useState("5");

  const handleRoleChange = async (event, memberID) => {
    const myRole = JSON.parse(localStorage.getItem("currentUser"))?.role;
    if (myRole == "3" || myRole == "5") { // app team and ordinary forbidden
      toast.error("You don't have permission to change the member's role");
      return;
    }
    if (activeMember.role == "5" && activeMember.mfaEnabled == false) {
      toast.error("This member didn't enable MFA.");
      return;
    }
    setRoleValue(event.target.value);
    handleClose();
    setLoading(true);
    const members = await MembersUpdate(memberID, {role: event.target.value});
    if (members?.status === 200) {
      await resetMemberData();
      toast.success("Successfully updated");
    } else {
      toast.error("Error");
    }
    setLoading(false);
  };

  const handleClickOpen = (member) => {
    setActiveMember(member);
    setOpen(true);
    setRoleValue(member.role)

    // prepare application table in modal
    if (member.applications?.length) {
      let data = [];
      member.applications?.map((application, index) => {
        data.push({
          no: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {index + 1}
            </SoftTypography>
          ),
          type: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {application.applicationTypeId}
            </SoftTypography>
          ),
          status: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {application.status}
            </SoftTypography>
          ),
          appliedat: (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {application.appliedAt.substring(0, 10)}
            </SoftTypography>
          )
        });
      });
      setRowsApplication(data);
    } else {
      setRowsApplication([]);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getInitData = async () => {
    setLoading(true);
    await resetMemberData();
    setLoading(false);
  };

  const handleChangeBan = async (memberID, isBanned) => {
    const myRole = JSON.parse(localStorage.getItem("currentUser"))?.role;
    if (myRole == "3" || myRole == "5") { // app team and ordinary forbidden
      toast.error("You don't have permission to ban member's access");
      return;
    }
    handleClose();
    setLoading(true);
    const members = await MembersUpdate(memberID, {isBanned: !isBanned});
    if (members?.status === 200) {
      await resetMemberData();
      toast.success("Successfully updated");
    } else {
      toast.error("Error");
    }
    setLoading(false);
  }

  const resetMemberData = async () => {
    const members = await MembersAll();
    if (members?.status === 200) {
      if (members?.data?.length) {
        for (let i = 0; i < members.data.length; i++) {
          const roleDetailRes = await ListRoleById(members.data[i].role);
          let roleName = "ordinary";
          if (roleDetailRes?.status === 200) {
            roleName = roleDetailRes.data.name;
          }
          members.data[i].roleName = roleName
        }

        const myMemberID = JSON.parse(localStorage.getItem("currentUser"))?._id;
        let data = [];
        members?.data?.map((member, index) => {
          if (member._id === myMemberID) return; //skip myself
          data.push({
            no: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {index + 1}
              </SoftTypography>
            ),
            email: (
              <SoftTypography
                variant="caption"
                color="secondary"
                fontWeight="medium"
                sx={{
                  color: "#00f",
                  fontWeight: "medium",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                  cursor: "pointer",
                }}
                onClick={() => handleClickOpen(member)}
              >
                {member.email}
              </SoftTypography>
            ),
            steam64: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {member.steam64 ? member.steam64 : "Not connected"}
              </SoftTypography>
            ),
            discord: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {member.discordID ? member.discordID : "Not connected"}
              </SoftTypography>
            ),
            role: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {member.roleName}
              </SoftTypography>
            ),
            action: (
              <SoftTypography
                variant="caption"
                color="secondary"
                fontWeight="medium"
                sx={{
                  color: "#00f",
                  fontWeight: "medium",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                  cursor: "pointer",
                }}
                onClick={() => handleClickOpen(member)}
              >
                Detail
              </SoftTypography>
            ),
          });
        });
        setRowsMember(data);
      } else {
        setRowsMember([]);
      }
    } else {
      toast.error("Error");
    }
  }

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {loading && (
        <div className={classes.loadingOverlay}>
          <Rings color="#1383C3" height={240} width={240} />
        </div>
      )}
      <SoftBox py={3} mx="20px">
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
            {rowsMember.length >= 0 ? (
              <Table columns={columnsMember} rows={rowsMember} />
            ) : (
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h5">No Data</SoftTypography>
              </SoftBox>
            )}
          </SoftBox>
        </Card>
      </SoftBox>
      <Footer />
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          "& .css-lzee2o-MuiPaper-root-MuiDialog-paper": { maxWidth: "50%" },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
          <SoftTypography fontWeight="bold" color={"dark"}>
            Member Detail
          </SoftTypography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 16,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {loading && (
            <div className={classes.loadingOverlay}>
              <Rings color="#1383C3" height={120} width={120} />
            </div>
          )}
          <Grid container spacing={1} alignItems="center" sx={{ padding: "10px" }}>
          <Grid item lg={6}>
              <SoftBox sx={{ display: "flex" }}>
                <SoftTypography variant="h6" color={"dark"} mr={"20px"}>
                  Name:
                </SoftTypography>
                <SoftTypography variant="h6" color={"dark"}>
                  {activeMember?.name}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item lg={6}>
              <SoftBox sx={{ display: "flex" }}>
                <SoftTypography variant="h6" color={"dark"} mr={"20px"}>
                  Email:
                </SoftTypography>
                <SoftTypography variant="h6" color={"dark"}>
                  {activeMember?.email}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item lg={6}>
              <SoftBox sx={{ display: "flex" }}>
                <SoftTypography variant="h6" color={"dark"} mr={"20px"}>
                  Steam64:
                </SoftTypography>
                <SoftTypography variant="h6" color={"dark"}>
                  {activeMember?.steam64 ? activeMember?.steam64 : "N/A"}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item lg={6}>
              <SoftBox sx={{ display: "flex" }}>
                <SoftTypography variant="h6" color={"dark"} mr={"20px"}>
                  Discord ID:
                </SoftTypography>
                <SoftTypography variant="h6" color={"dark"}>
                  {activeMember?.steam64 ? activeMember?.discordID : "N/A"}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item lg={6}>
              <SoftBox sx={{ display: "flex" }}>
                <SoftTypography variant="h6" color={"dark"} mr={"20px"}>
                  MFA Enabled:
                </SoftTypography>
                <SoftTypography variant="h6" color={"dark"}>
                  {activeMember?.mfaEnabled ? "Enabled" : "Disabled"}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item lg={6}>
              <SoftBox sx={{ display: "flex" }}>
                <SoftTypography variant="h6" color={"dark"} mr={"20px"}>
                  Phone:
                </SoftTypography>
                <SoftTypography variant="h6" color={"dark"}>
                  {activeMember?.mfaPhoneNumber ? activeMember?.mfaPhoneNumber : "N/A"}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item lg={6}>
              <SoftBox sx={{ display: "flex" }}>
                <SoftTypography variant="h6" color={"dark"} mr={"20px"}>
                  IP:
                </SoftTypography>
                <SoftTypography variant="h6" color={"dark"}>
                  {activeMember?.ip === "::1" ? "localhost": activeMember?.ip}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item lg={6}>
              <SoftBox sx={{ display: "flex" }}>
                <SoftTypography variant="h6" color={"dark"} mr={"20px"}>
                  Banned:
                </SoftTypography>
                <SoftTypography variant="h6" color={"dark"}>
                  Off&nbsp;
                </SoftTypography>
                <Switch
                  checked={activeMember?.isBanned ? true : false}
                  onChange={() => handleChangeBan(activeMember._id, activeMember.isBanned)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <SoftTypography variant="h6" color={"dark"}>
                  &nbsp;On
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item lg={12}>
              <SoftBox sx={{ display: "flex" }}>
                <SoftTypography variant="h6" color={"dark"} mr={"20px"}>
                  Role:
                </SoftTypography>
                <SoftTypography variant="h6" color={"dark"}>
                  {activeMember?.roleName}
                </SoftTypography>
              </SoftBox>
              <SoftBox sx={{ display: "flex" }}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={roleValue}
                    onChange={(e) => handleRoleChange(e, activeMember._id)}
                  >
                    <FormControlLabel value="5" control={<Radio />} label="Ordinary" />
                    <FormControlLabel value="4" control={<Radio />} label="Moderator" />
                    <FormControlLabel value="3" control={<Radio />} label="AppTeam" />
                    <FormControlLabel value="2" control={<Radio />} label="Administrator" />
                    <FormControlLabel value="1" control={<Radio />} label="Superadmin" />
                  </RadioGroup>
                </FormControl>
              </SoftBox>
            </Grid>
            <Grid item lg={12} mt={"20px"}>
              <SoftTypography variant="h6" color={"dark"}>
                Applications
              </SoftTypography>
              {rowsApplication.length >= 0 ? (
                <Table columns={columnsApplication} rows={rowsApplication} />
              ) : (
                <SoftBox display="flex" justifyContent="space-between" alignItems="center">
                  <SoftTypography variant="h6">No application for this member</SoftTypography>
                </SoftBox>
              )}
            </Grid>
            <Grid item lg={12} sx={{ display: "flex", justifyContent: "flex-end", mt: "20px" }}>
              <SoftButton
                variant="gradient"
                color={"primary"}
                onClick={() => handleClose()}
              >
                Close
              </SoftButton>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </DashboardLayout>
  );
}

export default Members;
