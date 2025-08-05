// src/app/page.tsx
import ProjectCard from '@/components/ProjectCard';
import { projectsData } from '@/data/projectsData';
import { aboutMe, skills, certificates } from '@/data/cvData';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Content Headers Row */}
      <div className="flex pt-6 mb-8">
        <div className="w-1/3">
          <h2 className="text-3xl font-bold text-gray-400">Projelerim</h2>
        </div>
        <div className="w-2/3 md:pl-8"> {/* Pl padding for alignment */}
          <h2 className="text-3xl font-bold text-gray-400">Hakkımda</h2>
        </div>
      </div>

      {/* Main Content Area starts HERE */}
      <main className="flex flex-col md:flex-row">
        {/* Left Column: Projects */}
        <div className="w-full md:w-1/3">
          <div className="flex flex-col gap-8">
            {projectsData.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>
        </div>

        {/* Right Column: About Me */}
        <div className="w-full md:w-2/3 md:pl-8">
          {/* Kişisel Bilgiler Section */}
          <section className="mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Kişisel Bilgiler</h3>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-gray-300 space-y-3">
              <p><span className="font-semibold text-white">İsim:</span> {aboutMe.name}</p>
              <p>
                <span className="font-semibold text-white">E-posta:</span>{' '}
                <a href={`mailto:${aboutMe.email}`} className="text-blue-400 hover:underline">{aboutMe.email}</a>
              </p>
              <p><span className="font-semibold text-white">Eğitim:</span> {aboutMe.education}</p>
              <p className="pt-3 border-t border-gray-700">{aboutMe.bio}</p>
            </div>
          </section>

          {/* Yetenekler Section */}
          <section className="mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Yetenekler</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="bg-gray-800 p-6 rounded-lg shadow-md">
                  <h4 className="text-xl font-medium mb-3 text-white">{category}</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {items.map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Sertifikalar Section */}
          <section>
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Sertifikalar</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {certificates.map((cert, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-5">
                  <div className="flex-shrink-0 w-32 h-24 relative">
                    <Image
                      src={cert.imageUrl}
                      alt={`${cert.title} sertifikası`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">{cert.title}</h4>
                    <p className="text-sm text-gray-400">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}