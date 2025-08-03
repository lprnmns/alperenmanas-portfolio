import React from 'react';

interface EvolutionStepProps {
  versionTitle: string;
  description: string[];
  imageUrls: string[];
}

const EvolutionStep: React.FC<EvolutionStepProps> = ({ versionTitle, description, imageUrls }) => {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4 text-white">{versionTitle}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
          ))}
        </div>
        
        {/* Right Column: Description */}
        <div>
          <ul className="list-disc pl-5 space-y-2">
            {description.map((point, index) => (
              <li key={index} className="text-gray-300">{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EvolutionStep;