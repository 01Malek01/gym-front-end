import { useAuth } from "../../context/AuthContext";
import { useAuthCheck } from "../../hooks/useCheckAuth";
import AdminSidebar from "./AdminSidebar";
import UserSidebar from "./UserSidebar";

export default function AppSidebar() {
  const { user } = useAuth();
  const { isAuthenticated } = useAuthCheck();

  if (isAuthenticated && user?.role === "admin") {
    return <>{/* <AdminSidebar /> */}</>;
  } else if (isAuthenticated && user?.role === "user") {
    return (
      <>
        <UserSidebar />
      </>
    );
  } else {
    return null;
  }
}
