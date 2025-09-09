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

  const { user, isLoading: isUserLoading, isAuthenticated, refetchUser } = useAuth();
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

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);
  // Show loader if user is still loading or if we don't have user data yet
  if (isUserLoading || !isAuthenticated || !user) {
    return <Loader dimensions="h-[150px] w-[150px]" />;
  }

  // If we have user data but orders are still loading
  if (isOrdersLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader dimensions="h-[100px] w-[100px]" text="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div className="Dashboard-wrapper min-h-screen bg-gradient-to-br from-app_primary-dark to-app_neutral-charcoal text-app_neutral-lightGray font-sans p-6">
      <div className="h-full grid grid-rows-[auto_1fr] dashboard-container gap-8 max-w-7xl mx-auto">

        {/* Top Section: Orders History & User Profile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Orders History Section */}
          <div className="bg-app_neutral-charcoal border border-app_primary-electricBlue rounded-xl shadow-2xl p-6 flex flex-col overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-extrabold text-app_primary-brightTeal uppercase tracking-wider mb-6 pb-2 border-b border-app_primary-electricBlue">
              Training Log
            </h2>
            <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-app_primary-electricBlue scrollbar-track-app_neutral-graphite -mr-4 pr-4"> {/* Added custom scrollbar classes */}
              {isOrdersLoading && <Loader dimensions="h-16 w-16" />}
              {isOrdersSuccess && ordersState?.length > 0 ? (
                <ul className="space-y-4">
                  {ordersState.map((order) => (
                    <li key={order._id} className="bg-app_neutral-graphite border border-app_neutral-charcoal rounded-lg p-4 transition-all duration-200 hover:bg-app_neutral-charcoal/80 hover:shadow-lg group">
                      <p className="text-xl font-bold text-app_primary-electricBlue mb-1">
                        Session ID: <span className="text-app_neutral-lightGray/90 text-lg font-mono">{order._id.substring(0, 8)}...</span>
                      </p>
                      <p className="text-sm text-app_neutral-lightGray/70 mb-1">
                        Date: {dayjs(order.createdAt).format("DD/MM/YYYY hh:mm A")}
                      </p>
                      <p className={`text-sm font-semibold mb-1 ${order.paymentStatus === 'success' ? 'text-app_primary-brightTeal' : 'text-app_secondary-orange'}`}>
                        Status: {order.paymentStatus}
                      </p>
                      <p className="text-lg font-bold text-app_secondary-brightRed">
                        Total: <span className="text-app_neutral-lightGray/90">${order.totalPrice.toFixed(2)}</span>
                      </p>
                      <div className="mt-4 pt-3 border-t border-app_neutral-charcoal">
                        <h3 className="text-md font-bold text-app_neutral-lightGray/80 mb-2 group-hover:text-app_primary-brightTeal">Items:</h3>
                        <ul className="list-disc list-inside pl-2 space-y-1">
                          {order.orderItems.map((item) => (
                            <li key={item._id} className="text-sm text-app_neutral-lightGray/80">
                              <span className="font-semibold text-app_primary-electricBlue">{item.quantity}x</span> {item.itemType} - <span className="text-app_secondary-orange">${item.itemPrice.toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-app_neutral-lightGray/70 text-center text-lg mt-10">No intense workouts logged yet. Time to hit the gym!</p>
              )}
            </div>
          </div>

          {/* User Profile Section */}
          <div className="bg-app_neutral-charcoal border border-app_secondary-crimsonRed rounded-xl shadow-2xl p-6 flex flex-col overflow-hidden">
            <h2 className="text-3xl md:text-4xl font-extrabold text-app_primary-brightTeal uppercase tracking-wider mb-6 pb-2 border-b border-app_secondary-crimsonRed">
              Athlete Profile
            </h2>
            <div className="flex-grow text-lg space-y-3">
              <p className="mb-2"><span className="font-semibold text-app_primary-electricBlue">Name:</span> <span className="text-app_neutral-lightGray/90">{user?.username}</span></p>
              {user?.membershipStatus !== "pending" && (
                <p className="mb-2"><span className="font-semibold text-app_primary-electricBlue">Membership:</span> <span className="text-app_neutral-lightGray/90">{user?.membershipType?.type || "None"}</span></p>
              )}
              <p className="mb-2"><span className="font-semibold text-app_primary-electricBlue">Email:</span> <span className="text-app_neutral-lightGray/90">{user?.email}</span></p>
              <p className="mb-2"><span className="font-semibold text-app_primary-electricBlue">Joined:</span> <span className="text-app_neutral-lightGray/90">{user?.createdAt && dayjs(user.createdAt).format("DD/MM/YYYY")}</span></p>
            </div>
            <Button
              className="mt-6 w-full md:w-1/2 lg:w-1/3 bg-app_secondary-brightRed hover:bg-app_secondary-crimsonRed text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 uppercase tracking-wide text-lg self-end"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Membership Status Section */}
        <div className="bg-zinc-900 border border-yellow-700 rounded-xl shadow-2xl p-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-app_primary-brightTeal uppercase tracking-wider mb-6 pb-2 border-b border-app_secondary-orange">
            Membership Status
          </h2>

          {user?.membershipStatus === "pending" ? (
            <div className="text-center bg-app_neutral-graphite border border-app_secondary-orange rounded-lg p-6 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-app_secondary-orange mb-4">
                (Pending) - Unlock Your Full Potential!
              </p>
              <p className="text-lg text-app_neutral-lightGray/80 mb-6">
                Purchase a membership now to access premium features, exclusive classes, and more!
              </p>
              <Link
                to={"/membership"}
                className="bg-app_primary-electricBlue hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 uppercase tracking-wide text-xl inline-block shadow-md hover:shadow-lg"
              >
                Browse Memberships
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`bg-gradient-to-br ${user.membershipStatus === "active" ? "from-app_primary-dark to-app_primary-electricBlue/80 border-app_primary-electricBlue" : "from-app_primary-dark to-app_secondary-crimsonRed/80 border-app_secondary-crimsonRed"} text-white rounded-lg p-6 shadow-xl border relative overflow-hidden`}>
                {user.membershipStatus !== "active" && (
                  <div className="absolute top-7 -right-4 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 transform translate-x-2 -translate-y-2 rotate-45 w-[7rem] text-center">
                    Expired
                  </div>
                )}
                <p className="text-2xl font-bold mb-3 uppercase tracking-wide text-app_primary-brightTeal">
                  Current Plan: <span className="text-white">{user?.membershipType?.type}</span>
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold text-app_primary-brightTeal/90">Status:</span>{' '}
                  <span className={`font-bold ${user.membershipStatus === "active" ? "text-green-300" : "text-red-300"}`}>
                    {user.membershipStatus?.toUpperCase()}
                  </span>
                </p>
                <p className="text-lg mb-2">
                  <span className="font-semibold text-app_primary-brightTeal/90">Expiration:</span>{' '}
                  <span className={user.membershipStatus !== "active" ? "line-through text-red-200" : ""}>
                    {user?.membershipExpirationDate && new Date(user?.membershipExpirationDate as string).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-lg mb-4">
                  <span className="font-semibold text-app_primary-brightTeal/90">Duration:</span>{' '}
                  {user?.membershipType?.durationInDays} days
                </p>
                
                {user.membershipStatus !== "active" && (
                  <Link
                    to="/membership"
                    className="mt-4 inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 text-center"
                  >
                    Renew Membership
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
