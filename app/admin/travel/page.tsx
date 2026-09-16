"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllDocs, deleteDocById } from "@/lib/collections";
import type { TravelPost } from "@/lib/types";
import { AdminList } from "@/components/admin/AdminList";
import { formatDate } from "@/lib/utils";

export default function AdminTravelPage() {
  const [posts, setPosts] = useState<TravelPost[] | null>(null);

  async function load() {
    const data = await getAllDocs<TravelPost>("travel");
    setPosts(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    await deleteDocById("travel", id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="font-serif text-3xl text-ink">Travel stories</h1>
        <Link
          href="/admin/travel/new"
          className="bg-navy text-paper px-4 py-2 text-sm hover:bg-navy-light transition-colors"
        >
          + New story
        </Link>
      </div>

      {posts === null ? (
        <p className="text-muted">Loading…</p>
      ) : (
        <AdminList
          items={posts.map((p) => ({
            id: p.id,
            title: p.title,
            meta: `${p.location} · ${formatDate(p.date)}`,
            editHref: `/admin/travel/${p.id}`,
          }))}
          onDelete={handleDelete}
          emptyLabel="No travel stories yet — add the first one."
        />
      )}
    </div>
  );
}
