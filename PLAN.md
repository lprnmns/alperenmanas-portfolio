# Personal Portfolio Website Plan: alperenmanas.app

This document outlines the plan for building a personal portfolio website using Next.js.

## 1. Main Pages

The website will consist of the following main pages:

-   **Home**: The landing page, featuring a brief introduction, a hero section, and a summary of skills and recent projects.
-   **Projects**: A dedicated page to showcase a detailed list of projects, including descriptions, technologies used, and links to live demos and source code.
-   **About**: A page with more information about my background, experience, and interests.

## 2. Folder Structure

The `src` directory will be organized as follows to maintain a clean and scalable codebase:

```
src/
|-- app/
|   |-- (pages)/
|   |   |-- projects/
|   |   |   `-- page.tsx
|   |   |-- about/
|   |   |   `-- page.tsx
|   |-- api/
|   |-- layout.tsx
|   `-- page.tsx
|-- components/
|   |-- ui/
|   |   |-- Button.tsx
|   |   |-- Card.tsx
|   |   `-- Badge.tsx
|   |-- layout/
|   |   |-- Navbar.tsx
|   |   `-- Footer.tsx
|   |-- sections/
|   |   |-- HeroSection.tsx
|   |   |-- ProjectsSection.tsx
|   |   `-- AboutSection.tsx
|   `-- ProjectCard.tsx
|-- lib/
|   `-- utils.ts
`-- styles/
    `-- globals.css
```

## 3. Reusable Components

The following reusable components will be created in the `src/components/` directory:

### UI Components (`src/components/ui/`)

-   **Button.tsx**: A versatile button component with support for different styles (primary, secondary) and states (hover, disabled).
-   **Card.tsx**: A flexible card component for displaying content in a structured format, such as project summaries or blog posts.
-   **Badge.tsx**: A component for displaying small pieces of information, such as technology tags or status labels.

### Layout Components (`src/components/layout/`)

-   **Navbar.tsx**: The main navigation bar, including links to the Home, Projects, and About pages.
-   **Footer.tsx**: The website footer, containing social media links and copyright information.

### Section Components (`src/components/sections/`)

-   **HeroSection.tsx**: The hero section for the home page, with a prominent headline, a brief bio, and a call-to-action button.
-   **ProjectsSection.tsx**: A section to display a grid of featured projects on the home page.
-   **AboutSection.tsx**: A section on the home page that provides a summary of my background and skills.

### Other Components

-   **ProjectCard.tsx**: A dedicated component to display project information, including a title, description, image, and technology badges.

## 4. Design Language

The website will follow a minimalist, professional dark theme with the following design specifications:

-   **Primary Background Color**: `#111827`
-   **Primary Accent Color**: A vibrant blue for buttons, links, and other interactive elements.
-   **Font**: 'Inter' from Google Fonts, which will be imported in `src/app/layout.tsx`.