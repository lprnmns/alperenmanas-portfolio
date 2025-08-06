import React from 'react';

interface TechBadgeProps {
  name: string;
  category?: string;
}

const TechBadge: React.FC<TechBadgeProps> = ({ name, category }) => {
  // Define category colors
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'Frontend':
        return 'bg-blue-700';
      case 'Backend':
        return 'bg-green-700';
      case 'Database':
        return 'bg-purple-700';
      case 'AI & Tools':
        return 'bg-yellow-700';
      default:
        return 'bg-gray-700';
    }
  };

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full ${getCategoryColor(category)} text-gray-300 text-sm mr-2 mb-2`}>
      <span>{name}</span>
      {category && (
        <span className="ml-2 text-xs opacity-75">({category})</span>
      )}
    </div>
  );
};

export default TechBadge;