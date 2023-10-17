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

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Home from "layouts/home";
import Application from "layouts/application";
import Rules from "layouts/rules";
import ChangeLogs from "layouts/change-logs";
import StarterGuide from "layouts/starter-guide";
import MyAccount from "layouts/my-account";

// Soft UI Dashboard React icons

import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import WebAssetOutlinedIcon from "@mui/icons-material/WebAssetOutlined";
import RuleFolderOutlinedIcon from "@mui/icons-material/RuleFolderOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import ContentPasteGoOutlinedIcon from "@mui/icons-material/ContentPasteGoOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    route: "/home",
    icon: <CottageOutlinedIcon size="12px" />,
    component: <Home />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Application",
    key: "application",
    route: "/application",
    icon: <WebAssetOutlinedIcon size="12px" />,
    component: <Application />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Rules",
    key: "rules",
    route: "/rules",
    icon: <RuleFolderOutlinedIcon size="12px" />,
    component: <Rules />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Change Logs",
    key: "change-logs",
    route: "/change-logs",
    icon: <TextSnippetOutlinedIcon size="12px" />,
    component: <ChangeLogs />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Starter Guide",
    key: "starter-guide",
    route: "/starter-guide",
    icon: <ContentPasteGoOutlinedIcon size="12px" />,
    component: <StarterGuide />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "My Account",
    key: "my-account",
    route: "/my-account",
    icon: <AccountCircleOutlinedIcon size="12px" />,
    component: <MyAccount />,
    noCollapse: true,
  },
  {
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    key: "sign-up",
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
