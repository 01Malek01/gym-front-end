import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../api/AxiosConfig";
import { Supplement } from "../../../../types";
const useCreateSupplement = () => {
  const createSupplementReq = async (data: Supplement) => {
    try {
      const res = await axiosInstance.post(`/admin/supplement`, {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  const {
    mutateAsync: createSupplement,
    isError,
    isPending,
  } = useMutation({
    mutationFn: createSupplementReq,
    mutationKey: ["createSupplement"],
  });
  return { createSupplement, isError, isPending };
};

export default useCreateSupplement;
