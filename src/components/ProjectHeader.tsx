import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/SocialIcons";
import { CoverImage } from "@/components/CoverImage";
import { formatDate } from "@/lib/projects";

/*
 * Loose on purpose. MDX files are not typechecked, so this mirrors the shape
 * they export rather than reusing Project (which also carries slug, derived
 * from the directory name at read time).
 */
type ProjectMeta = {
  title: string;
  shortDescription: string;
  tags: string[];
  status: string;
  date: string;
  github?: string;
  live?: string;
  cover?: string;
  coverAlt?: string;
};

export function ProjectHeader({ metadata }: { metadata: ProjectMeta }) {
  const { title, shortDescription, tags, status, date, github, live, cover, coverAlt } =
    metadata;
  const inProgress = status === "In progress";

  return (
    <header className="mb-10 sm:mb-12">
      <Link
        href="/projects"
        className="group meta inline-flex items-center gap-2 mb-7 hover:text-foreground transition-colors"
      >
        <ArrowLeft
          size={14}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
        All projects
      </Link>

      <h1 className="text-[38px] sm:text-[52px] font-medium tracking-[-0.025em] leading-[1.05] mb-4 text-foreground">
        {title}
      </h1>
      <p className="text-[19px] sm:text-[20px] text-foreground/75 leading-[1.6] mb-6">
        {shortDescription}
      </p>

      {/* All the apparatus sits together above the rule, so the rule reads as
          the break between the header and the writeup itself. */}
      <div className="flex flex-wrap items-center gap-x-7 gap-y-3 mb-3">
        <p className="meta">
          {formatDate(date)}
          {inProgress && <span className="text-accent-ink">&nbsp;·&nbsp;In progress</span>}
        </p>
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            className="meta link-rule inline-flex items-center gap-2 text-foreground/85 hover:text-foreground"
          >
            <ExternalLink size={14} />
            Live site
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="meta link-rule inline-flex items-center gap-2 text-foreground/85 hover:text-foreground"
          >
            <GitHubIcon size={14} />
            Source
          </a>
        )}
      </div>

      <p
        className={`meta text-muted-foreground/85 ${
          cover ? "" : "pb-7 border-b border-rule"
        }`}
      >
        {tags.join(" · ")}
      </p>

      {/* When there is a cover it replaces the rule as the break between the
          header and the writeup. */}
      {cover && (
        <div className="hero-bleed mt-7">
          <CoverImage src={cover} alt={coverAlt ?? `${title} screenshot`} priority />
        </div>
      )}
    </header>
  );
}
