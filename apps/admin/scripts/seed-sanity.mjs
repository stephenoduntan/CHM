import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to manually parse simple .env files without extra dependencies
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, "utf-8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  }
  return env;
}

const rootEnv = loadEnvFile(path.resolve(__dirname, "../../../.env.local"));
const webEnv = loadEnvFile(path.resolve(__dirname, "../../web/.env.local"));
const adminEnv = loadEnvFile(path.resolve(__dirname, "../.env"));

const projectId =
  adminEnv.SANITY_STUDIO_PROJECT_ID ||
  webEnv.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  rootEnv.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "ct660z6u";

const dataset =
  adminEnv.SANITY_STUDIO_DATASET ||
  webEnv.NEXT_PUBLIC_SANITY_DATASET ||
  rootEnv.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  webEnv.SANITY_API_WRITE_TOKEN ||
  rootEnv.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("❌ Error: SANITY_API_WRITE_TOKEN not found in .env.local or process.env.");
  process.exit(1);
}

console.log(`Connecting to Sanity project: ${projectId}, dataset: ${dataset}...`);

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

// ─── 1. Authors ─────────────────────────────────────────────────────────────
const authors = [
  {
    _id: "author-pastor-fred-odekhian",
    _type: "author",
    name: "Pastor Fred Odekhian",
    slug: { _type: "slug", current: "pastor-fred-odekhian" },
    role: "Lead Pastor & PICP, RCCG Court of His Majesty",
    bio: "Pastor Fred Odekhian is the Pastor-in-Charge of RCCG Lagos Province 94 and Senior Pastor of Court of His Majesty.",
  },
  {
    _id: "author-chm-editorial-team",
    _type: "author",
    name: "CHM Editorial Team",
    slug: { _type: "slug", current: "chm-editorial-team" },
    role: "Publications & Content Ministry",
    bio: "Curating spiritual insights, articles, and pastoral devotionals for the Court of His Majesty family.",
  },
];

