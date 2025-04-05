import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { User } from "../../types";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  gender: z.string().min(1, "Gender is required"),
  membershipStatus: z.enum(["active", "expired", "pending"], {
    errorMap: () => ({ message: "Invalid membership status" }),
  }),
});

export default function ManageUsersPage({
  onSubmit,
}: {
  onSubmit: (data: User) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: zodResolver(schema) });

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
        Add a User
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input {...register("username")} placeholder="Username" />
        {errors.username && (
          <p className="text-red-500 text-sm">
            {errors.username.message as string}
          </p>
        )}

        <Input {...register("email")} type="email" placeholder="Email" />
        {errors.email && (
          <p className="text-red-500 text-sm">
            {errors.email.message as string}
          </p>
        )}

        <div className="relative">
          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="pr-10"
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
        {errors.password && (
          <p className="text-red-500 text-sm">
            {errors.password?.message as string}
          </p>
        )}

        <select {...register("gender")} className="w-full border p-2 rounded">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">
            {errors.gender?.message as string}
          </p>
        )}

        <select
          {...register("membershipStatus")}
          className="w-full border p-2 rounded"
        >
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="pending">Pending</option>
        </select>
        {errors.membershipStatus && (
          <p className="text-red-500 text-sm">
            {typeof errors.membershipStatus?.message === "string" &&
              errors.membershipStatus.message}
          </p>
        )}

        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add User
        </Button>
      </form>
    </div>
  );
}
