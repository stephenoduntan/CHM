import { client } from "./client";
import {
  SERMONS_QUERY,
  SERMON_BY_SLUG_QUERY,
  EVENTS_QUERY,
  EVENT_BY_SLUG_QUERY,
  BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  GALLERY_QUERY,
  LEADERSHIP_QUERY,
  HOUSE_FELLOWSHIP_QUERY,
  WATCH_ONLINE_QUERY,
} from "./queries";
import { Sermon, SERMONS_DATA, DEFAULT_SERMON } from "@/lib/sermons-data";
import { EventItem, EventDetail, ALL_EVENTS, EVENTS_DETAILS } from "@/lib/events-data";
import { BlogPost, ALL_BLOG_POSTS, FEATURED_ARTICLE } from "@/lib/blog-data";
import { GalleryImage, GALLERY_IMAGES } from "@/lib/gallery-data";
import { Leader, SENIOR_PASTORS, LEADERSHIP_TEAM } from "@/lib/leadership-data";
import { FellowshipCenter, HOUSE_FELLOWSHIP_CENTERS } from "@/lib/house-fellowship-data";

/**
 * Robust YouTube ID extractor.
 * Handles full URLs (https://youtu.be/..., https://www.youtube.com/watch?v=...),
 * embed links, and raw 11-character video IDs.
 */
export function extractYouTubeId(urlOrId?: string): string {
  if (!urlOrId) return "vBvP_h0k_X8";
  const str = urlOrId.trim();

  // If already clean 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return str;
  }

  // youtu.be/<id>
  const shortMatch = str.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // youtube.com/watch?v=<id>
  const queryMatch = str.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (queryMatch) return queryMatch[1];

  // youtube.com/embed/<id> or /v/<id> or /live/<id>
  const embedMatch = str.match(/youtube\.com\/(?:embed|v|live)\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  return str;
}

/**
 * Converts Sanity rich text / portable text blocks or fallback strings to clean plain text.
 */
