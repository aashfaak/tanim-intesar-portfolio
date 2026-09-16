"use client";

import Link from "next/link";
import { Trash2, Pencil } from "lucide-react";

type AdminListItem = {
  id: string;
  title: string;
  meta: string;
  editHref: string;
};

export function AdminList({
  items,
  onDelete,
  emptyLabel = "Nothing here yet.",
}: {
  items: AdminListItem[];
  onDelete: (id: string) => void;
  emptyLabel?: string;
}) {
  if (items.length === 0) {
    return <p className="text-muted py-10">{emptyLabel}</p>;
  }

  return (
    <ul className="divide-y divide-line border-t border-b border-line">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between gap-4 py-4"
        >
          <div className="min-w-0">
            <p className="text-ink font-medium truncate">{item.title}</p>
            <p className="text-xs text-muted mt-0.5">{item.meta}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={item.editHref}
              className="inline-flex items-center gap-1.5 text-sm text-ink/70 hover:text-ink border border-ink/25 px-3 py-1.5"
            >
              <Pencil size={14} aria-hidden="true" />
              Edit
            </Link>
            <button
              type="button"
              onClick={() => {
                if (confirm(`Delete "${item.title}"? This can't be undone.`)) {
                  onDelete(item.id);
                }
              }}
              className="inline-flex items-center gap-1.5 text-sm text-red-700 hover:text-red-800 border border-red-700/30 px-3 py-1.5"
            >
              <Trash2 size={14} aria-hidden="true" />
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
