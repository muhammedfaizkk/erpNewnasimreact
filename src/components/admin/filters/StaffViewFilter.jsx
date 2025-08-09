import { useState } from "react";
import { Calendar as CalendarIcon, Filter, X } from "lucide-react";

export default function StaffViewFilter({ onFilterChange }) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    const handleApplyFilter = () => {
        if (startDate && endDate) {
            onFilterChange({ startDate, endDate });
        }
        setShowMobileFilter(false);
    };

    const handleReset = () => {
        setStartDate("");
        setEndDate("");
        onFilterChange(null);
        setShowMobileFilter(false);
    };

    return (
        <>
            {/* Mobile filter toggle button */}
            <button
                onClick={() => setShowMobileFilter(true)}
                className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-md sm:hidden"
                aria-label="Open Filter"
            >
                <Filter />
            </button>

            {/* Overlay for mobile */}
            {showMobileFilter && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
                    onClick={() => setShowMobileFilter(false)}
                ></div>
            )}

            {/* Filter Panel */}
            <div
                className={`
                    bg-white border shadow-lg rounded-t-2xl p-4 w-full
                    fixed bottom-0 left-0 right-0 z-50 transition-transform transform sm:static sm:rounded-lg sm:border sm:shadow-none sm:flex sm:items-end sm:gap-4 sm:p-6
                    ${showMobileFilter ? "translate-y-0" : "translate-y-full"} sm:translate-y-0
                `}
            >
                {/* Header (mobile only) */}
                <div className="flex justify-between items-center sm:hidden mb-4">
                    <h2 className="text-lg font-semibold">Filter</h2>
                    <button onClick={() => setShowMobileFilter(false)} className="text-gray-500 hover:text-gray-700">
                        <X />
                    </button>
                </div>

                {/* Start Date */}
                <div className="flex-1 mb-4 sm:mb-0">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* End Date */}
                <div className="flex-1 mb-4 sm:mb-0">
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="date"
                            value={endDate}
                            min={startDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 w-full sm:w-auto sm:flex-shrink-0">
                    <button
                        onClick={handleReset}
                        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleApplyFilter}
                        disabled={!startDate || !endDate}
                        className={`w-full sm:w-auto px-4 py-2 rounded-lg text-white ${
                            !startDate || !endDate
                                ? "bg-blue-300 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </>
    );
}
