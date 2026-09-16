export type TravelPost = {
  id: string;
  slug: string;
  title: string;
  location: string;
  date: string;
  description: string;
  coverImage: string;
  images: { src: string; caption: string }[];
  content: string[];
  featured?: boolean;
};

export const travelPosts: TravelPost[] = [
  {
    id: "t1",
    slug: "cox-s-bazar-off-season",
    title: "Cox's Bazar, Off Season",
    location: "Cox's Bazar",
    date: "2026-05-20",
    description:
      "The world's longest beach, mostly empty, under a sky that couldn't decide on rain.",
    coverImage:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1800&auto=format&fit=crop",
    featured: true,
    images: [
      {
        src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1400&auto=format&fit=crop",
        caption: "Early tide, before the vendors set up for the day.",
      },
      {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop",
        caption: "A fishing boat pulled up past the waterline.",
      },
      {
        src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1400&auto=format&fit=crop",
        caption: "Grey light over the water, an hour before the rain finally arrived.",
      },
    ],
    content: [
      "We went in the off season on purpose — no crowds, cheaper rooms, and a beach long enough that you could walk for twenty minutes and not pass another person. The sky spent most of the trip deciding whether or not to rain, which turned out to be its own kind of beautiful.",
      "There's a version of Cox's Bazar in the brochures — bright, crowded, built for tourists in a hurry. The version we found was quieter: fishermen hauling in early catches, tea stalls with plastic chairs sinking slightly into the sand, and long stretches where the only sound was the tide.",
      "I didn't take as many photos as I expected to. Some of it felt better left unphotographed — just watched.",
    ],
  },
  {
    id: "t2",
    slug: "a-weekend-in-sylhet",
    title: "A Weekend in Sylhet",
    location: "Sylhet",
    date: "2026-04-11",
    description: "Tea gardens, waterfalls, and the kind of green that doesn't photograph accurately.",
    coverImage:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1800&auto=format&fit=crop",
    images: [
      {
        src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1400&auto=format&fit=crop",
        caption: "Rows of tea along the hillside, still wet from the morning.",
      },
      {
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1400&auto=format&fit=crop",
        caption: "The road up, half paved, half not.",
      },
    ],
    content: [
      "Sylhet is the kind of green that makes your phone camera look like it's lying to you — too saturated to be real, except it is real, that's just what the tea gardens look like in April.",
      "We spent most of the weekend not doing very much: walking between gardens, stopping for tea that had probably been picked within a mile of where we were drinking it, getting mildly lost on roads that weren't quite finished.",
      "I came back with fewer photos than I wanted and more than enough memory of the smell of wet leaves in the morning.",
    ],
  },
  {
    id: "t3",
    slug: "dhaka-in-winter",
    title: "Dhaka in Winter",
    location: "Dhaka",
    date: "2026-01-18",
    description: "The city softens for about six weeks a year. This was one of the good days.",
    coverImage:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1800&auto=format&fit=crop",
    images: [
      {
        src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1400&auto=format&fit=crop",
        caption: "Morning fog over the flyover, gone by ten.",
      },
    ],
    content: [
      "Dhaka in winter is a different city — the heat and noise dial down just enough that you notice things you'd otherwise walk past. Rooftop breakfasts. Fog that burns off by mid-morning. A short window where a jacket actually makes sense.",
      "I spent an afternoon just walking through Old Dhaka with no destination, which is either the best or worst way to see it, depending on your tolerance for getting lost.",
    ],
  },
  {
    id: "t4",
    slug: "chattogram-hill-tracts-day-trip",
    title: "A Day Trip Into the Hill Tracts",
    location: "Chattogram",
    date: "2025-12-02",
    description: "Winding roads, a lake that changes color by the hour, and not nearly enough time.",
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1800&auto=format&fit=crop",
    images: [
      {
        src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1400&auto=format&fit=crop",
        caption: "The lake, mid-afternoon, somewhere between green and blue.",
      },
    ],
    content: [
      "We had one day, which is never enough for the hill tracts, but it was enough to understand why people keep going back. The road climbs slowly enough that you don't notice the city disappearing behind you until it's completely gone.",
      "Already planning a longer trip back — this one felt like a preview.",
    ],
  },
];

export function getTravelPost(slug: string) {
  return travelPosts.find((post) => post.slug === slug);
}

export function getRelatedTravelPosts(current: TravelPost, count = 3) {
  return travelPosts.filter((post) => post.id !== current.id).slice(0, count);
}
