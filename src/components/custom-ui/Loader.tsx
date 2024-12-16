import React from "react";

type Props = {
  dimensions: string;
};

const Loader: React.FC<Props> = ({ dimensions }) => {
  return (
    <div className="flex items-center justify-center my-8">
      <div
        className={`text-center ${dimensions} border-t-[3px] border-b-[3px] border-purple-400 animate-spin rounded-full`}
      />
    </div>
  );
};

export default Loader;
