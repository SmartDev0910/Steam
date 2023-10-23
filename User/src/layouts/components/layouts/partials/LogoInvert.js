import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Image from "../../elements/Image";
import PropTypes from "prop-types";
import LogoImage from "assets/images/logo-ct.png";

const Logo = ({ className, ...props }) => {
  const classes = classNames("brand", className);

  return (
    <div {...props} className={classes}>
      <h1 className="m-0">
        <Link to="/">
          <Image src={LogoImage} alt="Tidy" width={32} height={32} />
        </Link>
      </h1>
    </div>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
