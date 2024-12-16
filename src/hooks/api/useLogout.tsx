import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/AxiosConfig";

const useLogout = () => {
  const logout = async () => {
    const res = await axiosInstance.post("/auth/logout");
    if (typeof window !== "undefined") localStorage.removeItem("accessToken");
    return res.data;
  };
  const { mutateAsync: logoutUser } = useMutation({
    mutationFn: logout,
    mutationKey: ["logout-user"],
    onSuccess: () => (window.location.href = "/login"),
  });
  return { logoutUser };
};
export default useLogout;
