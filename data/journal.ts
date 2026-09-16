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

export const journalPosts: JournalPost[] = [
  {
    id: "j1",
    slug: "a-slow-morning-before-class",
    title: "A Slow Morning Before Class",
    category: "Daily Life",
    date: "2026-08-14",
    excerpt:
      "Some mornings are for rushing. This one wasn't — just tea, an open notebook, and the campus waking up slowly around me.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1600&auto=format&fit=crop",
    readingTime: "3 min read",
    featured: true,
    content: [
      "There's a particular quiet that settles over campus before the first class of the day — before the rickshaws start competing for the same three feet of road, before the canteen fills with the smell of paratha and instant coffee. I've started showing up early just to sit in it.",
      "This morning I brought a notebook I haven't opened in weeks. Not to plan anything. Just to write down the ordinary things: the sound of the ceiling fan in the library annex, the two seniors arguing about a case study near the vending machine, the way the light comes in sideways through the corridor windows around eight.",
      "I used to think productivity meant filling every hour. Lately I think it means noticing the hours you're already in.",
      "By the time class started, I hadn't solved anything or planned anything ahead. But I felt, for the first time in a while, like I was actually there — not three tasks ahead of myself.",
    ],
  },
  {
    id: "j2",
    slug: "what-university-is-teaching-me",
    title: "What University Is Teaching Me",
    category: "University",
    date: "2026-08-02",
    excerpt:
      "Not the syllabus. The other curriculum — the one about patience, disagreement, and figuring out what you actually think.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop",
    readingTime: "4 min read",
    content: [
      "Two years into business school, the lessons I keep coming back to aren't the ones from the textbooks. They're the ones from group projects that fell apart, from professors who refused to give a straight answer, from classmates whose confidence made me question my own — and then, slowly, sharpen it.",
      "There's a specific kind of discomfort in disagreeing with someone smarter than you in a room full of your peers. University keeps putting me in that room. I'm starting to think that's the actual point.",
      "I don't know yet what I want to do with a business degree. But I'm learning how to sit with not knowing, which feels like its own kind of qualification.",
    ],
  },
  {
    id: "j3",
    slug: "things-i-noticed-this-week",
    title: "Things I Noticed This Week",
    category: "Thoughts",
    date: "2026-07-22",
    excerpt:
      "A short list of small observations — the kind that don't fit anywhere else but are worth keeping.",
    image:
      "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?q=80&w=1600&auto=format&fit=crop",
    readingTime: "2 min read",
    content: [
      "The tea stall outside the main gate has started keeping a jar of ginger candy by the register. Small, unasked-for kindness.",
      "I finished a book I'd been avoiding for months, and it wasn't nearly as difficult as the avoiding was.",
      "A professor said something in passing — 'most decisions are reversible, act like it' — that I've now written on three separate sticky notes.",
      "Rain on the walk back from the library is still, somehow, one of my favorite parts of any given week.",
    ],
  },
  {
    id: "j4",
    slug: "notes-from-a-group-project",
    title: "Notes From a Group Project That Almost Fell Apart",
    category: "University",
    date: "2026-07-10",
    excerpt:
      "It came together in the last 48 hours, the way these things always seem to. Here's what I'd do differently.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop",
    readingTime: "3 min read",
    content: [
      "Five people, one deck, and a deadline that felt closer every time someone checked their phone. We started strong and then drifted — everyone assuming someone else had the thread.",
      "What actually saved it wasn't a better plan. It was one person asking, bluntly, 'what are we even trying to say here?' two days before the deadline. We rebuilt the whole argument around the answer.",
      "Lesson for next time: ask that question on day one, not day four.",
    ],
  },
  {
    id: "j5",
    slug: "the-library-at-closing-time",
    title: "The Library at Closing Time",
    category: "Daily Life",
    date: "2026-06-28",
    excerpt:
      "There's a specific mood to a library twenty minutes before it closes. Everyone packing up at once, reluctantly.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop",
    readingTime: "2 min read",
    content: [
      "The lights dim slightly as a warning. Chairs scrape back in a loose, unofficial chorus. Someone is always still typing the last line of something, ignoring the signal for as long as they can.",
      "I like this ritual more than I probably should. It marks the day's end in a way that scrolling through my phone never does.",
    ],
  },
  {
    id: "j6",
    slug: "learning-to-say-no-to-plans",
    title: "Learning to Say No to Plans",
    category: "Thoughts",
    date: "2026-06-15",
    excerpt:
      "A short reflection on overcommitting, and the slow work of protecting a few unscheduled hours a week.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1600&auto=format&fit=crop",
    readingTime: "3 min read",
    content: [
      "For most of last semester, my calendar was a wall of commitments I'd said yes to out of habit rather than interest. Society meetings, second catch-ups, favors for people I barely knew.",
      "I started blocking two evenings a week as genuinely unscheduled — not for productivity, just for nothing in particular. It's been harder to protect than I expected, but worth it every time I manage it.",
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}

export function getRelatedJournalPosts(current: JournalPost, count = 3) {
  return journalPosts
    .filter((post) => post.id !== current.id && post.category === current.category)
    .slice(0, count)
    .concat(
      journalPosts.filter((post) => post.id !== current.id && post.category !== current.category)
    )
    .slice(0, count);
}
