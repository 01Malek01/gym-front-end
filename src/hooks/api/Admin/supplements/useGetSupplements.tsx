import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../api/AxiosConfig";
import { Supplement } from "../../../../types";

const fetchSupplements = async (): Promise<Supplement[]> => {
  const res = await axiosInstance.get(`/admin/supplement`);
  return res.data;
};

const useGetSupplements = () => {
  return useQuery({
    queryKey: ["getSupplements"],
    queryFn: fetchSupplements,
  });
};

export default useGetSupplements;
