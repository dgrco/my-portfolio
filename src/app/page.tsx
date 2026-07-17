import { Separator } from "@/components/ui/separator";
import { getNotableProjects } from "@/lib/projects";
import { Mail, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";

const skills = [
  { category: "Languages", items: ["Golang", "C/C++", "TypeScript", "Rust", "Python"] },
  { category: "Infrastructure", items: ["Docker", "Linux", "Postgres", "Redis", "Nginx"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"] },
  { category: "Tools & Practices", items: ["Git", "CI/CD", "TDD", "REST APIs"] },
];

export default async function Home() {
  const projects = await getNotableProjects();
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-5 py-12 sm:py-20">

        {/* Hero */}
        <section className="pb-16 sm:pb-20">
          <div className="flex items-center gap-8 sm:gap-16">
            <div className="shrink-0">
              <Image
                src="/avatar.png"
                alt="Dante Grieco"
                width={200}
                height={200}
                className="rounded-full border border-border"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs tracking-widest text-muted-foreground uppercase font-medium mb-3">
                Software engineer
              </p>
              <h1 className="text-3xl sm:text-5xl font-medium tracking-tight mb-4 text-foreground">
                Dante Grieco
              </h1>
              <p className="text-[15px] sm:text-[16px] text-muted-foreground leading-relaxed max-w-xl mb-6">
                CS graduate building things that matter. Currently developing a
                scheduling SaaS from the ground up: product, engineering, and
                everything in between. I like systems that are fast, simple, and
                useful.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://github.com/dgrco"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-[14px] px-4 py-2 rounded-md border border-border hover:bg-muted transition-colors text-foreground"
                >
                  <GitHubIcon size={16} />
                  GitHub
                </Link>
                <Link
                  href="https://linkedin.com/in/dantegrieco"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-[14px] px-4 py-2 rounded-md border border-border hover:bg-muted transition-colors text-foreground"
                >
                  <LinkedInIcon size={16} />
                  LinkedIn
                </Link>
                <Link
                  href="mailto:dantegrieco11@gmail.com"
                  className="inline-flex items-center gap-2 text-[14px] px-4 py-2 rounded-md border border-border hover:bg-muted transition-colors text-foreground"
                >
                  <Mail size={16} />
                  Email
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Separator className="mb-10" />

        {/* Featured Projects */}
        <section className="pb-16 sm:pb-20">
          <div className="flex items-baseline justify-between mb-6">
            <p className="text-[12px] font-medium tracking-widest text-muted-foreground uppercase">
              Featured work
            </p>
            <Link
              href="/projects"
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              View all <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group rounded-lg border border-border p-5 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[15px] font-medium text-foreground group-hover:text-foreground/80 transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/60 shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105 transition-all duration-200 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Separator className="mb-10" />

        {/* Skills */}
        <section className="pb-12">
          <p className="text-[12px] font-medium tracking-widest text-muted-foreground uppercase mb-6">
            Skills
          </p>
          <div className="grid gap-8 sm:grid-cols-2">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="text-[13px] font-medium text-foreground mb-3">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-[13px] px-3 py-1 rounded-md border border-border text-foreground/80 hover:border-foreground/30 hover:scale-105 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
