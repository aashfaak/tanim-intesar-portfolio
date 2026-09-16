"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllDocs, deleteDocById } from "@/lib/collections";
import type { JournalPost } from "@/lib/types";
import { AdminList } from "@/components/admin/AdminList";
import { formatDate } from "@/lib/utils";

export default function AdminJournalPage() {
  const [posts, setPosts] = useState<JournalPost[] | null>(null);

  async function load() {
    const data = await getAllDocs<JournalPost>("journal");
    setPosts(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    await deleteDocById("journal", id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="font-serif text-3xl text-ink">Journal entries</h1>
        <Link
          href="/admin/journal/new"
          className="bg-navy text-paper px-4 py-2 text-sm hover:bg-navy-light transition-colors"
        >
          + New entry
        </Link>
      </div>

      {posts === null ? (
        <p className="text-muted">Loading…</p>
      ) : (
        <AdminList
          items={posts.map((p) => ({
            id: p.id,
            title: p.title,
            meta: `${p.category} · ${formatDate(p.date)}`,
            editHref: `/admin/journal/${p.id}`,
          }))}
          onDelete={handleDelete}
          emptyLabel="No journal entries yet — create the first one."
        />
      )}
    </div>
  );
}
