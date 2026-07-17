import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/SocialIcons";

type Links = {
  githubLink?: string,
  liveLink?: string,
}

export function MDXTitleWithLinks({ title, links = {} }: {
  title: string,
  links: Links,
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight leading-tight">{title}</h1>
        <div className="flex gap-2 shrink-0">
          {links.liveLink && (
            <a
              href={links.liveLink}
              target="_blank"
              className="inline-flex items-center gap-2 text-[14px] px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors text-foreground"
            >
              <ExternalLink size={14} />
              <span>Live</span>
            </a>
          )}
          {links.githubLink && (
            <a
              href={links.githubLink}
              target="_blank"
              className="inline-flex items-center gap-2 text-[14px] px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors text-foreground"
            >
              <GitHubIcon size={14} />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
