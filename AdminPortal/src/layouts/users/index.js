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
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Switch from "@mui/material/Switch";

import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftBadge from "components/SoftBadge";

import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

import Select from "react-select";
import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";

// Data
import { createUser, allUsers, deleteUser, editUser, detailUser } from "actions/userAction";
import { getRoleColor } from "layouts/users/utils";

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

function Users() {
  const classes = useStyles();

  const columns = [
    { name: "name", align: "left" },
    { name: "email", align: "left" },
    { name: "steam id", align: "left" },
    { name: "role", align: "center" },
    { name: "white list", align: "center" },
    { name: "action", align: "center" },
  ];

  const [rows, setRows] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [openTypeFlag, setOpenTypeFlag] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [steamId, setSteamId] = useState("");
  const [role, setRole] = useState({ label: "", value: "" });
  const [isWhiteListed, setWhiteListed] = useState({ label: "", value: "" });

  const handleAddUserOpen = () => {
    setOpenTypeFlag("Create User");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteUser = async (id) => {
    const response = await deleteUser(id);
    if (response.status === 200) {
      toast.success("Removed.");
      getInitData();
    } else {
      toast.error("Error");
    }
  };

  const handleSubmitUser = async () => {
    if (firstName === "" || lastName === "" || email === "" || isWhiteListed.value === "") {
      toast.error("Input Fields Correctly");
    } else {
      setLoading(true);
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        steamId: steamId,
        role: role.value,
        isWhiteListed: isWhiteListed.value,
      };
      let response = null;
      if (openTypeFlag === "Create User") {
        response = await createUser(userData);
      } else if (openTypeFlag === "Edit User") {
        response = await editUser(selectedUserId, userData);
      }
      if (response?.status === 200) {
        toast.success("Success");
        setOpen(false);
        getInitData();
      } else {
        toast.error("Fail API");
      }
      setLoading(false);
    }
  };

  const handleEditUser = async (id) => {
    setOpen(true);
    setLoading(true);
    const resUser = await detailUser(id);
    if (resUser?.status === 200) {
      setFirstName(resUser?.data?.data?.firstName);
      setLastName(resUser?.data?.data?.lastName);
      setEmail(resUser?.data?.data?.email);
      setSteamId(resUser?.data?.data?.steamId);
      setRole({
        label: resUser?.data?.data?.role,
        value: resUser?.data?.data?.role,
      });
      setWhiteListed({
        label: resUser?.data?.data?.isWhiteListed,
        value: resUser?.data?.data?.isWhiteListed,
      });
      setOpenTypeFlag("Edit User");
      setSelectedUserId(id);
    } else {
      toast.error("Fail API");
    }
    setLoading(false);
  };

  const getInitData = async () => {
    setLoading(true);
    const users = await allUsers();
    if (users?.status === 200) {
      if (users?.data?.data.length) {
        let data = [];
        users?.data?.data.map((user) => {
          data.push({
            name: (
              <SoftTypography
                variant="caption"
                color="secondary"
                fontWeight="medium"
                px={2}
                py={1}
                mr={2}
              >
                {user.firstName + " " + user.lastName}
              </SoftTypography>
            ),
            email: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {user.email}
              </SoftTypography>
            ),
            "steam id": (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {user.steamId}
              </SoftTypography>
            ),
            role: (
              <SoftBadge
                variant="gradient"
                badgeContent={user.role}
                color={getRoleColor(user.role)}
                size="xs"
                container
              />
            ),
            "white list":
              user.isWhiteListed === "true" ? (
                <SoftBadge
                  variant="gradient"
                  badgeContent="WhiteListed"
                  color="success"
                  size="xs"
                  container
                />
              ) : (
                ""
              ),
            action: (
              <>
                <Tooltip title="Edit User" placement="top">
                  <SoftButton variant="text" color="info" onClick={() => handleEditUser(user._id)}>
                    <DriveFileRenameOutlineIcon />
                  </SoftButton>
                </Tooltip>
                <Tooltip title="Delete User" placement="top">
                  <SoftButton
                    variant="text"
                    color="error"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <DeleteIcon />
                  </SoftButton>
                </Tooltip>
              </>
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
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6} lg={6}>
            <SoftTypography variant="h5" fontWeight="bold" color={"dark"}>
              Users
            </SoftTypography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={6}
            lg={6}
            sx={{ display: "flex", justifyContent: "flex-end", fontSize: "17px" }}
            alignItems="center"
          >
            <SoftTypography variant="h6" fontWeight="bold" color={"dark"}>
              <Select
                value={sortBy}
                onChange={(value) => setSortBy(value)}
                placeholder="Sort By"
                options={[
                  { value: "A-Z", label: "A-Z" },
                  { value: "Z-A", label: "Z-A" },
                ]}
              />
            </SoftTypography>
            <SoftButton
              sx={{ marginLeft: "12px" }}
              rel="noreferrer"
              variant="gradient"
              color="success"
              onClick={handleAddUserOpen}
            >
              Add User
            </SoftButton>
          </Grid>
        </Grid>
      </Card>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h5">Users List</SoftTypography>
            </SoftBox>
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
      </SoftBox>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
          <SoftTypography variant="h5" fontWeight="bold" color={"dark"}>
            {openTypeFlag}
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
        <DialogContent dividers sx={{ overflow: "visible" }}>
          {loading && (
            <div className={classes.loadingOverlay}>
              <Rings color="#4FC0AE" height={240} width={240} />
            </div>
          )}
          <Grid container spacing={3} alignItems="center" sx={{ padding: "10px" }}>
            <Grid item lg={12}>
              <Grid lg={12} container>
                <Grid item xs={12} md={12} lg={12} sx={{ marginBottom: 2 }}>
                  <SoftTypography variant="h6" color={"dark"}>
                    First Name
                  </SoftTypography>
                  <SoftInput
                    icon={false}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12} sx={{ marginBottom: 2 }}>
                  <SoftTypography variant="h6" color={"dark"}>
                    Last Name
                  </SoftTypography>
                  <SoftInput
                    icon={false}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12} sx={{ marginBottom: 2 }}>
                  <SoftTypography variant="h6" color={"dark"}>
                    Email Address
                  </SoftTypography>
                  <SoftInput
                    icon={false}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12} sx={{ marginBottom: 2 }}>
                  <SoftTypography variant="h6" color={"dark"}>
                    Steam ID
                  </SoftTypography>
                  <SoftInput
                    icon={false}
                    value={steamId}
                    onChange={(e) => setSteamId(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12} sx={{ marginBottom: 2 }}>
                  <SoftTypography variant="h6" color={"dark"}>
                    Role
                  </SoftTypography>
                  <SoftTypography variant="h6" color={"dark"}>
                    <Select
                      value={role}
                      onChange={(value) => setRole(value)}
                      sx={{ width: "100%", fontSize: "10px !important" }}
                      options={[
                        { value: "Admin", label: "Admin" },
                        { value: "User", label: "User" },
                      ]}
                    />
                  </SoftTypography>
                </Grid>
                <Grid item xs={12} md={12} lg={12} sx={{ marginBottom: 2 }}>
                  <SoftTypography variant="h6" color={"dark"}>
                    WhiteListed
                  </SoftTypography>
                  <SoftTypography variant="h6" color={"dark"}>
                    <Select
                      value={isWhiteListed}
                      onChange={(value) => setWhiteListed(value)}
                      sx={{ width: "100%", fontSize: "10px !important" }}
                      options={[
                        { value: "true", label: "true" },
                        { value: "false", label: "false" },
                      ]}
                    />
                  </SoftTypography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container lg={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <SoftButton variant="gradient" color="success" onClick={handleSubmitUser}>
                {openTypeFlag}
              </SoftButton>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
      <Footer />
    </DashboardLayout>
  );
}

export default Users;
