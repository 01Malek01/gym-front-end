import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/AxiosConfig";

const useGetAllUsers = () => {
  const getAllUsers = async () => {
    const res = await axiosInstance.get("/admin/user/all-users");
    return res.data?.users;
  };

  const {
    data: users,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    // Stale Time: 10 seconds (default recommended value)
    staleTime: 10000,
    // Refetch data when window gains focus (optional)
    refetchOnWindowFocus: true, // Adjust based on specific needs
  });

  return { users, isLoading, isSuccess, error, refetch };
};
export default useGetAllUsers;
