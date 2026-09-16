"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-paper/90 backdrop-blur-sm border-b border-line"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav
        className="container-editorial flex items-center justify-between h-20"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="font-serif text-lg tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {site.shortName}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "link-underline text-sm text-ink/80 hover:text-ink transition-colors",
                pathname === item.href && "text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="link-underline text-sm font-medium text-navy"
          >
            Let&apos;s connect →
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-paper border-b border-line"
          >
            <div className="container-editorial flex flex-col py-4">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-3 text-base text-ink border-b border-line/60 last:border-none"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" className="pt-4 text-navy font-medium">
                Let&apos;s connect →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
