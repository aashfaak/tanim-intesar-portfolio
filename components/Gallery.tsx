"use client";

import { useEffect, useState } from "react";
import { getAllGalleryDocs } from "@/lib/collections";
import type { GalleryImage } from "@/lib/types";
import { GalleryItem } from "@/components/GalleryItem";
import { Lightbox } from "@/components/Lightbox";
import { SectionHeading } from "@/components/SectionHeading";

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<GalleryImage | null>(null);

  useEffect(() => {
    getAllGalleryDocs<GalleryImage>().then((data) => {
      setImages(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="container-editorial py-16 md:py-24 border-t border-line">
      <SectionHeading
        title="Recent moments"
        subtitle="University, travel, and the everyday things in between."
      />

      {loading ? (
        <p className="mt-10 text-muted">Loading…</p>
      ) : images.length === 0 ? (
        <p className="mt-10 text-muted">
          No photos yet — add some from the admin dashboard.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 auto-rows-[180px] sm:auto-rows-[220px] gap-3 sm:gap-4">
          {images.map((image) => (
            <GalleryItem
              key={image.id}
              image={image}
              onSelect={() => setActive(image)}
            />
          ))}
        </div>
      )}

      <Lightbox image={active} onClose={() => setActive(null)} />
    </section>
  );
}
