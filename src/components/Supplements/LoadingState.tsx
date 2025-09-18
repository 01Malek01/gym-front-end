import Loader from "../custom-ui/Loader";

type LoadingStateProps = {
  dimensions?: string;
};

export default function LoadingState({
  dimensions = "w-20 h-20",
}: LoadingStateProps) {
  return (
    <div className="flex justify-center py-12">
      <Loader dimensions={dimensions} />
    </div>
  );
}
