import React from 'react';
import { Calendar, DollarSign, Filter } from 'lucide-react';
import StaffViewFilter from '../../../components/admin/filters/StaffViewFilter';

const StaffTabs = ({ 
  activeTab, 
  setActiveTab, 
  showFilter, 
  setShowFilter,
  handleDateFilterChange,
  leavesLoading,
  advancesLoading,
  incrementLoading
}) => {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="sm:hidden flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm transition-colors"
          type="button"
        >
          <Filter className="w-4 h-4" /> {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>

        <div className="w-full border-b border-gray-200">
          <nav className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-0" aria-label="Tabs">
            <div className="flex w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setActiveTab('leaves')}
                className={`flex-shrink-0 text-center py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'leaves'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                type="button"
              >
                <Calendar className="inline w-4 h-4 mr-1" />
                Leaves {leavesLoading && <span className="ml-1 animate-spin">⟳</span>}
              </button>

              <button
                onClick={() => setActiveTab('payments')}
                className={`flex-shrink-0 text-center py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'payments'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                type="button"
              >
                <DollarSign className="inline w-4 h-4 mr-1" />
                Advances {advancesLoading && <span className="ml-1 animate-spin">⟳</span>}
              </button>

              <button
                onClick={() => setActiveTab('increments')}
                className={`flex-shrink-0 text-center py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'increments'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                type="button"
              >
                Wage Increments {incrementLoading && <span className="ml-1 animate-spin">⟳</span>}
              </button>
            </div>

            <div className="hidden sm:block ml-4">
              <StaffViewFilter onFilterChange={handleDateFilterChange} />
            </div>
          </nav>

          <div className="block sm:hidden mt-2">
            <StaffViewFilter onFilterChange={handleDateFilterChange} />
          </div>
        </div>
      </div>

      {showFilter && (
        <div className="sm:hidden mt-4">
          <StaffViewFilter onFilterChange={handleDateFilterChange} />
        </div>
      )}
    </div>
  );
};

export default StaffTabs;