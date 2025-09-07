import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../api/AxiosConfig";
import { useAuth } from "../../context/AuthContext";

const useSignUp = () => {
  const { setAccessTokenState, setUser } = useAuth();
  const signup = async (data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
  }) => {
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const {
    mutateAsync: signupUser,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: signup,
    mutationKey: ["signup"],
    onSuccess: (data) => {
      setAccessTokenState(data.accessToken);
      setUser(data.newUser);
    },
  });

  return { signupUser, isPending, isSuccess };
};
export default useSignUp;