export function blocksToPlainText(blocks: any): string {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks)) return "";

  return blocks
    .map((block) => {
      if (block._type === "block") {
        if (!block.children || !Array.isArray(block.children)) return "";
        return block.children.map((c: any) => c.text || "").join("");
      }
      if (block._type === "quote") {
        const text = block.quote || block.text || "";
        const ref = block.reference || block.attribution;
        return ref ? `“${text}” — ${ref}` : `“${text}”`;
      }
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}

/**
 * Converts Sanity rich text / portable text blocks or strings to an array of paragraphs.
 */
export function blocksToParagraphs(blocks: any): string[] {
  if (!blocks) return [];
  if (typeof blocks === "string") {
    return blocks
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (!Array.isArray(blocks)) return [];

  const paragraphs: string[] = [];
  for (const block of blocks) {
    if (block._type === "block") {
      const text = block.children?.map((c: any) => c.text || "").join("") || "";
      if (text.trim()) paragraphs.push(text.trim());
    } else if (block._type === "quote") {
      const text = block.quote || block.text || "";
      const ref = block.reference || block.attribution;
      paragraphs.push(ref ? `“${text}” — ${ref}` : `“${text}”`);
    }
  }
  return paragraphs;
}

// ─── Sermons ─────────────────────────────────────────────────────────────────
export function mapSanitySermon(doc: any): Sermon {
  const slug = doc.slug?.current || doc._id;
  const youtubeId = extractYouTubeId(doc.youtubeId);

  return {
    id: slug,
    title: doc.title || "Untitled Sermon",
    speaker: doc.speaker || "Pastor Fred Odekhian",
    date: doc.date || "",
    series: doc.series || "Sunday Service",
    duration: doc.duration || "1 hr",
    thumbnail: doc.thumbnail || "/images/sermons/sermon-hero-video.png",
    youtubeId,
    description: blocksToPlainText(doc.description) || "",
    supportingCopy: "Watch the full message and continue exploring sermons from Court of His Majesty below.",
    biblePassage: doc.biblePassage || "",
    keyPoints: Array.isArray(doc.keyPoints) && doc.keyPoints.length > 0 ? doc.keyPoints : undefined,
    transcript: Array.isArray(doc.transcript) && doc.transcript.length > 0
      ? doc.transcript.map((t: any) => ({
          timestamp: t.timestamp || "00:00",
          speaker: t.speaker || doc.speaker || "Speaker",
          text: t.text || "",
        }))
      : undefined,
  };
}

export async function fetchSanitySermons(): Promise<Sermon[]> {
  try {
    const docs = await client.fetch(SERMONS_QUERY);
    if (Array.isArray(docs) && docs.length > 0) {
      return docs.map(mapSanitySermon);
    }
  } catch (err) {
    console.error("[Sanity] Failed to fetch sermons:", err);
  }
  return SERMONS_DATA;
}

export async function fetchSanitySermonBySlug(slug: string): Promise<Sermon> {
  try {
    const doc = await client.fetch(SERMON_BY_SLUG_QUERY, { slug });
    if (doc) {
      return mapSanitySermon(doc);
    }
  } catch (err) {
    console.error(`[Sanity] Failed to fetch sermon ${slug}:`, err);
  }
  const fallback = SERMONS_DATA.find((s) => s.id === slug);
  return fallback || DEFAULT_SERMON;
}

// ─── Events ──────────────────────────────────────────────────────────────────
export function mapSanityEvent(doc: any): EventItem {
  const slug = doc.slug?.current || doc._id;
  const posterImg = doc.posterImage || doc.posterImageUrl || "/images/events/fod-2026-poster.webp";
  const startDate = doc.startDate || doc.date || "2026-11-08T18:00:00Z";
  
  const themeWords = (doc.theme || "CHURCH ENCOUNTER").trim().split(/\s+/);
  const watermark: [string, string] = [
    themeWords[0] ? themeWords[0].toUpperCase() : "CHURCH",
    themeWords.slice(1).join(" ").toUpperCase() || "ENCOUNTER",
  ];

  return {
    id: slug,
    title: doc.title || "Untitled Event",
    theme: doc.theme || "",
    watermark,
    date: doc.date || "",
    startDateIso: startDate,
    time: doc.time || "6:00 PM Daily",
    location: doc.venue || "Main Auditorium, RCCG Court of His Majesty",
    venue: doc.venue || "Main Auditorium, RCCG Court of His Majesty",
    posterImage: posterImg,
    image: posterImg,
    videoUrl: doc.videoUrl || "",
    isPast: Boolean(doc.isPast),
    badge: doc.badge || "Church Event",
    description: blocksToPlainText(doc.description) || "",
    gallery: doc.gallery || [],
    link: `/events/${slug}`,
  };
}

export function mapSanityEventDetail(doc: any): EventDetail {
  const slug = doc.slug?.current || doc._id;
  const posterImg = doc.posterImage || doc.posterImageUrl || "/images/events/fod-2026-poster.webp";
  const descText = blocksToPlainText(doc.description) || doc.title || "";
  return {
    slug,
    status: doc.isPast ? "Past event" : "Upcoming event",
    title: doc.title || "Untitled Event",
    theme: doc.theme || "",
    date: doc.date || "",
    fullDate: doc.date || "",
    time: doc.time || "6:00 PM Daily",
    venue: doc.venue || "Church Auditorium",
    churchName: "RCCG Court of His Majesty",
    addressLine1: "163 Ipaja Road, Abesan Estate Gate,",
    addressLine2: "Lagos, Nigeria",
    posterImage: posterImg,
    aboutTitle: "About the event",
    overviewParagraph1: descText,
    overviewParagraph2: `Date: ${doc.date} • Venue: ${doc.venue || "Church Auditorium"}`,
    inviteHeading: "Come with someone",
    inviteCopy: "Invite a friend or family member to join you.",
    calendarEvent: {
      title: `${doc.title}${doc.theme ? ` - ${doc.theme}` : ""}`,
      description: descText,
      location: doc.venue || "RCCG Court of His Majesty",
      startDate: doc.startDate || doc.date || "2026-11-08T18:00:00",
      endDate: doc.endDate || doc.startDate || doc.date || "2026-11-15T21:00:00",
    },
  };
}

export async function fetchSanityEvents(): Promise<EventItem[]> {
  try {
    const docs = await client.fetch(EVENTS_QUERY);
    if (Array.isArray(docs) && docs.length > 0) {
      return docs.map(mapSanityEvent);
    }
  } catch (err) {
    console.error("[Sanity] Failed to fetch events:", err);
  }
  return ALL_EVENTS;
}

export async function fetchSanityEventBySlug(slug: string): Promise<EventDetail> {
  try {
    const doc = await client.fetch(EVENT_BY_SLUG_QUERY, { slug });
    if (doc) {
      return mapSanityEventDetail(doc);
    }
  } catch (err) {
    console.error(`[Sanity] Failed to fetch event ${slug}:`, err);
  }
  return EVENTS_DETAILS[slug] || EVENTS_DETAILS["festival-of-destiny"];
}

// ─── Blog ────────────────────────────────────────────────────────────────────
export function mapSanityBlog(doc: any): BlogPost {
  const slug = doc.slug?.current || doc._id;

  // Robust PortableText to Sections mapper supporting headings, paragraphs, and quote callouts
  const sections: {
    id: string;
    heading: string;
    paragraphs: string[];
    scripture?: { quote: string; reference: string };
  }[] = [];

  if (Array.isArray(doc.content) && doc.content.length > 0) {
    let currentSection: (typeof sections)[0] | null = null;

    doc.content.forEach((item: any, idx: number) => {
      if (item._type === "block") {
        const text = (item.children || []).map((c: any) => c.text || "").join("");
        const isHeading = ["h1", "h2", "h3", "h4"].includes(item.style);

        if (isHeading && text.trim()) {
          if (currentSection) {
            sections.push(currentSection);
          }
          currentSection = {
            id: `sec-${idx}`,
            heading: text.trim(),
            paragraphs: [],
          };
        } else if (text.trim()) {
          if (!currentSection) {
            currentSection = {
              id: `sec-${idx}`,
              heading: "Introduction",
              paragraphs: [],
            };
          }
          currentSection.paragraphs.push(text.trim());
        }
      } else if (item._type === "quote") {
        const qText = item.quote || item.text || "";
        const qRef = [item.reference, item.attribution].filter(Boolean).join(" • ") || "Scripture Reflection";
        if (!currentSection) {
          currentSection = {
            id: `sec-${idx}`,
            heading: "Reflection & Scripture",
            paragraphs: [],
          };
        }
        currentSection.scripture = {
          quote: qText,
          reference: qRef,
        };
      }
    });

    if (currentSection) {
      sections.push(currentSection);
    }
  }

  // Fallback if no explicit sections were generated
  if (sections.length === 0 && doc.excerpt) {
    sections.push({
      id: "sec-overview",
      heading: "Overview",
      paragraphs: [doc.excerpt],
    });
  }

  return {
    id: slug,
    slug,
    title: doc.title || "Untitled Article",
    category: doc.category || "Faith & everyday life",
    excerpt: doc.excerpt || "",
    author: doc.author || "CHM Editorial Team",
    date: doc.publishedAt || "",
    dateTimestamp: doc.publishedAt ? new Date(doc.publishedAt).getTime() : Date.now(),
    readTime: doc.readTime || "5 min read",
    image: doc.coverImage || "/images/blog/featured-bible-hands.png",
    coverImage: doc.coverImage || "/images/blog/article-cover.png",
    isFeatured: Boolean(doc.isFeatured),
    sections,
  };
}

export async function fetchSanityBlogs(): Promise<BlogPost[]> {
  try {
    const docs = await client.fetch(BLOG_POSTS_QUERY);
    if (Array.isArray(docs) && docs.length > 0) {
      return docs.map(mapSanityBlog);
    }
  } catch (err) {
    console.error("[Sanity] Failed to fetch blogs:", err);
  }
  return ALL_BLOG_POSTS;
}

export async function fetchSanityBlogBySlug(slug: string): Promise<BlogPost> {
  try {
    const doc = await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug });
    if (doc) {
      return mapSanityBlog(doc);
    }
  } catch (err) {
    console.error(`[Sanity] Failed to fetch blog ${slug}:`, err);
  }
  const fallback = ALL_BLOG_POSTS.find((b) => b.slug === slug);
  return fallback || FEATURED_ARTICLE;
}

