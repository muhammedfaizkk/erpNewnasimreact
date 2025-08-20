import React from "react";

const StaffCardsSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-6 sm:h-8 w-32 sm:w-40 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-24 sm:w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="h-10 w-28 bg-gray-200 rounded-md"></div>
      </div>

      {/* Grid of skeleton cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
          >
            {/* Circle avatar */}
            <div className="h-16 w-16 bg-gray-200 rounded-full mb-4"></div>
            {/* Name placeholder */}
            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
            {/* Role/Info placeholder */}
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffCardsSkeleton;
