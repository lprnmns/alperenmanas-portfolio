'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  shortDescription: string;
  coverImageUrl: string;
  slug: string;
  liveUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, shortDescription, coverImageUrl, slug, liveUrl }) => {
  const handleLiveUrlClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liveUrl) {
      window.open(liveUrl, '_blank');
    }
  };

  return (
    <Link href={`/projects/${slug}`} className="block group">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-blue-500/20 group-hover:shadow-xl">
        <div className="relative w-full h-48">
          <Image
            src={coverImageUrl}
            alt={title}
            className="w-full h-full object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
          <p className="text-gray-400 mb-4">{shortDescription}</p>
          {liveUrl && (
            <button
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              onClick={handleLiveUrlClick}
            >
              Test Et
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;