import { useState } from "react";
import Loader from "../../components/custom-ui/Loader";

export default function ManageOffersPage() {
  const [offers] = useState([
    {
      _id: "1",
      title: "Summer Sale",
      description: "20% off all protein supplements",
      discountPercentage: 20,
      validFrom: new Date("2025-06-01"),
      validUntil: new Date("2025-08-31"),
      applicableProducts: ["Whey Protein", "Creatine"],
    },
    {
      _id: "2",
      title: "New Member Special",
      description: "15% off first membership",
      discountPercentage: 15,
      validFrom: new Date("2025-01-01"),
      validUntil: new Date("2025-12-31"),
      applicableProducts: ["Premium Membership"],
    },
  ]);

  const [isLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-app_secondary-orange mb-6">
            Manage Offers
          </h1>

          <div className="mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Create New Offer
            </button>
          </div>

          {isLoading ? (
            <Loader dimensions="w-16 h-16" />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valid Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {offers.map((offer) => (
                    <tr key={offer._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {offer.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {offer.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {offer.discountPercentage}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {offer.validFrom.toLocaleDateString()} -{" "}
                        {offer.validUntil.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
