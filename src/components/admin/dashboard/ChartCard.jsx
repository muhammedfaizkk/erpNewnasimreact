import React from 'react';
import { ArrowUp } from 'lucide-react';

const ChartCard = ({ 
  title, 
  value, 
  chartType = 'line', 
  color = '#3B82F6', 
  data = [], 
  showArrow = false,
  arrowDirection = 'up',
  valueColor = ''
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className={`text-2xl font-bold mb-2 flex items-center ${valueColor}`}>
        {value}
        {showArrow && arrowDirection === 'up' && (
          <ArrowUp size={20} className="ml-1" />
        )}
        {showArrow && arrowDirection === 'down' && (
          <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        )}
      </div>
      <div className="h-8 overflow-hidden">
        {chartType === 'line' && (
          <svg viewBox="0 0 100 20" className="w-full">
            <path 
              d={`M0,${20-data[0]} ${data.map((point, i) => 
                `${i === 0 ? 'Q' : 'T'}${(i+1) * (100/data.length)},${20-point}`
              ).join(' ')}`} 
              fill="none" 
              stroke={color} 
              strokeWidth="2" 
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ChartCard;