import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import FooterNav from "./partials/FooterNav";
import FooterSocial from "./partials/FooterSocial";

import { Link } from "react-router-dom";
import LogoImage from "assets/images/logo-ct.png";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

const propTypes = {
  topOuterDivider: PropTypes.bool,
  topDivider: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  topOuterDivider: false,
  topDivider: false,
  className: "",
};

class Footer extends React.Component {
  render() {
    const { className, topOuterDivider, topDivider, ...props } = this.props;

    const classes = classNames(
      "site-footer invert-color center-content-mobile",
      topOuterDivider && "has-top-divider",
      className
    );

    return (
      <footer {...props} className={classes}>
        <div className="container">
          <div className={classNames("site-footer-inner", topDivider && "has-top-divider")}>
            <div className="footer-top space-between text-xxs">
              <SoftBox py={1.5} lineHeight={1} alignItems="center">
                <Link href="/home">
                  <SoftBox
                    component="img"
                    src={LogoImage}
                    alt="Soft UI Logo"
                    width="2rem"
                    sx={{ verticalAlign: "middle", display: "inline-block", cursor: "pointer" }}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <SoftTypography
                    variant="button"
                    fontWeight="bold"
                    color={"white"}
                    sx={{ cursor: "pointer" }}
                  >
                    CircuitRP
                  </SoftTypography>
                </Link>
              </SoftBox>
              <FooterSocial />
            </div>
            <div className="footer-bottom space-between text-xxs invert-order-desktop">
              <FooterNav />
              <div className="footer-copyright">&copy; 2023 CircuitRP , all rights reserved</div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
