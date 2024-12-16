import axiosInstance from "../../api/AxiosConfig";
import { useQuery } from "@tanstack/react-query";
export const useGetAllMemberships = () => {
  const getAllMemberships = async () => {
    try {
      const res = await axiosInstance.get("/membership/allMemberships");

      return res.data.memberships;
    } catch (err) {
      console.log(err);
    }
  };
  const { data: memberships, isLoading } = useQuery({
    queryKey: ["allMemberships"],
    queryFn: getAllMemberships,
  });
  return {
    memberships,
    isLoading,
  };
};
export default useGetAllMemberships;
