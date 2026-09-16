"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getAllDocs } from "@/lib/collections";
import type { TravelPost } from "@/lib/types";
import { ArticleHeader } from "@/components/ArticleHeader";
import { RelatedPosts } from "@/components/RelatedPosts";
import { formatDate } from "@/lib/utils";

export default function TravelDetailPage() {
  const params = useParams<{ slug: string }>();
  const [posts, setPosts] = useState<TravelPost[] | null>(null);

  useEffect(() => {
    getAllDocs<TravelPost>("travel").then(setPosts);
  }, []);

  if (posts === null) {
    return <p className="container-editorial pt-20 text-muted">Loading…</p>;
  }

  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <p className="container-editorial pt-20 text-muted">
        That story couldn&apos;t be found.
      </p>
    );
  }

  const related = posts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <article>
      <ArticleHeader
        title={post.title}
        category={post.location}
        date={post.date}
        image={post.coverImage}
        imageAlt={post.title}
      />

      <div className="container-editorial py-12 md:py-16">
        <div className="prose-article mx-auto">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      {post.images.length > 0 && (
        <div className="container-editorial pb-16 md:pb-20">
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {post.images.map((img, i) => (
              <figure key={i} className={i === 0 ? "sm:col-span-2" : ""}>
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    sizes="(min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-sm text-muted">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      <RelatedPosts
        heading="More stories from the road"
        items={related.map((r) => ({
          href: `/travel/${r.slug}`,
          title: r.title,
          image: r.coverImage,
          date: r.date,
          meta: `${r.location} · ${formatDate(r.date)}`,
        }))}
      />
    </article>
  );
}
