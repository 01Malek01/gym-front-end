import { Link } from "react-router-dom";
import Button1 from "../custom-ui/Button-1";
import { useAuth } from "../../context/AuthContext";
import { Supplement } from "../../types";

type SupplementCardProps = {
  supplement: Supplement;
};

export default function SupplementCard({ supplement }: SupplementCardProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-zinc-800 rounded-lg p-5 shadow-xl border border-zinc-700 flex flex-col transform hover:scale-105 transition-all duration-300 group relative overflow-hidden">
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
        to={isAuthenticated ? `/supplement/${supplement._id}` : "/login"}
        className="relative z-10"
      >
        <Button1
          type="button"
          disabled={supplement.stock === 0}
          title={supplement.stock > 0 ? "Add to Cart" : "Notify Me"}
          bgColor={`w-full py-3 rounded-lg text-lg font-bold uppercase tracking-wide transition-all duration-200 shadow-md
            ${
              supplement.stock > 0
                ? "bg-gradient-to-r from-app_primary-electricBlue to-app_secondary-crimsonRed hover:from-app_primary-electricBlue/90 hover:to-app_secondary-crimsonRed/90 text-white"
                : "bg-app_neutral-graphite text-app_neutral-lightGray/60 cursor-not-allowed"
            }`}
        />
      </Link>
    </div>
  );
}
