import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../api/AxiosConfig";

const useDeleteSupplement = () => {
  const queryClient = useQueryClient();

  const deleteSupplementReq = async (id: string) => {
    try {
      await axiosInstance.delete(`/admin/supplement/${id}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const {
    mutateAsync: deleteSupplement,
    isError,
    isPending,
  } = useMutation({
    mutationFn: deleteSupplementReq,
    mutationKey: ["deleteSupplement"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSupplements"] }); // Refresh data after deletion
    },
  });

  return { deleteSupplement, isError, isPending };
};

export default useDeleteSupplement;
