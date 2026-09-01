import { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import { ProjectList } from "@/components/ProjectList";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built, and how they work.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <header className="mb-10 sm:mb-12">
        <p className="label mb-3.5 animate-fade-in-up animate-stagger-1">Work</p>
        <h1 className="text-[42px] sm:text-[56px] font-medium tracking-[-0.025em] leading-[1.05] mb-5 text-foreground animate-fade-in-up animate-stagger-2">
          Projects
        </h1>
        <p className="text-[19px] sm:text-[20px] text-foreground/75 leading-[1.6] animate-fade-in-up animate-stagger-3">
          Everything here has a writeup covering how it is put together and what
          I got wrong on the way. Pick one.
        </p>
      </header>

      <ProjectList projects={projects} variant="full" />
    </>
  );
}
