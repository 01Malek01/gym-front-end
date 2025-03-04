import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/AxiosConfig";

const useGetUserOrders = () => {
  const getUserOrders = async () => {
    const response = await axiosInstance.get("order/user-orders");
    const data = await response.data;
    return data;
  };
  const {
    data: userOrders,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["user-orders"],
    queryFn: getUserOrders,
  });
  return { userOrders, error, isLoading, isSuccess };
};
export default useGetUserOrders;
