import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/AxiosConfig";

const useMarkAllAsRead = () => {
  const markAllAsReadReq = async () => {
    const res = await axiosInstance.delete("/notification/delete-all");
    return res.data;
  };
  const {
    mutateAsync: markAllAsRead,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationKey: ["markAllAsRead"],
    mutationFn: markAllAsReadReq,
    retry(failureCount, error: unknown) {
      if (failureCount >= 3) {
        throw error;
      } else {
        return false; // retry
      }
    },
  });
  return { markAllAsRead, error, isPending, isSuccess };
};

export default useMarkAllAsRead;
