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

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "why-starting-something-small-matters",
    title: "Why Starting Something Small Matters",
    category: "Business",
    date: "2026-08-20",
    excerpt:
      "Every case study we read is about companies after they made it. Nobody assigns the awkward, uncertain first version.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
    readingTime: "5 min read",
    featured: true,
    content: [
      "Business school teaches you to analyze companies at scale — market share, growth curves, competitive positioning. What it teaches you less often is what those companies looked like in month one, when the whole operation was two people and a spreadsheet.",
      "I've started a handful of small, low-stakes things this year — a newsletter that four people read, a campus initiative that fell apart after a semester, a tiny side project that never left its Figma file. None of them are impressive on their own. But each one taught me something no case study could: what it actually feels like to be responsible for a decision with no clear right answer.",
      "The case studies matter. But I think the small, unimpressive starts matter more than we give them credit for — they're the only way to build the instincts that later decisions depend on.",
      "If you're waiting for the idea good enough to justify starting, consider starting the mediocre one instead. You'll learn faster than the waiting ever would have taught you.",
    ],
  },
  {
    id: "b2",
    slug: "what-business-school-doesnt-teach-you",
    title: "What Business School Doesn't Teach You",
    category: "Student Life",
    date: "2026-08-05",
    excerpt:
      "The curriculum covers frameworks. It says much less about ambiguity, patience, or how to disagree well.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop",
    readingTime: "6 min read",
    content: [
      "There's a real education happening in business school, and it isn't always the one on the syllabus. The frameworks — Porter's Five Forces, the BCG matrix, discounted cash flow — are useful, but they're also teachable in a weekend if you're motivated enough.",
      "What takes years, and what the curriculum only touches on indirectly, is judgment: knowing which framework doesn't apply here, being comfortable making a call with incomplete information, and disagreeing with a professor or a teammate without turning it into a standoff.",
      "I don't think this is a flaw in the curriculum so much as a limit of what a curriculum can do. Judgment isn't taught, it's built — through enough small decisions that eventually a pattern starts to form.",
    ],
  },
  {
    id: "b3",
    slug: "learning-to-think-beyond-the-classroom",
    title: "Learning to Think Beyond the Classroom",
    category: "Personal Growth",
    date: "2026-07-18",
    excerpt:
      "Some of the most useful ideas I've encountered this year had nothing to do with my coursework.",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=1600&auto=format&fit=crop",
    readingTime: "4 min read",
    content: [
      "A professor once told our class that the goal of a degree isn't to make you an expert in the subject — it's to teach you how to become an expert in anything, given enough time. That reframing has stuck with me longer than most of the actual course content.",
      "This year, some of my most useful thinking happened outside class entirely: from a podcast about behavioral economics, from a long argument with a friend about whether ambition is compatible with contentment, from a book on urban design that had nothing to do with my major.",
      "I've started treating my education as something broader than my transcript. The classroom is one input among several.",
    ],
  },
  {
    id: "b4",
    slug: "the-quiet-argument-for-reading-more-fiction",
    title: "The Quiet Argument for Reading More Fiction",
    category: "Books & Ideas",
    date: "2026-07-02",
    excerpt:
      "Business reading lists rarely include novels. I think that's a mistake, and here's a small case for why.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1600&auto=format&fit=crop",
    readingTime: "4 min read",
    content: [
      "Most reading recommendations I get from classmates are nonfiction — strategy books, biographies of founders, behavioral economics. All useful. But I've found that the fiction I read teaches me something those books don't: how to sit inside someone else's decision-making without immediately trying to extract a framework from it.",
      "A good novel makes you feel the cost of a decision, not just calculate it. That's a different kind of understanding, and I think it's underrated in how we prepare for work that's ultimately about people.",
    ],
  },
  {
    id: "b5",
    slug: "how-technology-changed-my-study-habits",
    title: "How Technology Changed My Study Habits (Not Always for the Better)",
    category: "Technology",
    date: "2026-06-19",
    excerpt:
      "A honest look at what apps and tools actually helped, and which ones just felt like productivity theater.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop",
    readingTime: "5 min read",
    content: [
      "I've cycled through more note-taking apps than I'd like to admit, each one promising to finally organize my thinking. Most of the value, in retrospect, came from the first week of novelty rather than the tool itself.",
      "What's actually changed my studying for the better has been much simpler: a single running document per course, a timer app that does exactly one thing, and turning notifications off during work blocks. Not exciting. Just effective.",
      "I think there's a lesson in there about complexity generally — the appeal of a sophisticated system is often really the appeal of avoiding the plain, slightly boring discipline that would have worked anyway.",
    ],
  },
  {
    id: "b6",
    slug: "on-ambition-and-comparison",
    title: "On Ambition and the Comparison It Feeds",
    category: "Society",
    date: "2026-05-30",
    excerpt:
      "Everyone around me seems to be building something. Figuring out what that pressure is actually for.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
    readingTime: "5 min read",
    content: [
      "There's a particular flavor of ambition that circulates in business school hallways — everyone seems to be launching something, interning somewhere impressive, or quietly building a side project they'll mention only once it succeeds.",
      "It took me a while to separate the useful part of this environment (genuine motivation, good examples to learn from) from the corrosive part (comparing my chapter one to someone else's chapter five). I'm still working on it.",
      "The most honest thing I can say is that ambition is more sustainable when it's pointed at something specific to you, rather than borrowed from whoever's loudest in the room that week.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(current: BlogPost, count = 3) {
  return blogPosts
    .filter((post) => post.id !== current.id && post.category === current.category)
    .slice(0, count)
    .concat(blogPosts.filter((post) => post.id !== current.id && post.category !== current.category))
    .slice(0, count);
}

export const blogCategories = [
  "Business",
  "Student Life",
  "Technology",
  "Society",
  "Personal Growth",
  "Books & Ideas",
] as const;
