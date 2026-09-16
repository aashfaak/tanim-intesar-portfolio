"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { AboutPreview } from "@/components/AboutPreview";
import { SectionHeading } from "@/components/SectionHeading";
import { JournalCard } from "@/components/JournalCard";
import { TravelCard } from "@/components/TravelCard";
import { BlogCard } from "@/components/BlogCard";
import { Currently } from "@/components/Currently";
import { Gallery } from "@/components/Gallery";
import { Newsletter } from "@/components/Newsletter";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getAllDocs } from "@/lib/collections";
import type { JournalPost, TravelPost, BlogPost } from "@/lib/types";

export default function HomePage() {
  const [journalPosts, setJournalPosts] = useState<JournalPost[]>([]);
  const [travelPosts, setTravelPosts] = useState<TravelPost[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [journal, travel, blog] = await Promise.all([
        getAllDocs<JournalPost>("journal"),
        getAllDocs<TravelPost>("travel"),
        getAllDocs<BlogPost>("blog"),
      ]);
      setJournalPosts(journal);
      setTravelPosts(travel);
      setBlogPosts(blog);
      setLoading(false);
    }
    load();
  }, []);

  const latestJournal = journalPosts.slice(0, 3);
  const featuredTravel = travelPosts.find((t) => t.featured) ?? travelPosts[0];
  const supportingTravel = featuredTravel
    ? travelPosts.filter((t) => t.id !== featuredTravel.id).slice(0, 3)
    : [];
  const latestBlog = blogPosts.slice(0, 4);

  return (
    <>
      <Hero />
      <AboutPreview />

      <section className="container-editorial py-16 md:py-24 border-t border-line">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <SectionHeading
            title="From the journal"
            subtitle="Small moments, observations, and things I'm learning along the way."
          />
          <Button href="/journal" variant="ghost" className="hidden sm:inline-flex">
            View all entries
          </Button>
        </div>

        {loading ? (
          <p className="text-muted">Loading…</p>
        ) : latestJournal.length === 0 ? (
          <p className="text-muted">
            No journal entries yet — add the first one from the admin dashboard.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {latestJournal.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.08}>
                <JournalCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        )}
        <Button href="/journal" variant="ghost" className="mt-10 sm:hidden">
          View all journal entries
        </Button>
      </section>

      <section className="container-editorial py-16 md:py-24 border-t border-line">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <SectionHeading
            title="Places I've been"
            subtitle="Stories, photographs, and memories from the road."
          />
          <Button href="/travel" variant="ghost" className="hidden sm:inline-flex">
            Explore all travels
          </Button>
        </div>

        {loading ? (
          <p className="text-muted">Loading…</p>
        ) : !featuredTravel ? (
          <p className="text-muted">
            No travel stories yet — add the first one from the admin dashboard.
          </p>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            <ScrollReveal>
              <TravelCard post={featuredTravel} size="large" />
            </ScrollReveal>
            <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-8">
              {supportingTravel.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.08}>
                  <TravelCard post={post} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
        <Button href="/travel" variant="ghost" className="mt-10 sm:hidden">
          Explore all travels
        </Button>
      </section>

      <section className="container-editorial py-16 md:py-24 border-t border-line">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
          <SectionHeading
            title="Things I'm thinking about"
            subtitle="Ideas, questions, and lessons that stay with me."
          />
          <Button href="/blog" variant="ghost" className="hidden sm:inline-flex">
            Read all articles
          </Button>
        </div>

        {loading ? (
          <p className="text-muted">Loading…</p>
        ) : latestBlog.length === 0 ? (
          <p className="text-muted">
            No articles yet — write the first one from the admin dashboard.
          </p>
        ) : (
          <div>
            {latestBlog.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
        <Button href="/blog" variant="ghost" className="mt-6 sm:hidden">
          Read all articles
        </Button>
      </section>

      <Currently />
      <Gallery />
      <Newsletter />
    </>
  );
}
