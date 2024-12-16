import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import useLogout from "../hooks/api/useLogout";
import Loader from "./custom-ui/Loader";
import dayjs from "dayjs";

export default function UserDashboard() {
  const { logoutUser } = useLogout();
  const handleLogout = async () => {
    await logoutUser();
  };
  const { user, isUserLoading, isSuccessUser } = useAuth();

  // useEffect(() => {
  //   console.log("user", user);
  //   console.log(isSuccessUser);
  // }, [user, isSuccessUser]);
  if (isUserLoading && !isSuccessUser) {
    return <Loader dimensions="h-[150px] w-[150px]" />;
  }
  return (
    <div className="Dashboard-wrapper">
      <div className="h-screen grid grid-rows-[auto_1fr] dashboard-container">
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-3xl font-bold mb-2">Orders History</h2>
            <ul>
              <li className="py-2 border-b border-gray-200">Order 1</li>
              <li className="py-2 border-b border-gray-200">Order 2</li>
              <li className="py-2 border-b border-gray-200">Order 3</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-3xl font-bold mb-2">User Profile</h2>
            <p className="mb-2">Name: {user?.username}</p>
            {user?.membershipStatus !== "pending" && (
              <p className="mb-2">Membership: Premium</p>
            )}
            <p className="mb-2">Email: {user?.email}</p>
            <p className="mb-2">
              Joined: {dayjs(user?.createdAt).format("DD/MM/YYYY")}
            </p>
            <Button className="w-1/4 mt-2" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-bold mb-2">
            Membership Status :
            {user?.membershipStatus === "pending" && (
              <>
                <span className="text-red-500 text-lg"> (Pending) </span>
                <p className="text-sm opacity-85">
                  {" "}
                  Purchase a membership now to unlock more features!
                  <Link
                    to={"/membership"}
                    className="text-blue-600 text-xl mx-2 underline hover:opacity-70"
                  >
                    Browse Memberships
                  </Link>
                </p>
              </>
            )}
          </h2>
          {user?.membershipStatus !== "pending" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-lg font-bold mb-2">Current Plan</p>
                <p className="mb-2">Premium</p>
                <p className="mb-2">Expires: 2024-12-31</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-lg font-bold mb-2">Upgrade Options</p>
                <ul>
                  <li className="py-2 border-b border-gray-200">Pro</li>
                  <li className="py-2 border-b border-gray-200">Business</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