// ─── 2. Sermons ─────────────────────────────────────────────────────────────
const sermons = [
  {
    _id: "sermon-alignment-precedes-acceleration",
    _type: "sermon",
    title: "Alignment Precedes Acceleration",
    slug: { _type: "slug", current: "alignment-precedes-acceleration" },
    speaker: "Pastor Fred Odekhian",
    date: "2026-10-24",
    series: "Festival of Destiny Series",
    duration: "1 hr 15 mins",
    thumbnailUrl: "/images/sermons/sermon-hero-video.png",
    youtubeId: "vBvP_h0k_X8",
    biblePassage: "1 Corinthians 2:4",
    description:
      "In this profound message delivered at the Festival of Destiny, Pastor Fred Odekhian teaches on the divine principle of alignment. Drawing from 1 Corinthians 2:4, he demonstrates that when a believer’s spirit, thoughts, and actions align with the counsel of God, supernatural acceleration and victory become inevitable.",
    keyPoints: [
      "Divine Order: God never releases maximum acceleration into an area of your life that lacks spiritual order.",
      "Demonstration of Power: Power does not reside in human oratory, but in alignment with the Holy Ghost.",
      "The Prepared Altar: Like Elijah on Mount Carmel, the altar of your heart must be repaired before heaven responds with fire.",
      "Unlocking Supernatural Speed: What takes ten years of human striving can be achieved in ten days under divine alignment.",
    ],
    transcript: [
      {
        _key: "t1",
        timestamp: "00:00",
        speaker: "Pastor Fred Odekhian",
        text: "Praise the Lord, Church! Welcome to this momentous gathering at the Festival of Destiny. Lift up your hands and ask the Holy Spirit to speak directly to your destiny today.",
      },
      {
        _key: "t2",
        timestamp: "04:15",
        speaker: "Pastor Fred Odekhian",
        text: "Let us read together from 1 Corinthians chapter 2, verse 4: 'And my speech and my preaching was not with enticing words of man’s wisdom, but in demonstration of the Spirit and of power.' Notice that the Apostle Paul does not boast in human eloquence. He anchors everything in the demonstration of spiritual power.",
      },
      {
        _key: "t3",
        timestamp: "12:30",
        speaker: "Pastor Fred Odekhian",
        text: "Many believers pray for speed. You want promotion, you want expansion, you want breakthroughs. But hear me clearly: God will never accelerate what is out of divine alignment. If a train accelerates on misaligned tracks, disaster follows. God loves you too much to give you speed that will crash your character.",
      },
    ],
  },
  {
    _id: "sermon-walking-in-divine-destiny",
    _type: "sermon",
    title: "Walking in Divine Destiny",
    slug: { _type: "slug", current: "walking-in-divine-destiny" },
    speaker: "Pastor Fred Odekhian",
    date: "2026-10-17",
    series: "Destiny Dimensions",
    duration: "1 hr 08 mins",
    thumbnailUrl: "/images/sermons/sermon-hero-video.png",
    youtubeId: "vBvP_h0k_X8",
    biblePassage: "Jeremiah 29:11",
    description:
      "A deep revelatory teaching on discovering, stepping into, and navigating the sovereign blueprint God has crafted for your journey.",
    keyPoints: [
      "The Pre-Ordained Blueprint: Before you were formed in the womb, heaven had an architectural drawing for your life.",
      "Overcoming Distractions: Destiny is not what you stumble into; it requires deliberate consecration.",
      "The Power of the Secret Place: Hearing God's instruction in private is the secret to walking tall in public.",
    ],
  },
  {
    _id: "sermon-the-power-of-consecration",
    _type: "sermon",
    title: "The Power of Consecration",
    slug: { _type: "slug", current: "the-power-of-consecration" },
    speaker: "Pastor Fred Odekhian",
    date: "2026-10-10",
    series: "Spiritual Foundations",
    duration: "58 mins",
    thumbnailUrl: "/images/sermons/sermon-hero-video.png",
    youtubeId: "vBvP_h0k_X8",
    biblePassage: "Joshua 3:5",
    description:
      "Sanctify yourselves, for tomorrow the Lord will do wonders among you. Understand the spiritual physics of consecration and how holiness unlocks divine intervention.",
    keyPoints: [
      "Consecration Precedes Wonders: Joshua 3:5 reveals the divine order between sanctification and miracles.",
      "Separation unto God: Consecration is not deprivation; it is separation for supernatural elevation.",
    ],
  },
  {
    _id: "sermon-faith-that-moves-mountains",
    _type: "sermon",
    title: "Faith That Moves Mountains",
    slug: { _type: "slug", current: "faith-that-moves-mountains" },
    speaker: "Pastor Fred Odekhian",
    date: "2026-10-03",
    series: "Unshakable Faith",
    duration: "1 hr 12 mins",
    thumbnailUrl: "/images/sermons/sermon-hero-video.png",
    youtubeId: "vBvP_h0k_X8",
    biblePassage: "Mark 11:22-24",
    description:
      "Learn how to speak to the obstacles in your life with authority, rooted in unwavering trust in God's promises.",
    keyPoints: [
      "Have Faith in God: Mountain-moving faith is anchored in who God is, not our strength.",
      "The Law of Confession: Believing in your heart and declaring with your mouth.",
    ],
  },
  {
    _id: "sermon-dwelling-in-the-secret-place",
    _type: "sermon",
    title: "Dwelling in the Secret Place",
    slug: { _type: "slug", current: "dwelling-in-the-secret-place" },
    speaker: "Pastor (Mrs.) Grace Odekhian",
    date: "2026-09-26",
    series: "Spiritual Foundations",
    duration: "1 hr 02 mins",
    thumbnailUrl: "/images/sermons/sermon-hero-video.png",
    youtubeId: "vBvP_h0k_X8",
    biblePassage: "Psalm 91:1",
    description:
      "A stirring exhortation on intimacy with the Father, abiding under the shadow of the Almighty, and spiritual immunity in turbulent times.",
    keyPoints: [
      "The Secret Place: Not a physical address, but a spiritual habit of prayer and stillness.",
      "Divine Immunity: The shadow of the Almighty offers complete coverage.",
    ],
  },
  {
    _id: "sermon-grace-for-greater-works",
    _type: "sermon",
    title: "Grace for Greater Works",
    slug: { _type: "slug", current: "grace-for-greater-works" },
    speaker: "Pastor Fred Odekhian",
    date: "2026-09-19",
    series: "Festival of Destiny Series",
    duration: "1 hr 20 mins",
    thumbnailUrl: "/images/sermons/sermon-hero-video.png",
    youtubeId: "vBvP_h0k_X8",
    biblePassage: "John 14:12",
    description:
      "Jesus declared that those who believe will do even greater works. Uncover the spiritual capacity available to the Church today.",
    keyPoints: [
      "The Mandate of Greater Works: Believers are called to demonstrate God's power in every sphere.",
      "The Sufficiency of Grace: God's grace supplies what human strength cannot accomplish.",
    ],
  },
];

