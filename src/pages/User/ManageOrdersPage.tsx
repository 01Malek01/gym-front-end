import { useState } from "react";

export default function ManageOrdersPage() {
  const [orders] = useState([
    {
      _id: "1",
      user: "user_123",
      orderItems: [
        {
          itemType: "Supplement",
          itemPrice: 49.99,
          quantity: 2,
          _id: "item_1"
        }
      ],
      totalPrice: 99.98,
      paymentMethod: "CARD",
      paymentStatus: "completed",
      createdAt: new Date("2025-03-15")
    },
    {
      _id: "2",
      user: "user_456",
      orderItems: [
        {
          itemType: "Training Session",
          itemPrice: 60,
          quantity: 3,
          _id: "item_2"
        }
      ],
      totalPrice: 180,
      paymentMethod: "MWALLET",
      paymentStatus: "pending",
      createdAt: new Date("2025-03-14")
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-app_secondary-orange mb-6">
            Manage Orders
          </h1>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap">#{order._id}</td>
                    <td className="px-6 py-4">
                      {order.orderItems.map((item) => (
                        <div key={item._id} className="mb-1">
                          {item.quantity}x {item.itemType} (${item.itemPrice})
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">${order.totalPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded ${
                        order.paymentStatus === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">Details</button>
                      <button className="text-red-600 hover:text-red-900">Cancel</button>
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