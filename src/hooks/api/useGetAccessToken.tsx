import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/AxiosConfig";

const useGetAccessToken = () => {
  const getAccessToken = async () => {
    const res = await axiosInstance.get("/refresh-token");
    if (res.statusText !== "OK") {
      throw new Error(res.statusText);
    }
    return res.data;
  };
  const {
    isError,
    isLoading,
    data: accessToken,
  } = useQuery({
    queryKey: ["accessToken"],
    queryFn: getAccessToken,
  });
  return { accessToken, isLoading, isError };
};

export default useGetAccessToken;
