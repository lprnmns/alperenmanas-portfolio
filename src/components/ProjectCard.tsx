import React from 'react';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  shortDescription: string;
  coverImageUrl: string;
  slug: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, shortDescription, coverImageUrl, slug }) => {
  return (
    <Link href={`/projects/${slug}`} className="block group">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-blue-500/20 group-hover:shadow-xl">
        <img src={coverImageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
          <p className="text-gray-400">{shortDescription}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;