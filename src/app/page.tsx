'use client';

import React from 'react';
import { projectsData } from '@/data/projectsData';
import ProjectCard from '@/components/ProjectCard';
import { aboutMe, skills, certificates } from '@/data/cvData';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      {/* Content Headers Row */}
      <div className="container mx-auto flex items-start py-6">
        <div className="w-1/3 px-6">
          <h2 className="text-3xl font-bold text-gray-400">Projelerim</h2>
        </div>
        <div className="w-2/3 px-6">
          <h2 className="text-3xl font-bold text-gray-400">Hakkımda</h2>
        </div>
      </div>

      <main>
        <div className="flex">
          {/* Left Column - 1/3 width */}
          <div className="w-1/3 p-6 bg-gray-900">
            <div className="flex flex-col gap-8">
              {projectsData.map((project) => (
                <div key={project.slug}>
                  <ProjectCard
                    title={project.title}
                    shortDescription={project.shortDescription}
                    coverImageUrl={project.coverImageUrl}
                    slug={project.slug}
                    liveUrl={project.liveUrl}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - 2/3 width */}
          <div className="w-2/3 p-6 bg-gray-900">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Kişisel Bilgiler</h2>
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <p className="text-lg mb-2">
                  <span className="font-semibold">İsim:</span> {aboutMe.name}
                </p>
                <div className="text-lg mb-2">
                  <span className="font-semibold">E-posta:</span>{' '}
                  <a href={`mailto:${aboutMe.email}`} className="text-blue-400 hover:underline">
                    {aboutMe.email}
                  </a>
                </div>
                <p className="text-lg mb-4">
                  <span className="font-semibold">Eğitim:</span> {aboutMe.education}
                </p>
                <p className="text-gray-300">{aboutMe.bio}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Yetenekler</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category} className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-medium mb-3 text-white">{category}</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {items.map((item, index) => (
                        <li key={index} className="text-gray-300">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">Sertifikalar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
                    <div className="mr-4">
                      <Image
                        src={cert.imageUrl}
                        alt={`${cert.title} certificate`}
                        width={200}
                        height={150}
                        className="object-contain rounded-md"
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-white">{cert.title}</h4>
                      <p className="text-gray-400">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
