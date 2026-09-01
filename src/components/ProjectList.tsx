import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/SocialIcons";
import { formatDate, type Project } from "@/lib/projects";

type Variant = "compact" | "full";

export function ProjectList({
  projects,
  variant = "compact",
}: {
  projects: Project[];
  variant?: Variant;
}) {
  return (
    <ul className="border-t border-rule">
      {projects.map((project, i) => (
        <ProjectRow
          key={project.slug}
          project={project}
          index={i}
          variant={variant}
        />
      ))}
    </ul>
  );
}

function ProjectRow({
  project,
  index,
  variant,
}: {
  project: Project;
  index: number;
  variant: Variant;
}) {
  const isFull = variant === "full";
  const inProgress = project.status === "In progress";

  return (
    <li
      className="group relative border-b border-rule animate-fade-in-up"
      style={{ animationDelay: `${0.1 + index * 0.07}s` }}
    >
      {/* No hover fill. A tinted rectangle reads as a card and its corners sit
          badly against the hairlines; the title colour and the arrow carry the
          affordance on their own. */}
      {/*
        A covered row opens with the image, so it needs more space above than
        below it. Matched padding leaves the image floating between two
        entries and reading as the tail of the one before.
      */}
      <div className={`pb-6 sm:pb-7 ${project.cover ? "pt-10 sm:pt-12" : "pt-6 sm:pt-7"}`}>
        {/*
          Covers are optional so they can be added one project at a time. The
          row reads fine without one, it just carries less evidence.
        */}
        {project.cover && (
          <div className="mb-5 overflow-hidden rounded-lg border border-rule bg-muted/40">
            <Image
              src={project.cover}
              alt={project.coverAlt ?? `${project.title} screenshot`}
              width={1600}
              height={1000}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.015]"
            />
          </div>
        )}
        <div className="flex items-baseline justify-between gap-5 mb-2">
          <h3 className="text-[24px] sm:text-[27px] font-medium tracking-[-0.015em] leading-tight text-foreground group-hover:text-accent-ink transition-colors">
            {/*
              Only the title is a real link. The pseudo-element stretches it
              over the whole row so the row is clickable without nesting the
              Live and Source anchors inside another anchor.
            */}
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 decoration-accent-ink/40 underline-offset-[6px] group-hover:underline"
            >
              {project.title}
            </Link>
          </h3>
          <span className="meta shrink-0 flex items-center gap-2 text-muted-foreground/80">
            {formatDate(project.date)}
            <ArrowUpRight
              size={16}
              className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
            />
          </span>
        </div>

        <p className="text-[17px] text-foreground/70 leading-[1.65] mb-2.5">
          {isFull ? project.description : project.shortDescription}
        </p>

        {/*
          Completed is the default state of a finished writeup, so only work
          still underway is labelled. It leads the tag line rather than sitting
          in a badge of its own.
        */}
        <p className="meta">
          {inProgress && <span className="text-accent-ink">In progress&nbsp;·&nbsp;</span>}
          <span className="text-muted-foreground/85">
            {project.tags.join(" · ")}
          </span>
        </p>

        {isFull && (project.github || project.live) && (
          <div className="relative z-10 flex flex-wrap gap-x-7 gap-y-2 mt-4">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="meta link-rule inline-flex items-center gap-2 text-foreground/85 hover:text-foreground"
              >
                <ExternalLink size={14} />
                Live site
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="meta link-rule inline-flex items-center gap-2 text-foreground/85 hover:text-foreground"
              >
                <GitHubIcon size={14} />
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
