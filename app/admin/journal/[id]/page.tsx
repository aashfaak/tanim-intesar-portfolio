"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDocById } from "@/lib/collections";
import type { JournalPost } from "@/lib/types";
import { JournalForm } from "@/components/admin/JournalForm";

export default function EditJournalPage() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<JournalPost | null | undefined>(undefined);

  useEffect(() => {
    getDocById<JournalPost>("journal", params.id).then(setPost);
  }, [params.id]);

  if (post === undefined) {
    return <p className="text-muted">Loading…</p>;
  }

  if (post === null) {
    return <p className="text-muted">That entry couldn&apos;t be found.</p>;
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink mb-8">Edit journal entry</h1>
      <JournalForm initial={post} postId={post.id} />
    </div>
  );
}
