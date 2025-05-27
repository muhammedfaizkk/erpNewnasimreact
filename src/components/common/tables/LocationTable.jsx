import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const LocationTable = () => {
  const locations = [
    { district: "Ernakulam", location: "Kakkanad" },
    { district: "Kozhikode", location: "Medical College" },
    { district: "Thrissur", location: "Punkunnam" },
    { district: "Alappuzha", location: "Mavelikkara" },
    { district: "Kottayam", location: "Ettumanoor" },
  ];

  return (
    <div className="py-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
       
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  District
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {locations.map((loc, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {loc.district}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {loc.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button
                        title="Edit"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        title="Delete"
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LocationTable;
