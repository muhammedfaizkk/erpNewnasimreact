import React from 'react';

const ProgressBar = ({ percentage, color }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className={`h-full rounded-full`}
        style={{
          width: `${percentage}%`,
          backgroundColor: color || 'blue',
          transition: 'width 0.3s ease-in-out',
        }}
      />
    </div>
  );
};

export default ProgressBar;
