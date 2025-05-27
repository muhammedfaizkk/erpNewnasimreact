import React from 'react';
import ProgressBar from '../ui/ProgressBar';

const getIcon = (iconName, color) => {
  const colorClass = `text-${color}-500`;
  const bgColorClass = `bg-${color}-100`;

  switch (iconName) {
    case 'warning':
      return (
        <div className={`w-8 h-8 ${bgColorClass} rounded flex items-center justify-center mr-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      );
    case 'chat':
      return (
        <div className={`w-8 h-8 ${bgColorClass} rounded flex items-center justify-center mr-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
        </div>
      );
    case 'building':
      return (
        <div className={`w-8 h-8 ${bgColorClass} rounded flex items-center justify-center mr-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      );
    case 'lock':
      return (
        <div className={`w-8 h-8 ${bgColorClass} rounded flex items-center justify-center mr-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      );
    case 'shield':
      return (
        <div className={`w-8 h-8 ${bgColorClass} rounded flex items-center justify-center mr-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      );
    case 'users':
      return (
        <div className={`w-8 h-8 ${bgColorClass} rounded flex items-center justify-center mr-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      );
    default:
      return (
        <div className={`w-8 h-8 ${bgColorClass} rounded flex items-center justify-center mr-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
  }
};

const TopicCard = ({ title, percentage, icon, color }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {getIcon(icon, color)}
          <div>
            <div className="font-medium">{title}</div>
            <div className="text-xs text-gray-500">{percentage}% Correct</div>
          </div>
        </div>
      </div>
      <ProgressBar percentage={percentage} color={color} />
    </div>
  );
};

export default TopicCard;