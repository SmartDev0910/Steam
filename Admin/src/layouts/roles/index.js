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
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import Footer from "examples/Footer";

import { Rings } from "react-loader-spinner";
import Alert from '@mui/material/Alert';

import { RolesAll, CreateRole, DeleteRole } from "actions/rolesAction";

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

function Roles() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [rowsRolesList, setRowsRolesList] = useState([]);
  const [roleTitle, setRoleTitle] = useState("");
  const [roleID, setRoleID] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertVisible, setAlertVisible] = useState("none");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (msg, isError) => {
    setAlertVisible("visible");
    setAlertSeverity(isError ? "error" : "success");
    setAlertMessage(msg);
  }
  
  const columnsRolesList = [
    { name: "no", align: "center" },
    { name: "role Name", align: "center" },
    { name: "role ID", align: "center" },
    { name: "action", align: "center" },
  ];

  const resetRolesList = async () => {
    const rolesList = await RolesAll();
    if (rolesList?.status === 200) {
      if (rolesList?.data?.length) {
        let data = [];
        rolesList?.data?.map((role, index) => {
          data.push({
            no: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {index + 1}
              </SoftTypography>
            ),
            'role Name': (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {role.name ? role.name : "Not connected"}
              </SoftTypography>
            ),
            "role ID": (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {role.roleID ? role.roleID : "Not connected"}
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
                onClick={() => handleClickDelete(role._id)}
              >
                Delete
              </SoftTypography>
            ),
          });
        });
        setRowsRolesList(data);
      } else {
        setRowsRolesList([]);
      }
    } else {
      showAlert("Technical Error Encountered", true);
    }
  }

  const handleClickDelete = async (roleID) => {
    setLoading(true);
    const rolesList = await DeleteRole(roleID);
    if (rolesList?.status === 200) {
      await resetRolesList();
      showAlert("Successfully deleted the role", false);
    } else {
      showAlert("Technical Error Encountered", true);
    }
    setLoading(false);
  }

  const getInitData = async () => {
    setLoading(true);
    await resetRolesList();
    setLoading(false);
  };

  useEffect(() => {
    getInitData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateRole = async () => {
    setLoading(true);
    if (roleTitle == "" || roleID == "") {
      showAlert("Please fill in the required fields", true);
    } else {
      const newAppRes = await CreateRole({ name: roleTitle, roleID });
      if (newAppRes?.status === 200) {
        showAlert("Successfully created a new role", false);
        handleClose();
        await resetRolesList();
      } else {
        showAlert("Technical Error Encountered", true);
      }
    }
    setLoading(false);
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
      <SoftBox py={3} mx="20px">
        <Grid item lg={12} sx={{ display: "flex", justifyContent: "flex-end", mb: "10px" }}>
          <SoftButton
            variant="gradient"
            color={"primary"}
            onClick={() => handleClickOpen()}
          >
            Create
          </SoftButton>
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
            {rowsRolesList.length >= 0 ? (
              <Table columns={columnsRolesList} rows={rowsRolesList} />
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
            Create a new role
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
                  Role Name:
                </SoftTypography>
                <SoftInput
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                />
              </SoftBox>
            </Grid>
            <Grid item lg={12}>
              <SoftBox sx={{ display: "flex" }}>
                <SoftTypography variant="h6" color={"dark"} mr={"20px"}>
                  Role ID:
                </SoftTypography>
                <SoftInput
                  value={roleID}
                  onChange={(e) => setRoleID(e.target.value)}
                />
              </SoftBox>
            </Grid>
            <Grid item lg={12} sx={{ display: "flex", justifyContent: "flex-end", mt: "20px" }}>
              <SoftButton
                variant="gradient"
                color={"primary"}
                onClick={() => handleCreateRole()}
              >
                Create
              </SoftButton>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </DashboardLayout>
  );
}

export default Roles;
