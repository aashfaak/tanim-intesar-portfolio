import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type PrevNextItem = { href: string; title: string } | null;

export function PrevNextNav({
  prev,
  next,
}: {
  prev: PrevNextItem;
  next: PrevNextItem;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="More posts"
      className="container-editorial py-10 border-t border-line grid grid-cols-2 gap-6"
    >
      <div>
        {prev && (
          <Link
            href={prev.href}
            className="group inline-flex flex-col gap-1 max-w-xs"
          >
            <span className="inline-flex items-center gap-2 text-xs text-muted">
              <ArrowLeft
                size={14}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
              Previous
            </span>
            <span className="text-sm text-ink font-medium leading-snug">
              {prev.title}
            </span>
          </Link>
        )}
      </div>
      <div className="text-right">
        {next && (
          <Link
            href={next.href}
            className="group inline-flex flex-col gap-1 items-end max-w-xs ml-auto"
          >
            <span className="inline-flex items-center gap-2 text-xs text-muted">
              Next
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
            <span className="text-sm text-ink font-medium leading-snug">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
