'use client';

import React from 'react';
import ProjectCard from '@/components/ProjectCard';

// Placeholder data for projects
const projects = [
  {
    title: "AI-Powered Task Manager",
    shortDescription: "A task management application that uses AI to prioritize tasks and suggest optimal schedules.",
    coverImageUrl: "/project1.jpg",
    slug: "ai-task-manager"
  },
  {
    title: "E-Commerce Platform",
    shortDescription: "A full-featured e-commerce platform with product search, cart, and payment integration.",
    coverImageUrl: "/project2.jpg",
    slug: "ecommerce-platform"
  },
  {
    title: "Personal Finance Tracker",
    shortDescription: "An application to track personal finances, with budgeting and expense analysis features.",
    coverImageUrl: "/project3.jpg",
    slug: "finance-tracker"
  }
];

const ProjectsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Projelerim</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            shortDescription={project.shortDescription}
            coverImageUrl={project.coverImageUrl}
            slug={project.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;