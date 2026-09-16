export type JournalPost = {
  id: string;
  slug: string;
  title: string;
  category: "Daily Life" | "University" | "Thoughts";
  date: string;
  excerpt: string;
  image: string;
  readingTime: string;
  featured?: boolean;
  content: string[];
};

export type TravelImage = { src: string; caption: string };

export type TravelPost = {
  id: string;
  slug: string;
  title: string;
  location: string;
  date: string;
  description: string;
  coverImage: string;
  images: TravelImage[];
  content: string[];
  featured?: boolean;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category:
    | "Business"
    | "Student Life"
    | "Technology"
    | "Society"
    | "Personal Growth"
    | "Books & Ideas";
  date: string;
  excerpt: string;
  image: string;
  readingTime: string;
  featured?: boolean;
  content: string[];
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category:
    | "University"
    | "Travel"
    | "Nature"
    | "Cafés"
    | "Books"
    | "City Life"
    | "Friends";
  span?: "tall" | "wide" | "normal";
};

export const journalCategories = ["Daily Life", "University", "Thoughts"] as const;
export const blogCategories = [
  "Business",
  "Student Life",
  "Technology",
  "Society",
  "Personal Growth",
  "Books & Ideas",
] as const;
export const galleryCategories = [
  "University",
  "Travel",
  "Nature",
  "Cafés",
  "Books",
  "City Life",
  "Friends",
] as const;
