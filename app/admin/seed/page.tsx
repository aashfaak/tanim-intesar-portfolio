"use client";

import { useState } from "react";
import { createDoc } from "@/lib/collections";
import { journalPosts } from "@/data/journal";
import { travelPosts } from "@/data/travel";
import { blogPosts } from "@/data/blog";
import { galleryImages } from "@/data/gallery";

export default function SeedPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  async function handleSeed() {
    setRunning(true);
    setStatus("Seeding…");
    try {
      for (const { id, ...rest } of journalPosts) {
        await createDoc("journal", rest);
      }
      for (const { id, ...rest } of travelPosts) {
        await createDoc("travel", rest);
      }
      for (const { id, ...rest } of blogPosts) {
        await createDoc("blog", rest);
      }
      for (const { id, ...rest } of galleryImages) {
        await createDoc("gallery", rest);
      }
      setStatus(
        `Done — added ${journalPosts.length} journal entries, ${travelPosts.length} travel stories, ${blogPosts.length} blog articles, and ${galleryImages.length} gallery photos.`
      );
    } catch (err) {
      console.error(err);
      setStatus(
        "Something went wrong. Check the browser console and your Firestore rules/config."
      );
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-3xl text-ink mb-4">Seed starter content</h1>
      <p className="text-muted mb-2">
        This is a one-time helper: it copies the original placeholder journal
        entries, travel stories, blog articles, and gallery photos into your
        Firestore database, so you have something to look at and edit right
        away.
      </p>
      <p className="text-sm text-red-700 mb-8">
        Running this more than once will create duplicates — only use it on
        an empty database.
      </p>
      <button
        type="button"
        onClick={handleSeed}
        disabled={running}
        className="bg-navy text-paper px-5 py-2.5 text-sm hover:bg-navy-light transition-colors disabled:opacity-60"
      >
        {running ? "Seeding…" : "Seed starter content"}
      </button>
      {status && <p className="mt-4 text-sm text-ink">{status}</p>}
    </div>
  );
}
