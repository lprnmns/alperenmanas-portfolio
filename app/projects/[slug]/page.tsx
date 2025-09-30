import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/project-detail/ProjectDetailClient";
import { projectSlugs, projectsData } from "@/lib/projects-data";

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ProjectDetailPageProps): Metadata {
  const project = projectsData[params.slug];

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} · Projeler · Alperen Manas`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [project.coverImage, ...project.carouselImages],
    },
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = projectsData[params.slug];

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
