import useGetUserOrders from "@/hooks/api/useGetUserOrders";
import { Order } from "@/types";
import { useEffect, useState } from "react";
import Loader from "../custom-ui/Loader";
import dayjs from "dayjs";

function TrainingLog() {
  const [ordersState, setOrdersState] = useState<Order[]>([]);
  const {
    userOrders,
    isLoading: isOrdersLoading,
    isSuccess: isOrdersSuccess,
  } = useGetUserOrders();

  useEffect(() => {
    if (isOrdersSuccess && userOrders) {
      setOrdersState(userOrders?.orders);
    }
  }, [userOrders, isOrdersSuccess]);

  // If we have user data but orders are still loading

  return (
    <div className="bg-app_neutral-charcoal border border-app_primary-electricBlue rounded-xl shadow-2xl p-6 flex flex-col overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-extrabold text-app_primary-brightTeal uppercase tracking-wider mb-6 pb-2 border-b border-app_primary-electricBlue">
        Training Log
      </h2>
      <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-app_primary-electricBlue scrollbar-track-app_neutral-graphite -mr-4 pr-4">
        {" "}
        {/* Added custom scrollbar classes */}
        {isOrdersLoading && <Loader dimensions="h-16 w-16" />}
        {isOrdersSuccess && ordersState?.length > 0 ? (
          <ul className="space-y-4">
            {ordersState.map((order) => (
              <li
                key={order._id}
                className="bg-app_neutral-graphite border border-app_neutral-charcoal rounded-lg p-4 transition-all duration-200 hover:bg-app_neutral-charcoal/80 hover:shadow-lg group"
              >
                <p className="text-xl font-bold text-app_primary-electricBlue mb-1">
                  Session ID:{" "}
                  <span className="text-app_neutral-lightGray/90 text-lg font-mono">
                    {order._id.substring(0, 8)}...
                  </span>
                </p>
                <p className="text-sm text-app_neutral-lightGray/70 mb-1">
                  Date: {dayjs(order.createdAt).format("DD/MM/YYYY hh:mm A")}
                </p>
                <p
                  className={`text-sm font-semibold mb-1 ${
                    order.paymentStatus === "success"
                      ? "text-app_primary-brightTeal"
                      : "text-app_secondary-orange"
                  }`}
                >
                  Status: {order.paymentStatus}
                </p>
                <p className="text-lg font-bold text-app_secondary-brightRed">
                  Total:{" "}
                  <span className="text-app_neutral-lightGray/90">
                    ${order.totalPrice.toFixed(2)}
                  </span>
                </p>
                <div className="mt-4 pt-3 border-t border-app_neutral-charcoal">
                  <h3 className="text-md font-bold text-app_neutral-lightGray/80 mb-2 group-hover:text-app_primary-brightTeal">
                    Items:
                  </h3>
                  <ul className="list-disc list-inside pl-2 space-y-1">
                    {order.orderItems.map((item) => (
                      <li
                        key={item._id}
                        className="text-sm text-app_neutral-lightGray/80"
                      >
                        <span className="font-semibold text-app_primary-electricBlue">
                          {item.quantity}x
                        </span>{" "}
                        {item.itemType} -{" "}
                        <span className="text-app_secondary-orange">
                          ${item.itemPrice.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-app_neutral-lightGray/70 text-center text-lg mt-10">
            No intense workouts logged yet. Time to hit the gym!
          </p>
        )}
      </div>
    </div>
  );
}

export default TrainingLog;
