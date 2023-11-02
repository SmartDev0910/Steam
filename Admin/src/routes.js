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
import Members from "layouts/members";
import ChangeLogs from "layouts/change-logs";
import StarterGuide from "layouts/starter-guide";
import NewsLetter from "layouts/news-letter";
import ChangeLogDetail from "layouts/change-logs/detail";
import ApplicationPortal from "layouts/application-portal";
import NewApplication from "layouts/application-portal/new";
import ApplyList from "layouts/application-portal/list";

// Soft UI Dashboard React icons
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import NewspaperIcon from '@mui/icons-material/Newspaper';

const routes = [
  {
    type: "collapse",
    name: "Members",
    key: "members",
    route: "/members",
    icon: <PeopleAltOutlinedIcon size="12px" />,
    component: <Members />,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "ChangeLogs",
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
    icon: <AutoStoriesOutlinedIcon size="12px" />,
    component: <StarterGuide />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "News Letter",
    key: "news-letter",
    route: "/news-letter",
    icon: <NewspaperIcon size="12px" />,
    component: <NewsLetter />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Application Portal",
    key: "application-portal",
    route: "/application-portal",
    icon: <TaskOutlinedIcon size="12px" />,
    component: <ApplicationPortal />,
    noCollapse: true,
  },
  {
    key: "application-portal/create",
    route: "/application-portal/create",
    component: <NewApplication />,
  },
  {
    key: "application-portal/list?",
    route: "/application-portal/list",
    component: <ApplyList />,
  },
  {
    name: "ChangeLogs/:id",
    key: "change-logs/:id",
    route: "/change-logs/:id",
    component: <ChangeLogDetail />,
  },
  {
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
