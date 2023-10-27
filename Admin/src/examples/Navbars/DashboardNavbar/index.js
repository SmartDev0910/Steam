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

// react-router components
import { useLocation, Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

// Soft UI Dashboard React examples
import Breadcrumbs from "examples/Breadcrumbs";

// Custom styles for DashboardNavbar
import { navbar, navbarContainer, navbarRow } from "examples/Navbars/DashboardNavbar/styles";

// Soft UI Dashboard React context
import { useClubAdminController, setTransparentNavbar } from "context";

// Images
import burceMars from "assets/images/bruce-mars.jpg";

import SoftButton from "components/SoftButton";
import { toast } from "react-toastify";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useClubAdminController();
  const { transparentNavbar, fixedNavbar } = controller;
  const route = useLocation().pathname.split("/").slice(1);
  const navigate = useNavigate();

  const handleLogOut = () => {
    toast.success("Log Out");
    localStorage.removeItem("currentUser");
    navigate("/home");
  };

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={true} />
        </SoftBox>
        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            <SoftBox color={light ? "white" : "inherit"} display="flex" alignItems="center">
              <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
                <SoftBox mr={2}>
                  <SoftAvatar src={burceMars} alt={"Admin"} size="sm" variant="rounded" />
                </SoftBox>
                <SoftBox display="flex" flexDirection="column">
                  <SoftTypography variant="caption" color="white">
                    {JSON.parse(localStorage.getItem("currentUser"))
                      ? JSON.parse(localStorage.getItem("currentUser"))?.email
                      : ""}
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
              <SoftBox pt={2} my={2} mx={2} mt="auto">
                <SoftBox>
                  <SoftButton
                    rel="noreferrer"
                    variant="text"
                    color={"info"}
                    fullWidth
                    onClick={handleLogOut}
                  >
                    Log Out
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
