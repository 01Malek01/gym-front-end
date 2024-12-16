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
import useLogin from "../hooks/api/useLogin";
import { useToast } from "../hooks/use-toast";

export default function Login() {
  const { loginUser, isPending, isSuccess, isError } = useLogin();
  const { toast } = useToast();
  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = form;
  const login = async (data: z.infer<typeof formSchema>) => {
    const res = await loginUser(data);
  };

  return (
    <div className="login-wrapper min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="login-container bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <Form {...form}>
          <form onSubmit={handleSubmit(login)} className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-4">Login</h2>

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

            {/* Submit Button */}
            <div className="login-cta text-center mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                {isPending ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
