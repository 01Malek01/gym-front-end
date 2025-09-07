import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/AxiosConfig";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../use-toast";
import { useNavigate } from "react-router-dom";
import { useAuthCheck } from "../useCheckAuth";
import { CustomAxiosError, extractErrorMessage } from "../../lib/utils";
const useLogin = () => {
  const { setAccessTokenState, setUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuthCheck();
  const login = async (data: { email: string; password: string }) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      return res.data;
    } catch (err) {
      toast({
        title: "Error",
        description: extractErrorMessage(err as CustomAxiosError),
        variant: "destructive",
      });
    }
  };
  const {
    mutateAsync: loginUser,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onSuccess: (data) => {
      setAccessTokenState(data?.accessToken);
      localStorage.setItem("accessToken", data?.accessToken);
      setUser(data.user);
      setIsAuthenticated(true);
      navigate("/dashboard");
    },
  });

  return { loginUser, isPending, isSuccess, isError };
};
export default useLogin;
