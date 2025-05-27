import React from 'react';
import FilterControls from '../dashboard/FilterControls';
import MetricCard from '../dashboard/MetricCard';
import ChartCard from '../dashboard/ChartCard';
import ActivityChart from '../dashboard/ActivityChart';
import TopicsList from '../dashboard/TopicsList';
import Leaderboard from '../dashboard/Leaderboard';
import { Download } from 'lucide-react';
import { activityData } from '../../../data/mockData';

const MainContent = () => {
  return (
    <div className="flex-1 p-4 md:p-8 ml-0 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Reports</h1>
        <button className="flex items-center text-sm bg-white border border-gray-300 rounded px-3 py-2">
          <Download size={16} className="mr-2" />
          <span>Download</span>
        </button>
      </div>
      
      <FilterControls />
      
      {/* Top metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Action Views" value="27" suffix="HR" />
        <MetricCard title="Questions Answered" value="3,288" />
        <MetricCard title="Av. Search Length" value="2m 34s" />
        <MetricCard 
          title="Activity" 
          chart={
            <ActivityChart 
              data={activityData.slice(-6)} 
              height={40} 
              showAxis={false} 
            />
          } 
        />
      </div>
      
      
    </div>
  );
};

export default MainContent;