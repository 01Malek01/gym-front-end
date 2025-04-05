import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../context/AuthContext";
import useLogout from "../../hooks/api/useLogout";
import Loader from "../../components/custom-ui/Loader";
import dayjs from "dayjs";
import useGetUserOrders from "../../hooks/api/useGetUserOrders";
import { useEffect, useState } from "react";
import { Order } from "../../types";

export default function UserDashboardPage() {
  const { logoutUser } = useLogout();
  const handleLogout = async () => {
    await logoutUser();
  };

  const { user, isLoading: isUserLoading, isAuthenticated } = useAuth();
  const {
    userOrders,
    isLoading: isOrdersLoading,
    isSuccess: isOrdersSuccess,
  } = useGetUserOrders();

  const [ordersState, setOrdersState] = useState<Order[]>([]);

  useEffect(() => {
    if (isOrdersSuccess && userOrders) {
      setOrdersState(userOrders?.orders);
    }
  }, [userOrders, isOrdersSuccess]);

  return isUserLoading || !isAuthenticated ? (
    <Loader dimensions="h-[150px] w-[150px]" />
  ) : (
    <div className="Dashboard-wrapper">
      <div className="h-screen grid grid-rows-[auto_1fr] dashboard-container">
        <div className="grid grid-cols-2 gap-4 p-4">
          {/* Orders History Section */}
          <div className="bg-white rounded-lg shadow-md p-4 orders overflow-y-scroll h-80">
            <h2 className="text-3xl font-bold mb-2">Order History</h2>
            <ul>
              {isOrdersLoading && <Loader dimensions="h-[50px] w-[50px]" />}
              {isOrdersSuccess ? (
                ordersState?.map((order) => (
                  <li key={order._id} className="border-b border-gray-200 py-2">
                    <p className="text-lg font-bold">Order ID: {order._id}</p>
                    <p className="text-sm">
                      {dayjs(order.createdAt).format("DD/MM/YYYY")}
                    </p>
                    <p className="text-sm">Status: {order.paymentStatus}</p>
                    <p className="text-sm">
                      Total: ${order.totalPrice.toFixed(2)}
                    </p>
                    <div className="mt-2">
                      <h3 className="text-md font-bold">Items:</h3>
                      <ul className="list-disc pl-5">
                        {order.orderItems.map((item) => (
                          <li key={item._id} className="text-sm">
                            {item.quantity}x {item.itemType} - $
                            {item.itemPrice.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))
              ) : (
                <p>No orders yet</p>
              )}
            </ul>
          </div>

          {/* User Profile Section */}
          <div className="bg-white rounded-lg shadow-md p-4 profile overflow-y-auto h-80">
            <h2 className="text-3xl font-bold mb-2">User Profile</h2>
            <p className="mb-2">Name: {user?.username}</p>
            {user?.membershipStatus !== "pending" && (
              <p className="mb-2">
                Membership: {user?.membershipType?.type || "None"}
              </p>
            )}
            <p className="mb-2">Email: {user?.email}</p>
            <p className="mb-2">
              Joined:{" "}
              {user?.createdAt && dayjs(user.createdAt).format("DD/MM/YYYY")}
            </p>
            <Button className="w-1/4 mt-2" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Membership Status Section */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-bold mb-2">
            Membership Status :
            {user?.membershipStatus === "pending" && (
              <>
                <span className="text-red-500 text-lg"> (Pending) </span>
                <p className="text-sm opacity-85">
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
                <p className="mb-2">
                  Membership Type: {user?.membershipType?.type}
                </p>
                <p className="mb-2">
                  Membership Expiration Date: {user?.membershipExpirationDate}
                </p>
                <p className="mb-2">
                  Membership Duration In Days:{" "}
                  {user?.membershipType?.durationInDays} days
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
