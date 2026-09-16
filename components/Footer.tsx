import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="container-editorial py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl text-ink">{site.name}</p>
          <p className="mt-2 text-sm text-muted">{site.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs uppercase tracking-wide text-muted mb-3">
            Navigate
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-sm text-ink/80 hover:text-ink">
                Home
              </Link>
            </li>
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink/80 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted mb-3">
            Elsewhere
          </p>
          <ul className="space-y-2">
            {site.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink/80 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
  <div className="container-editorial py-6 text-xs text-muted text-center">
    © {new Date().getFullYear()} Tanim Intesar. All rights reserved.
  </div>
</div>
    </footer>
  );
}
