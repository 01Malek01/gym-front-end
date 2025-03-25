import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../api/AxiosConfig";
import { Settings } from "../../../../types";

const useSetSettings = () => {
  const setSettingsReq = async (settings: Settings) => {
    try {
      const res = await axiosInstance.post("/settings", settings);
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
    mutateAsync: setSettings,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: setSettingsReq,
    mutationKey: ["settings"],
  });
  return { setSettings, isPending, isError, isSuccess };
};
export default useSetSettings;
