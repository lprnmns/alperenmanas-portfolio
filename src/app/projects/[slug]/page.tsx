// src/app/projects/[slug]/page.tsx

import { projectsData } from '@/data/projectsData';
import ProjectDetailClient from '@/components/ProjectDetailClient';
import { notFound } from 'next/navigation';

// This is the Server Component
export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find((p) => p.slug === params.slug);

  if (!project) {
    notFound(); // If project doesn't exist, show a 404 page
  }

  // We pass the data (which is serializable) to the client component.
  // No functions or event handlers are passed across the boundary.
  return <ProjectDetailClient project={project} />;
}