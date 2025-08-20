import React, { memo, useState, useCallback, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SiteFilter = memo(
  ({ onStatusFilterChange, onSearch, currentStatus, searchTerm, loading }) => {
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const statusOptions = useMemo(
      () => [
        { value: "all", label: "All Sites" },
        { value: "Active", label: "Active" },
        { value: "On Going", label: "On Going" },
        { value: "Pending", label: "Pending" },
        { value: "Completed", label: "Completed" },
        { value: "Cancelled", label: "Cancelled" },
      ],
      []
    );

    const handleSearchChange = useCallback(
      (e) => {
        const value = e.target.value;
        setLocalSearchTerm(value);

        const timeoutId = setTimeout(() => {
          onSearch(value);
        }, 300);

        return () => clearTimeout(timeoutId);
      },
      [onSearch]
    );

    const handleStatusChange = useCallback(
      (status) => {
        onStatusFilterChange(status);
        setIsFilterOpen(false);
      },
      [onStatusFilterChange]
    );

    const clearSearch = useCallback(() => {
      setLocalSearchTerm("");
      onSearch("");
    }, [onSearch]);

    const getCurrentStatusLabel = useCallback(() => {
      const current = statusOptions.find(
        (option) => option.value === currentStatus
      );
      return current ? current.label : "All Sites";
    }, [currentStatus, statusOptions]);

    return (
      <>
        {/* Top Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={localSearchTerm}
                onChange={handleSearchChange}
                placeholder="Search sites by name, place, or contact..."
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
              {localSearchTerm && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    onClick={clearSearch}
                    className="text-gray-400 hover:text-gray-600"
                    disabled={loading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Status Filter for Desktop */}
            <div className="hidden sm:block relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                {getCurrentStatusLabel()}
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleStatusChange(option.value)}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentStatus === option.value
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option.label}</span>
                          {currentStatus === option.value && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Active Filters */}
          {(currentStatus !== "all" || localSearchTerm) && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>

              {currentStatus !== "all" && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Status: {getCurrentStatusLabel()}
                  <button
                    onClick={() => handleStatusChange("all")}
                    className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {localSearchTerm && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Search: "{localSearchTerm}"
                  <button
                    onClick={clearSearch}
                    className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-green-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

        
        </div>

        {/* Mobile Filter FAB + Bottom Sheet */}
        <div className="fixed bottom-15 right-4 sm:hidden z-50">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="p-4 rounded-full bg-blue-600 text-white shadow-xl"
          >
            <Filter className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 bg-black/40 flex justify-center items-end z-50"
              >
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-md bg-white rounded-t-2xl p-4 shadow-lg"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-700">
                      Filter Sites
                    </h3>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleStatusChange(option.value)}
                      className={`block w-full text-left px-4 py-3 text-sm rounded-md mb-1 ${currentStatus === option.value
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    );
  }
);

SiteFilter.displayName = "SiteFilter";

export default SiteFilter;
