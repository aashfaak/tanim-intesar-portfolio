import type { Metadata } from "next";
import { JournalClient } from "./JournalClient";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Small moments, observations, and things I'm learning along the way — a running journal from university and beyond.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <div className="pt-14 md:pt-20">
      <section className="container-editorial pb-10">
        <p className="text-xs tracking-wide text-muted mb-4">Journal</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight max-w-xl">
          Notes from the everyday
        </h1>
        <p className="mt-4 text-muted max-w-md leading-relaxed">
          Small moments, observations, and things I&apos;m learning along the
          way.
        </p>
      </section>
      <JournalClient />
    </div>
  );
}
