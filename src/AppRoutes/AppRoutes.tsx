import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Layout from "../Layout";
import SignUpPage from "../pages/SignUpPage";
import MembershipsPage from "../pages/MembershipsPage";
import LoginPage from "../pages/LoginPage";
import Loader from "../components/custom-ui/Loader";
import { useAuthCheck } from "../hooks/useCheckAuth";
import UserDashboardPage from "../pages/UserDashboardPage";
import { useAuth } from "../context/AuthContext";
import AdminDashboardPage from "../pages/AdminDashboardPage";

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
          // Protected route for admin
          path: "/admin/dashboard",
          element:
            isAuthenticated && user?.role === "admin" ? (
              <AdminDashboardPage />
            ) : (
              <Navigate to="/dashboard" /> // Redirect non-admins to user dashboard
            ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
