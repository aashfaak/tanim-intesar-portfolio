"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllDocs, getAllGalleryDocs } from "@/lib/collections";

export default function AdminOverviewPage() {
  const [counts, setCounts] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    async function load() {
      const [journal, travel, blog, gallery] = await Promise.all([
        getAllDocs("journal"),
        getAllDocs("travel"),
        getAllDocs("blog"),
        getAllGalleryDocs(),
      ]);
      setCounts({
        journal: journal.length,
        travel: travel.length,
        blog: blog.length,
        gallery: gallery.length,
      });
    }
    load();
  }, []);

  const cards = [
    { key: "journal", label: "Journal entries", href: "/admin/journal" },
    { key: "travel", label: "Travel stories", href: "/admin/travel" },
    { key: "blog", label: "Blog articles", href: "/admin/blog" },
    { key: "gallery", label: "Gallery photos", href: "/admin/gallery" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink mb-2">Overview</h1>
      <p className="text-muted mb-4">
        Create, edit, or delete anything on the public site from here.
      </p>
      <Link
        href="/admin/seed"
        className="link-underline text-sm text-navy font-medium"
      >
        First time here? Seed starter content →
      </Link>
      <div className="mt-10" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="block border border-line p-6 hover:border-ink/40 transition-colors"
          >
            <p className="text-3xl font-serif text-ink">
              {counts ? counts[card.key] : "—"}
            </p>
            <p className="mt-2 text-sm text-muted">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
