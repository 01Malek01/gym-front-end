import { useEffect, useState } from "react";
import { Supplement } from "../../types";
import useGetSupplements from "../../hooks/api/supplements/useGetSupplements";
import PageContainer from "../../components/Supplements/PageContainer";
import PageHeader from "../../components/Supplements/PageHeader";
import LoadingState from "../../components/Supplements/LoadingState";
import ErrorState from "../../components/Supplements/ErrorState";
import EmptyState from "../../components/Supplements/EmptyState";
import SupplementsGrid from "../../components/Supplements/SupplementsGrid";

export default function SupplementsPage() {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const { data, isLoading, isError } = useGetSupplements();
  useEffect(() => {
    if (data) {
      setSupplements(data?.supplements);
    }
  }, [data]);

  return (
    <PageContainer>
      <PageHeader title="Fuel Your Gains: Supplements" />

      {isLoading ? (
        <LoadingState dimensions="w-12 h-12" />
      ) : isError ? (
        <ErrorState message="Error loading vital nutrients. Please try again!" />
      ) : supplements.length < 1 ? (
        <EmptyState message="No performance boosters available at the moment. Check back soon!" />
      ) : (
        <SupplementsGrid supplements={supplements} />
      )}
    </PageContainer>
  );
}
