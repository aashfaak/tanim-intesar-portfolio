import type { Metadata } from "next";
import { BlogClient } from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ideas, questions, and lessons that stay with me — on business, student life, technology, and more.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="pt-14 md:pt-20">
      <section className="container-editorial pb-10">
        <p className="text-xs tracking-wide text-muted mb-4">Blog</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ink leading-tight max-w-xl">
          Things I&apos;m thinking about
        </h1>
        <p className="mt-4 text-muted max-w-md leading-relaxed">
          Ideas, questions, and lessons that stay with me.
        </p>
      </section>
      <BlogClient />
    </div>
  );
}
