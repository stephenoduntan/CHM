export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: "Faith & everyday life" | "Prayer" | "Community" | "Bible study" | string;
  excerpt: string;
  date: string;
  dateTimestamp: number;
  readTime: string;
  image: string;
  isFeatured?: boolean;
}

export const FEATURED_ARTICLE: BlogPost = {
  id: "finding-peace-in-the-waiting",
  slug: "finding-peace-in-the-waiting",
  title: "Finding peace in the waiting",
  category: "Faith & everyday life",
  excerpt:
    "When answers seem far away, God is still near. Discover simple ways to trust Him in the seasons between a prayer and its answer.",
  date: "October 24, 2026",
  dateTimestamp: new Date("2026-10-24").getTime(),
  readTime: "5 min read",
  image: "/images/blog/featured-bible-hands.png",
  isFeatured: true,
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "making-room-for-prayer-every-day",
    slug: "making-room-for-prayer-every-day",
    title: "Making room for prayer, every day",
    category: "Prayer",
    excerpt:
      "Simple rhythms that help us pause, listen and bring our ordinary moments before God.",
    date: "October 21, 2026",
    dateTimestamp: new Date("2026-10-21").getTime(),
    readTime: "4 min read",
    image: "/images/blog/prayer-hands.png",
  },
  {
    id: "a-church-family-to-grow-with",
    slug: "a-church-family-to-grow-with",
    title: "A church family to grow with",
    category: "Community",
    excerpt:
      "Why belonging is more than showing up, and how small steps can build meaningful connection.",
    date: "October 18, 2026",
    dateTimestamp: new Date("2026-10-18").getTime(),
    readTime: "4 min read",
    image: "/images/blog/church-family.png",
  },
  {
    id: "let-the-word-shape-your-week",
    slug: "let-the-word-shape-your-week",
    title: "Let the Word shape your week",
    category: "Bible study",
    excerpt:
      "Take what you read on Sunday into the conversations and choices of everyday life.",
    date: "October 15, 2026",
    dateTimestamp: new Date("2026-10-15").getTime(),
    readTime: "6 min read",
    image: "/images/blog/bible-study.png",
  },
  {
    id: "gratitude-in-the-little-things",
    slug: "gratitude-in-the-little-things",
    title: "Gratitude in the little things",
    category: "Faith & everyday life",
    excerpt:
      "Learning to notice God’s goodness, even when life does not look the way we expected.",
    date: "October 12, 2026",
    dateTimestamp: new Date("2026-10-12").getTime(),
    readTime: "3 min read",
    image: "/images/blog/bible-study.png",
  },
  {
    id: "serving-with-what-is-in-your-hands",
    slug: "serving-with-what-is-in-your-hands",
    title: "Serving with what is in your hands",
    category: "Community",
    excerpt:
      "Your time, care and everyday gifts can become a practical expression of God’s love.",
    date: "October 8, 2026",
    dateTimestamp: new Date("2026-10-08").getTime(),
    readTime: "4 min read",
    image: "/images/blog/church-family.png",
  },
  {
    id: "praying-for-one-another",
    slug: "praying-for-one-another",
    title: "Praying for one another",
    category: "Prayer",
    excerpt:
      "An invitation to carry one another’s burdens with compassion, faith and gentleness.",
    date: "October 4, 2026",
    dateTimestamp: new Date("2026-10-04").getTime(),
    readTime: "5 min read",
    image: "/images/blog/prayer-hands.png",
  },
];

export const BLOG_CATEGORIES = [
  "All categories",
  "Prayer",
  "Community",
  "Bible study",
  "Faith & everyday life",
] as const;

