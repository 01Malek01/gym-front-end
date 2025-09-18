import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-800 p-6 md:p-8 text-gray-100 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="bg-zinc-900 rounded-xl shadow-2xl p-6 md:p-8 border border-indigo-700">
          {children}
        </div>
      </div>
    </div>
  );
}
