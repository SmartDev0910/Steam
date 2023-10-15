import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import PaidIcon from "@mui/icons-material/Paid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import curved14 from "assets/images/card.png";

function CreditCards({ color, currentBalance, sentBalance }) {
  return (
    <Card
      sx={({
        palette: { gradients },
        functions: { linearGradient, rgba },
        boxShadows: { xl },
      }) => ({
        background: gradients[color]
          ? `${linearGradient(
              rgba(gradients[color].main, 0.8),
              rgba(gradients[color].state, 0.8)
            )}, url(${curved14})`
          : `${linearGradient(
              rgba(gradients.dark.main, 0.8),
              rgba(gradients.dark.state, 0.8)
            )}, url(${curved14})`,
        boxShadow: xl,
      })}
    >
      <SoftBox p={"24px"}>
        <SoftTypography
          sx={{
            color: "#fff",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
          }}
        >
          Current Balance
        </SoftTypography>
        <SoftBox sx={{ display: "flex", alignItems: "center", color: "#fff", mt: "6px" }}>
          <PaidIcon sx={{ width: "32px", height: "32px" }} />
          <SoftTypography
            sx={{
              color: "#fff",
              fonstSize: "28px",
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "32px",
              ml: "6px",
            }}
          >
            {currentBalance.toLocaleString("en-US")}
          </SoftTypography>
        </SoftBox>
        <SoftBox sx={{ display: "flex", alignItems: "center", mt: "24px" }}>
          <SoftTypography
            sx={{
              color: "#fff",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
            }}
          >
            Amount Spent:
          </SoftTypography>
          <SoftTypography
            sx={{
              color: "#fff",
              fonstSize: "16px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "normal",
              ml: "6px",
            }}
          >
            {sentBalance.toLocaleString("en-US")}
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of CreditCards
CreditCards.defaultProps = {
  color: "dark",
};

// Typechecking props for the CreditCards
CreditCards.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  currentBalance: PropTypes.number.isRequired,
  sentBalance: PropTypes.number.isRequired,
};

export default CreditCards;
