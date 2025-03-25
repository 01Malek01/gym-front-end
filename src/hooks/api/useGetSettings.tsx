import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/AxiosConfig";

const useGetSettings = () => {
  const getSettingsReq = async () => {
    try {
      const res = await axiosInstance.get("/settings");
      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(String(error));
      }
    }
  };
  const {
    data: settings,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getSettingsReq,
    queryKey: ["get-settings"],
  });
  return { settings, isLoading, isError };
};

export default useGetSettings;
