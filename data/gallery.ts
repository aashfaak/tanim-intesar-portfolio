export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: "University" | "Travel" | "Nature" | "Cafés" | "Books" | "City Life" | "Friends";
  span?: "tall" | "wide" | "normal";
};

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
    alt: "Campus corridor with morning light",
    category: "University",
    span: "tall",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
    alt: "A cup of tea beside an open notebook",
    category: "Cafés",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
    alt: "Empty beach at low tide",
    category: "Travel",
    span: "wide",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop",
    alt: "Stack of well-worn books",
    category: "Books",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1200&auto=format&fit=crop",
    alt: "Green tea garden hillside",
    category: "Nature",
    span: "tall",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop",
    alt: "Foggy morning over the city",
    category: "City Life",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
    alt: "Library reading room at dusk",
    category: "University",
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
    alt: "Friends walking together on campus",
    category: "Friends",
    span: "wide",
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    alt: "Fishing boat on the shoreline",
    category: "Travel",
  },
];
