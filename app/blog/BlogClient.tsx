"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getAllDocs } from "@/lib/collections";
import type { BlogPost } from "@/lib/types";
import { blogCategories } from "@/lib/types";
import { BlogCard } from "@/components/BlogCard";
import { FeaturedPost } from "@/components/FeaturedPost";
import { cn } from "@/lib/utils";

const categories = ["All", ...blogCategories] as const;

export function BlogClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAllDocs<BlogPost>("blog").then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const featured = posts.find((p) => p.featured) ?? posts[0];

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      if (featured && post.id === featured.id) return false;
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        query.trim() === "" ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [posts, activeCategory, query, featured]);

  if (loading) {
    return (
      <section className="container-editorial pb-24">
        <p className="text-muted">Loading…</p>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="container-editorial pb-24">
        <p className="text-muted">
          No articles yet — write the first one from the admin dashboard.
        </p>
      </section>
    );
  }

  return (
    <>
      {featured && (
        <section className="container-editorial pb-16">
          <FeaturedPost
            href={`/blog/${featured.slug}`}
            image={featured.image}
            category={featured.category}
            date={featured.date}
            title={featured.title}
            excerpt={featured.excerpt}
            meta={featured.readingTime}
          />
        </section>
      )}

      <section className="container-editorial pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-line py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "text-sm px-3 py-1.5 transition-colors whitespace-nowrap",
                  activeCategory === cat
                    ? "bg-navy text-paper"
                    : "text-ink/70 hover:text-ink"
                )}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="relative w-full sm:w-64">
            <span className="sr-only">Search articles</span>
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="w-full bg-transparent border border-ink/20 pl-9 pr-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
            />
          </label>
        </div>
      </section>

      <section className="container-editorial pb-24">
        {filtered.length === 0 ? (
          <p className="text-muted py-12 text-center">
            No articles match that search yet.
          </p>
        ) : (
          <div>
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}