'use client';

import React from 'react';
import { aboutMe, skills, certificates } from '@/data/cvData';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Hakkımda</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">Kişisel Bilgiler</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-lg mb-2"><span className="font-semibold">İsim:</span> {aboutMe.name}</p>
          <p className="text-lg mb-4"><span className="font-semibold">Eğitim:</span> {aboutMe.education}</p>
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
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
              <div>
                <h3 className="text-xl font-medium text-white">{cert.title}</h3>
                <p className="text-gray-400">{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;