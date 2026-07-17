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
      <div className="max-w-2xl mx-auto px-5 py-12 sm:py-20">

        {/* Hero */}
        <section className="pb-16 sm:pb-20">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-16 animate-fade-in-up animate-stagger-1">
            <div className="flex shrink-0">
              <Image
                src="/avatar.png"
                alt="Dante Grieco"
                width={200}
                height={200}
                className="w-[110px] h-[110px] sm:w-[200px] sm:h-[200px] rounded-full border border-border"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <p className="text-xs tracking-widest text-muted-foreground uppercase font-medium mb-3 animate-fade-in-up animate-stagger-2">
                Software engineer
              </p>
              <h1 className="text-2xl sm:text-5xl font-medium tracking-tight mb-4 text-foreground animate-fade-in-up animate-stagger-3">
                Dante Grieco
              </h1>
              <p className="text-[14px] sm:text-[17px] text-muted-foreground leading-relaxed max-w-xl mb-6 animate-fade-in-up animate-stagger-4">
                CS graduate building things that matter. Currently developing a
                scheduling SaaS from the ground up: product, engineering, and
                everything in between. I like systems that are fast, simple, and
                useful.
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 animate-fade-in-up animate-stagger-5">
                <Link
                  href="https://github.com/dgrco"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-[14px] sm:text-[15px] px-4 py-2 rounded-md border border-border hover:bg-muted transition-colors text-foreground"
                >
                  <GitHubIcon size={16} />
                  GitHub
                </Link>
                <Link
                  href="https://linkedin.com/in/dantegrieco"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-[14px] sm:text-[15px] px-4 py-2 rounded-md border border-border hover:bg-muted transition-colors text-foreground"
                >
                  <LinkedInIcon size={16} />
                  LinkedIn
                </Link>
                <Link
                  href="mailto:dantegrieco11@gmail.com"
                  className="inline-flex items-center gap-2 text-[14px] sm:text-[15px] px-4 py-2 rounded-md border border-border hover:bg-muted transition-colors text-foreground"
                >
                  <Mail size={16} />
                  Email
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Separator className="mb-10 animate-fade-in animate-stagger-5" />

        {/* Featured Projects */}
        <section className="pb-16 sm:pb-20">
          <div className="flex items-baseline justify-between mb-6 animate-fade-in-up animate-stagger-6">
            <p className="text-[12px] font-medium tracking-widest text-muted-foreground uppercase">
              Featured work
            </p>
            <Link
              href="/projects"
              className="text-[14px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              View all <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group rounded-lg border border-border p-5 hover:bg-muted/40 transition-colors animate-fade-in-up"
                style={{ animationDelay: `${0.1 + index * 0.08}s` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[16px] font-bold text-foreground group-hover:text-foreground/80 transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/60 shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[12px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Separator className="mb-10 animate-fade-in animate-stagger-6" />

        {/* Skills */}
        <section className="pb-12">
          <p className="text-[12px] font-medium tracking-widest text-muted-foreground uppercase mb-6 animate-fade-in-up animate-stagger-7">
            Skills
          </p>
          <div className="grid gap-8 sm:grid-cols-2">
            {skills.map((group, groupIndex) => (
              <div key={group.category} className="animate-fade-in-up" style={{ animationDelay: `${0.15 + groupIndex * 0.08}s` }}>
                <h3 className="text-[14px] font-medium text-foreground mb-3">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-[14px] px-3 py-1 rounded-md border border-border text-foreground/80 hover:border-foreground/30 hover:scale-105 transition-all duration-200 cursor-default"
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
