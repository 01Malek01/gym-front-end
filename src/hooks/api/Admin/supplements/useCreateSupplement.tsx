import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../api/AxiosConfig";

const useCreateSupplement = () => {
  const createSupplementReq = async (formDataWithImage: FormData) => {
    try {
      const res = await axiosInstance.post(
        `/admin/supplement`,
        formDataWithImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error; // Ensure errors are propagated
    }
  };

  const {
    mutateAsync: createSupplement,
    isError,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: createSupplementReq,
    mutationKey: ["createSupplement"],
  });

  return { createSupplement, isError, isPending, isSuccess };
};

export default useCreateSupplement;
