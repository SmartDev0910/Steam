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
import { useLocation } from "react-router-dom";

// @mui material components
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import Footer from "examples/Footer";

import { Rings } from "react-loader-spinner";
import { toast } from "react-toastify";

import { ApplicationList, ReviewApplication } from "actions/applicationsAction";
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

function ApplyList() {
  const classes = useStyles();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const applicationTypeId = searchParams.get('application_type_id');

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMember, setActiveMember] = useState(null);
  const [rowsApplicationList, setRowsApplicationList] = useState([]);

  const columnsApplicationList = [
    { name: "no", align: "center" },
    // { name: "email", align: "center" },
    { name: "steam64", align: "center" },
    { name: "discord", align: "center" },
    { name: "role", align: "center" },
    // { name: "ip address", align: "center" },
    { name: "action", align: "center" },
  ];

  const resetApplicationList = async () => {
    const applicationList = await ApplicationList(applicationTypeId);
    if (applicationList?.status === 200) {
      if (applicationList?.data?.length) {
        for (let i = 0; i < applicationList.data.length; i++) {
          const roleDetailRes = await ListRoleById(applicationList.data[i].role);
          let roleName = "ordinary";
          if (roleDetailRes?.status === 200) {
            roleName = roleDetailRes.data.name;
          }
          applicationList.data[i].roleName = roleName
        }

        let data = [];
        applicationList?.data?.map(async (member, index) => {
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
        setRowsApplicationList(data);
      } else {
        setRowsApplicationList([]);
      }
    } else {
      toast.error("Technical Error Encountered");
    }
  }

  const handleReviewApplication = async (memberID, isApprove) => {
    setLoading(true);
    const reviewApplicationRes = await ReviewApplication(memberID, {applicationTypeId, isApprove});
    if (reviewApplicationRes?.status === 200) {
      handleClose();
      await resetApplicationList();
      toast.success("Successfully updated");
    } else {
      toast.error("Technical Error Encountered");
    }
    setLoading(false);
  }

  const handleClickOpen = (member) => {
    setActiveMember(member);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const getInitData = async () => {
    setLoading(true);
    await resetApplicationList();
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
            {rowsApplicationList.length >= 0 ? (
              <Table columns={columnsApplicationList} rows={rowsApplicationList} />
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
        // sx={{
        //   "& .css-lzee2o-MuiPaper-root-MuiDialog-paper": { maxWidth: "50%" },
        // }}
      >
        <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
          <SoftTypography fontWeight="bold" color={"dark"}>
            Application Detail
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
            <Grid item lg={12}>
              <SoftBox sx={{ display: "flex" }}>
                <SoftTypography variant="h6" color={"dark"} mr={"20px"}>
                  Role:
                </SoftTypography>
                <SoftTypography variant="h6" color={"dark"}>
                  {activeMember?.roleName}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item lg={12} sx={{ display: "flex", justifyContent: "flex-end", mt: "20px" }}>
              <SoftButton
                variant="gradient"
                color={"primary"}
                onClick={() => handleReviewApplication(activeMember._id, true)}
              >
                Approve
              </SoftButton>
              <SoftButton
                variant="gradient"
                onClick={() => handleReviewApplication(activeMember._id, false)}
              >
                Reject
              </SoftButton>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </DashboardLayout>
  );
}

export default ApplyList;
