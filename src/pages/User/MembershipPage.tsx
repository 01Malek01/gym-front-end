import { useState } from "react";
import { useParams } from "react-router-dom";
import useBuyMembership from "../../hooks/api/useBuyMembership";
import Loader from "../../components/custom-ui/Loader";

export default function MembershipPage() {
  const { membershipId } = useParams();
  const { buyMembership, isError, isPending ,error} = useBuyMembership();
  // const [checkOutUrl, setCheckOutUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBuyMembership = async () => {
    setIsProcessing(true);
    try {
      const data = await buyMembership();
      if (data?.checkout_url) {
        // setCheckOutUrl(data.checkout_url);
        window.location.href = data.checkout_url;
      }
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white text-black shadow-lg p-6 rounded-lg flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-app_secondary-orange text-center">
          🎉 Thank you for choosing our membership!
        </h1>
        <p className="text-gray-600 text-lg">
          Membership ID: <span className="font-semibold">{membershipId}</span>
        </p>

        {isProcessing || isPending ? (
          <Loader dimensions="w-16 h-16" />
        ) : isError ? (
          <>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            <p className="text-red-500 text-lg">{error?.response?.data?.message}</p>
          </>
        ) : (
          <button
            onClick={handleBuyMembership}
            className="w-full py-3 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Checkout Now 🚀"}
          </button>
        )}
      </div>
    </div>
  );
}
