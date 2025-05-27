import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FilterControls = () => {
  const [timeframe, setTimeframe] = useState('All-time');
  const [people, setPeople] = useState('All');
  const [topic, setTopic] = useState('All');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="relative">
        <div className="flex justify-between items-center border border-gray-300 rounded p-3 cursor-pointer">
          <div>
            <div className="text-sm text-gray-500">Timeframe</div>
            <div className="font-medium">{timeframe}</div>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
      
      <div className="relative">
        <div className="flex justify-between items-center border border-gray-300 rounded p-3 cursor-pointer">
          <div>
            <div className="text-sm text-gray-500">People</div>
            <div className="font-medium">{people}</div>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
      
      <div className="relative">
        <div className="flex justify-between items-center border border-gray-300 rounded p-3 cursor-pointer">
          <div>
            <div className="text-sm text-gray-500">Topic</div>
            <div className="font-medium">{topic}</div>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

export default FilterControls;