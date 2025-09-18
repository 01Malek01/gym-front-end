import { Supplement } from "../../types";
import SupplementCard from "./SupplementCard";

type SupplementsGridProps = {
  supplements: Supplement[];
};

export default function SupplementsGrid({ supplements }: SupplementsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {supplements.map((supplement) => (
        <SupplementCard key={supplement._id} supplement={supplement} />
      ))}
    </div>
  );
}
