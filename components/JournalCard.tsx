import Image from "next/image";
import Link from "next/link";
import type { JournalPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function JournalCard({ post }: { post: JournalPost }) {
  return (
    <Link href={`/journal/${post.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-3 text-xs text-muted">
          <span>{post.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h3 className="mt-2 font-serif text-xl text-ink leading-snug">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          {post.excerpt}
        </p>
        <span className="link-underline mt-3 text-sm text-navy font-medium">
          Read more →
        </span>
      </div>
    </Link>
  );
}
