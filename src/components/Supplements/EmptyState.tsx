type EmptyStateProps = {
  message?: string;
};

export default function EmptyState({
  message = "No items available at the moment. Check back soon!",
}: EmptyStateProps) {
  return (
    <p className="text-center text-indigo-400 text-2xl mt-16 animate-pulse">
      {message}
    </p>
  );
}
