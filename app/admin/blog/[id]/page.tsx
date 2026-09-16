"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getDocById } from "@/lib/collections";
import type { BlogPost } from "@/lib/types";
import { BlogForm } from "@/components/admin/BlogForm";

export default function EditBlogPage() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    getDocById<BlogPost>("blog", params.id).then(setPost);
  }, [params.id]);

  if (post === undefined) {
    return <p className="text-muted">Loading…</p>;
  }

  if (post === null) {
    return <p className="text-muted">That article couldn&apos;t be found.</p>;
  }

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink mb-8">Edit blog article</h1>
      <BlogForm initial={post} postId={post.id} />
    </div>
  );
}
