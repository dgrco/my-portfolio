# Portfolio

Static Next.js site. Project writeups are MDX; everything else is derived from them.

```
npm run dev      # local
npm run build    # static export into out/
```

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin so link previews resolve their image.

## Adding a project

Create `src/app/projects/<slug>/page.mdx`. The directory name becomes the URL
slug, and the exported `metadata` feeds the home page, the projects index, and
the page's own `<title>`.

```mdx
export const metadata = {
  title: "Name",
  shortDescription: "One line, used on the index and under the title",
  description: "A few sentences, used on the projects page",
  tags: ["Go", "Postgres"],
  status: "Complete",     // or "In progress"
  featured: false,        // at most one: marks the current focus
  notable: true,          // show on the home page
  date: "2026-08-20",     // most recent work, used for ordering
  github: "https://github.com/...",
  live: "https://...",
  cover: "/name-cover.png",          // optional, see below
  coverAlt: "What the screenshot shows",
}

<ProjectHeader metadata={metadata} />

Prose starts here.
```

`ProjectHeader`, `Figure`, and `ProjectTable` are registered globally in
`mdx-components.tsx`, so they need no import.

## Screenshots

A project's `cover` is its lead image. Drop the file in `public/` and set the
path in the metadata: it renders full width at the top of that project's row on
the home page and projects index, and above the prose on the writeup itself.
Covers are optional and independent, so they can be added one project at a
time. Aim for roughly 16:10 and at least 1600px wide.

On the writeup the cover opens full size in a modal (`CoverImage`), because a
dense UI screenshot is unreadable once scaled into a reading column. Save
covers at full capture resolution rather than downsampling them: the modal is
what makes that detail worth having, and flat screenshots barely cost anything
in PNG.

That hero is also the one image on the site allowed past the reading column, at
about 1.15x. List covers align to the text exactly. Measured against real sites,
media almost always matches the text column and only Linear's blog exceeds it,
so that is the ceiling.

For images inside the body of a writeup, use `Figure`. `width` and `height` are
the intrinsic size of the source and only set the aspect ratio.

```mdx
<Figure
  src="/quikslate-schedule.png"
  alt="The schedule grid with three shifts assigned"
  caption="The scheduling grid. Shifts drag between staff rows."
  width={2400}
  height={1500}
/>
```

## Layout

Everything sits in one centred column, `.measure` in `src/app/globals.css`
(40rem, about 68 characters at the body size). Navbar, page content and footer
all use it, so every left edge on every page lands on the same line.

Source Serif carries the whole site. Hierarchy comes from size, weight, case
and colour, not from swapping typeface: `.label` for small uppercase section
markers, `.meta` for dates and tag lines. JetBrains Mono is loaded only for
code, where a different letter shape actually helps.

`status: "Complete"` is never rendered. A finished writeup is the default, so
only `"In progress"` gets a label.
