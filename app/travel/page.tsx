"use client";

import { useEffect, useState } from "react";
import { getAllDocs } from "@/lib/collections";
import type { TravelPost } from "@/lib/types";
import { TravelCard } from "@/components/TravelCard";

export default function TravelPage() {
  const [posts, setPosts] = useState<TravelPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllDocs<TravelPost>("travel").then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const [featured, ...rest] = posts;

  return (
    <div className="pt-14 md:pt-20">
      <section className="container-editorial pb-10">
        <p className="text-xs tracking-wide text-muted mb-4">Travel</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight max-w-xl">
          Places I&apos;ve been
        </h1>
        <p className="mt-4 text-muted max-w-md leading-relaxed">
          Stories, photographs, and memories from the road.
        </p>
      </section>

      {loading ? (
        <section className="container-editorial pb-24">
          <p className="text-muted">Loading…</p>
        </section>
      ) : posts.length === 0 ? (
        <section className="container-editorial pb-24">
          <p className="text-muted">
            No travel stories yet — add the first one from the admin dashboard.
          </p>
        </section>
      ) : (
        <>
          {featured && (
            <section className="container-editorial pb-12">
              <TravelCard post={featured} size="large" />
            </section>
          )}

          <section className="container-editorial pb-24">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <TravelCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}