// ─── 3. Events ──────────────────────────────────────────────────────────────
const events = [
  {
    _id: "event-festival-of-destiny",
    _type: "event",
    title: "2026 Festival of Destiny Conference",
    slug: { _type: "slug", current: "festival-of-destiny" },
    theme: "CHOOSE LIFE",
    date: "November 8th - 15th, 2026",
    startDate: "2026-11-08T18:00:00Z",
    endDate: "2026-11-15T21:00:00Z",
    time: "6:00 PM Daily (Grand Finale: 8:00 AM Sunday)",
    venue: "Main Auditorium, RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos",
    badge: "Flagship Annual Convention",
    posterImageUrl: "/images/events/fod-2026-poster.webp",
    videoUrl: "/videos/FOD 2026.webm",
    isPast: false,
    description:
      "Join RCCG Court of His Majesty for the 2026 Festival of Destiny Conference, themed 'CHOOSE LIFE'. From November 8th - 15th, experience powerful preaching, miraculous breakthroughs, and prophetic destiny activation.",
  },
  {
    _id: "event-mens-annual-conference",
    _type: "event",
    title: "Men’s Annual Conference 2026",
    slug: { _type: "slug", current: "mens-annual-conference" },
    theme: "Kingdom Men of Impact",
    date: "October 18th - 20th, 2026",
    startDate: "2026-10-18T09:00:00Z",
    endDate: "2026-10-20T19:00:00Z",
    time: "9:00 AM & 5:00 PM Daily",
    venue: "Main Sanctuary, RCCG CHM",
    badge: "Men of Valor",
    posterImageUrl: "/images/explore/community.webp",
    videoUrl: "/videos/men conf..webm",
    isPast: true,
    description:
      "A power-packed gathering of Kingdom men equipped for spiritual authority, godly fatherhood, marketplace leadership, and generational influence.",
  },
  {
    _id: "event-ezzer-women-conference",
    _type: "event",
    title: "Ezzer Women Annual Conference",
    slug: { _type: "slug", current: "ezzer-women-conference" },
    theme: "Women of Grace & Glory",
    date: "September 12th - 14th, 2026",
    startDate: "2026-09-12T10:00:00Z",
    endDate: "2026-09-14T18:00:00Z",
    time: "10:00 AM & 6:00 PM",
    venue: "RCCG Court of His Majesty Sanctuary",
    badge: "Good Women Ministry",
    posterImageUrl: "/images/explore/ministries.webp",
    videoUrl: "/videos/ezzer women montage.webm",
    isPast: true,
    description:
      "Anointed gathering of virtuous women encountering fresh grace, interceding for homes, and rising in prayer and business purpose.",
  },
  {
    _id: "event-choose-life-encounter",
    _type: "event",
    title: "Choose Life Conference",
    slug: { _type: "slug", current: "choose-life-encounter" },
    theme: "Living Above Limits",
    date: "August 22nd - 24th, 2026",
    startDate: "2026-08-22T17:30:00Z",
    endDate: "2026-08-24T20:30:00Z",
    time: "5:30 PM Daily",
    venue: "Court of His Majesty & Livestream",
    badge: "General Assembly",
    posterImageUrl: "/images/explore/teachings.webp",
    videoUrl: "/videos/choose life action.webm",
    isPast: true,
    description:
      "Spiritual renewal encounter declaring God's life over every situation of defeat, delay, and oppression.",
  },
  {
    _id: "event-youth-ignite",
    _type: "event",
    title: "Youth Ignite Conference 2026",
    slug: { _type: "slug", current: "youth-ignite" },
    theme: "Unstoppable Generation",
    date: "July 24th - 26th, 2026",
    startDate: "2026-07-24T16:00:00Z",
    endDate: "2026-07-26T20:00:00Z",
    time: "4:00 PM Daily",
    venue: "Youth Hall, RCCG CHM",
    badge: "Youth Ministry",
    posterImageUrl: "/images/explore/get-involved.webp",
    videoUrl: "/videos/guest min..webm",
    isPast: true,
    description:
      "Empowering the next generation to ignite their potential, build solid spiritual foundations, and excel in innovation, academics, and leadership.",
  },
];

