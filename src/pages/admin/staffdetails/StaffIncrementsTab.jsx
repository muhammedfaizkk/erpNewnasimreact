import React, { useState } from 'react';
import AddWageIncrementForm from '../../../components/admin/forms/AddWageIncrementForm';

const StaffIncrementsTab = ({ incrementHistory, incrementLoading, incrementsThisMonth = [], currentWage, onEditWage, getPublicStaffById }) => {
  const [showForm, setShowForm] = useState(false);
  const [editIncrement, setEditIncrement] = useState(null);

  const safeIncrementHistory = Array.isArray(incrementHistory) ? incrementHistory : [];
  const safeIncrementsThisMonth = Array.isArray(incrementsThisMonth) ? incrementsThisMonth : [];

  const handleAddClick = () => {
    setEditIncrement(null);
    setShowForm(true);
  };

  const handleEditClick = (increment) => {
    setEditIncrement(increment);
    setShowForm(true);
  };

  const handleFormSubmit = (wageData) => {
    setShowForm(false);
    setEditIncrement(null);
    onEditWage(wageData); // Trigger refresh with wage data
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 p-3 p-sm-0">
        <h2 className="text-lg font-semibold">Wage History</h2>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* This Month's Increments Section */}
      {safeIncrementsThisMonth.length > 0 && (
        <div className="mb-8">
          <h3 className="text-md font-semibold mb-2">This Month's Increments</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Previous Wage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Wage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Increment Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {safeIncrementsThisMonth.map((increment, index) => (
                  <tr key={increment._id || increment.id || index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(increment.effectiveDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{increment.previousWage.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{increment.newWage.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{increment.incrementAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {increment.reason || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleEditClick(increment)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {incrementLoading ? (
        <div className="flex items-center justify-center py-8">
          <svg
            className="animate-spin h-6 w-6 text-blue-600 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span>Loading increment history...</span>
        </div>
      ) : safeIncrementHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Previous Wage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Wage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Increment Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {safeIncrementHistory.map((increment, index) => (
                <tr key={increment._id || index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(increment.effectiveDate || increment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{increment.previousWage.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{increment.newWage.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{(increment.incrementAmount !== undefined ? increment.incrementAmount : (increment.newWage - increment.previousWage)).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {increment.reason || increment.notes || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleEditClick(increment)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No wage increment history found for this staff member.
        </div>
      )}

      {showForm && (
        <AddWageIncrementForm
          staffId={incrementHistory[0]?.staffId}
          currentWage={currentWage}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
          mode={editIncrement ? 'edit' : 'add'}
          incrementData={editIncrement}
          getPublicStaffById={getPublicStaffById}
        />
      )}
    </div>
  );
};

export default StaffIncrementsTab;