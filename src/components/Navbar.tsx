"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rule bg-background/85 backdrop-blur-md">
      <div className="measure h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-[18px] font-medium tracking-[-0.015em] text-foreground hover:text-muted-foreground transition-colors"
        >
          Dante Grieco
        </Link>

        <div className="flex items-center gap-6 sm:gap-7">
          <nav className="flex items-center gap-6 sm:gap-7">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-[17px] transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="w-8 h-8 -mr-1 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {/* CSS picks the icon so no mounted flag is needed for hydration. */}
            <Moon size={16} className="dark:hidden" />
            <Sun size={16} className="hidden dark:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
