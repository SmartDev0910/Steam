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
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import { makeStyles } from "@mui/styles";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftBadge from "components/SoftBadge";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";

// Data
import { GetChangeLogById } from "actions/changelogAction";

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
  const { id } = useParams();
  const navigate = useNavigate();

  const columns = [
    { name: "no", align: "center" },
    { name: "sub title", align: "center" },
    { name: "sub description", align: "center" },
    { name: "type", align: "center" },
  ];

  const [title, setTitle] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const getInitData = async () => {
    setLoading(true);
    const response = await GetChangeLogById(id);
    if (response?.status === 200) {
      setTitle(response?.data?.title);
      if (JSON.parse(response?.data?.subLogs)?.length) {
        let data = [];
        JSON.parse(response?.data?.subLogs)?.map((log, index) => {
          data.push({
            no: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {index + 1}
              </SoftTypography>
            ),
            "sub title": (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {log.subTitle}
              </SoftTypography>
            ),
            "sub description": (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                {log.subDescription}
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
              Change Log Detail
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
              onClick={() => navigate(-1)}
            >
              Back
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
    </DashboardLayout>
  );
}

export default ChangeLogs;
