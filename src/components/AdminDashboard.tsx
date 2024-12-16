import useLogout from "../hooks/api/useLogout";
import { Button } from "./ui/button";

export default function AdminDashboard() {
  const { logoutUser } = useLogout();
  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <div className="text-white text-3xl">
      AdminDashboard
      <Button variant={"secondary"} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
