import { useEffect, useState } from "react";
import Loader from "../../components/custom-ui/Loader";
import { Supplement } from "../../types";
import useGetSupplements from "../../hooks/api/supplements/useGetSupplements";

export default function SupplementsPage() {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const { data, isLoading, isError } = useGetSupplements();
  useEffect(() => {
    if (data) {
      setSupplements(data?.supplements);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-app_secondary-orange mb-6">
            Available Supplements
          </h1>

          {isLoading ? (
            <div className="flex justify-center">
              <Loader dimensions="w-16 h-16" />
            </div>
          ) : isError ? (
            <p className=" text-center text-red-500 text-xl">
              Error loading supplements
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supplements.map((supplement) => (
                <div
                  key={supplement._id}
                  className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="supplement-image w-full h-40 mb-4">
                    <img
                      src={supplement.image}
                      alt={supplement.name}
                      className=" object-contain w-full h-full"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {supplement.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{supplement.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-app_secondary-orange font-medium">
                      ${supplement.price}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        supplement.stock > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {supplement.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
