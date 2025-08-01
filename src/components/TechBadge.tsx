import React from 'react';

interface TechBadgeProps {
  name: string;
}

const TechBadge: React.FC<TechBadgeProps> = ({ name }) => {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm mr-2 mb-2">
      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-4 h-4 mr-2" />
      <span>{name}</span>
    </div>
  );
};

export default TechBadge;