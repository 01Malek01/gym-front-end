import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "../../types";
import useGetAllUsers from "../../hooks/api/Admin/useGetAllUsers";
import useAddUser from "../../hooks/api/Admin/useAddUser";
import useRemoveUser from "../../hooks/api/Admin/useRemoveUser";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/use-toast";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  gender: z.string().min(1, "Gender is required"),
  membershipStatus: z
    .string()
    .min(3, "Membership status is required")
    .refine((val) => ["active", "expired", "pending"].includes(val), {
      message: "Membership status must be either active, expired or pending",
    }),
});

export default function ManageUsers() {
  const { isLoading, isSuccess, refetch, users } = useGetAllUsers();

  const { createUser, isSuccess: isAddSuccess } = useAddUser();
  const { deleteUser, isSuccess: isDeleteSuccess } = useRemoveUser();
  const [usersState, setUsersState] = useState<User[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const { user: authUser } = useAuth();
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();

  // Update local users state on fetch success
  useEffect(() => {
    if (isSuccess) {
      setUsersState(users);
    }
  }, [isSuccess, users]);

  // Refetch users when user is added or removed
  useEffect(() => {
    if (isAddSuccess || isDeleteSuccess) {
      refetch();
      toast({
        title: "Users Updated",
        description: "Action completed successfully",
      });
    }
  }, [isAddSuccess, isDeleteSuccess, refetch, toast]);

  // Handle form submission
  const onSubmit = async (data: {
    username: string;
    email: string;
    password: string;
    gender: string;
    membershipStatus: string;
  }) => {
    createUser(data);
    reset();
  };

  if (isLoading && !isSuccess) {
    return <Loader dimensions="h-[150px] w-[150px]" />;
  }

  return (
    <div className="manage-users-wrapper bg-gray-100 h-screen">
      <div className="manage-users-container flex flex-col gap-5">
        <div className="manage-user-header flex items-center justify-center mt-3 p-4 text-center mx-auto">
          <h1 className="text-3xl font-bold text-app_secondary-orange">
            Manage Users
          </h1>
        </div>

        {/* Users Table */}
        <div className="users-table flex items-center justify-center mx-auto p-5">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Membership Status</th>
                <th className="px-4 py-2">Join Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersState
                ?.filter((user) => user?._id !== authUser._id)
                .map((user: User) => (
                  <tr key={user?._id} className="border-b border-gray-200">
                    <td className="px-4 py-2">{user?._id}</td>
                    <td className="px-4 py-2">{user?.email}</td>
                    <td className="px-4 py-2">{user?.username}</td>
                    <td className="px-4 py-2">{user?.gender}</td>
                    <td className="px-4 py-2">{user?.membershipStatus}</td>
                    <td className="px-4 py-2">
                      {dayjs(user?.createdAt).format("DD/MM/YYYY")}
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        onClick={() => deleteUser(user?._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Add User Form */}
        <div className="add-user-form flex items-center justify-between border shadow mx-auto p-5">
          <h2 className="text-app_secondary-orange text-2xl">
            Add A User Manually
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col gap-5">
              <Input
                {...register("username")}
                type="text"
                placeholder="Username"
                className="w-full"
              />
              <Input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="w-full"
              />
              <div className="relative w-full">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <select {...register("gender")} className="w-full">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <span className="input-title text-sm font-medium text-gray-700 mb-1 block">
                Membership Status
              </span>
              <select
                defaultValue="pending"
                {...register("membershipStatus")}
                className="w-full"
              >
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="pending">Pending</option>
              </select>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add User
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
