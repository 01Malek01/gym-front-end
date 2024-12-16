import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import useSignUp from "../hooks/api/useSignUp";

export default function Signup() {
  const { signupUser, isPending, isSuccess } = useSignUp();
  const formSchema = z
    .object({
      username: z
        .string()
        .min(3, { message: "Too short" })
        .max(10, { message: "Too long" }),
      email: z.string().email({ message: "Invalid email" }),
      password: z.string().min(6).max(20),
      confirmPassword: z.string().min(6).max(20),
      gender: z.string().refine((val) => val === "male" || val === "female", {
        message: "Invalid gender",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit } = form;
  const signUp = async (data: z.infer<typeof formSchema>) => {
    await signupUser(data);
  };

  return (
    <div className="signup-wrapper min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="signup-container bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <Form {...form}>
          <form onSubmit={handleSubmit(signUp)} className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-4">Sign Up</h2>

            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      {...field}
                      className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      {...field}
                      className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender Field */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="signup-cta text-center mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                disabled={isPending}
              >
                {isPending ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
