import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/AxiosConfig";

const useGetUserProfile = () => {
  const getUserProfile = async () => {
    const res = await axiosInstance.get("/user/user-profile");
    return res.data;
  };
  const {
    data: user,
    error,
    isLoading,
    isSuccess,
    refetch 
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    retry(failureCount, error) {
      if (failureCount >= 3) {
        throw error;
      } else {
        return false; // retry
      }
    },
  });
  return { user, error, isLoading, isSuccess, refetch };
};

export default useGetUserProfile;
