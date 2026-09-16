import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

type RelatedItem = {
  href: string;
  title: string;
  image: string;
  date: string;
  meta: string;
};

export function RelatedPosts({
  heading,
  items,
}: {
  heading: string;
  items: RelatedItem[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="border-t border-line">
      <div className="container-editorial py-14 md:py-20">
        <h2 className="font-serif text-2xl md:text-3xl text-ink mb-8">
          {heading}
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 640px) 30vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-3">
                <p className="text-xs text-muted">{item.meta}</p>
                <h3 className="mt-1 font-serif text-lg text-ink leading-snug">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
