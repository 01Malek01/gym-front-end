import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGetSupplement from "../../hooks/api/Admin/supplements/useGetSupplement";
import { useStripePayment } from "../../hooks/useStripePayment";
import Loader from "../../components/custom-ui/Loader";
import { Supplement } from "../../types";

export default function SupplementPaymentPage() {
  const { supplementId } = useParams();
  const navigate = useNavigate();
  const { data: supplement, isLoading } = useGetSupplement(supplementId || "");
  const { handlePayment, isProcessing } = useStripePayment();

  const handleCheckout = async () => {
    if (supplement) {
      await handlePayment({
        amount: supplement.price * 100,
        description: `Supplement Purchase: ${supplement.name}`,
        metadata: {
          productType: "supplement",
          productId: supplement._id
        },
        successUrl: `/supplement/success?supplementId=${supplement._id}`,
        cancelUrl: window.location.href
      });
    }
  };

  useEffect(() => {
    if (supplement) {
      handleCheckout();
    }
  }, [supplement]);

  if (isLoading || isProcessing) {
    return <Loader dimensions="w-16 h-16" />;
  }

  return null;
}