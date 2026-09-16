import Image from "next/image";
import Link from "next/link";
import type { TravelPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function TravelCard({
  post,
  size = "normal",
}: {
  post: TravelPost;
  size?: "large" | "normal";
}) {
  return (
    <Link href={`/travel/${post.slug}`} className="group block">
      <div
        className={cn(
          "relative overflow-hidden bg-surface",
          size === "large" ? "aspect-[16/10]" : "aspect-[4/3]"
        )}
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes={
            size === "large"
              ? "(min-width: 1024px) 60vw, 90vw"
              : "(min-width: 1024px) 25vw, 90vw"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-paper">
          <p className="text-xs opacity-90">{post.location}</p>
          <h3
            className={cn(
              "font-serif mt-1 leading-snug",
              size === "large" ? "text-2xl md:text-3xl" : "text-lg"
            )}
          >
            {post.title}
          </h3>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <time dateTime={post.date} className="text-xs text-muted">
          {formatDate(post.date)}
        </time>
        <span className="text-xs text-navy font-medium">Read →</span>
      </div>
    </Link>
  );
}
