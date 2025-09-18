import axiosInstance from "@/api/AxiosConfig";
import { useQuery } from "@tanstack/react-query";

const useGetNotifications = () => {
  const getNotifications = async () => {
    const res = await axiosInstance.get("/notification/my-notifications");
    return res.data;
  };
  const {
    data: notifications,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    retry(failureCount, error) {
      if (failureCount >= 3) {
        throw error;
      } else {
        return false; // retry
      }
    },
  });
  return { notifications, error, isLoading, isSuccess, refetch };
};

export default useGetNotifications;
