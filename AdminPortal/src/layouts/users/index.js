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
import { allSponsors } from "actions/sponsorAction";
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
    { name: "role", align: "center" },
    { name: "action", align: "center" },
  ];

  const [rows, setRows] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState();
  const [openTypeFlag, setOpenTypeFlag] = useState("");
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sponsorData, setSponsorData] = useState([]);
  const [sponsorOptions, setSponsorOptions] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [sponsorName, setSponsorName] = useState({ label: "Select Sponsor", value: "" });
  const [roleName, setRoleName] = useState({ label: "User Role", value: "" });
  const [role, setRole] = useState({
    fans: { view: false, edit: false, delete: false },
    shops: { view: false, edit: false, delete: false },
    videos: { view: false, edit: false, delete: false },
    agendas: { view: false, edit: false, delete: false },
    marketplace: { view: false, edit: false, delete: false },
    sponsor: { view: false, edit: false, delete: false },
  });

  const steps = ["User Details", "Define Roles"];

  const handleAddUserOpen = () => {
    setStep(0);
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
    if (firstName === "" || lastName === "" || email === "" || roleName.value === "") {
      toast.error("Input Fields Correctly");
    } else {
      setLoading(true);
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        roleName: roleName.value,
        sponsorName: sponsorName.value,
        role: JSON.stringify(role),
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
      setSponsorName({
        label: resUser?.data?.data?.sponsorName,
        value: resUser?.data?.data?.sponsorName,
      });
      setRoleName({ label: resUser?.data?.data?.roleName, value: resUser?.data?.data?.roleName });
      setRole(JSON.parse(resUser?.data?.data?.role));
      setOpenTypeFlag("Edit User");
      setSelectedUserId(id);
    } else {
      toast.error("Fail API");
    }
    setLoading(false);
  };

  const handleNextStep = () => {
    let nextStep = step + 1;
    if (nextStep === 2) {
      handleSubmitUser();
      return;
    } else {
      setStep(nextStep);
    }
  };

  const handleBackClick = () => {
    setStep(0);
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
            role: (
              <SoftBadge
                variant="gradient"
                badgeContent={user.roleName}
                color={getRoleColor(user.roleName)}
                size="xs"
                container
              />
            ),

            action:
              user.email !== "admin@waveplus.eu" ? (
                <>
                  <Tooltip title="Edit User" placement="top">
                    <SoftButton
                      variant="text"
                      color="info"
                      onClick={() => handleEditUser(user._id)}
                    >
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
              ) : (
                ""
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

    const sponsors = await allSponsors();
    if (sponsors?.status === 200) {
      let options = [];
      sponsors?.data?.data?.map((item, index) => {
        options.push({ label: item.sponsorName, value: index });
      });
      setSponsorData(sponsors?.data?.data);
      setSponsorOptions(options);
    } else {
      toast.error("Fetch Videos Failed!");
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
            <Select
              value={sortBy}
              onChange={(value) => setSortBy(value)}
              placeholder="Sort By"
              options={[
                { value: "chocolate", label: "Chocolate" },
                { value: "strawberry", label: "Strawberry" },
                { value: "vanilla", label: "Vanilla" },
              ]}
            />
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
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          "& .css-lzee2o-MuiPaper-root-MuiDialog-paper": { maxWidth: "50%" },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
          <SoftTypography variant="h5" fontWeight="bold" color={"dark"}>
            Create Shop
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
              <Box sx={{ width: "100%", border: "solid 1px black" }}>
                <Stepper activeStep={step} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Grid>
            <Grid item lg={12}>
              <SoftTypography variant="h5" fontWeight="bold" color={"dark"}>
                {steps[step]}
              </SoftTypography>
            </Grid>
            <Grid item lg={12}>
              {step === 0 ? (
                <Grid lg={12}>
                  <Grid item xs={12} md={12} lg={12} sx={{ marginBottom: 2 }}>
                    <SoftTypography variant="h6" color={"dark"}>
                      First Name
                    </SoftTypography>
                    <SoftInput
                      placeholder="Alex"
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
                      placeholder="James"
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
                      placeholder="user@waveplus.eu"
                      icon={false}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12} sx={{ marginBottom: 2 }}>
                    <SoftTypography variant="h6" color={"dark"}>
                      User Role
                    </SoftTypography>
                    <SoftTypography variant="h6" color={"dark"}>
                      <Select
                        value={roleName}
                        onChange={(value) => setRoleName(value)}
                        sx={{ width: "100%", fontSize: "10px !important" }}
                        options={[
                          { value: "Sponsor", label: "Sponsor" },
                          { value: "Marketplace Partner", label: "Marketplace Partner" },
                          { value: "Super Admin", label: "Super Admin" },
                          { value: "Admin", label: "Admin" },
                        ]}
                      />
                    </SoftTypography>
                  </Grid>
                  {roleName.value === "Sponsor" ? (
                    <Grid item xs={12} md={12} lg={12} sx={{ marginBottom: 2 }}>
                      <SoftTypography variant="h6" color={"dark"}>
                        Select Sponsor
                      </SoftTypography>
                      <SoftTypography variant="h6" color={"dark"}>
                        <Select
                          sx={{ width: "100%", fontSize: "10px !important" }}
                          value={sponsorName}
                          onChange={(value) => setSponsorName(value)}
                          options={sponsorOptions}
                        />
                      </SoftTypography>
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
              ) : (
                ""
              )}

              {step === 1 ? (
                <Grid lg={12}>
                  <Grid container xs={12} md={12} lg={12} spacing={2}>
                    <Grid item xs={12} md={12} lg={6}></Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <SoftTypography variant="h6" color={"dark"}>
                        View
                      </SoftTypography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <SoftTypography variant="h6" color={"dark"}>
                        Edit
                      </SoftTypography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <SoftTypography variant="h6" color={"dark"}>
                        Delete
                      </SoftTypography>
                    </Grid>
                  </Grid>
                  <Grid container xs={12} md={12} lg={12} spacing={2}>
                    <Grid item xs={12} md={12} lg={6}>
                      <SoftTypography variant="h6" color={"dark"}>
                        Fans
                      </SoftTypography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.fans.view}
                        onChange={() =>
                          setRole({
                            ...role,
                            fans: {
                              ...role.fans,
                              view: !role.fans.view,
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.fans.edit}
                        onChange={() =>
                          setRole({
                            ...role,
                            fans: {
                              ...role.fans,
                              edit: !role.fans.edit,
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.fans.delete}
                        onChange={() =>
                          setRole({
                            ...role,
                            fans: {
                              ...role.fans,
                              delete: !role.fans.delete,
                            },
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container xs={12} md={12} lg={12} spacing={2}>
                    <Grid item xs={12} md={12} lg={6}>
                      <SoftTypography variant="h6" color={"dark"}>
                        Shops
                      </SoftTypography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.shops.view}
                        onChange={() =>
                          setRole({
                            ...role,
                            shops: {
                              ...role.shops,
                              view: !role.shops.view,
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.shops.edit}
                        onChange={() =>
                          setRole({
                            ...role,
                            shops: {
                              ...role.shops,
                              edit: !role.shops.edit,
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.shops.delete}
                        onChange={() =>
                          setRole({
                            ...role,
                            shops: {
                              ...role.shops,
                              delete: !role.shops.delete,
                            },
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container xs={12} md={12} lg={12} spacing={2}>
                    <Grid item xs={12} md={12} lg={6}>
                      <SoftTypography variant="h6" color={"dark"}>
                        Videos
                      </SoftTypography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.videos.view}
                        onChange={() =>
                          setRole({
                            ...role,
                            videos: {
                              ...role.videos,
                              view: !role.videos.view,
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.videos.edit}
                        onChange={() =>
                          setRole({
                            ...role,
                            videos: {
                              ...role.videos,
                              edit: !role.videos.edit,
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.videos.delete}
                        onChange={() =>
                          setRole({
                            ...role,
                            videos: {
                              ...role.videos,
                              delete: !role.videos.delete,
                            },
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container xs={12} md={12} lg={12} spacing={2}>
                    <Grid item xs={12} md={12} lg={6}>
                      <SoftTypography variant="h6" color={"dark"}>
                        Agendas
                      </SoftTypography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.agendas.view}
                        onChange={() =>
                          setRole({
                            ...role,
                            agendas: {
                              ...role.agendas,
                              view: !role.agendas.view,
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.agendas.edit}
                        onChange={() =>
                          setRole({
                            ...role,
                            agendas: {
                              ...role.agendas,
                              edit: !role.agendas.edit,
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.agendas.delete}
                        onChange={() =>
                          setRole({
                            ...role,
                            agendas: {
                              ...role.agendas,
                              delete: !role.agendas.delete,
                            },
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container xs={12} md={12} lg={12} spacing={2}>
                    <Grid item xs={12} md={12} lg={6}>
                      <SoftTypography variant="h6" color={"dark"}>
                        Marketplace
                      </SoftTypography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.marketplace.view}
                        onChange={() =>
                          setRole({
                            ...role,
                            marketplace: {
                              ...role.marketplace,
                              view: !role.marketplace.view,
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.marketplace.edit}
                        onChange={() =>
                          setRole({
                            ...role,
                            marketplace: {
                              ...role.marketplace,
                              edit: !role.marketplace.edit,
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.marketplace.delete}
                        onChange={() =>
                          setRole({
                            ...role,
                            marketplace: {
                              ...role.marketplace,
                              delete: !role.marketplace.delete,
                            },
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container xs={12} md={12} lg={12} spacing={2}>
                    <Grid item xs={12} md={12} lg={6}>
                      <SoftTypography variant="h6" color={"dark"}>
                        Sponsor
                      </SoftTypography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.sponsor.view}
                        onChange={() =>
                          setRole({
                            ...role,
                            sponsor: {
                              ...role.sponsor,
                              view: !role.sponsor.view,
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.sponsor.edit}
                        onChange={() =>
                          setRole({
                            ...role,
                            sponsor: {
                              ...role.sponsor,
                              edit: !role.sponsor.edit,
                            },
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={12} lg={2}>
                      <Switch
                        checked={role.sponsor.delete}
                        onChange={() =>
                          setRole({
                            ...role,
                            sponsor: {
                              ...role.sponsor,
                              delete: !role.sponsor.delete,
                            },
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                ""
              )}

              <Grid item lg={12} mt={3}>
                {step === 0 ? (
                  <SoftButton
                    variant="gradient"
                    color="success"
                    onClick={handleNextStep}
                    sx={{ width: "100%" }}
                  >
                    Next
                  </SoftButton>
                ) : (
                  ""
                )}
                {step === 1 ? (
                  <Grid container lg={12} spacing={2}>
                    <Grid item lg={6} md={12} xs={12}>
                      <SoftButton
                        variant="gradient"
                        color="dark"
                        onClick={handleBackClick}
                        sx={{ width: "100%" }}
                      >
                        Back
                      </SoftButton>
                    </Grid>
                    <Grid item lg={6} md={12} xs={12}>
                      <SoftButton
                        variant="gradient"
                        color="success"
                        onClick={handleNextStep}
                        sx={{ width: "100%" }}
                      >
                        Submit
                      </SoftButton>
                    </Grid>
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
      <Footer />
    </DashboardLayout>
  );
}

export default Users;
