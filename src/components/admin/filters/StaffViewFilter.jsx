import { useState } from "react";
import React from 'react'

export default function StaffViewFilter({ onFilterChange }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleApplyFilter = () => {
        if (startDate && endDate) {
            onFilterChange({ startDate, endDate });
        }
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        onFilterChange(null);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button
                        onClick={handleApplyFilter}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
                    >
                        Apply
                    </button>
                    <button
                        onClick={handleReset}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors w-full sm:w-auto"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};