import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const FooterNav = ({ className, ...props }) => {
  const classes = classNames("footer-nav", className);

  return (
    <nav {...props} className={classes}>
      <ul className="list-reset">
        <li>
          <Link to="/contact/">Contact</Link>
        </li>
        <li>
          <Link to="/about-us/">About us</Link>
        </li>
        <li>
          <Link to="/faqs/">FAQ&apos;s</Link>
        </li>
        <li>
          <Link to="/support/">Support</Link>
        </li>
      </ul>
    </nav>
  );
};

FooterNav.propTypes = {
  className: PropTypes.string,
};

export default FooterNav;
