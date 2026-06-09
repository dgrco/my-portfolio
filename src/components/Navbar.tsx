"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render theme toggle after mount
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">

        <Link
          href="/"
          className="text-[14px] font-medium tracking-tight hover:text-muted-foreground transition-colors"
        >
          dgrco.dev
        </Link>

        <div className="flex items-center gap-1">

          {/* Nav links */}
          <nav className="flex items-center mr-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Dark mode toggle */}
          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="w-8 h-8 flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle dark mode"
          >
            {mounted ? (
              resolvedTheme === "dark" ? (
                <Sun size={14} />
              ) : (
                <Moon size={14} />
              )
            ) : (
              <span className="w-[14px] h-[14px]" />
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
