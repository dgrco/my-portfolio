import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 mb-5">
      <h2 className="label">{title}</h2>
      {action && (
        <Link
          href={action.href}
          className="group meta inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          {action.label}
          <ArrowRight
            size={14}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      )}
    </div>
  );
}
