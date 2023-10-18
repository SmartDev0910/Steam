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
import { MembersAll, MembersWhiteList, MembersBan } from "actions/membersAction";

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
    { name: "email", align: "center" },
    { name: "steam64", align: "center" },
    { name: "ip address", align: "center" },
    { name: "whitelist", align: "center" },
    { name: "status", align: "center" },
    { name: "action", align: "center" },
  ];

  const [rows, setRows] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetBan = async (steam64, isBanned) => {
    const response = await MembersBan(steam64, isBanned);
    if (response?.status === 200) {
      toast.success("Success");
      getInitData();
    } else {
      toast.error("Error");
    }
  };

  const handleSetWhiteListed = async (steam64) => {
    const response = await MembersWhiteList(steam64);
    if (response?.status === 200) {
      toast.success("Success");
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
        members?.data?.map((member) => {
          data.push({
            email: (
              <SoftTypography variant="caption" color="secondary" fontWeight="medium">
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

            whitelist: member.isWhiteListed ? (
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
                badgeContent="Pending"
                color="dark"
                size="xs"
                container
              />
            ) : (
              ""
            ),
            status: member.isBanned ? (
              <SoftBadge
                variant="gradient"
                badgeContent="Banned"
                color="error"
                size="xs"
                container
              />
            ) : (
              <SoftBadge
                variant="gradient"
                badgeContent="Allowed"
                color="success"
                size="xs"
                container
              />
            ),
            action: (
              <>
                {member.steam64 !== "" && !member.isWhiteListed ? (
                  <SoftButton
                    variant="outlined"
                    color={"primary"}
                    onClick={() => handleSetWhiteListed(member.steam64)}
                  >
                    Approve
                  </SoftButton>
                ) : (
                  ""
                )}
                &nbsp;
                <SoftButton
                  variant="outlined"
                  color={member.isBanned ? "success" : "error"}
                  onClick={() => handleSetBan(member.steam64, !member.isBanned)}
                >
                  {member.isBanned ? "Allow" : "Ban"}
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
              Members
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
          </Grid>
        </Grid>
      </Card>
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h5">Members List</SoftTypography>
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
    </DashboardLayout>
  );
}

export default Members;
