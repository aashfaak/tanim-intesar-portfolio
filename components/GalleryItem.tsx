import Image from "next/image";
import type { GalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";

export function GalleryItem({
  image,
  onSelect,
}: {
  image: GalleryImage;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative block w-full overflow-hidden bg-surface text-left",
        image.span === "tall" && "row-span-2 aspect-[3/4]",
        image.span === "wide" && "sm:col-span-2 aspect-[16/9]",
        !image.span && "aspect-square"
      )}
      aria-label={`Open image: ${image.alt}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <span className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
    </button>
  );
}
