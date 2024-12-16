import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/AxiosConfig";
import { toast } from "../use-toast";
import useLogout from "./useLogout";

const useRefreshToken = () => {
  const { logoutUser } = useLogout();

  const refreshToken = async (): Promise<string | undefined> => {
    try {
      const res = await axiosInstance.post("/auth/refresh-token");

      return res.data; // Assuming the response contains the new access token
    } catch (err) {
      console.error("Error refreshing token:", err);

      // Show error toast
      toast({
        type: "error",
        title: "Session Expired",
        description: "Please log in again.",
      });

      // Logout the user
      // logoutUser();

      return undefined; // Explicitly return undefined to signal failure
    }
  };

  const { mutateAsync: refreshAccessToken } = useMutation<string | undefined>({
    mutationFn: refreshToken,
    onError: (error) => {
      console.error("Mutation error while refreshing token:", error);
    },
  });

  return { refreshAccessToken };
};

export default useRefreshToken;
