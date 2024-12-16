import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/custom-ui/Loader";

// Define props for ProtectedRoute and PublicRoute
// This interface defines the shape of the props that will be passed to the ProtectedRoute and PublicRoute components
interface RouteProps {
  // Whether the user is authenticated or not
  isAuthenticated: boolean | undefined;
  // The URL to redirect to if the user is not authenticated (for ProtectedRoute) or if the user is authenticated (for PublicRoute)
  redirectTo: string;
  // Optional children to render if the user is authenticated (for ProtectedRoute) or if the user is not authenticated (for PublicRoute)
  children?: React.ReactNode;
  role?: string;
}

const ProtectedRoute: React.FC<RouteProps> = ({
  isAuthenticated,
  redirectTo,
}) => {
  if (isAuthenticated === undefined) {
    // Show a loader or blank screen while authentication is being checked
    return (
      <>
        <Loader dimensions="h-[150px] w-[150px]" />{" "}
      </>
    );
  }
  return isAuthenticated === true ? <Outlet /> : <Navigate to={redirectTo} />;
};

const PublicRoute: React.FC<RouteProps> = ({ isAuthenticated, redirectTo }) => {
  if (isAuthenticated === undefined) {
    // Show a loader or blank screen while authentication is being checked
    return <Loader dimensions="h-[150px] w-[150px]" />;
  }
  return isAuthenticated === false ? <Outlet /> : <Navigate to={redirectTo} />;
};

const AdminRoute: React.FC<RouteProps> = ({
  isAuthenticated,
  redirectTo,
  role,
}) => {
  console.log("role", role);
  if (isAuthenticated === undefined) {
    // Show a loader or blank screen while authentication is being checked
    return <Loader dimensions="h-[150px] w-[150px]" />;
  }

  return role === "admin" ? <Outlet /> : <Navigate to={redirectTo} />;
};
export { PublicRoute, ProtectedRoute, AdminRoute };
