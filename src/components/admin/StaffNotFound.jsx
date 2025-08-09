import React from 'react';

const StaffNotFound = ({ onBack }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <p className="text-red-600 mb-4">Staff not found or an error occurred.</p>
      <button
        onClick={onBack}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Back
      </button>
    </div>
  </div>
);

export default StaffNotFound; 