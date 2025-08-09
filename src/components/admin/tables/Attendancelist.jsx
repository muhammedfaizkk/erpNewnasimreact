import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const SiteAttendanceList = ({ data, loading, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Staff Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Remarks</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Loading...</td>
            </tr>
          ) : data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.staff?.name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.remarks || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-600 hover:text-blue-900"
                    aria-label="Edit Attendance"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(item._id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Delete Attendance"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No attendance records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SiteAttendanceList;