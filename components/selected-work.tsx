import Link from "next/link";
import projects from "@/data/projects.json";

export function SelectedWork() {
  const selected = projects.slice(0, 3);

  return (
    <section className="w-full max-w-xl mx-auto px-6 space-y-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2.5 font-clash-display text-[20px] font-bold leading-none text-foreground/80">
          Selected Work
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
        </span>
        <Link
          href="/projects"
          className="group flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-accent"
        >
          View all
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {selected.map((project, index) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-4 rounded-xl border border-border/40 px-4 py-4 transition-all duration-300 ease-out hover:border-border hover:bg-foreground/3 hover:translate-x-1 selected-work-item"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Number */}
            <span className="font-clash-display text-xs font-bold tabular-nums text-muted-foreground/45 w-5 shrink-0 transition-all duration-300 group-hover:text-muted-foreground/70">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="relative inline-flex font-clash-display font-semibold leading-snug text-foreground overflow-hidden">
                <span className="transition-transform duration-300 ease-out group-hover:-translate-y-full block">
                  {project.name}
                </span>
                <span className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 block text-foreground/70">
                  {project.name}
                </span>
              </p>
              <p className="mt-0.5 text-sm font-medium leading-relaxed text-muted-foreground line-clamp-1 transition-colors duration-300 group-hover:text-muted-foreground/80">
                {project.description}
              </p>
            </div>

            {/* Arrow button */}
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 transition-all duration-300 ease-out group-hover:border-foreground/25 group-hover:bg-foreground/8 group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground/50 transition-all duration-300 group-hover:text-foreground/70 group-hover:translate-x-px group-hover:-translate-y-px"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
