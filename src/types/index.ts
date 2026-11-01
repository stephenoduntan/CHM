/**
 * Shared TypeScript types for CHM Church Website
 */

// ─── Sanity Document Base ────────────────────────────────────────────────────
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

// ─── Image ───────────────────────────────────────────────────────────────────
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

// ─── Author ──────────────────────────────────────────────────────────────────
export interface Author extends SanityDocument {
  _type: "author";
  name: string;
  slug: { current: string };
  image?: SanityImage;
  bio?: string;
  role?: string;
}

// ─── Category ────────────────────────────────────────────────────────────────
export interface Category extends SanityDocument {
  _type: "category";
  title: string;
  slug: { current: string };
  description?: string;
}

// ─── Sermon ──────────────────────────────────────────────────────────────────
export interface Sermon extends SanityDocument {
  _type: "sermon";
  title: string;
  slug: { current: string };
  speaker: Author;
  date: string;
  series?: string;
  description?: string;
  videoUrl?: string;
  audioUrl?: string;
  scriptureReferences?: string[];
  image?: SanityImage;
  notes?: PortableTextBlock[];
}

// ─── Event ───────────────────────────────────────────────────────────────────
export interface ChurchEvent extends SanityDocument {
  _type: "event";
  title: string;
  slug: { current: string };
  date: string;
  endDate?: string;
  time?: string;
  location?: string;
  description?: string;
  image?: SanityImage;
  registrationUrl?: string;
  isFeatured?: boolean;
  body?: PortableTextBlock[];
}

// ─── Blog Post ───────────────────────────────────────────────────────────────
export interface BlogPost extends SanityDocument {
  _type: "blog";
  title: string;
  slug: { current: string };
  author: Author;
  publishedAt: string;
  excerpt?: string;
  body: PortableTextBlock[];
  featuredImage?: SanityImage;
  categories?: Category[];
  tags?: string[];
}

// ─── Podcast Episode ─────────────────────────────────────────────────────────
export interface PodcastEpisode extends SanityDocument {
  _type: "podcast";
  title: string;
  slug: { current: string };
  episodeNumber: number;
  season?: number;
  audioUrl: string;
  duration?: string;
  description?: string;
  showNotes?: PortableTextBlock[];
  guests?: string[];
  image?: SanityImage;
  publishedAt: string;
}

// ─── Site Settings ───────────────────────────────────────────────────────────
export interface SiteSettings extends SanityDocument {
  _type: "siteSettings";
  title: string;
  description: string;
  logo?: SanityImage;
  address?: string;
  phone?: string;
  email?: string;
  serviceTimes?: {
    day: string;
    time: string;
    service: string;
  }[];
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

// ─── Portable Text (Rich Content) ────────────────────────────────────────────
export interface PortableTextBlock {
  _type: string;
  _key: string;
  children?: {
    _type: string;
    _key: string;
    text: string;
    marks?: string[];
  }[];
  markDefs?: {
    _type: string;
    _key: string;
    href?: string;
  }[];
  style?: string;
  level?: number;
  listItem?: string;
}

// ─── Navigation ──────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

