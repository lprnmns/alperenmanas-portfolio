'use client';

import React from 'react';
import ProjectCard from '@/components/ProjectCard';
import { projectsData } from '@/data/projectsData';

const ProjectsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Projelerim</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            shortDescription={project.shortDescription}
            coverImageUrl={project.coverImageUrl}
            slug={project.slug}
            liveUrl={project.liveUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;