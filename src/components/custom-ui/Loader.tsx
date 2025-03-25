import React from "react";

type Props = {
  dimensions: string;
};

const Loader: React.FC<Props> = ({ dimensions }) => {
  return (
    <div className="flex items-center justify-center my-8">
      <div
        className={`${dimensions} border-4 border-t-purple-500 border-b-purple-700 border-l-transparent border-r-transparent animate-spin rounded-full`}
      />
    </div>
  );
};

export default Loader;
