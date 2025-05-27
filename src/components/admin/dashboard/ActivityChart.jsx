import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

const ActivityChart = ({ data, height = 120, showAxis = true }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        {showAxis && (
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
        )}
        <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ActivityChart;