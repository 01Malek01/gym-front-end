import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../api/AxiosConfig";
import { Order } from "../../../../types";

const fetchOrders = async (): Promise<{ orders: Order[] }> => {
  const res = await axiosInstance.get(`/order/all-orders`);
  return res.data;
};

const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
};

export default useGetOrders;
