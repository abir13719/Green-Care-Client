import { createBrowserRouter } from "react-router-dom";
import GreenCare from "../GreenCare";
import AvailableCamps from "../pages/AvailableCamps";
import CampDetails from "../pages/CampDetails";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddCamp from "../pages/Dashboard/AdminPanel/AddCamp";
import ManageCamps from "../pages/Dashboard/AdminPanel/ManageCamps";
import ManageRegisteredCamps from "../pages/Dashboard/AdminPanel/ManageRegisteredCamps";
import Analytics from "../pages/Dashboard/UserPanel/Analytics";
import ManageAdminProfile from "../pages/Dashboard/AdminPanel/ManageAdminProfile";
import ManageUserProfile from "../pages/Dashboard/UserPanel/ManageUserProfile";
import RegisteredCamps from "../pages/Dashboard/UserPanel/RegisteredCamps";
import PaymentHistory from "../pages/Dashboard/UserPanel/PaymentHistory";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GreenCare></GreenCare>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/available-camps",
        element: <AvailableCamps></AvailableCamps>,
      },
      {
        path: "/camps/:id",
        element: (
          <PrivateRoutes>
            <CampDetails></CampDetails>
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard></Dashboard>
      </PrivateRoutes>
    ),
    children: [
      // Admin Routes
      {
        path: "dashboard/manage-admin-profile",
        element: (
          <AdminRoutes>
            <ManageAdminProfile></ManageAdminProfile>
          </AdminRoutes>
        ),
      },
      {
        path: "dashboard/add-camp",
        element: (
          <AdminRoutes>
            <AddCamp></AddCamp>
          </AdminRoutes>
        ),
      },
      {
        path: "dashboard/manage-camps",
        element: (
          <AdminRoutes>
            <ManageCamps></ManageCamps>
          </AdminRoutes>
        ),
      },
      {
        path: "dashboard/manage-registered-camps",
        element: (
          <AdminRoutes>
            <ManageRegisteredCamps></ManageRegisteredCamps>
          </AdminRoutes>
        ),
      },

      // User Routes
      {
        path: "dashboard/analytics",
        element: <Analytics></Analytics>,
      },
      {
        path: "dashboard/manage-user-profile",
        element: <ManageUserProfile></ManageUserProfile>,
      },
      {
        path: "dashboard/registered-camps",
        element: <RegisteredCamps></RegisteredCamps>,
      },
      {
        path: "dashboard/payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
    ],
  },
]);

export default router;
