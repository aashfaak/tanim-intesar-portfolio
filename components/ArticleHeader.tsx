import Image from "next/image";
import { formatDate } from "@/lib/utils";

type ArticleHeaderProps = {
  title: string;
  category?: string;
  date: string;
  readingTime?: string;
  image: string;
  imageAlt: string;
};

export function ArticleHeader({
  title,
  category,
  date,
  readingTime,
  image,
  imageAlt,
}: ArticleHeaderProps) {
  return (
    <header className="container-editorial pt-12 md:pt-16">
      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
          {category && (
            <>
              <span className="text-navy font-medium">{category}</span>
              <span aria-hidden="true">·</span>
            </>
          )}
          <time dateTime={date}>{formatDate(date)}</time>
          {readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{readingTime}</span>
            </>
          )}
        </div>
        <h1 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
          {title}
        </h1>
      </div>

      <div className="relative mt-10 aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-surface">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </header>
  );
}