// ─── 4. Blog Posts ──────────────────────────────────────────────────────────
const blogs = [
  {
    _id: "blog-finding-peace-in-the-waiting",
    _type: "blog",
    title: "Finding peace in the waiting",
    slug: { _type: "slug", current: "finding-peace-in-the-waiting" },
    category: "Faith & everyday life",
    publishedAt: "2026-10-24",
    readTime: "5 min read",
    isFeatured: true,
    coverImageUrl: "/images/blog/featured-bible-hands.png",
    author: { _type: "reference", _ref: "author-chm-editorial-team" },
    excerpt:
      "When answers seem far away, God is still near. Discover simple ways to trust Him in the seasons between a prayer and its answer.",
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Waiting can be one of the hardest parts of faith. We pray for direction, healing, a new opportunity or a change in a relationship, and then find ourselves living in the space where nothing seems to be moving. It is easy to mistake that quiet for absence. But a delayed answer does not mean that God has stopped listening.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The Psalms remind us that we do not have to hide our questions in order to pray. We can bring our weariness, disappointment and hope to the same loving Father. An honest prayer can be as simple as, 'Lord, I do not know what comes next. Help me trust You with today.' Faith is not pretending that waiting is easy; it is choosing to turn towards God in the middle of it.",
          },
        ],
      },
    ],
  },
  {
    _id: "blog-making-room-for-prayer-every-day",
    _type: "blog",
    title: "Making room for prayer every day",
    slug: { _type: "slug", current: "making-room-for-prayer-every-day" },
    category: "Prayer",
    publishedAt: "2026-10-18",
    readTime: "4 min read",
    isFeatured: false,
    coverImageUrl: "/images/blog/prayer-hands.png",
    author: { _type: "reference", _ref: "author-chm-editorial-team" },
    excerpt:
      "Prayer does not have to be long or complicated to change your day. Simple ways to stay connected to God in the middle of a busy schedule.",
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Many people feel a quiet guilt around prayer. We imagine that real prayer requires an uninterrupted hour in a quiet room with open scriptures and no distractions. While intentional solitude is a gift, Jesus also welcomed people who whispered one-sentence prayers in the middle of crowds.",
          },
        ],
      },
    ],
  },
  {
    _id: "blog-a-church-family-to-grow-with",
    _type: "blog",
    title: "A church family to grow with",
    slug: { _type: "slug", current: "a-church-family-to-grow-with" },
    category: "Community",
    publishedAt: "2026-10-11",
    readTime: "6 min read",
    isFeatured: false,
    coverImageUrl: "/images/blog/church-family.png",
    author: { _type: "reference", _ref: "author-chm-editorial-team" },
    excerpt:
      "Faith was never meant to be lived alone. Why belonging to a local church family is one of the greatest gifts for your spiritual growth.",
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "In an increasingly connected yet lonely world, finding a community where you are known, loved, and encouraged in your walk with God is life-changing. At RCCG Court of His Majesty, community is more than a weekly gathering—it is family.",
          },
        ],
      },
    ],
  },
  {
    _id: "blog-building-a-rhythm-of-gratitude",
    _type: "blog",
    title: "Building a rhythm of gratitude",
    slug: { _type: "slug", current: "building-a-rhythm-of-gratitude" },
    category: "Bible study",
    publishedAt: "2026-10-04",
    readTime: "5 min read",
    isFeatured: false,
    coverImageUrl: "/images/blog/bible-study.png",
    author: { _type: "reference", _ref: "author-chm-editorial-team" },
    excerpt:
      "Gratitude shifts our perspective from what we lack to what God has already supplied. Learn how thanksgiving unlocks divine joy.",
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Thanksgiving is more than good manners; it is a spiritual weapon that disarms anxiety and opens the gates of heaven. When we thank God for what He has done, we posture our hearts to receive what He is about to do.",
          },
        ],
      },
    ],
  },
];

