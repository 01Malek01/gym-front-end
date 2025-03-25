import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "../Layout";
import MembershipsPage from "../components/MembershipsPage";
import Loader from "../components/custom-ui/Loader";
import { useAuthCheck } from "../hooks/useCheckAuth";
import ManageSupplementsPage from "../pages/Admin/ManageSupplementsPage";
import ManageOffersPage from "../pages/Admin/ManageOffersPage";
import ManageTrainersPage from "../pages/Admin/ManageTrainersPage";
import ManagePaymentsPage from "../pages/Admin/ManagePaymentsPage";
import ManageOrdersPage from "../pages/Admin/ManageOrdersPage";
import ManageMembershipsPage from "../pages/Admin/ManageMembershipsPage";
import ContactSupportPage from "../pages/Admin/ContactSupportPage";
import AddNewAdminPage from "../pages/Admin/AddNewAdminPage";
import { useAuth } from "../context/AuthContext";
import ManageUsersPage from "../pages/Admin/ManageUsersPage";
import LandingPage from "../components/LandingPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import LoginPage from "../pages/Auth/LoginPage";
import UserDashboardPage from "../pages/User/UserDashboardPage";
import AdminDashboardPage from "../pages/Admin/AdminDashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import MembershipPage from "../pages/User/MembershipPage";
// import SupplementPaymentPage from "../pages/User/SupplementPaymentPage";
// import SupplementSuccessPage from "../pages/User/SupplementSuccessPage";
import { AdminRoute } from "./ProtectRoutes";
import SupplementsPage from "../pages/User/SupplementsPage";
import ManageSettings from "../pages/Admin/ManageSettings";

// AppRoutes Component with TypeScript
export default function AppRoutes(): JSX.Element {
  const { isAuthenticated } = useAuthCheck();
  const { user } = useAuth();

  if (isAuthenticated === undefined) {
    return <Loader dimensions="h-[150px] w-[150px]" />; // Handle loading state
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Main layout with navbar and footer
      children: [
        {
          path: "/", // Public landing page for unauthenticated users
          element: isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <LandingPage />
          ),
        },
        {
          path: "/signup", // Public route for signup
          element: isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <SignUpPage />
          ),
        },
        {
          path: "/login", // Public route for login
          element: isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <LoginPage />
          ),
        },
        {
          // Prevent admins from accessing the normal user dashboard
          path: "/dashboard",
          element:
            isAuthenticated && user?.role !== "admin" ? (
              <UserDashboardPage />
            ) : (
              <Navigate to="/admin/dashboard" /> // Redirect admins to admin dashboard
            ),
        },
        {
          path: "/membership", // Public route for memberships (accessible to everyone)
          element: <MembershipsPage />,
        },
        {
          path: "/membership/:membershipId",
          element: <MembershipPage />,
        },
        {
          path: "/supplement",
          element: <SupplementsPage />,
        },
        {
          path: "/contact-support",
          element: <ContactSupportPage />,
        },
        {
          path: "/admin",
          element: <AdminRoute />,
          children: [
            {
              path: "dashboard",
              element: <AdminDashboardPage />,
            },
            {
              path: "manage-users",
              element: <ManageUsersPage />,
            },
            {
              path: "manage-supplements",
              element: <ManageSupplementsPage />,
            },
            {
              path: "manage-offers",
              element: <ManageOffersPage />,
            },
            {
              path: "manage-trainers",
              element: <ManageTrainersPage />,
            },
            {
              path: "manage-payments",
              element: <ManagePaymentsPage />,
            },
            {
              path: "manage-orders",
              element: <ManageOrdersPage />,
            },
            {
              path: "manage-memberships",
              element: <ManageMembershipsPage />,
            },

            {
              path: "add-admin",
              element: <AddNewAdminPage />,
            },
            {
              path: "settings",
              element: <ManageSettings />,
            },
          ],
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
