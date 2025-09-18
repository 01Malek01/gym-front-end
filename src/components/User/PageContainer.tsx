import React from "react";

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="Dashboard-wrapper min-h-screen bg-gradient-to-br from-app_primary-dark to-app_neutral-charcoal text-app_neutral-lightGray font-sans p-6">
      <div className="h-full grid grid-rows-[auto_1fr] dashboard-container gap-8 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
