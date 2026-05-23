import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { Showcase } from "@/components/showcase";
import projects from "@/data/projects.json";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Vasu Bhalodiya - Aryx CLI, Intrex Icon, Encrypt password manager, Prompt AI chatbot, Cinefix and more. Built with React, Next.js, TypeScript and Firebase.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects - Vasu Bhalodiya",
    description:
      "Open-source tools and Independent Builds by Vasu Bhalodiya: Aryx CLI, Intrex Icon, Encrypt, Prompt, Cinefix.",
    url: "/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Vasu Bhalodiya",
    description:
      "Open-source tools and Independent Builds by Vasu Bhalodiya: Aryx CLI, Intrex Icon, Encrypt, Prompt, Cinefix.",
  },
};

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects by Vasu Bhalodiya",
  url: "https://vasubhalodiya.in/projects",
  author: {
    "@type": "Person",
    name: "Vasu Bhalodiya",
    url: "https://vasubhalodiya.in",
  },
  hasPart: projects.map((p) => ({
    "@type": "SoftwareApplication",
    name: p.name,
    url: p.href,
    description: p.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    author: { "@type": "Person", name: "Vasu Bhalodiya" },
  })),
};

export default function ProjectsPage() {
  return (
    <main className="relative h-full w-full py-10 pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <Showcase />
      <div className="relative mx-auto max-w-2xl px-6 pt-10">
        <div className="flex items-center justify-between gap-4">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-normal text-muted-foreground transition-colors hover:text-accent"
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left h-4 w-4"
              aria-hidden="true"
            >
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            Back
          </Link>
          <h1 className="font-cabinet-grotesk text-sm font-semibold tracking-normal text-foreground">
            All Projects
          </h1>
        </div>
        <section className="mx-auto pt-8">
          <div className="relative">
            <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-border/70 to-transparent"></div>
            {projects.map((project, index) => (
              <div
                key={project.name}
                className="group relative py-5"
              >
                {index < projects.length - 1 && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-border/70 to-transparent"></div>
                )}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="flex items-center gap-2 text-base font-semibold tracking-normal text-foreground">
                        {project.name}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2">
                        {project.stack.map((iconName) => (
                          <div
                            key={iconName}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 bg-zinc-100 dark:bg-neutral-900"
                          >
                            <Icon
                              icon={iconName}
                              size={16}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex w-fit items-center divide-x divide-border overflow-hidden rounded-xl border border-border">
                      <a
                        href={project.href}
                        aria-label="Read more"
                        className="inline-flex items-center justify-center p-2 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-arrow-up-right size-4"
                          aria-hidden="true"
                        >
                          <path d="M7 7h10v10"></path>
                          <path d="M7 17 17 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <p className="text-base font-medium leading-7 tracking-normal text-muted-foreground text-balance">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
