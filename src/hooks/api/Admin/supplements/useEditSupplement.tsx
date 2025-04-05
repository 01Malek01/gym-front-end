import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../api/AxiosConfig";

const useEditSupplement = () => {
  const editSupplementReq = async ({
    id,
    newData,
  }: {
    id: string;
    newData: { price?: number; stock?: number };
  }) => {
    try {
      const res = await axiosInstance.put(`/admin/supplement/${id}`, newData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const {
    mutateAsync: editSupplement,
    isError,
    isPending,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: editSupplementReq,
    mutationKey: ["editSupplement"],
  });

  return { editSupplement, isError, isPending, isSuccess, reset };
};

export default useEditSupplement;
