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

import Select from "react-select";
import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";
import { format } from "date-fns";

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

function ChangeLogs() {
  const classes = useStyles();

  const columns = [
    { name: "title", align: "center" },
    { name: "sub title", align: "center" },
    { name: "sub description", align: "center" },
    { name: "type", align: "center" },
    { name: "log date", align: "center" },
    { name: "action", align: "center" },
  ];

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [subDescription, setSubDescription] = useState("");
  const [type, setType] = useState("");
  const [logDate, setLogDate] = useState(null);

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

  const handleCreateChangeLog = async () => {
    await setLoading(true);

    const formattedDate = format(logDate, "MMMM d, yyyy h:mm aa");

    const newChangeLog = {
      title: title,
      subTitle: subTitle,
      subDescription: subDescription,
      type: type,
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
        response?.data?.map((log) => {
          data.push({
            title: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {log.title}
              </SoftTypography>
            ),
            "sub title": (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {log.subTitle}
              </SoftTypography>
            ),
            "sub description": (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {log.subDescription.substring(0, 70)}...
              </SoftTypography>
            ),
            type: (
              <SoftBadge
                variant="gradient"
                badgeContent={log.type}
                color="info"
                size="xs"
                container
              />
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
              onClick={handleClickOpen}
            >
              Create Change Log
            </SoftButton>
          </Grid>
        </Grid>
      </Card>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h5">Change Logs List</SoftTypography>
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
              <Rings color="#4FC0AE" height={120} width={120} />
            </div>
          )}
          <Grid container spacing={3} alignItems="center" sx={{ padding: "10px" }}>
            <Grid item lg={12}>
              <SoftTypography variant="h6" color={"dark"}>
                Title
              </SoftTypography>
              <SoftInput value={title} onChange={(e) => setTitle(e.target.value)} />
            </Grid>

            <Grid item lg={12}>
              <SoftTypography variant="h6" color={"dark"}>
                Sub Title
              </SoftTypography>
              <SoftInput value={subTitle} onChange={(e) => setSubTitle(e.target.value)} />
            </Grid>

            <Grid item lg={12}>
              <SoftTypography variant="h6" color={"dark"}>
                Sub description
              </SoftTypography>
              <SoftInput
                value={subDescription}
                multiline
                rows={5}
                onChange={(e) => setSubDescription(e.target.value)}
              />
            </Grid>

            <Grid item lg={6}>
              <SoftTypography variant="h6" color={"dark"}>
                Type
              </SoftTypography>
              <SoftInput value={type} onChange={(e) => setType(e.target.value)} />
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
              <SoftButton variant="gradient" color="success" onClick={handleCreateChangeLog}>
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
