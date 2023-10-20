import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SectionTilesProps } from "layouts/utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";

import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography/index";

import { GetAllChangeLogs } from "actions/changelogAction";

const ChangeLogs = (props) => {
  const {
    className,
    topOuterDivider,
    bottomOuterDivider,
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
    pushLeft,
    ...otherProps
  } = props;

  const [data, setData] = useState([]);

  const outerClasses = classNames(
    "features-tiles section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-tiles-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const sectionHeader = {
    title: "Change Logs",
    paragraph: "",
  };

  const getInitData = async () => {
    const response = await GetAllChangeLogs();
    if (response?.status === 200) {
      if (response?.data?.length) {
        setData(response?.data);
      } else {
        setData([]);
      }
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    getInitData();
  }, []);

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content  invert-color" />
          <SoftBox>
            {data &&
              data.map((log, index) => (
                <Card
                  sx={{
                    backgroundColor: "#162333",
                    px: "24px",
                    pt: "30px",
                    pb: "30px",
                    mb: "80px",
                  }}
                  key={index}
                >
                  <SoftTypography
                    sx={{ color: "#fff", fontSize: "24px", fontWeight: "600", ml: "10px" }}
                  >
                    {`${log?.title} (${log?.logDate})`}
                  </SoftTypography>
                  <SoftBox
                    sx={{
                      mt: "30px",
                      backgroundColor: "#0f1c2b",
                      px: "20px",
                      py: "20px",
                      borderRadius: "20px",
                    }}
                  >
                    <SoftBox sx={{ display: "flex", alignItems: "center" }}>
                      <SoftTypography
                        sx={{
                          color: "#95a4b4",
                          fontSize: "22px",
                          fontWeight: "600",
                          lineHeight: "36px",
                        }}
                      >
                        {log?.subTitle}
                      </SoftTypography>
                      <SoftBox
                        sx={{
                          width: "80px",
                          height: "28px",
                          backgroundColor: "#405165",
                          borderRadius: "20px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          ml: "10px",
                        }}
                      >
                        <SoftTypography
                          sx={{
                            color: "#fff",
                            fontSize: "20px",
                            fontWeight: "600",
                            lineHeight: "32px",
                          }}
                        >
                          {log?.type}
                        </SoftTypography>
                      </SoftBox>
                    </SoftBox>
                    <SoftTypography
                      sx={{ color: "#95a4b4", fontSize: "20px", fontWeight: "600", mt: "10px" }}
                    >
                      {log?.subDescription}
                    </SoftTypography>
                  </SoftBox>
                </Card>
              ))}
          </SoftBox>
        </div>
      </div>
    </section>
  );
};

ChangeLogs.propTypes = {
  ...SectionTilesProps.types,
};
ChangeLogs.defaultProps = {
  ...SectionTilesProps.defaults,
};

export default ChangeLogs;
