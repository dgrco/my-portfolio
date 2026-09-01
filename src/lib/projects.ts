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
  /*
   * Path under /public to a screenshot. Optional: rows and writeups render
   * without it, so covers can be added one project at a time.
   */
  cover?: string;
  coverAlt?: string;
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

/*
 * Home page selection. `featured` leads regardless of date, so the project
 * worth reading first stays first once something newer but smaller lands.
 */
export async function getNotableProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects
    .filter((p) => p.notable)
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/*
 * Split the ISO string by hand rather than going through Date. `new
 * Date("2026-08-20")` is parsed as UTC midnight, so formatting it in a
 * timezone behind UTC renders the previous day. These are static build-time
 * strings, so there is nothing to gain from a real date object.
 */
export function formatDate(iso: string): string {
  const [year, month] = iso.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

