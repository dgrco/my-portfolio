"use client";

import { usePathname } from "next/navigation";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <main className="w-full max-w-2xl mx-auto px-5 py-12 sm:py-20 overflow-x-hidden">
      <div key={pathname} className="animate-fade-in-up">
        {children}
      </div>
    </main>
  )
}