// ─── Gallery ─────────────────────────────────────────────────────────────────
export function mapSanityGallery(doc: any): GalleryImage {
  return {
    id: doc._id,
    title: doc.title || "Gallery Photo",
    caption: doc.caption || "",
    imageUrl: doc.imageUrl || "",
    eventName: doc.eventName || "",
    eventTag: doc.eventTag || "General",
    date: doc.date || "",
    year: doc.year || 2026,
    month: doc.date ? new Date(doc.date).toLocaleString("default", { month: "long" }) : "",
  };
}

export async function fetchSanityGallery(): Promise<GalleryImage[]> {
  try {
    const docs = await client.fetch(GALLERY_QUERY);
    if (Array.isArray(docs) && docs.length > 0) {
      return docs.map(mapSanityGallery);
    }
  } catch (err) {
    console.error("[Sanity] Failed to fetch gallery:", err);
  }
  return GALLERY_IMAGES;
}

// ─── Leadership ──────────────────────────────────────────────────────────────
export function mapSanityLeader(doc: any): Leader {
  const slug = doc.slug?.current || doc._id;
  let category: "senior" | "associate" | "director" | "elders" = "associate";
  if (doc.category === "pastoral" || doc.category === "senior" || doc.order === 1) {
    category = "senior";
  } else if (doc.category === "assistant" || doc.category === "associate") {
    category = "associate";
  } else if (doc.category === "ministry" || doc.category === "director") {
    category = "director";
  } else if (doc.category === "executive" || doc.category === "elders") {
    category = "elders";
  }

  const bioText = blocksToPlainText(doc.bio) || "";
  const bioParagraphs = blocksToParagraphs(doc.bio);
  const fullBio = Array.isArray(doc.fullBio) && doc.fullBio.length > 0
    ? doc.fullBio
    : bioParagraphs.length > 0
    ? bioParagraphs
    : [
        `${doc.name} serves faithfully at RCCG Court of His Majesty, advancing spiritual excellence and kingdom growth.`
      ];

  return {
    id: slug,
    name: doc.name || "Church Leader",
    role: doc.role || "Pastoral Ministry",
    category,
    image: doc.image || doc.imageUrl || "/images/explore/teachings.webp",
    shortBio: bioText || fullBio[0] || "",
    fullBio,
    scripture: doc.scripture || {
      quote: "“And my speech and my preaching was not with enticing words of man's wisdom, but in demonstration of the Spirit and of power.”",
      reference: "1 Corinthians 2:4",
    },
    responsibilities: Array.isArray(doc.responsibilities) && doc.responsibilities.length > 0
      ? doc.responsibilities
      : [
          `${doc.role} and spiritual direction`,
          "Pulpit ministry and pastoral care",
          "Mentorship and community discipleship",
        ],
    contactEmail: doc.contactEmail || "info@rccgchm.com",
  };
}

