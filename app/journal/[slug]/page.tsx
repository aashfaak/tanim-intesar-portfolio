"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAllDocs } from "@/lib/collections";
import type { JournalPost } from "@/lib/types";
import { ArticleHeader } from "@/components/ArticleHeader";
import { ArticleContent } from "@/components/ArticleContent";
import { RelatedPosts } from "@/components/RelatedPosts";
import { PrevNextNav } from "@/components/PrevNextNav";
import { formatDate } from "@/lib/utils";

export default function JournalDetailPage() {
  const params = useParams<{ slug: string }>();
  const [posts, setPosts] = useState<JournalPost[] | null>(null);

  useEffect(() => {
    getAllDocs<JournalPost>("journal").then(setPosts);
  }, []);

  if (posts === null) {
    return <p className="container-editorial pt-20 text-muted">Loading…</p>;
  }

  const index = posts.findIndex((p) => p.slug === params.slug);
  const post = posts[index];

  if (!post) {
    return (
      <p className="container-editorial pt-20 text-muted">
        That entry couldn&apos;t be found.
      </p>
    );
  }

  const prev = posts[index - 1];
  const next = posts[index + 1];
  const related = posts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3)
    .concat(posts.filter((p) => p.id !== post.id && p.category !== post.category))
    .slice(0, 3);

  return (
    <article>
      <ArticleHeader
        title={post.title}
        category={post.category}
        date={post.date}
        readingTime={post.readingTime}
        image={post.image}
        imageAlt={post.title}
      />
      <ArticleContent paragraphs={post.content} />
      <PrevNextNav
        prev={prev ? { href: `/journal/${prev.slug}`, title: prev.title } : null}
        next={next ? { href: `/journal/${next.slug}`, title: next.title } : null}
      />
      <RelatedPosts
        heading="More from the journal"
        items={related.map((r) => ({
          href: `/journal/${r.slug}`,
          title: r.title,
          image: r.image,
          date: r.date,
          meta: `${r.category} · ${formatDate(r.date)}`,
        }))}
      />
    </article>
  );
}
