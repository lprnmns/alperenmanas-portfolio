import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectsData, projectSlugs } from "@/lib/projects-data";

interface ProjectPageParams {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ProjectPageParams): Metadata {
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

export default function ProjectDetailPage({ params }: ProjectPageParams) {
  const project = projectsData[params.slug];

  if (!project) {
    notFound();
  }

  const techEntries = Object.entries(project.technologies);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className={`relative overflow-hidden bg-gradient-to-br ${project.gradient} pb-24 pt-28`}></div>

      <div className="relative -mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col gap-12 p-8 lg:flex-row">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-800 lg:w-1/2">
                <Image
                  src={project.coverImage}
                  alt={`${project.title} kapak görseli`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              <div className="flex w-full flex-col gap-6 lg:w-1/2">
                <div>
                  <p className="text-sm uppercase tracking-widest text-cyan-400">Proje</p>
                  <h1 className="mt-2 text-3xl font-bold md:text-4xl">{project.title}</h1>
                  <p className="mt-4 text-base text-slate-300 md:text-lg">{project.fullDescription}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-800/70 px-3 py-1 text-xs font-medium text-cyan-300 border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-3">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition duration-200 hover:brightness-110"
                    >
                      Canlı Demo
                    </a>
                  ) : null}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 transition duration-200 hover:border-slate-500 hover:text-white"
                  >
                    GitHub Kodları
                  </a>

                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-lg border border-transparent px-5 py-2 text-sm font-semibold text-slate-300 transition duration-200 hover:text-white"
                  >
                    ← Projelere Dön
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 px-8 py-10">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Teknoloji Yığını</h2>
                  <div className="space-y-5">
                    {techEntries.map(([category, items]) => (
                      <div key={category} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">{category}</h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {items.map((item) => (
                            <span key={item} className="rounded-md bg-slate-800/70 px-3 py-1 text-xs text-slate-200">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white">Entegrasyonlar ve API’ler</h2>
                  <div className="space-y-4">
                    {project.apis.map((api) => (
                      <div key={api.name} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                        <h3 className="text-sm font-semibold text-cyan-300">{api.name}</h3>
                        <p className="mt-2 text-sm text-slate-300">{api.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 px-8 py-10">
              <h2 className="text-xl font-semibold text-white">Proje Galerisi</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.carouselImages.map((image, index) => (
                  <div
                    key={image}
                    className="relative aspect-video overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} ekran görüntüsü ${index + 1}`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
