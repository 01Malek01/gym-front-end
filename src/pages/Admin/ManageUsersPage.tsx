import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff, UserPlus, User, Mail, Lock, Users, Calendar } from "lucide-react";
import { User as UserType } from "../../types";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  gender: z.string().min(1, "Gender is required"),
  membershipStatus: z.enum(["active", "expired", "pending"], {
    errorMap: () => ({ message: "Invalid membership status" }),
  }),
  joinDate: z.string().optional(),
});

type UserFormData = z.infer<typeof schema>;

export default function ManageUsersPage({
  onSubmit,
}: {
  onSubmit?: (data: UserType) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserFormData>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      joinDate: new Date().toISOString().split('T')[0] // Set default join date to today
    }
  });

  const handleFormSubmit = (data: UserFormData) => {
    if(onSubmit){
      onSubmit(data as UserType);
    }
    reset();
    setActiveTab('list');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
                <p className="mt-1 text-sm text-gray-500">Manage your gym members and their memberships</p>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setActiveTab('list')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  View All Users
                </button>
                <button 
                  onClick={() => setActiveTab('add')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'add' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <span className="flex items-center">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add New User
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'add' ? (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                    <UserPlus className="h-5 w-5 mr-2 text-blue-500" />
                    Add New Member
                  </h3>
                  
                  <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                          Username
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="username"
                            {...register("username")}
                            type="text"
                            className={`pl-10 block w-full rounded-md ${errors.username ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
                            placeholder="johndoe"
                          />
                        </div>
                        {errors.username && (
                          <p className="mt-1 text-sm text-red-600">{errors.username.message as string}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="email"
                            {...register("email")}
                            type="email"
                            className={`pl-10 block w-full rounded-md ${errors.email ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
                            placeholder="john@example.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="password"
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            className={`pl-10 pr-10 block w-full rounded-md ${errors.password ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                            title={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="mt-1 text-sm text-red-600">{errors.password.message as string}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        <select
                          id="gender"
                          {...register("gender")}
                          className={`block w-full rounded-md ${errors.gender ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.gender && (
                          <p className="mt-1 text-sm text-red-600">{errors.gender.message as string}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="membershipStatus" className="block text-sm font-medium text-gray-700 mb-1">
                          Membership Status
                        </label>
                        <select
                          id="membershipStatus"
                          {...register("membershipStatus")}
                          className={`block w-full rounded-md ${errors.membershipStatus ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
                        >
                          <option value="active">Active</option>
                          <option value="expired">Expired</option>
                          <option value="pending">Pending</option>
                        </select>
                        {errors.membershipStatus && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.membershipStatus.message as string}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Join Date
                        </label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="joinDate"
                            {...register("joinDate")}
                            type="date"
                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setActiveTab('list')}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <UserPlus className="-ml-1 mr-2 h-5 w-5" />
                        Add Member
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-500 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">All Members</h3>
                  </div>
                </div>
                <div className="p-6 text-center text-gray-500">
                  <p>User list will be displayed here</p>
                  <button
                    onClick={() => setActiveTab('add')}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <UserPlus className="-ml-1 mr-2 h-5 w-5" />
                    Add New Member
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
