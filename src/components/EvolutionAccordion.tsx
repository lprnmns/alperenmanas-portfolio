'use client';

import React from 'react';
import Image from 'next/image';

interface EvolutionAccordionProps {
  version: string;
  title: string;
  summary: string;
  imageUrls: string[];
  isOpen: boolean;
  onToggle: () => void;
}

const EvolutionAccordion: React.FC<EvolutionAccordionProps> = ({ 
  version, 
  title, 
  summary, 
  imageUrls, 
  isOpen, 
  onToggle 
}) => {
  return (
    <div className="border-b border-gray-700 py-4">
      {/* Accordion header */}
      <div 
        className="flex justify-between items-center cursor-pointer py-2"
        onClick={onToggle}
      >
        <h3 className="text-xl font-semibold text-white">
          {version} - {title}
        </h3>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg 
            className="w-6 h-6 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </div>
      </div>
      
      {/* Accordion content */}
      {isOpen && (
        <div className="py-4">
          <p className="text-gray-300 mb-4">{summary}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="overflow-hidden rounded-lg relative h-48">
                <Image
                  src={url}
                  alt={`Version ${version} image ${index + 1}`}
                  className="w-full h-full object-contain"
                  width={400}
                  height={192}
                  quality={80}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EvolutionAccordion;