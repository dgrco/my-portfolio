import { getNotableProjects } from "@/lib/projects";
import { Mail, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { ProjectList } from "@/components/ProjectList";
import { SectionHeading } from "@/components/SectionHeading";

const stack = [
  { label: "Languages", items: ["Go", "C", "C++", "TypeScript", "Rust", "Python"] },
  { label: "Systems", items: ["Postgres", "Redis", "Docker", "Nginx", "Linux"] },
  { label: "Interfaces", items: ["React", "Next.js", "Tailwind"] },
];

const socials = [
  { href: "https://github.com/dgrco", label: "GitHub", Icon: GitHubIcon },
  { href: "https://linkedin.com/in/dantegrieco", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "mailto:dantegrieco11@gmail.com", label: "Email", Icon: Mail },
];

export default async function Home() {
  const projects = await getNotableProjects();

  return (
    <main className="measure py-14 sm:py-20">
      {/* Hero */}
      <section className="pb-14 sm:pb-16">
        <div className="flex items-center gap-5 mb-7 animate-fade-in-up">
          <Image
            src="/avatar.png"
            alt="Dante Grieco"
            width={200}
            height={200}
            priority
            className="w-[88px] h-[88px] sm:w-[104px] sm:h-[104px] shrink-0 rounded-full border border-rule"
            style={{ imageRendering: "pixelated" }}
          />
          <p className="label">Software engineer</p>
        </div>
        <h1 className="text-[42px] sm:text-[56px] font-medium tracking-[-0.025em] leading-[1.05] mb-5 text-foreground animate-fade-in-up">
          Dante Grieco
        </h1>
        <p className="text-[19px] sm:text-[20px] text-foreground/75 leading-[1.6] mb-7 animate-fade-in-up">
          CS graduate building things that matter. Currently developing a
          scheduling SaaS from the ground up: product, engineering, and
          everything in between. I like systems that are fast, simple, and
          useful.
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-3 animate-fade-in-up">
          {socials.map(({ href, label, Icon }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              className="meta link-rule inline-flex items-center gap-2.5 text-foreground/85 hover:text-foreground"
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* Selected work */}
      <section className="pb-14 sm:pb-16">
        <SectionHeading
          title="Selected work"
          action={{ href: "/projects", label: "All projects" }}
        />
        <ProjectList projects={projects} variant="compact" />
      </section>

      {/* Stack */}
      <section className="pb-14 sm:pb-16">
        <SectionHeading title="What I build with" />
        <dl className="border-t border-rule">
          {stack.map((group) => (
            <div
              key={group.label}
              className="flex flex-col sm:flex-row gap-1.5 sm:gap-10 py-4 border-b border-rule animate-fade-in-up"
            >
              <dt className="label pt-1.5 sm:w-36 shrink-0">{group.label}</dt>
              <dd className="text-[17px] text-foreground/85 leading-[1.6]">
                {group.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Contact */}
      <section className="animate-fade-in-up">
        <SectionHeading title="Get in touch" />
        <p className="text-[19px] sm:text-[20px] text-foreground/75 leading-[1.6] mb-7">
          Email is the fastest way to reach me. Happy to talk about anything
          above, or anything you happen to be building.
        </p>
        <Link
          href="mailto:dantegrieco11@gmail.com"
          className="group inline-flex items-center gap-2.5 text-[18px] px-5 py-3 rounded-lg border border-border hover:border-foreground/25 hover:bg-muted/60 transition-colors text-foreground"
        >
          dantegrieco11@gmail.com
          <ArrowRight
            size={17}
            className="text-muted-foreground group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </section>
    </main>
  );
}
