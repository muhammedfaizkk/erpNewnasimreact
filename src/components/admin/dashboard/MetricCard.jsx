import React from 'react';

const MetricCard = ({ title, value, suffix, chart }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      {chart ? (
        <div>
          <div className="text-2xl font-bold">{value}{suffix && <span className="text-gray-400 text-lg">{suffix}</span>}</div>
          <div className="mt-2">{chart}</div>
        </div>
      ) : (
        <div className="text-2xl font-bold">{value}{suffix && <span className="text-gray-400 text-lg">{suffix}</span>}</div>
      )}
    </div>
  );
};

export default MetricCard;