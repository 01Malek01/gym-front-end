import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/AxiosConfig";

const useGetSupplement = (id: string) => {
  const getSupplementReq = async () => {
    const response = await axiosInstance.get(`/supplement/${id}`);
    return response.data;
  };
  const { data, isLoading, isError } = useQuery({
    queryFn: getSupplementReq,
    refetchInterval: 10000,
    queryKey: ["supplement", id],
  });
  return { data, isLoading, isError };
};

export default useGetSupplement;
