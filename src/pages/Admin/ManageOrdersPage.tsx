import { useEffect, useState } from "react";
import useGetOrders from "../../hooks/api/Admin/orders/useGetOrders";
import Loader from "../../components/custom-ui/Loader";
import { Order } from "../../types";

export default function ManageOrdersPage() {
  const { data, isError, isLoading } = useGetOrders();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (data) {
      setOrders(data?.orders);
    } else if (isError) {
      console.error("Error fetching orders");
    }
  }, [data, isError]);
  if (isLoading) {
    return <Loader dimensions=" h-[50px] w-[50px]" />;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-app_secondary-orange mb-6">
            Manage Orders
          </h1>

          <div className="overflow-x-auto orders-table">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      #{order._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.user}
                    </td>

                    <td className="px-6 py-4">
                      {order.orderItems.map((item) => (
                        <div key={item._id} className="mb-1">
                          {item.quantity}x {item.itemType} (${item.itemPrice})
                          {item.itemDescription && (
                            <p className="text-gray-500 text-sm">
                              {item.itemDescription}
                            </p>
                          )}
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${order.totalPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded ${
                          order.paymentStatus === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.paymentMethod}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
