import Link from "next/link";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";

const links = [
  { href: "https://github.com/dgrco", label: "GitHub", Icon: GitHubIcon },
  { href: "https://linkedin.com/in/dantegrieco", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "mailto:dantegrieco11@gmail.com", label: "Email", Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-rule">
      <div className="measure py-10 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-6">
        <p className="meta">Dante Grieco</p>
        <div className="flex flex-wrap gap-x-7 gap-y-2">
          {links.map(({ href, label, Icon }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              className="meta inline-flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
