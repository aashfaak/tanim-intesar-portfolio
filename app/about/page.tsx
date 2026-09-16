import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/data/site";
import { Currently } from "@/components/Currently";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About",
  description: `A little about ${site.name} — an IBA student writing about business, life, and ideas.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${site.name}`,
    description: `A little about ${site.name} — an IBA student writing about business, life, and ideas.`,
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="container-editorial pt-14 md:pt-20 pb-16">
        <p className="text-xs tracking-wide text-muted mb-6">About</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight max-w-2xl">
          A student, mostly still figuring it out — and writing it down along
          the way.
        </h1>
      </section>

      <section className="container-editorial pb-16 md:pb-24">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-start">
          <ScrollReveal className="relative aspect-[4/5] overflow-hidden bg-surface">
            <Image
              src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=1200&auto=format&fit=crop"
              alt="A quiet study corner with books and morning light"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="prose-article">
            <p>
              I&apos;m currently studying business and management at IBA,
              somewhere in the stretch of a degree where the big questions —
              what I want to do, what I actually believe about work and
              ambition — have started to feel less abstract and more urgent.
            </p>
            <p>
              This site started as a way to keep a record of that stretch.
              Not a highlight reel, and not a resume — just an ongoing,
              honest account of what I&apos;m studying, where I&apos;ve
              traveled, what I&apos;m reading, and the small daily things that
              don&apos;t usually make it into any of that.
            </p>
            <h2>What I care about</h2>
            <p>
              I&apos;m interested in the practical side of business — how
              decisions actually get made under uncertainty — as much as the
              theory of it. Outside coursework, I read more fiction than most
              of my classmates, and I&apos;m slowly building the habit of
              writing things down before I&apos;ve fully worked out what I
              think about them.
            </p>
            <h2>What I&apos;m learning right now</h2>
            <p>
              This term, that&apos;s digital strategy and a genuine attempt
              at consistency — showing up to write, even when there&apos;s
              nothing dramatic to report. Most entries here are ordinary on
              purpose.
            </p>
            <h2>Where this is headed</h2>
            <p>
              I don&apos;t have a five-year plan I fully believe in yet. What
              I do have is a habit of documenting the in-between — university,
              travel, ideas, books — and a hope that it adds up to something
              worth looking back on.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Currently />
    </>
  );
}
