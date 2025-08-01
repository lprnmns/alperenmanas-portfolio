'use client';

import React from 'react';
import TechBadge from '@/components/TechBadge';
import EvolutionStep from '@/components/EvolutionStep';

// Dummy data for "Konum Analiz Projesi"
const projectData = {
  title: "Konum Analiz Projesi",
  subtitle: "Konum verilerini analiz eden ve raporlayan bir araç",
  liveUrl: "#",
  githubUrl: "#",
  summary: "Bu proje, kullanıcıların konum verilerini toplayıp analiz etmelerini ve raporlamalarını sağlayan bir araçtır. Amacı, konum verilerinden anlamlı bilgiler çıkarmak ve bu bilgileri kullanıcıya sunmaktır.",
  technologies: ["React", "Flask", "Tailwind CSS", "Python", "PostgreSQL"],
  evolutionSteps: [
    {
      versionTitle: "V1: İlk Arayüz",
      description: [
        "Temel kullanıcı arayüzü oluşturuldu",
        "Konum verisi girişi için form eklendi",
        "Basit bir harita bileşeni entegre edildi"
      ],
      imageUrls: ["/evolution/v1-1.png", "/evolution/v1-2.png"]
    },
    {
      versionTitle: "V2: Veri Analizi ve Görselleştirme",
      description: [
        "Konum verilerini analiz eden backend servisi geliştirildi",
        "Veri görselleştirme için grafikler eklendi",
        "Raporlama özelliği aktif edildi"
      ],
      imageUrls: ["/evolution/v2-1.png", "/evolution/v2-2.png", "/evolution/v2-3.png"]
    }
  ]
};

const ProjectDetailPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Project Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">{projectData.title}</h1>
        <p className="text-xl mb-6 text-gray-400">{projectData.subtitle}</p>
        <div className="flex flex-wrap gap-4">
          <a href={projectData.liveUrl} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Projeyi Canlı Gör
          </a>
          <a href={projectData.githubUrl} className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
            GitHub&apos;da İncele
          </a>
        </div>
      </div>

      {/* Summary & Tech Stack */}
      <div className="mb-12">
        <p className="text-gray-300 mb-6">{projectData.summary}</p>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-white">Kullanılan Teknolojiler</h2>
          <div className="flex flex-wrap">
            {projectData.technologies.map((tech, index) => (
              <TechBadge key={index} name={tech} />
            ))}
          </div>
        </div>
      </div>

      {/* Evolution Gallery */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-white">Projenin Gelişim Süreci</h2>
        {projectData.evolutionSteps.map((step, index) => (
          <EvolutionStep
            key={index}
            versionTitle={step.versionTitle}
            description={step.description}
            imageUrls={step.imageUrls}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetailPage;