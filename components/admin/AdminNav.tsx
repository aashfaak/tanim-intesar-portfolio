"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/journal", label: "Journal" },
  { href: "/admin/travel", label: "Travel" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/gallery", label: "Gallery" },
];

export function AdminNav() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/admin/login");
  }

  return (
    <header className="border-b border-line bg-surface">
      <div className="container-editorial flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-6">
          <span className="font-serif text-lg text-ink">Admin</span>
          <nav className="flex flex-wrap gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm px-3 py-1.5 transition-colors",
                  pathname === link.href
                    ? "bg-navy text-paper"
                    : "text-ink/70 hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user?.email && (
            <span className="text-xs text-muted hidden sm:inline">
              {user.email}
            </span>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-ink/70 hover:text-ink border border-ink/25 px-3 py-1.5"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
