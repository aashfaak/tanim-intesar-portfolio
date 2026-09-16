import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

type FeaturedPostProps = {
  href: string;
  image: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  meta?: string;
};

export function FeaturedPost({
  href,
  image,
  category,
  date,
  title,
  excerpt,
  meta,
}: FeaturedPostProps) {
  return (
    <Link href={href} className="group grid md:grid-cols-2 gap-8 items-center">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface order-2 md:order-1">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 768px) 50vw, 90vw"
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="order-1 md:order-2">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
          <span className="text-navy font-medium">Featured</span>
          <span aria-hidden="true">·</span>
          <span>{category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={date}>{formatDate(date)}</time>
          {meta && (
            <>
              <span aria-hidden="true">·</span>
              <span>{meta}</span>
            </>
          )}
        </div>
        <h3 className="mt-3 font-serif text-2xl md:text-3xl text-ink leading-snug">
          {title}
        </h3>
        <p className="mt-3 text-muted leading-relaxed max-w-md">{excerpt}</p>
        <span className="link-underline mt-4 text-sm text-navy font-medium">
          Read the story →
        </span>
      </div>
    </Link>
  );
}