// ─── 5. Photo Gallery ───────────────────────────────────────────────────────
const galleryPhotos = [
  {
    _id: "gallery-mens-conf-01",
    _type: "gallery",
    title: "Men of Impact Keynote Charge",
    caption: "Pastor Fred Odekhian ministering on Kingdom men taking spiritual leadership in the home and workplace.",
    imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
    eventName: "Men’s Annual Conference",
    eventTag: "Men's Fellowship",
    date: "2026-10-20",
    year: 2026,
  },
  {
    _id: "gallery-mens-conf-02",
    _type: "gallery",
    title: "Brotherhood in Worship & Prayer",
    caption: "Men gathered at the altar lifting holy hands in unified intercession for our nation and families.",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
    eventName: "Men’s Annual Conference",
    eventTag: "Men's Fellowship",
    date: "2026-10-19",
    year: 2026,
  },
  {
    _id: "gallery-mens-conf-03",
    _type: "gallery",
    title: "Marketplace Leadership Breakout Panel",
    caption: "Seasoned executives addressing young professionals on biblical ethics, integrity, and career elevation.",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    eventName: "Men’s Annual Conference",
    eventTag: "Men's Fellowship",
    date: "2026-10-18",
    year: 2026,
  },
  {
    _id: "gallery-ezzer-01",
    _type: "gallery",
    title: "Ezzer Women Thanksgiving Procession",
    caption: "Mothers, daughters, and young women rejoicing in coordinated royal attire celebrating God's faithfulness.",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
    eventName: "Ezzer Women Annual Conference",
    eventTag: "Women's Ministry",
    date: "2026-09-14",
    year: 2026,
  },
  {
    _id: "gallery-ezzer-02",
    _type: "gallery",
    title: "Grace & Glory Anointing Service",
    caption: "Pastor (Mrs.) Grace Odekhian laying hands on attendees during the climactic impartation session.",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=1200",
    eventName: "Ezzer Women Annual Conference",
    eventTag: "Women's Ministry",
    date: "2026-09-13",
    year: 2026,
  },
  {
    _id: "gallery-youth-01",
    _type: "gallery",
    title: "Youth Ignite Praise Explosion",
    caption: "Energetic worship leaders ministering before hundreds of young believers in high-voltage praise.",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200",
    eventName: "Youth Ignite Conference",
    eventTag: "Youth Ministry",
    date: "2026-07-26",
    year: 2026,
  },
  {
    _id: "gallery-sunday-01",
    _type: "gallery",
    title: "Sunday Celebration High Praise",
    caption: "The CHM Sanctuary Choir leading the congregation in deep prophetic worship.",
    imageUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1200",
    eventName: "Sunday Celebration Service",
    eventTag: "Sunday Service",
    date: "2026-10-25",
    year: 2026,
  },
  {
    _id: "gallery-sunday-02",
    _type: "gallery",
    title: "Altar Call & Harvest of Souls",
    caption: "First-time guests and new converts surrendering their lives to Jesus Christ at the altar.",
    imageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=1200",
    eventName: "Sunday Celebration Service",
    eventTag: "Sunday Service",
    date: "2026-10-18",
    year: 2026,
  },
];

// ─── 6. Leadership ──────────────────────────────────────────────────────────
const leaders = [
  {
    _id: "leader-pastor-fred-odekhian",
    _type: "leadership",
    name: "Pastor & Pastor (Mrs.) Fred Odekhian",
    slug: { _type: "slug", current: "pastor-fred-odekhian" },
    role: "Pastor-in-Charge of Province (PICP) & Parish Pastor",
    category: "pastoral",
    imageUrl: "/images/sermons/sermon-hero-video.png",
    bio: "Pastor Fred Odekhian is the Pastor-in-Charge of RCCG Lagos Province 94 and Senior Pastor of Court of His Majesty. Together with his wife, Pastor (Mrs.) Grace Odekhian, they steer the parish in apostolic impact, prophetic teaching, and regional transformation.",
    order: 1,
  },
  {
    _id: "leader-pastor-caleb-okedere",
    _type: "leadership",
    name: "Pastor & Pastor (Mrs.) Caleb Okedere",
    slug: { _type: "slug", current: "pastor-caleb-okedere" },
    role: "National Secretary RCCG & Assistant Pastor (Admin)",
    category: "assistant",
    imageUrl: "/images/explore/teachings.webp",
    bio: "Pastor Caleb Okedere serves as the National Secretary of the Redeemed Christian Church of God and plays an executive leadership role at Court of His Majesty.",
    order: 2,
  },
];

