import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Loader from "../../components/custom-ui/Loader";
import useGetSupplement from "../../hooks/api/supplements/useGetSupplement";

export default function SupplementPaymentPage() {
  const { supplementId } = useParams();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useGetSupplement(supplementId || "");
  const [supplement, setSupplement] = useState(data);
  const isProcessing = false;
  useEffect(() => {
    if (data) {
      console.log("Supplement data:", data);
      setSupplement(data.supplement);
    }
  }, [data]);
  if (isLoading) return <Loader dimensions=" h-[50px] w-[50px] " />;
  if (isError)
    return <div className="text-red-600">Error loading supplement details</div>;
  if (!supplement)
    return <div className="text-white">Supplement not found</div>;

  return (
    <div className="wrapper min-h-screen flex items-center justify-center p-4 bg-white  ">
      <div className="max-w-3xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-app_secondary-orange">
          Thank you for choosing us!
        </h1>

        <Card className="w-full shadow-lg">
          <CardHeader>
            <CardTitle>Your Order Summary</CardTitle>
            <CardDescription>
              Review your supplement before checkout
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4">
              {supplement.image && (
                <img
                  src={supplement.image}
                  alt={supplement.name}
                  className="h-24 w-24 rounded-md object-cover"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold">{supplement.name}</h3>
                <p className="text-sm text-gray-500">
                  {supplement.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-medium">${supplement.price}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Stock</p>
                <p className="font-medium">{supplement.stock} units</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              className="w-full py-3 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader dimensions="mr-2 h-4 w-4" />
                  Processing...
                </>
              ) : (
                "Checkout Now 🚀"
              )}
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate(-1)}
            >
              Back to Supplements
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
