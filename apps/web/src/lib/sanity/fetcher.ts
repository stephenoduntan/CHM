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
} from "./queries";
import { Sermon, SERMONS_DATA, DEFAULT_SERMON } from "@/lib/sermons-data";
import { EventItem, EventDetail, ALL_EVENTS, EVENTS_DETAILS } from "@/lib/events-data";
import { BlogPost, ALL_BLOG_POSTS, FEATURED_ARTICLE } from "@/lib/blog-data";
import { GalleryImage, GALLERY_IMAGES } from "@/lib/gallery-data";

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
    description: doc.description || "",
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
  return {
    id: slug,
    title: doc.title || "Untitled Event",
    theme: doc.theme || "",
    date: doc.date || "",
    time: doc.time || "6:00 PM Daily",
    location: doc.venue || "Main Auditorium, RCCG Court of His Majesty",
    posterImage: doc.posterImage || "/images/events/fod-2026-poster.webp",
    videoUrl: doc.videoUrl || "/videos/FOD 2026.webm",
    isPast: Boolean(doc.isPast),
    badge: doc.badge || "Church Event",
    description: doc.description || "",
    gallery: doc.gallery || [],
    link: `/events/${slug}`,
  };
}

export function mapSanityEventDetail(doc: any): EventDetail {
  const slug = doc.slug?.current || doc._id;
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
    posterImage: doc.posterImage || "/images/events/fod-2026-poster.webp",
    aboutTitle: "About the event",
    overviewParagraph1: doc.description || doc.title,
    overviewParagraph2: `Date: ${doc.date} • Venue: ${doc.venue || "Church Auditorium"}`,
    inviteHeading: "Come with someone",
    inviteCopy: "Invite a friend or family member to join you.",
    calendarEvent: {
      title: `${doc.title}${doc.theme ? ` - ${doc.theme}` : ""}`,
      description: doc.description || doc.title,
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
    sections: Array.isArray(doc.content)
      ? doc.content
          .filter((b: any) => b._type === "block" && Array.isArray(b.children))
          .map((b: any, idx: number) => ({
            id: `sec-${idx}`,
            heading: b.style === "h2" || b.style === "h3" ? b.children.map((c: any) => c.text).join("") : "",
            paragraphs: [b.children.map((c: any) => c.text).join("")],
          }))
      : [],
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
