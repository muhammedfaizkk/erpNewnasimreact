import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Storestables = () => {
  const stores = [
    {
      storeName: "ABC Supermart",
      category: "Grocery",
      ownerName: "George Lindelof",
      contact: "+91 9876543210",
      email: "abc@supermart.com",
      location: "Kakkanad",
      address: "ABC Towers, Main Road, Kakkanad",
    },
    {
      storeName: "Trendy Fashions",
      category: "Clothing",
      ownerName: "Eric Dyer",
      contact: "+91 9123456780",
      email: "trendy@fashion.com",
      location: "Thrissur",
      address: "Trendy Plaza, MG Road, Thrissur",
    },
    {
      storeName: "Daily Needs",
      category: "Departmental",
      ownerName: "Hakan Messaeni",
      contact: "+91 9012345678",
      email: "daily@needs.com",
      location: "Ettumanoor",
      address: "Near Bus Stand, Ettumanoor",
    },
  ];

  return (
    <div className="py-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Store Listings</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stores.map((store, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{store.storeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{store.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{store.ownerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{store.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{store.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{store.location}</td>
                  <td className="px-6 py-4  text-sm text-gray-700">{store.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button className="text-blue-500 hover:text-blue-700" title="View">
                        <FaEye />
                      </button>
                      <button className="text-yellow-500 hover:text-yellow-700" title="Edit">
                        <FaEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-700" title="Delete">
                        <FaTrash />
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

export default Storestables;
