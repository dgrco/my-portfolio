import fs from "fs";
import path from "path";

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  tags: string[];
  status: "Complete" | "In progress";
  featured: boolean; // standout project
  notable: boolean;
  date: string; // ISO date (YYYY-MM-DD) of most recent work, used for ordering
  github?: string;
  live?: string;
};

export async function getProjects(): Promise<Project[]> {
  const projectsDir = path.join(process.cwd(), "src/app/projects");

  const slugs = fs
    .readdirSync(projectsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await import(`@/app/projects/${slug}/page.mdx`);
      return { slug, ...metadata } as Project;
    })
  );

  return projects.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getNotableProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.notable);
}
