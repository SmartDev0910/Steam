import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";

import { StarterGuidesAll } from "actions/starterGuidesAction";

import { makeStyles } from "@mui/styles";

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

const StarterGuide = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [myStarterGuide, setMyStarterGuide] = useState("");

  const getInitData = async () => {
    setLoading(true);
    const starterGuidesRes = await StarterGuidesAll();
    if (starterGuidesRes?.status === 200) {
      if (starterGuidesRes?.data?.length > 0) {
        setMyStarterGuide(starterGuidesRes?.data[0].content);
      }
    } else {
      toast("Technical Error Encountered");
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
      <SoftBox p={3}>
        <Grid container spacing={1}>
          <SoftBox sx={{ padding: "90px" }}>
            {myStarterGuide}
          </SoftBox>
        </Grid>
      </SoftBox>
    </DashboardLayout>
  );
};

export default StarterGuide;
