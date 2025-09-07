import { useState } from "react";
import Loader from "../../components/custom-ui/Loader";
import { FiPlus, FiEdit2, FiTrash2, FiPercent, FiCalendar, FiTag } from "react-icons/fi";

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Manage Offers</h2>
                <p className="mt-1 text-sm text-gray-500">Create and manage special offers for your members</p>
              </div>
              <button 
                onClick={() => {}}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled
                title="Create new offer (coming soon)"
              >
                <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                New Offer
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader dimensions="w-16 h-16" />
            </div>
          ) : (
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Offer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <FiPercent className="mr-1" /> Discount
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <FiCalendar className="mr-1" /> Valid Dates
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <FiTag className="mr-1" /> Products
                        </div>
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {offers.map((offer) => (
                      <tr key={offer._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{offer.title}</div>
                          <div className="text-sm text-gray-500">{offer.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {offer.discountPercentage}% OFF
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {offer.validFrom.toLocaleDateString()} - {offer.validUntil.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {offer.applicableProducts.join(', ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            <button 
                              className="text-blue-600 hover:text-blue-900"
                              onClick={() => {}}
                              title="Edit offer"
                            >
                              <FiEdit2 className="h-5 w-5" />
                              <span className="sr-only">Edit</span>
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-900"
                              onClick={() => {}}
                              title="Delete offer"
                            >
                              <FiTrash2 className="h-5 w-5" />
                              <span className="sr-only">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
