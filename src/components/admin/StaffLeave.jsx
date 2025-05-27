import React from 'react'

export default function StaffLeave({ staffId, leaves, onAddLeave, dateFilter }) {

  const filteredLeaves = dateFilter
    ? leaves.filter(leave => {
        const leaveDate = new Date(leave.date);
        return leaveDate >= new Date(dateFilter.startDate) && 
               leaveDate <= new Date(dateFilter.endDate);
      })
    : leaves;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Staff Leaves</h3>
        <button
          onClick={() => onAddLeave()}
          className="bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          + Add Leave
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map(leave => (
              <tr key={leave.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm">{new Date(leave.date).toLocaleDateString()}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{leave.leaveType}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    leave.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    leave.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {leave.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLeaves.length === 0 && (
          <div className="text-center py-8 text-gray-500">No leaves found</div>
        )}
      </div>
    </div>
  );
};