// ─── 7. House Fellowship Centers ────────────────────────────────────────────
const houseFellowships = [
  {
    _id: "hf-chm-goodness-centre",
    _type: "houseFellowship",
    centerName: "CHM Goodness Centre",
    landmark: "Abesan",
    address: "Block 84, Flat 4, Sector 4, Abesan Estate, Ipaja, Lagos",
    hostName: "Bro. Jairus Ogwuda",
    hostPhone: "07060646611",
    meetingDay: "Sunday",
    meetingTime: "5:00 PM – 6:00 PM",
  },
  {
    _id: "hf-ebenezer-centre",
    _type: "houseFellowship",
    centerName: "Ebenezer Centre",
    landmark: "Abesan",
    address: "Road 14, Sector 2, Abesan Housing Estate, Ipaja",
    hostName: "Dcns. Dayo Adepoju",
    hostPhone: "08127723565",
    meetingDay: "Sunday",
    meetingTime: "5:00 PM – 6:00 PM",
  },
  {
    _id: "hf-shalom-centre",
    _type: "houseFellowship",
    centerName: "Shalom Peace Centre",
    landmark: "Abesan",
    address: "Block 142, Flat 2, Sector 7, Abesan Estate, Lagos",
    hostName: "Elder & Mrs. S. A. Babatunde",
    hostPhone: "08033221144",
    meetingDay: "Sunday",
    meetingTime: "5:00 PM – 6:00 PM",
  },
  {
    _id: "hf-grace-sanctuary-ayobo",
    _type: "houseFellowship",
    centerName: "Grace Sanctuary Centre",
    landmark: "Ayobo",
    address: "12 Megida Road, Opposite St. Peter Catholic Church, Ayobo",
    hostName: "Bro. Emmanuel & Sis. Ruth Chukwu",
    hostPhone: "08023456789",
    meetingDay: "Sunday",
    meetingTime: "5:00 PM – 6:00 PM",
  },
  {
    _id: "hf-dominion-isefun",
    _type: "houseFellowship",
    centerName: "Dominion Fellowship Centre",
    landmark: "Isefun",
    address: "Plot 8, Peace Estate, Near Camp Davies Junction, Isefun",
    hostName: "Dcn. & Mrs. Tunde Bakare",
    hostPhone: "08055667788",
    meetingDay: "Sunday",
    meetingTime: "5:00 PM – 6:00 PM",
  },
];

// ─── 8. Announcements ───────────────────────────────────────────────────────
const announcements = [
  {
    _id: "announcement-fod-2026",
    _type: "announcement",
    title: "Festival of Destiny 2026: 'Choose Life' is Coming!",
    message:
      "Set your calendars for November 8th - 15th, 2026. Come and experience supernatural alignment and acceleration.",
    category: "special",
    link: "https://rccgchm.netlify.app/events/festival-of-destiny",
    isActive: true,
    publishDate: "2026-11-01",
  },
  {
    _id: "announcement-cathedral-pledge",
    _type: "announcement",
    title: "Next Level Cathedral Building Project",
    message:
      "Partner with God's Kingdom as we build the ultra-modern 5,000-seater Next Level Cathedral. Give online or via bank transfer.",
    category: "general",
    link: "https://rccgchm.netlify.app/give",
    isActive: true,
    publishDate: "2026-10-15",
  },
];

async function seed() {
  console.log("🌱 Starting Sanity Database Seeding...");

  const allDocuments = [
    ...authors,
    ...sermons,
    ...events,
    ...blogs,
    ...galleryPhotos,
    ...leaders,
    ...houseFellowships,
    ...announcements,
  ];

  let createdCount = 0;

  for (const doc of allDocuments) {
    try {
      // createIfNotExists ensures we DO NOT overwrite or duplicate user-created content
      const res = await client.createIfNotExists(doc);
      console.log(`✅ [${doc._type}] ${doc.title || doc.name || doc.centerName || doc._id}`);
      createdCount++;
    } catch (err) {
      console.error(`❌ Error creating [${doc._type}] ${doc._id}:`, err.message);
    }
  }

  console.log(`\n🎉 Seeding Complete!`);
  console.log(`✨ Total documents processed: ${allDocuments.length}`);
  console.log(`✨ Open Sanity Studio at http://localhost:3333 to view all content!`);
}

seed().catch(console.error);
