import React from 'react';
import TopicCard from './TopicCard';
import { weakestTopics, strongestTopics } from '../../../data/mockData';

const TopicsList = ({ type }) => {
  const topics = type === 'weakest' ? weakestTopics : strongestTopics;
  const title = type === 'weakest' ? 'Weakest Topics' : 'Strongest Topics';

  return (
    <div>
      <h3 className="text-sm font-medium mb-4">{title}</h3>
      <div className="space-y-4">
        {topics.map((topic, index) => (
          <TopicCard key={index} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default TopicsList;