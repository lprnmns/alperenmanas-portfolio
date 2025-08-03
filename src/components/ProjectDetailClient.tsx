'use client';

import React, { useState } from 'react';
import TechBadge from '@/components/TechBadge';
import ImageCarousel from '@/components/ImageCarousel';
import EvolutionAccordion from '@/components/EvolutionAccordion';
import { Project } from '@/data/projectsData';

interface ProjectDetailClientProps {
  project: Project;
}

const ProjectDetailClient: React.FC<ProjectDetailClientProps> = ({ project }) => {
  // State for image carousel
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  // State for evolution accordion (default open item should be the first item)
  const [openEvolution, setOpenEvolution] = useState<string>(
    project.evolution.length > 0 ? project.evolution[0].version : ''
  );

  // Carousel handlers
  const handleNext = () => {
    setCarouselIndex((prevIndex) => 
      prevIndex === project.carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCarouselIndex((prevIndex) => 
      prevIndex === 0 ? project.carouselImages.length - 1 : prevIndex - 1
    );
  };

  // Group tech stack by category
  const groupedTechStack = project.techStack.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Project Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">{project.title}</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Projeyi Canlı Gör
            </a>
          )}
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            GitHub'da İncele
          </a>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="mb-12">
        <ImageCarousel
          images={project.carouselImages}
          currentIndex={carouselIndex}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>

      {/* Project Purpose */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-white">Projenin Amacı</h2>
        <p className="text-gray-300">{project.purpose}</p>
      </div>

      {/* Tech Stack & APIs */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-white">Teknolojiler ve API'ler</h2>
        
        {/* Tech Stack */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-white">Teknoloji Yığını</h3>
          {Object.entries(groupedTechStack).map(([category, techs]) => (
            <div key={category} className="mb-4">
              <h4 className="text-lg font-medium mb-2 text-gray-300">{category}</h4>
              <div className="flex flex-wrap">
                {techs.map((tech, index) => (
                  <TechBadge key={index} name={tech} category={category} />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* APIs */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Kullanılan API'ler</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.apis.map((api, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-white mb-2">{api.name}</h4>
                <p className="text-gray-400">{api.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Evolution Gallery */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-white">Neydi, Ne Oldu? (Projenin Evrimi)</h2>
        {project.evolution.map((item) => (
          <EvolutionAccordion
            key={item.version}
            version={item.version}
            title={item.title}
            summary={item.summary}
            imageUrls={item.imageUrls}
            isOpen={openEvolution === item.version}
            onToggle={() => setOpenEvolution(openEvolution === item.version ? '' : item.version)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetailClient;