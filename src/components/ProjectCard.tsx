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

  return (
    <div className="block group">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-blue-500/20 group-hover:shadow-xl flex flex-col">
        <Link href={`/projects/${slug}`}>
          <div className="relative w-full h-48">
            <Image
              src={coverImageUrl}
              alt={title}
              className="w-full h-full object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
          </div>
        </Link>
        <div className="p-4 pt-0 flex flex-col flex-grow">
          <p
            className="text-gray-400 text-sm overflow-hidden line-clamp-3 flex-grow"
            dangerouslySetInnerHTML={{ __html: shortDescription }}
          />
          <div className="mt-auto pt-2">
            {liveUrl ? (
              <Link
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Test Et
              </Link>
            ) : (
              <button
                className="inline-block px-4 py-2 rounded bg-gray-600 text-gray-400 cursor-not-allowed"
                disabled
              >
                Test Et
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;