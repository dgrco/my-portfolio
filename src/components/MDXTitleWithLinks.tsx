import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/SocialIcons";

// Common links among all blogs; all optional
type Links = {
  githubLink?: string,
  liveLink?: string,
}

export function MDXTitleWithLinks({ title, links = {} }: {
  title: string,
  links: Links,
}) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-medium tracking-tight my-4">{title}</h1>
      <div className="flex gap-4">
        {
          links.liveLink &&
          <a
            href={links.liveLink}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Check out the project live"
          >
            <ExternalLink size={20} />
          </a>
        }
        {
          links.githubLink &&
          <a
            href={links.githubLink}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="View source on GitHub"
          >
            <GitHubIcon size={20} />
          </a>
        }
      </div>
    </div>
  )
}
