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
              src="/about.jpeg"
              alt="A quiet study corner with books and morning light"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="prose-article">
            <p>
              I'm Tanim Intesar, a student at the Army Institute of Business Administration-AIBA, Sylhet, Bangladesh
               driven by curiosity, creativity, and a passion for continuous growth.

              I enjoy exploring the intersection of business, innovation, and technology,
               turning ideas into meaningful possibilities. Always learning, building, and 
               looking for new ways to make an impact.
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
              I'm interested in the practical side of business—how decisions are made, how people think, and how ideas become something useful. I enjoy looking beyond theories to understand the real-world challenges behind them.

              I'm also drawn to creativity, innovation, and the small details that make a project or an experience meaningful. For me, growth is not only about achieving something big, but also about staying curious and improving consistently.
            </p>
            <h2>What I&apos;m learning right now</h2>
            <p>
              Right now, I'm focused on strengthening my understanding of business, exploring new perspectives, and developing skills that connect academic knowledge with practical experience.

              I'm learning to approach problems with more clarity, communicate ideas more effectively, and stay consistent even when progress feels gradual. Every new experience is an opportunity to understand something a little better.
            </p>
            <h2>Where this is headed</h2>
            <p>
             I don't have every step of the future mapped out—and I'm comfortable with that. What I do have is a willingness to explore, learn, and take on meaningful challenges.

              Whether it's through business, innovation, or future projects, I hope to keep building a path that reflects my interests, values, and curiosity. This portfolio is a small part of that journey, and I'm looking forward to seeing where it leads.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Currently />
    </>
  );
}
