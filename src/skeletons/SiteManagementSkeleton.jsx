import React from "react";

function SiteManagementSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Sticky Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Title */}
            <div className="h-6 bg-gray-200 rounded w-48"></div>

            {/* Button */}
            <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
          </div>

          {/* Stats Cards */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-lg p-3 text-center space-y-2"
              >
                <div className="h-5 bg-gray-200 rounded w-16 mx-auto"></div>
                <div className="h-3 bg-gray-200 rounded w-20 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter placeholder */}
      <div className="p-4">
        <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>

        {/* Table/Card Skeleton */}
        <div className="bg-white rounded-lg shadow p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0"
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-center space-x-2 mt-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-8 bg-gray-200 rounded"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SiteManagementSkeleton;
