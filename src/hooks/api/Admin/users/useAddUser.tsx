import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../api/AxiosConfig";

const useAddUser = () => {
  const addUser = async (userData: {
    username: string;
    email: string;
    password: string;
    gender?: string;
    membershipStatus?: string;
    confirmPassword?: string;
  }) => {
    const response = await axiosInstance.post("/admin/user", {
      ...userData,
      confirmPassword: userData.password,
    });
    return response.data;
  };
  const { mutateAsync: createUser, isSuccess } = useMutation({
    mutationFn: addUser,
    mutationKey: ["add-user"],
  });
  return { createUser, isSuccess };
};
export default useAddUser;
