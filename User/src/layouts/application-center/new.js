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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

import { Rings } from "react-loader-spinner";
import { toast } from "react-toastify";

import SoftAvatar from "components/SoftAvatar";

import AudioReactRecorder, { RecordState } from "audio-react-recorder";

import { CreateApplication, GetApplicationBySteam64, fileUpload } from "actions/applicationAction";
import { REACT_APP_SERVER_IP } from "actions/config";

import RecIcon from "assets/images/rec.png";

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

function NewApplication() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const columns = [
    { name: "first name", align: "center" },
    { name: "last name", align: "center" },
    { name: "age", align: "center" },
    { name: "record voice", align: "center" },
  ];

  const [rows, setRows] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [audioData, setAudioData] = useState(null);

  const [recordState, setRecordState] = useState(null);

  const handleRecordStart = () => {
    if (JSON.parse(localStorage.getItem("currentUser"))?.steam64 === "") {
      toast.error("Please Connect Steam Account");
    } else {
      setRecordState(RecordState.START);
    }
  };

  const handleRecordStop = () => {
    if (JSON.parse(localStorage.getItem("currentUser"))?.steam64 === "") {
      toast.error("Please Connect Steam Account");
    } else {
      setRecordState(RecordState.STOP);
    }
  };

  //audioData contains blob and blobUrl
  const onRecordStop = (audioData) => {
    console.log("audioData", audioData, audioData.url);
    setAudioData(audioData);
  };

  const handleSubmit = async () => {
    if (JSON.parse(localStorage.getItem("currentUser"))?.steam64 === "") {
      toast.error("Please Connect Steam Account");
    } else if (firstName === "" || lastName === "" || age === "") {
      toast.error("Please Input All Fields");
    } else {
      setLoading(true);
      let audioFile = new File([audioData.blob], "recorded_audio.wav");
      const responseFile = await fileUpload(audioFile);

      if (responseFile?.status === 200) {
        const applicationData = {
          firstName: firstName,
          lastName: lastName,
          age: age,
          audioUrl: responseFile?.data?.filename,
        };

        const response = await CreateApplication(
          JSON.parse(localStorage.getItem("currentUser"))?.steam64,
          applicationData
        );
        if (response?.status === 200) {
          toast.success("Application Submitted!");
          getInitData();
        } else {
          toast.error("API Failed");
        }
      } else {
        toast.error("Upload Fail");
      }
      setLoading(false);
    }
  };

  const getInitData = async () => {
    setLoading(true);
    if (JSON.parse(localStorage.getItem("currentUser"))?.steam64) {
      const applications = await GetApplicationBySteam64(
        JSON.parse(localStorage.getItem("currentUser"))?.steam64
      );
      if (applications?.status === 200) {
        if (applications?.data?.length) {
          let data = [];
          applications?.data?.map((application) => {
            data.push({
              "first name": (
                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                  {application.firstName}
                </SoftTypography>
              ),
              "last name": (
                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                  {application.lastName}
                </SoftTypography>
              ),
              age: (
                <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                  {application.age}
                </SoftTypography>
              ),
              "record voice": (
                <>
                  <audio src={`${REACT_APP_SERVER_IP}audio/${application.audioUrl}`} controls />
                </>
              ),
            });
          });
          setRows(data);
        } else {
          setRows([]);
        }
      } else {
        toast.error("API Failed");
      }
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
          <Rings color="#4FC0AE" height={120} width={120} />
        </div>
      )}
      <SoftBox py={3} mx="24px">
        <Card sx={{ padding: "20px", marginTop: "20px" }}>
          <Grid container spacing={3} alignItems="center" sx={{ padding: "10px" }}>
            <Grid item container lg={12}>
              <Grid item lg={12}>
                <SoftTypography variant="h5" fontWeight="bold" color={"dark"}>
                  Whitelist Application
                </SoftTypography>
              </Grid>
              {JSON.parse(localStorage.getItem("currentUser"))?.steam64 === "" ? (
                <Grid item lg={12}>
                  <SoftBox
                    sx={{
                      width: "66%",
                      height: "56px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#ffebf5",
                      marginTop: "20px",
                      paddingLeft: "20px",
                    }}
                  >
                    <SoftTypography sx={{ fontSize: 18, color: "#EC4899" }}>
                      Please connect your steam account first in order to apply!
                    </SoftTypography>
                  </SoftBox>
                </Grid>
              ) : (
                ""
              )}
              <Grid item container lg={12} spacing={6} mt={1} alignItems="flex-start">
                <Grid lg={6} item container sx={{ fontSize: "12px" }}>
                  <Grid item lg={10}>
                    <SoftTypography variant="h6" color={"dark"} sx={{ marginBottom: 1 }}>
                      First Name
                    </SoftTypography>
                    <SoftInput
                      icon={false}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Grid>
                  <Grid item lg={10} mt={"20px"}>
                    <SoftTypography variant="h6" color={"dark"} sx={{ marginBottom: 1 }}>
                      Last Name
                    </SoftTypography>
                    <SoftInput
                      icon={false}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Grid>
                  <Grid item lg={10} mt={"20px"}>
                    <SoftTypography variant="h6" color={"dark"} sx={{ marginBottom: 1 }}>
                      Age
                    </SoftTypography>
                    <SoftInput icon={false} value={age} onChange={(e) => setAge(e.target.value)} />
                  </Grid>
                </Grid>
                <Grid item lg={6}>
                  <SoftTypography variant="h6" color={"dark"} mb={2}>
                    Record Audio
                  </SoftTypography>
                  <SoftBox
                    sx={{
                      display: "flex",
                      height: "260px",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <SoftTypography sx={{ fontSize: "70px" }}>00:00</SoftTypography>
                    <SoftAvatar
                      src={RecIcon}
                      sx={{ width: "90px", height: "90px", cursor: "pointer" }}
                    ></SoftAvatar>
                  </SoftBox>
                  <SoftBox sx={{ display: "none" }}>
                    <AudioReactRecorder state={recordState} onStop={onRecordStop} />
                    <SoftButton variant="text" color="info" onClick={handleRecordStart}>
                      Record Start
                    </SoftButton>
                    <SoftButton variant="text" color="info" onClick={handleRecordStop}>
                      Record Stop
                    </SoftButton>
                  </SoftBox>
                </Grid>
              </Grid>

              <Grid
                xs={12}
                md={12}
                lg={12}
                container
                spacing={2}
                sx={{ fontSize: "12px", marginTop: "20px" }}
              >
                <Grid item xs={12} md={4} lg={4}>
                  <SoftButton
                    rel="noreferrer"
                    variant="gradient"
                    color="info"
                    sx={{ width: "40%" }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </SoftButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        {/* {rows.length ? (
          <SoftBox mb={3} mt={2}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h5">My Applications</SoftTypography>
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
                <Table columns={columns} rows={rows} />
              </SoftBox>
            </Card>
          </SoftBox>
        ) : (
          ""
        )} */}
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default NewApplication;
