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
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftBadge from "components/SoftBadge";

import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import moment from "moment";

import Select from "react-select";
import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";

// Data
import { GetAllChangeLogs, CreateChangeLog, DeleteChangeLog } from "actions/changelogAction";

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

let log_id = 0;

function ChangeLogs() {
  const classes = useStyles();
  const navigate = useNavigate();

  const columns = [
    { name: "no", align: "center" },
    { name: "title", align: "center" },
    { name: "log date", align: "center" },
    { name: "action", align: "center" },
  ];

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [logDate, setLogDate] = useState(null);
  const [subLogs, setSubLogs] = useState([{ log_id: log_id++ }]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    const response = await DeleteChangeLog(id);
    if (response.status === 200) {
      toast.success("Removed.");
      getInitData();
    } else {
      toast.error("Error");
    }
  };

  const handleAddSubLog = () => {
    let tmp = [
      ...subLogs,
      {
        log_id: log_id++,
        subTitle: "",
        subDescription: "",
        type: "",
      },
    ];
    setSubLogs([...tmp]);
  };

  const handleRemoveSubLog = (logId) => {
    setSubLogs([...subLogs.filter((item) => item.log_id !== logId)]);
  };

  const handleCreateChangeLog = async () => {
    await setLoading(true);

    const formattedDate = moment(logDate).format("MMMM D, YYYY h:mm A");

    const newChangeLog = {
      title: title,
      subLogs: JSON.stringify(subLogs),
      logDate: formattedDate,
    };
    const response = await CreateChangeLog(newChangeLog);

    if (response?.status === 200) {
      toast.success("Success");
      setOpen(false);
      getInitData();
    } else toast.error(response?.data);

    await setLoading(false);
  };

  const getInitData = async () => {
    setLoading(true);
    const response = await GetAllChangeLogs();
    if (response?.status === 200) {
      if (response?.data?.length) {
        let data = [];
        response?.data?.map((log, index) => {
          data.push({
            no: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {index + 1}
              </SoftTypography>
            ),
            title: (
              <SoftTypography
                variant="caption"
                sx={{
                  color: "#00f",
                  fontWeight: "medium",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/change-logs/${log._id}`)}
              >
                {log.title}
              </SoftTypography>
            ),
            "log date": (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {log.logDate}
              </SoftTypography>
            ),
            action: (
              <>
                <SoftButton variant="text" color={"error"} onClick={() => handleDelete(log._id)}>
                  Delete
                </SoftButton>
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
          mx: "20px",
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6} lg={6}>
            <SoftTypography variant="h5" fontWeight="bold" color={"dark"}>
              Change Logs
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
            <SoftButton
              sx={{ marginLeft: "12px" }}
              rel="noreferrer"
              variant="gradient"
              color="info"
              onClick={handleClickOpen}
            >
              Create Change Log
            </SoftButton>
          </Grid>
        </Grid>
      </Card>
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
            {rows.length >= 0 ? (
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
            Create Change Log
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
          <Grid container spacing={3} alignItems="center" sx={{ padding: "10px" }}>
            <Grid item lg={12}>
              <SoftTypography variant="h6" color={"dark"}>
                Title
              </SoftTypography>
              <SoftInput value={title} onChange={(e) => setTitle(e.target.value)} />
            </Grid>

            {subLogs &&
              subLogs.map((item, index) => {
                return (
                  <Grid item lg={12} key={index}>
                    <SoftBox
                      sx={{ border: "1px solid #e2e2e2", borderRadius: "10px", padding: "10px" }}
                    >
                      <Grid container spacing={1}>
                        <Grid item lg={8}>
                          <SoftTypography variant="h6" color={"dark"}>
                            Sub Title
                          </SoftTypography>
                          <SoftInput
                            value={item.subTitle}
                            onChange={(event) => {
                              setSubLogs(
                                subLogs.map((it) =>
                                  it.log_id !== item.log_id
                                    ? it
                                    : {
                                        ...it,
                                        subTitle: event.target.value,
                                      }
                                )
                              );
                            }}
                          />
                        </Grid>

                        <Grid item lg={4}>
                          <SoftTypography variant="h6" color={"dark"}>
                            Type
                          </SoftTypography>
                          <SoftInput
                            value={item.type}
                            onChange={(event) => {
                              setSubLogs(
                                subLogs.map((it) =>
                                  it.log_id !== item.log_id
                                    ? it
                                    : {
                                        ...it,
                                        type: event.target.value,
                                      }
                                )
                              );
                            }}
                          />
                        </Grid>

                        <Grid item lg={12}>
                          <SoftTypography variant="h6" color={"dark"}>
                            Sub description
                          </SoftTypography>
                          <SoftInput
                            multiline
                            rows={5}
                            value={item.subDescription}
                            onChange={(event) => {
                              setSubLogs(
                                subLogs.map((it) =>
                                  it.log_id !== item.log_id
                                    ? it
                                    : {
                                        ...it,
                                        subDescription: event.target.value,
                                      }
                                )
                              );
                            }}
                          />
                        </Grid>
                        <Grid item lg={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                          <SoftButton
                            variant="text"
                            color="error"
                            onClick={() => handleRemoveSubLog(item.log_id)}
                          >
                            Remove Sub Log
                          </SoftButton>
                        </Grid>
                      </Grid>
                    </SoftBox>
                  </Grid>
                );
              })}
            <Grid item lg={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <SoftButton variant="text" color="dark" onClick={handleAddSubLog}>
                Add Sub Log
              </SoftButton>
            </Grid>
            <Grid item lg={6}>
              <SoftTypography variant="h6" color={"dark"}>
                Log Date
              </SoftTypography>
              <SoftTypography variant="h6" color={"dark"}>
                <DatePicker onChange={(date) => setLogDate(date)} />
              </SoftTypography>
            </Grid>

            <Grid
              item
              lg={12}
              sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}
            >
              <SoftButton variant="gradient" color="info" onClick={handleCreateChangeLog}>
                Add Change Log
              </SoftButton>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </DashboardLayout>
  );
}

export default ChangeLogs;
