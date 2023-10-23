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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
import { MembersAll, MembersWhiteList, MembersBan } from "actions/membersAction";

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

  const columns = [
    { name: "no", align: "center" },
    { name: "email", align: "center" },
    { name: "steam64", align: "center" },
    { name: "ip address", align: "center" },
    { name: "status", align: "center" },
  ];

  const [rows, setRows] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMember, setActiveMember] = useState(null);

  const handleClickOpen = (member) => {
    setActiveMember(member);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetBan = async (steam64, isBanned) => {
    const response = await MembersBan(steam64, isBanned);
    if (response?.status === 200) {
      toast.success("Success");
      setOpen(false);
      getInitData();
    } else {
      toast.error("Error");
    }
  };

  const handleSetWhiteListed = async (steam64) => {
    const response = await MembersWhiteList(steam64);
    if (response?.status === 200) {
      toast.success("Success");
      setOpen(false);
      getInitData();
    } else {
      toast.error("Error");
    }
  };

  const getInitData = async () => {
    setLoading(true);
    const members = await MembersAll();
    if (members?.status === 200) {
      if (members?.data?.length) {
        let data = [];
        members?.data?.map((member, index) => {
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
                {member.steam64}
              </SoftTypography>
            ),
            "ip address": (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {member.ipAddress}
              </SoftTypography>
            ),

            status: member.isWhiteListed ? (
              <SoftBadge
                variant="gradient"
                badgeContent="WhiteListed"
                color="info"
                size="xs"
                container
              />
            ) : member.steam64 ? (
              <SoftBadge
                variant="gradient"
                badgeContent="Waiting for whitelist"
                color="warning"
                size="xs"
                container
              />
            ) : (
              <SoftBadge
                variant="gradient"
                badgeContent="Not applied"
                color="error"
                size="xs"
                container
              />
            ),
          });
        });
        setRows(data);
      } else {
        setRows([]);
      }
    } else {
      toast.error("Error");
    }

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
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6} lg={6}>
            <SoftTypography variant="h5" fontWeight="bold" color={"dark"}>
              Members
            </SoftTypography>
          </Grid>
        </Grid>
      </Card>
      <SoftBox py={3}>
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
            {rows.length ? (
              <Table columns={columns} rows={rows} />
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
          <SoftTypography variant="h5" fontWeight="bold" color={"dark"}>
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
            <Grid item lg={12}>
              <SoftBox sx={{ display: "flex" }}>
                <SoftTypography variant="h6" color={"dark"} mr={"20px"}>
                  Email:
                </SoftTypography>
                <SoftTypography variant="h6" color={"dark"}>
                  {activeMember?.email}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item lg={12}>
              <SoftBox sx={{ display: "flex" }}>
                <SoftTypography variant="h6" color={"dark"} mr={"20px"}>
                  Steam64:
                </SoftTypography>
                <SoftTypography variant="h6" color={"dark"}>
                  {activeMember?.steam64 ? activeMember?.steam64 : "N/A"}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item lg={12}>
              <SoftBox sx={{ display: "flex" }}>
                <SoftTypography variant="h6" color={"dark"} mr={"20px"}>
                  Ip Address:
                </SoftTypography>
                <SoftTypography variant="h6" color={"dark"}>
                  {activeMember?.ipAddress}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item lg={12}>
              <SoftBox sx={{ display: "flex" }}>
                {activeMember?.isBanned ? (
                  <SoftTypography variant="h6" color={"dark"} mr={"10px"}>
                    <SoftBadge
                      variant="gradient"
                      badgeContent={"Banned"}
                      color={"error"}
                      size="xs"
                      container
                    />
                  </SoftTypography>
                ) : (
                  ""
                )}

                <SoftTypography variant="h6" color={"dark"}>
                  {activeMember?.steam64 ? (
                    activeMember?.isWhiteListed ? (
                      <SoftBadge
                        variant="gradient"
                        badgeContent="Whitelisted"
                        color="info"
                        size="xs"
                        container
                      />
                    ) : (
                      <SoftBadge
                        variant="gradient"
                        badgeContent="Waiting for whitelist"
                        color="warning"
                        size="xs"
                        container
                      />
                    )
                  ) : (
                    <SoftBadge
                      variant="gradient"
                      badgeContent="Not applied"
                      color="error"
                      size="xs"
                      container
                    />
                  )}
                </SoftTypography>
              </SoftBox>
            </Grid>
            <Grid item lg={12} sx={{ display: "flex", justifyContent: "flex-end", mt: "20px" }}>
              {activeMember?.steam64 !== "" && !activeMember?.isWhiteListed ? (
                <SoftButton
                  variant="gradient"
                  color={"primary"}
                  onClick={() => handleSetWhiteListed(activeMember?.steam64)}
                >
                  Approve
                </SoftButton>
              ) : (
                ""
              )}
              <SoftBox mr={2} />
              {activeMember?.isBanned ? (
                ""
              ) : (
                <SoftButton
                  variant="gradient"
                  color={"error"}
                  onClick={() => handleSetBan(activeMember?.steam64, true)}
                >
                  Ban
                </SoftButton>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </DashboardLayout>
  );
}

export default Members;
