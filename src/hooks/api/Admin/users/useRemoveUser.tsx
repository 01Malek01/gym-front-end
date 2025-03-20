import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../api/AxiosConfig";

const useRemoveUser = () => {
  const removeUser = async (userId: string) => {
    const response = await axiosInstance.delete(`/admin/user/${userId}`);
    return response.data;
  };
  const { mutateAsync: deleteUser, isSuccess } = useMutation({
    mutationFn: removeUser,
    mutationKey: ["remove-user"],
  });
  return { deleteUser, isSuccess };
};
export default useRemoveUser;
