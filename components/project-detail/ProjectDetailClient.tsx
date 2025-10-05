'use client';

import { useEffect, useMemo, useState } from 'react';
import { Info } from 'lucide-react';

import { useLanguage } from '@/components/providers/LanguageProvider';
import ImageCarousel from '@/components/project-detail/ImageCarousel';
import EvolutionAccordion from '@/components/project-detail/EvolutionAccordion';
import TechBadge from '@/components/project-detail/TechBadge';
import type { Project } from '@/lib/projects-data';

interface ProjectDetailClientProps {
  projectDefault: Project;
  projectLocalized?: Project;
}

export default function ProjectDetailClient({ projectDefault, projectLocalized }: ProjectDetailClientProps) {
  const { language, dictionary } = useLanguage();
  const project = useMemo(() => {
    if (language === 'tr' && projectLocalized) {
      return projectLocalized;
    }
    return projectDefault;
  }, [language, projectDefault, projectLocalized]);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [openEvolution, setOpenEvolution] = useState(
    project.evolution.length > 0 ? project.evolution[0].version : ''
  );

  useEffect(() => {
    setCarouselIndex(0);
    setOpenEvolution(project.evolution.length > 0 ? project.evolution[0].version : '');
  }, [project]);

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

  const groupedTechStack = useMemo(() => {
    return project.techStack.reduce<Record<string, string[]>>((acc, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = [];
      }
      acc[tech.category].push(tech.name);
      return acc;
    }, {});
  }, [project.techStack]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-white">{project.title}</h1>
        <div className="mb-6 flex flex-wrap gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              {dictionary.projectDetail.viewLive}
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gray-700 px-6 py-3 text-white transition-colors hover:bg-gray-600"
          >
            {dictionary.projectDetail.viewGithub}
          </a>
        </div>
      </div>

      <div className="mb-12">
        <ImageCarousel
          images={project.carouselImages}
          currentIndex={carouselIndex}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>

      <div className="mb-12 space-y-4">
        <h2 className="text-2xl font-semibold text-white">{dictionary.projectDetail.purposeHeading}</h2>
        <p className="text-gray-300">{project.purpose}</p>
        {project.notice && (
          <div className="mt-6 flex items-start space-x-4 rounded-lg border-l-4 border-blue-500 bg-gray-800 p-4">
            <div className="flex-shrink-0">
              <Info className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold text-white">{dictionary.projectDetail.statusHeading}</h4>
              <p className="mt-1 text-gray-300">{project.notice}</p>
            </div>
          </div>
        )}
        {project.subscriberCount && (
          <p className="text-blue-400">
            {dictionary.projectDetail.subscriberLabel}: {project.subscriberCount}
          </p>
        )}
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-white">{dictionary.projectDetail.techHeading}</h2>

        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-white">{dictionary.projectDetail.techStackHeading}</h3>
          {Object.entries(groupedTechStack).map(([category, techs]) => {
            const categoryLabel =
              dictionary.projectDetail.categoryLabels[category as keyof typeof dictionary.projectDetail.categoryLabels] ?? category;
            return (
              <div key={category} className="mb-4">
                <h4 className="mb-2 text-lg font-medium text-gray-300">{categoryLabel}</h4>
                <div className="flex flex-wrap">
                  {techs.map((tech) => (
                    <TechBadge key={`${category}-${tech}`} name={tech} category={category} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold text-white">{dictionary.projectDetail.apisHeading}</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {project.apis.map((api) => (
              <div key={api.name} className="rounded-lg bg-gray-800 p-4">
                <h4 className="mb-2 text-lg font-medium text-white">{api.name}</h4>
                <p className="text-gray-400">{api.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {project.evolution.length > 0 && (
        <div>
          <h2 className="mb-8 text-3xl font-bold text-white">{dictionary.projectDetail.evolutionHeading}</h2>
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
      )}
    </div>
  );
}
