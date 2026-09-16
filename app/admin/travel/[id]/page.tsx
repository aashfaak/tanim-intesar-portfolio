"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDocById } from "@/lib/collections";
import type { TravelPost } from "@/lib/types";
import { TravelForm } from "@/components/admin/TravelForm";

export default function EditTravelPage() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<TravelPost | null | undefined>(undefined);

  useEffect(() => {
    getDocById<TravelPost>("travel", params.id).then(setPost);
  }, [params.id]);

  if (post === undefined) {
    return <p className="text-muted">Loading…</p>;
  }

  if (post === null) {
    return <p className="text-muted">That story couldn&apos;t be found.</p>;
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink mb-8">Edit travel story</h1>
      <TravelForm initial={post} postId={post.id} />
    </div>
  );
}
