import React from "react";

export const SkeletonCard = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-4 p-4 w-full">
      <div className="bg-gray-300 h-40 w-full rounded-lg"></div>
      <div className="space-y-2">
        <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      </div>
    </div>
  );
};

export const SkeletonLoader = () => {
  return (
    <div className="flex flex-wrap gap-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};
