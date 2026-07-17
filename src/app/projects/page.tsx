import Link from "next/link";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import { GitHubIcon } from "@/components/SocialIcons";

const statusStyles: Record<string, string> = {
  "In progress":
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  Complete: "bg-muted text-muted-foreground",
};

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <main className="max-w-3xl mx-auto px-5 py-12 sm:py-16">
      <div className="mb-10">
        <p className="text-xs tracking-widest text-muted-foreground uppercase mb-3">
          Work
        </p>
        <h1 className="text-3xl font-medium tracking-tight mb-3">Projects</h1>
        <p className="text-[15px] text-muted-foreground leading-relaxed">
          Things I've built — click any card for the full writeup.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {projects.map((project) => (
          <div
            key={project.slug}
            className={`group relative rounded-xl border bg-card transition-colors hover:border-border/80 hover:bg-muted/30 ${project.featured
                ? "border-border border-l-[3px] border-l-blue-500"
                : "border-border"
              }`}
          >
            {/* Clickable area for writeup */}
            <Link
              href={`/projects/${project.slug}`}
              className="block p-5 pr-20"
            >
              <div className="flex items-center flex-wrap gap-2 mb-2">
                <h2 className="text-[15px] font-medium">{project.title}</h2>
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statusStyles[project.status]
                    }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-[11px] rounded-full font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Link>

            {/* Icon links — sit outside the main Link to avoid nesting <a> inside <a> */}
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
      <div className="text-center my-4">
        <a
          href="https://github.com/dgrco"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="View source on GitHub"
        >
          Explore more projects on GitHub.
        </a>
      </div>
    </main>
  );
}
