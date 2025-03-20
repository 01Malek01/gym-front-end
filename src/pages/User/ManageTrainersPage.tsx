import { useState } from "react";
import Loader from "../../components/custom-ui/Loader";

export default function ManageTrainersPage() {
  const [trainers] = useState([
    {
      _id: "1",
      name: "John Smith",
      specialization: "Strength Training",
      bio: "Certified personal trainer with 10+ years experience",
      hourlyRate: 60,
      availability: ["Mon 9-12", "Wed 2-5", "Fri 10-1"]
    },
    {
      _id: "2",
      name: "Sarah Johnson",
      specialization: "Yoga & Mobility",
      bio: "RYT-500 certified yoga instructor",
      hourlyRate: 45,
      availability: ["Tue 3-6", "Thu 9-12", "Sat 10-2"]
    }
  ]);

  const [isLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-app_secondary-orange mb-6">
            Manage Trainers
          </h1>
          
          <div className="mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add New Trainer
            </button>
          </div>

          {isLoading ? (
            <Loader dimensions="w-16 h-16" />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hourly Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {trainers.map((trainer) => (
                    <tr key={trainer._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{trainer.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{trainer.specialization}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${trainer.hourlyRate}/hr</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {trainer.availability.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
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