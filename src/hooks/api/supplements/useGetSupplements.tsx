import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../api/AxiosConfig";

const useGetSupplements = () => {
  const getSupplementsReq = async () => {
    const response = await axiosInstance.get("/supplement/allSupplements");
    return response.data;
  };
  const { data, isLoading, isError } = useQuery({
    queryFn: getSupplementsReq,
    refetchInterval: 10000,
    queryKey: ["supplements"],
  });
  return { data, isLoading, isError };
};

export default useGetSupplements;
