import React from "react";

type Props = {
  dimensions: string;
  text?: string;
};

const Loader: React.FC<Props> = ({ dimensions, text }) => {
  return (
    <div className="flex items-center justify-center my-8">
      <div className="flex flex-col items-center gap-2">
        <div
          className={`${dimensions} border-4 border-t-purple-500 border-b-purple-700 border-l-transparent border-r-transparent animate-spin rounded-full`}
        />
        {text && <p className="text-sm text-gray-600 mt-2">{text}</p>}
      </div>
    </div>
  );
};

export default Loader;
