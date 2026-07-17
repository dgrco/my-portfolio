import Link from "next/link";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import { GitHubIcon } from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-5 py-12 sm:py-20">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs tracking-widest text-muted-foreground uppercase font-medium mb-3">
            Work
          </p>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight mb-3 text-foreground">
            Projects
          </h1>
          <p className="text-[15px] text-muted-foreground leading-relaxed">
            Things I've built — click any card for the full writeup.
          </p>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="group relative rounded-lg border border-border bg-card hover:bg-muted/40 transition-colors"
            >
              {/* Clickable area for writeup */}
              <Link
                href={`/projects/${project.slug}`}
                className="block p-5 pr-24"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-[15px] font-medium text-foreground group-hover:text-foreground/80 transition-colors">
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-2 shrink-0">
                    {project.status === "In progress" && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-foreground/10 text-foreground/70">
                        In progress
                      </span>
                    )}
                    {project.featured && (
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
                    )}
                  </div>
                </div>
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>

              {/* Icon links */}
              <div className="absolute top-5 right-4 flex items-center gap-2">
                {project.live && (
                  <a
                    href={project.live}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="View live site"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
                <a
                  href={project.github}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="View source on GitHub"
                >
                  <GitHubIcon size={15} />
                </a>
                <ArrowUpRight
                  size={15}
                  className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
