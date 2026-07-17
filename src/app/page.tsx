import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getNotableProjects } from "@/lib/projects";
import { Mail, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";

const stack = [
  "Golang",
  "C/C++",
  "Docker",
  "TypeScript",
  "Postgres",
  "React",
  "Next.js",
  "Linux",
  "Git",
];

const statusStyles: Record<string, string> = {
  "In progress": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  Complete: "bg-muted text-muted-foreground",
};

export default async function Home() {
  const projects = await getNotableProjects();
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-5 py-12 sm:py-16">

        {/* Hero */}
        <section className="pb-10">
          {/* Top row: eyebrow + image (mobile only) + name */}
          <p className="text-center sm:text-start text-xs tracking-widest text-muted-foreground uppercase mb-3">
            Software engineer
          </p>

          <div className="flex items-start justify-between gap-6">
            {/* Left: name + bio + links */}
            <div className="flex-1 min-w-0">
              <h1 className="text-center sm:text-start text-3xl sm:text-4xl font-medium tracking-tight mb-4">
                Dante Grieco
              </h1>

              {/* Image — between name and bio on mobile, hidden here on desktop */}
              <div className="sm:hidden mb-4">
                <Image
                  src="/avatar.png"
                  alt="Dante Grieco"
                  width={140}
                  height={140}
                  className="mx-auto sm:mx-0 rounded-full border border-border"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>

              <p className="text-[16px] text-muted-foreground leading-relaxed max-w-lg">
                CS graduate building things that matter. Currently developing a
                scheduling SaaS from the ground up: product, engineering, and
                everything in between. I like systems that are fast, simple, and
                useful.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                <Link
                  href="https://github.com/dgrco"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-[14px] px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors"
                >
                  <GitHubIcon size={14} />
                  GitHub
                </Link>
                <Link
                  href="https://linkedin.com/in/dantegrieco"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-[13px] px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors"
                >
                  <LinkedInIcon size={14} />
                  LinkedIn
                </Link>
                <Link
                  href="mailto:dantegrieco11@gmail.com"
                  className="inline-flex items-center gap-1.5 text-[13px] px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors"
                >
                  <Mail size={14} />
                  Email
                </Link>
              </div>
            </div>
            <div className="hidden sm:block shrink-0 mt-1">
              <Image
                src="/avatar.png"
                alt="Dante Grieco"
                width={180}
                height={180}
                className="rounded-full border border-border"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>
        </section>

        <Separator />

        {/* Notable Projects */}
        <section className="py-10">
          <div className="flex items-baseline justify-between mb-5">
            <p className="text-[12px] font-medium tracking-widest text-muted-foreground uppercase">
              Notable projects
            </p>
            <Link
              href="/projects"
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              All projects <ArrowRight size={13} />
            </Link>
          </div>

          <div className="flex flex-col">
            {projects.map((project, i) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`flex items-baseline justify-between gap-4 py-6 ${i < projects.length - 1 ? 'border-b' : ''} border-border/60 hover:bg-muted/40 transition-colors`}
              >
                <div className="flex items-baseline gap-2.5 min-w-0">
                  {project.featured && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mb-0.5" />
                  )}
                  <span className={`text-[14px] font-medium shrink-0 ${!project.featured ? "ml-2" : ""}`}>
                    {project.title}
                  </span>
                  <span className="text-[14px] text-muted-foreground truncate hidden sm:block">
                    {project.shortDescription}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {project.status === "In progress" ? (
                    <span className="text-[12px] font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                      In progress
                    </span>
                  ) : (
                    <span className="text-[12px] px-2 py-0.5 text-muted-foreground">
                      Complete
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Separator />

        {/* Tech stack */}
        <section className="py-10">
          <p className="text-[12px] font-medium tracking-widest text-muted-foreground uppercase mb-5">
            Tech
          </p>
          <div className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <span
                key={item}
                className="text-[13px] text-muted-foreground px-3 py-1.5 rounded-md border border-border bg-card"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <Separator />

        {/* Contact */}
        <section className="py-10">
          <p className="text-[12px] font-medium tracking-widest text-muted-foreground uppercase mb-5">
            Contact
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="mailto:dantegrieco11@gmail.com"
              className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors group"
            >
              <Mail size={17} />
              <div>
                <p className="text-[14px]">dantegrieco11@gmail.com</p>
                <p className="text-[12px] text-muted-foreground">
                  Best way to reach me
                </p>
              </div>
            </Link>
            <Link
              href="https://linkedin.com/in/dantegrieco"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <LinkedInIcon size={17} />
              <div>
                <p className="text-[14px]">linkedin.com/in/dantegrieco</p>
                <p className="text-[12px] text-muted-foreground">LinkedIn</p>
              </div>
            </Link>
            <Link
              href="https://github.com/dgrco"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <GitHubIcon size={17} />
              <div>
                <p className="text-[14px]">github.com/dgrco</p>
                <p className="text-[12px] text-muted-foreground">GitHub</p>
              </div>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
