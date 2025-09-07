import { useEffect, useState } from "react";
import Loader from "../../components/custom-ui/Loader";
import { Supplement } from "../../types";
import useGetSupplements from "../../hooks/api/supplements/useGetSupplements";
import { Link } from "react-router-dom";
import Button1 from "../../components/custom-ui/Button-1";
import { useAuth } from "../../context/AuthContext";

export default function SupplementsPage() {
  const { isAuthenticated } = useAuth();

  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const { data, isLoading, isError } = useGetSupplements();
  useEffect(() => {
    if (data) {
      setSupplements(data?.supplements);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-800 p-6 md:p-8 text-gray-100 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="bg-zinc-900 rounded-xl shadow-2xl p-6 md:p-8 border border-indigo-700">
          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-400 uppercase tracking-wide mb-8 pb-4 border-b border-indigo-600">
            Fuel Your Gains: Supplements
          </h1>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader dimensions="w-20 h-20" />
            </div>
          ) : isError ? (
            <p className="text-center text-red-500 text-2xl py-12">
              Error loading vital nutrients. Please try again!
            </p>
          ) : supplements.length < 1 ? (
            <p className="text-center text-indigo-400 text-2xl mt-16 animate-pulse">
              No performance boosters available at the moment. Check back soon!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {supplements.map((supplement) => (
                <div
                  key={supplement._id}
                  className="bg-zinc-800 rounded-lg p-5 shadow-xl border border-zinc-700 flex flex-col transform hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-900 opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-0"></div>

                  <div className="supplement-image w-full h-48 flex items-center justify-center mb-5 relative z-10">
                    <img
                      src={supplement.image}
                      alt={supplement.name}
                      className="object-contain w-full h-full max-h-48 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-teal-400 mb-2 leading-tight relative z-10">
                    {supplement.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 flex-grow relative z-10">
                    {supplement.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto mb-4 relative z-10">
                    <span className="text-lime-400 text-2xl font-extrabold">
                      ${supplement.price.toFixed(2)}
                    </span>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide ${
                        supplement.stock > 0
                          ? "bg-green-600 text-white shadow-md"
                          : "bg-red-600 text-white shadow-md"
                      }`}
                    >
                      {supplement.stock > 0 ? "In Stock" : "Sold Out"}
                    </span>
                  </div>
                  <Link
                    to={
                      isAuthenticated
                        ? `/supplement/${supplement._id}`
                        : "/login"
                    }
                    className="relative z-10" // Ensure the link is above the hover gradient
                  >
                    {/* Assuming Button1 accepts a className or has its own strong default styles */}
                    <Button1
                      type="button"
                      disabled={supplement.stock === 0} // Disable if out of stock
                      title={supplement.stock > 0 ? "Add to Cart" : "Notify Me"} // Dynamic title
                      // Example of a strong button style, ensure Button1 can inherit/override this
                      bgColor={`w-full py-3 rounded-lg text-lg font-bold uppercase tracking-wide transition-all duration-200 shadow-md
                        ${
                          supplement.stock > 0
                            ? "bg-gradient-to-r from-app_primary-electricBlue to-app_secondary-crimsonRed hover:from-app_primary-electricBlue/90 hover:to-app_secondary-crimsonRed/90 text-white"
                            : "bg-app_neutral-graphite text-app_neutral-lightGray/60 cursor-not-allowed"
                        }`}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
