export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
  scripture?: {
    quote: string;
    reference: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: "Faith & everyday life" | "Prayer" | "Community" | "Bible study" | string;
  excerpt: string;
  author: string;
  date: string;
  dateTimestamp: number;
  readTime: string;
  image: string;
  coverImage?: string;
  isFeatured?: boolean;
  sections?: ArticleSection[];
  reflectionPrompt?: {
    heading: string;
    text: string;
  };
}

export const FEATURED_ARTICLE: BlogPost = {
  id: "finding-peace-in-the-waiting",
  slug: "finding-peace-in-the-waiting",
  title: "Finding peace in the waiting",
  category: "Faith & everyday life",
  excerpt:
    "When answers seem far away, God is still near. Discover simple ways to trust Him in the seasons between a prayer and its answer.",
  author: "CHM Editorial Team",
  date: "October 24, 2026",
  dateTimestamp: new Date("2026-10-24").getTime(),
  readTime: "5 min read",
  image: "/images/blog/featured-bible-hands.png",
  coverImage: "/images/blog/article-cover.png",
  isFeatured: true,
  sections: [
    {
      id: "bring-your-honest-heart-to-god",
      heading: "Bring your honest heart to God",
      paragraphs: [
        "Waiting can be one of the hardest parts of faith. We pray for direction, healing, a new opportunity or a change in a relationship, and then find ourselves living in the space where nothing seems to be moving. It is easy to mistake that quiet for absence. But a delayed answer does not mean that God has stopped listening.",
        "The Psalms remind us that we do not have to hide our questions in order to pray. We can bring our weariness, disappointment and hope to the same loving Father. An honest prayer can be as simple as, “Lord, I do not know what comes next. Help me trust You with today.” Faith is not pretending that waiting is easy; it is choosing to turn towards God in the middle of it.",
      ],
      scripture: {
        quote: "“Wait on the LORD: be of good courage, and he shall strengthen thine heart.”",
        reference: "Psalm 27:14 • KJV",
      },
    },
    {
      id: "make-space-for-his-peace",
      heading: "Make space for His peace",
      paragraphs: [
        "Philippians 4:6–7 invites us to bring our requests to God with thanksgiving. The promise is not that every situation will change immediately, but that His peace will guard our hearts and minds in Christ Jesus. That peace is not a reward for having all the answers. It is a gift we can receive while the questions are still there.",
        "Try setting aside a few quiet minutes before the noise of the day begins. Read a short passage of Scripture slowly. Name what is weighing on you, and thank God for one expression of His goodness. When anxious thoughts return, gently bring your attention back to His presence. You may need to do this many times. Each return is another small act of trust.",
      ],
    },
    {
      id: "be-faithful-in-the-next-small-step",
      heading: "Be faithful in the next small step",
      paragraphs: [
        "We often want a clear view of the whole journey. More often, we are given enough light for the next step. While you wait for a larger answer, ask what love and faithfulness look like today. It might be making a difficult phone call, keeping a promise, caring for someone nearby or taking the rest you have been avoiding.",
        "These ordinary choices are not a distraction from your spiritual life. They are part of it. You do not need to force an outcome to make this season meaningful. Keep doing what is wise and good, seek counsel when you need it, and leave room for God to lead in ways you may not have imagined.",
      ],
    },
    {
      id: "let-others-walk-alongside-you",
      heading: "Let others walk alongside you",
      paragraphs: [
        "Waiting becomes heavier when we carry it alone. A trusted friend, a prayer partner or someone in your church family can help you hold on to hope when your own words feel small. You do not have to share every detail to ask for support. “Would you pray with me?” is a good place to begin.",
        "At Court of His Majesty, we believe that faith is lived in community. Whatever season you are in, there is room for your story and your questions. As you wait, may you discover that God’s care is not only found in the answer you hope for, but also in the grace that sustains you along the way.",
      ],
    },
  ],
  reflectionPrompt: {
    heading: "A moment to reflect",
    text: "What are you waiting for today? Name it before God, then choose one small step of faith you can take this week.",
  },
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "making-room-for-prayer-every-day",
    slug: "making-room-for-prayer-every-day",
    title: "Making room for prayer, every day",
    category: "Prayer",
    excerpt:
      "Simple rhythms that help us pause, listen and bring our ordinary moments before God.",
    author: "CHM Editorial Team",
    date: "October 21, 2026",
    dateTimestamp: new Date("2026-10-21").getTime(),
    readTime: "4 min read",
    image: "/images/blog/prayer-hands.png",
    coverImage: "/images/blog/prayer-hands.png",
    sections: [
      {
        id: "the-rhythm-of-daily-communion",
        heading: "The rhythm of daily communion",
        paragraphs: [
          "Prayer is not meant to be a heavy obligation we perform; it is an open invitation into communion with God throughout our everyday routine.",
          "When we pause to invite the Holy Spirit into our morning commute, our work conversations, and our family meals, ordinary spaces become sacred meeting places.",
        ],
        scripture: {
          quote: "“Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus concerning you.”",
          reference: "1 Thessalonians 5:17–18 • KJV",
        },
      },
      {
        id: "practical-ways-to-pause",
        heading: "Practical ways to pause",
        paragraphs: [
          "Set a silent alarm at midday to take three deep breaths and whisper a prayer of gratitude. Exchange anxiety for God’s steadying presence before returning to your tasks.",
          "Keep a small prayer journal by your bedside. Writing down short petitions and answers helps you notice God’s active hand in your week.",
        ],
      },
    ],
    reflectionPrompt: {
      heading: "A moment to reflect",
      text: "Which moment of your day today can you dedicate as a sacred pause to speak honestly with God?",
    },
  },
  {
    id: "a-church-family-to-grow-with",
    slug: "a-church-family-to-grow-with",
    title: "A church family to grow with",
    category: "Community",
    excerpt:
      "Why belonging is more than showing up, and how small steps can build meaningful connection.",
    author: "CHM Pastoral Team",
    date: "October 18, 2026",
    dateTimestamp: new Date("2026-10-18").getTime(),
    readTime: "4 min read",
    image: "/images/blog/church-family.png",
    coverImage: "/images/blog/church-family.png",
    sections: [
      {
        id: "belonging-is-more-than-attendance",
        heading: "Belonging is more than attendance",
        paragraphs: [
          "God never designed believers to navigate life as isolated islands. The New Testament uses the metaphor of a living body where each member relies on the strength and gifts of others.",
          "When we step beyond Sunday greetings and enter authentic fellowship, we discover people who will celebrate our triumphs and carry us through trials.",
        ],
        scripture: {
          quote: "“And let us consider one another to provoke unto love and to good works: not forsaking the assembling of ourselves together.”",
          reference: "Hebrews 10:24–25 • KJV",
        },
      },
      {
        id: "small-steps-to-connection",
        heading: "Small steps to connection",
        paragraphs: [
          "Joining a house fellowship, small group, or church department provides the intimacy where true relationships take root. You don’t need to know everyone; you just need a few people who know you deeply.",
        ],
      },
    ],
    reflectionPrompt: {
      heading: "A moment to reflect",
      text: "Who in your church community can you reach out to this week with a word of encouragement?",
    },
  },
  {
    id: "let-the-word-shape-your-week",
    slug: "let-the-word-shape-your-week",
    title: "Let the Word shape your week",
    category: "Bible study",
    excerpt:
      "Take what you read on Sunday into the conversations and choices of everyday life.",
    author: "Pastor Fred Odekhian",
    date: "October 15, 2026",
    dateTimestamp: new Date("2026-10-15").getTime(),
    readTime: "6 min read",
    image: "/images/blog/bible-study.png",
    coverImage: "/images/blog/bible-study.png",
    sections: [
      {
        id: "from-hearing-to-doing",
        heading: "From hearing to doing",
        paragraphs: [
          "The greatest transformation happens not merely when we listen to a sermon, but when scripture becomes the lens through which we interpret our choices, work, and challenges.",
          "Meditating on a single Bible verse throughout the week anchors your mind in divine truth when contradictory feelings arise.",
        ],
        scripture: {
          quote: "“Thy word is a lamp unto my feet, and a light unto my path.”",
          reference: "Psalm 119:105 • KJV",
        },
      },
      {
        id: "carrying-scripture-daily",
        heading: "Carrying scripture daily",
        paragraphs: [
          "Pick one anchor scripture from Sunday’s message. Write it on a card or set it as your phone wallpaper, allowing its wisdom to reshape your perspective.",
        ],
      },
    ],
    reflectionPrompt: {
      heading: "A moment to reflect",
      text: "What Bible verse has brought you the most clarity and strength over the past month?",
    },
  },
  {
    id: "gratitude-in-the-little-things",
    slug: "gratitude-in-the-little-things",
    title: "Gratitude in the little things",
    category: "Faith & everyday life",
    excerpt:
      "Learning to notice God’s goodness, even when life does not look the way we expected.",
    author: "CHM Editorial Team",
    date: "October 12, 2026",
    dateTimestamp: new Date("2026-10-12").getTime(),
    readTime: "3 min read",
    image: "/images/blog/bible-study.png",
    coverImage: "/images/blog/bible-study.png",
    sections: [
      {
        id: "eyes-to-see-daily-mercies",
        heading: "Eyes to see daily mercies",
        paragraphs: [
          "It is human nature to fixate on unanswered questions, yet God fills our ordinary days with evidence of His steadfast care.",
          "Gratitude shifts our focus from what we lack to the abundant grace already sustaining our every breath.",
        ],
        scripture: {
          quote: "“It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.”",
          reference: "Lamentations 3:22–23 • KJV",
        },
      },
    ],
    reflectionPrompt: {
      heading: "A moment to reflect",
      text: "Name three small blessings from today that you might otherwise have overlooked.",
    },
  },
  {
    id: "serving-with-what-is-in-your-hands",
    slug: "serving-with-what-is-in-your-hands",
    title: "Serving with what is in your hands",
    category: "Community",
    excerpt:
      "Your time, care and everyday gifts can become a practical expression of God’s love.",
    author: "CHM Outreach Team",
    date: "October 8, 2026",
    dateTimestamp: new Date("2026-10-08").getTime(),
    readTime: "4 min read",
    image: "/images/blog/church-family.png",
    coverImage: "/images/blog/church-family.png",
    sections: [
      {
        id: "what-is-in-your-hand",
        heading: "What is in your hand?",
        paragraphs: [
          "When God called Moses, He asked a simple question: 'What is that in thine hand?' God does not require what you do not have; He anoints what you surrender to Him.",
          "Whether you have the gift of hospitality, administration, listening, or music, serving others transforms your community and deepens your joy.",
        ],
        scripture: {
          quote: "“As every man hath received the gift, even so minister the same one to another, as good stewards of the manifold grace of God.”",
          reference: "1 Peter 4:10 • KJV",
        },
      },
    ],
    reflectionPrompt: {
      heading: "A moment to reflect",
      text: "How can you use your natural abilities this month to serve someone in need?",
    },
  },
  {
    id: "praying-for-one-another",
    slug: "praying-for-one-another",
    title: "Praying for one another",
    category: "Prayer",
    excerpt:
      "An invitation to carry one another’s burdens with compassion, faith and gentleness.",
    author: "Pastor (Mrs.) Fred Odekhian",
    date: "October 4, 2026",
    dateTimestamp: new Date("2026-10-04").getTime(),
    readTime: "5 min read",
    image: "/images/blog/prayer-hands.png",
    coverImage: "/images/blog/prayer-hands.png",
    sections: [
      {
        id: "carrying-burdens-together",
        heading: "Carrying burdens together",
        paragraphs: [
          "Intercession is love on its knees. When you pray for a brother or sister walking through a storm, you stand in the gap and invite heaven’s peace into their reality.",
          "Never underestimate the eternal weight of a sincere prayer spoken on behalf of someone else.",
        ],
        scripture: {
          quote: "“Confess your faults one to another, and pray one for another, that ye may be healed. The effectual fervent prayer of a righteous man availeth much.”",
          reference: "James 5:16 • KJV",
        },
      },
    ],
    reflectionPrompt: {
      heading: "A moment to reflect",
      text: "Who is the Holy Spirit laying on your heart to intercede for right now?",
    },
  },
];

export const ALL_BLOG_POSTS: BlogPost[] = [FEATURED_ARTICLE, ...BLOG_POSTS];

export const BLOG_CATEGORIES = [
  "All categories",
  "Prayer",
  "Community",
  "Bible study",
  "Faith & everyday life",
] as const;

export function getBlogPostBySlug(slug: string): BlogPost {
  const found = ALL_BLOG_POSTS.find((p) => p.slug === slug || p.id === slug);
  return found || FEATURED_ARTICLE;
}

export function getRelatedBlogPosts(currentSlug: string, count = 3): BlogPost[] {
  return ALL_BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, count);
}
