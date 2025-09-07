import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../components/custom-ui/Loader";
import useGetSupplement from "@/hooks/api/supplements/useGetSupplement";

export default function SupplementSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const supplementId = queryParams.get("supplementId");

  const { data: supplement, isLoading } = useGetSupplement(supplementId || "");

  useEffect(() => {
    if (!supplementId) {
      navigate("/supplement");
    }
  }, [supplementId, navigate]);

  if (isLoading) {
    return <Loader dimensions="w-16 h-16" />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-app_secondary-orange mb-4">
          Purchase Successful!
        </h1>
        {supplement && (
          <div className="space-y-4">
            <p className="text-lg">
              Thank you for purchasing {supplement.name}!
            </p>
            <p className="text-gray-600">{supplement.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-medium">Amount Paid:</span>
              <span className="text-app_secondary-orange">
                ${supplement.price}
              </span>
            </div>
            <button
              onClick={() => navigate("/supplement")}
              className="w-full mt-6 bg-app_secondary-orange text-white py-2 rounded hover:bg-orange-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
