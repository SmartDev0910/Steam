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
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard React themes
import theme from "assets/theme";

// Soft UI Dashboard React routes
import routes from "routes";

// Soft UI Dashboard React contexts
import { useClubAdminController, setMiniSidenav } from "context";

// Images
import brand from "assets/images/logo-ct.png";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const isAuth = () => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    return JSON.parse(currentUser);
  } else {
    return null;
  }
};

const PrivateRoute = () => {
  return isAuth() ? <Outlet /> : <Navigate to="/home" />;
};

export default function App() {
  const [controller, dispatch] = useClubAdminController();
  const { miniSidenav, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) => {
    return allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        if (
          route.route !== "/home" &&
          route.route !== "/rules" &&
          route.route !== "/change-logs" &&
          route.route !== "/newsletter" &&
          route.route !== "/authentication/sign-in" &&
          route.route !== "/authentication/sign-up"
        ) {
          return (
            <Route exact path="/" element={<PrivateRoute />} key={route.key}>
              <Route exact path={route.route} element={route.component} />
            </Route>
          );
        } else {
          return <Route exact path={route.route} element={route.component} key={route.key} />;
        }
      }
      return null;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        {layout === "dashboard" &&
          isAuth() &&
          !pathname.includes("home") &&
          !pathname.includes("rules") &&
          !pathname.includes("change-logs") && (
            <>
              <Sidenav
                color={sidenavColor}
                brand={brand}
                brandName="CircuitRP"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
            </>
          )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
        <ToastContainer />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
