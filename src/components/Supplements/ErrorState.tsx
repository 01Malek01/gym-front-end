type ErrorStateProps = {
  message?: string;
};

export default function ErrorState({
  message = "Error loading data. Please try again!",
}: ErrorStateProps) {
  return <p className="text-center text-red-500 text-2xl py-12">{message}</p>;
}
