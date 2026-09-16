import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-[110px_1fr] sm:grid-cols-[160px_1fr] gap-5 py-6 border-b border-line last:border-none"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="200px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
          <span>{post.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
        </div>
        <h3 className="mt-2 font-serif text-lg md:text-xl text-ink leading-snug">
          {post.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted leading-relaxed hidden sm:block">
          {post.excerpt}
        </p>
        <span className="link-underline mt-2 text-sm text-navy font-medium hidden sm:inline-flex">
          Read article →
        </span>
      </div>
    </Link>
  );
}
