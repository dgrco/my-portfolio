import Link from "next/link";
import { ExternalLink } from "lucide-react";
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

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs tracking-widest text-muted-foreground uppercase font-medium mb-3 animate-fade-in-up animate-stagger-1">
            Work
          </p>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight mb-3 text-foreground animate-fade-in-up animate-stagger-2">
            Projects
          </h1>
          <p className="text-[16px] text-muted-foreground leading-relaxed animate-fade-in-up animate-stagger-3">
            Things I've built — click any card for the full writeup.
          </p>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-4">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className={`group relative rounded-lg border transition-colors animate-fade-in-up ${
                project.featured
                  ? "border-primary/40 bg-primary/5 hover:bg-primary/10 ring-1 ring-primary/15"
                  : "border-border bg-card hover:bg-muted/40"
              }`}
              style={{ animationDelay: `${0.1 + index * 0.06}s` }}
            >
              {/* Clickable area for writeup */}
              <Link
                href={`/projects/${project.slug}`}
                className="block p-5 pr-5 sm:pr-24"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-[16px] font-bold text-foreground group-hover:text-foreground/80 transition-colors">
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-2 shrink-0">
                    {project.status === "In progress" && (
                      <span className="text-[12px] font-medium px-2 py-0.5 rounded-full bg-foreground/10 text-foreground/70">
                        In progress
                      </span>
                    )}
                    {project.featured && (
                      <span className="text-[12px] font-medium px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[12px] px-2 py-0.5 rounded-full ${
                        project.featured
                          ? "bg-primary/10 text-foreground/80"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </Link>

              {/* Icon links - desktop only */}
              <div className="hidden sm:flex sm:absolute sm:top-5 sm:right-4 items-center gap-2">
                {project.live && (
                  <a
                    href={project.live}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="View live site"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="View source on GitHub"
                  >
                    <GitHubIcon size={15} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
    </main>
  );
}