export async function fetchSanityLeadership(): Promise<Leader[]> {
  try {
    const docs = await client.fetch(LEADERSHIP_QUERY);
    if (Array.isArray(docs) && docs.length > 0) {
      return docs.map(mapSanityLeader);
    }
  } catch (err) {
    console.error("[Sanity] Failed to fetch leadership:", err);
  }
  return [SENIOR_PASTORS, ...LEADERSHIP_TEAM];
}

// ─── House Fellowship ────────────────────────────────────────────────────────
export function mapSanityHouseFellowship(doc: any): FellowshipCenter {
  const id = doc.slug?.current || doc._id;
  const rawLandmark = doc.landmark || "Abesan";
  const landmark: "Abesan" | "Ayobo" | "Isefun" | "Mosan" | "Gowon Estate" | "Ipaja" =
    ["Abesan", "Ayobo", "Isefun", "Mosan", "Gowon Estate", "Ipaja"].includes(rawLandmark)
      ? (rawLandmark as any)
      : "Abesan";

  return {
    id,
    name: doc.centerName || "House Fellowship Center",
    landmark,
    landmarkArea: doc.landmarkArea || `${rawLandmark} District`,
    address: doc.address || "",
    hostName: doc.hostName || "Host Minister",
    hostPhone: doc.hostPhone || "",
    meetingTime: doc.meetingTime || "5:00 PM – 6:00 PM",
    meetingDay: doc.meetingDay || "Sundays",
    directionsHint: doc.directionsHint || `Located within ${rawLandmark}`,
  };
}

export async function fetchSanityHouseFellowship(): Promise<FellowshipCenter[]> {
  try {
    const docs = await client.fetch(HOUSE_FELLOWSHIP_QUERY);
    if (Array.isArray(docs) && docs.length > 0) {
      return docs.map(mapSanityHouseFellowship);
    }
  } catch (err) {
    console.error("[Sanity] Failed to fetch house fellowship:", err);
  }
  return HOUSE_FELLOWSHIP_CENTERS;
}

// ─── Watch Online & Livestream ───────────────────────────────────────────────
export interface WatchOnlineSettings {
  title: string;
  youtubeId: string;
  isLive: boolean;
  serviceName: string;
  speaker: string;
  scripturePassage: string;
  description: string;
}

export const DEFAULT_WATCH_ONLINE: WatchOnlineSettings = {
  title: "Watch Online & Experience God's Presence",
  youtubeId: "GAtafaSSyxw",
  isLive: true,
  serviceName: "Sunday Celebration Service",
  speaker: "Pastor Fred Odekhian",
  scripturePassage: "1 Corinthians 2:4",
  description: "Join us live online from anywhere in the world and experience transformative worship and the undiluted Word of God.",
};

export async function fetchSanityWatchOnline(): Promise<WatchOnlineSettings> {
  try {
    const doc = await client.fetch(WATCH_ONLINE_QUERY);
    if (doc) {
      return {
        title: doc.title || DEFAULT_WATCH_ONLINE.title,
        youtubeId: extractYouTubeId(doc.youtubeId) || DEFAULT_WATCH_ONLINE.youtubeId,
        isLive: typeof doc.isLive === "boolean" ? doc.isLive : DEFAULT_WATCH_ONLINE.isLive,
        serviceName: doc.serviceName || DEFAULT_WATCH_ONLINE.serviceName,
        speaker: doc.speaker || DEFAULT_WATCH_ONLINE.speaker,
        scripturePassage: doc.scripturePassage || DEFAULT_WATCH_ONLINE.scripturePassage,
        description: blocksToPlainText(doc.description) || DEFAULT_WATCH_ONLINE.description,
      };
    }
  } catch (err) {
    console.error("[Sanity] Failed to fetch watchOnline:", err);
  }
  return DEFAULT_WATCH_ONLINE;
}
