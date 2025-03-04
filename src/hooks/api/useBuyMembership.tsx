import { useParams } from "react-router-dom";
import axiosInstance from "../../api/AxiosConfig";
import { useMutation } from "@tanstack/react-query";

const useBuyMembership = () => {
  const params = useParams();
  const membershipID = params.membershipId;
  const buyMembershipReq = async () => {
    const res = await axiosInstance.post(
      `/buy/create-payment/membership/${membershipID}`
    );
    return res.data;
  };
  const {
    mutateAsync: buyMembership,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: buyMembershipReq,
    mutationKey: ["buy-membership"],
  });

  return {
    buyMembership,
    isError,
    isPending,
    error,
  };
};

export default useBuyMembership;
