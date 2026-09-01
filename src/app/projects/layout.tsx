"use client";

import { usePathname } from "next/navigation";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="measure py-14 sm:py-20">
      {/* Keyed on pathname so the fade replays on navigation. */}
      <div key={pathname} className="animate-fade-in-up">
        {children}
      </div>
    </main>
  );
}
