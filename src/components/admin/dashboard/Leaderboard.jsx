import React from 'react';
import { Check } from 'lucide-react';
import { userLeaderboard, groupLeaderboard } from '../../../data/mockData';

const Leaderboard = ({ type }) => {
  const leaderboardData = type === 'user' ? userLeaderboard : groupLeaderboard;
  const title = type === 'user' ? 'User Leaderboard' : 'Group Leaderboard';
  
  return (
    <div>
      <h3 className="text-sm font-medium mb-4">{title}</h3>
      <div className="space-y-4">
        {leaderboardData.map((item, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`w-10 h-10 ${type === 'user' ? 'rounded-full' : 'rounded'} overflow-hidden mr-3 ${!item.imageUrl ? `bg-${item.color}-100 flex items-center justify-center` : ''}`}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-${item.color}-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {item.icon}
                    </svg>
                  )}
                </div>
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.stats}</div>
                </div>
              </div>
              <div className="flex items-center text-green-500">
                <span className="mr-1">{item.rank}</span>
                <Check size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;