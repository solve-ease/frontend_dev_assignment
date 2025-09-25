// SKELETON CARD COMPONENT

import { memo } from "react";

export const SkeletonCard = memo(() => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
      <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  </div>
));

SkeletonCard.displayName = "SkeletonCard";
