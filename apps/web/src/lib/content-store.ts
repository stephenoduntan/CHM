"use client";

import { useState, useEffect } from "react";
import { SERMONS_DATA, Sermon } from "@/lib/sermons-data";
import { ALL_EVENTS, EventItem } from "@/lib/events-data";
import { ALL_BLOG_POSTS, BlogPost } from "@/lib/blog-data";
import { GALLERY_IMAGES, GalleryImage } from "@/lib/gallery-data";
import { Leader, SENIOR_PASTORS, LEADERSHIP_TEAM } from "@/lib/leadership-data";
import { FellowshipCenter, HOUSE_FELLOWSHIP_CENTERS } from "@/lib/house-fellowship-data";
import {
  fetchSanitySermons,
  fetchSanityEvents,
  fetchSanityBlogs,
  fetchSanityGallery,
  fetchSanityLeadership,
  fetchSanityHouseFellowship,
  fetchSanityWatchOnline,
  WatchOnlineSettings,
  DEFAULT_WATCH_ONLINE,
} from "@/lib/sanity/fetcher";

export const STORAGE_KEYS = {
  SERMONS: "chm_managed_sermons_v1",
  EVENTS: "chm_managed_events_v1",
  BLOGS: "chm_managed_blogs_v1",
  GALLERY: "chm_managed_gallery_v1",
  LEADERSHIP: "chm_managed_leadership_v1",
  HOUSE_FELLOWSHIP: "chm_managed_house_fellowship_v1",
  WATCH_ONLINE: "chm_managed_watch_online_v1",
} as const;

export const SYNC_EVENT_NAME = "chm_content_sync";

function triggerSync(type: "sermons" | "events" | "blogs" | "gallery" | "leadership" | "houseFellowship" | "watchOnline" | "all") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME, { detail: { type } }));
  }
}

// ─── Shared Bundle Fetcher (Internal API -> Sanity Client Fallback) ─────────
interface ContentBundle {
  sermons: Sermon[];
  events: EventItem[];
  blogs: BlogPost[];
  gallery: GalleryImage[];
  leadership: Leader[];
  houseFellowship: FellowshipCenter[];
  watchOnline?: WatchOnlineSettings;
}

let cachedContentPromise: Promise<ContentBundle | null> | null = null;

async function fetchManagedBundle(): Promise<ContentBundle | null> {
  if (typeof window === "undefined") return null;

  // 1. Try server-side internal API route (Zero CORS, freshest Sanity data)
  try {
    const res = await fetch("/api/content", {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.data) {
        return json.data as ContentBundle;
      }
    }
  } catch (err) {
    console.warn("[ContentStore] /api/content fetch failed, falling back to direct Sanity client:", err);
  }

  // 2. Direct Sanity client fallback
  try {
    const [sermons, events, blogs, gallery, leadership, houseFellowship, watchOnline] =
      await Promise.all([
        fetchSanitySermons(),
        fetchSanityEvents(),
        fetchSanityBlogs(),
        fetchSanityGallery(),
        fetchSanityLeadership(),
        fetchSanityHouseFellowship(),
        fetchSanityWatchOnline(),
      ]);
    return { sermons, events, blogs, gallery, leadership, houseFellowship, watchOnline };
  } catch (err) {
    console.error("[ContentStore] Sanity direct fallback failed:", err);
    return null;
  }
}

function getSharedContentBundle(): Promise<ContentBundle | null> {
  if (!cachedContentPromise) {
    cachedContentPromise = fetchManagedBundle().finally(() => {
      // Re-enable fetching after 1.5 seconds so subsequent interactions get fresh data
      setTimeout(() => {
        cachedContentPromise = null;
      }, 1500);
    });
  }
  return cachedContentPromise;
}

// ─── Sermons ─────────────────────────────────────────────────────────────────
export function getManagedSermons(): Sermon[] {
  if (typeof window === "undefined") return SERMONS_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SERMONS);
    if (!raw) return SERMONS_DATA;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SERMONS_DATA;
  } catch {
    return SERMONS_DATA;
  }
}

export function saveManagedSermons(sermons: Sermon[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.SERMONS, JSON.stringify(sermons));
    triggerSync("sermons");
  } catch (err) {
    console.error("Failed to save sermons:", err);
  }
}

// ─── Events ──────────────────────────────────────────────────────────────────
export function getManagedEvents(): EventItem[] {
  if (typeof window === "undefined") return ALL_EVENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (!raw) return ALL_EVENTS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ALL_EVENTS;
  } catch {
    return ALL_EVENTS;
  }
}

export function saveManagedEvents(events: EventItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    triggerSync("events");
  } catch (err) {
    console.error("Failed to save events:", err);
  }
}

// ─── Blogs ───────────────────────────────────────────────────────────────────
export function getManagedBlogs(): BlogPost[] {
  if (typeof window === "undefined") return ALL_BLOG_POSTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BLOGS);
    if (!raw) return ALL_BLOG_POSTS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ALL_BLOG_POSTS;
  } catch {
    return ALL_BLOG_POSTS;
  }
}

export function saveManagedBlogs(blogs: BlogPost[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
    triggerSync("blogs");
  } catch (err) {
    console.error("Failed to save blogs:", err);
  }
}

// ─── Photo Gallery ───────────────────────────────────────────────────────────
export function getManagedGallery(): GalleryImage[] {
  if (typeof window === "undefined") return GALLERY_IMAGES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (!raw) return GALLERY_IMAGES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : GALLERY_IMAGES;
  } catch {
    return GALLERY_IMAGES;
  }
}

export function saveManagedGallery(images: GalleryImage[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(images));
    triggerSync("gallery");
  } catch (err) {
    console.error("Failed to save gallery images:", err);
  }
}

// ─── Leadership ──────────────────────────────────────────────────────────────
export function getManagedLeadership(): Leader[] {
  const fallback = [SENIOR_PASTORS, ...LEADERSHIP_TEAM];
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADERSHIP);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function saveManagedLeadership(leaders: Leader[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.LEADERSHIP, JSON.stringify(leaders));
    triggerSync("leadership");
  } catch (err) {
    console.error("Failed to save leadership:", err);
  }
}

// ─── House Fellowship ────────────────────────────────────────────────────────
export function getManagedHouseFellowship(): FellowshipCenter[] {
  if (typeof window === "undefined") return HOUSE_FELLOWSHIP_CENTERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HOUSE_FELLOWSHIP);
    if (!raw) return HOUSE_FELLOWSHIP_CENTERS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : HOUSE_FELLOWSHIP_CENTERS;
  } catch {
    return HOUSE_FELLOWSHIP_CENTERS;
  }
}

export function saveManagedHouseFellowship(centers: FellowshipCenter[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.HOUSE_FELLOWSHIP, JSON.stringify(centers));
    triggerSync("houseFellowship");
  } catch (err) {
    console.error("Failed to save house fellowship:", err);
  }
}

// ─── Watch Online Settings ───────────────────────────────────────────────────
export function getManagedWatchOnline(): WatchOnlineSettings {
  if (typeof window === "undefined") return DEFAULT_WATCH_ONLINE;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WATCH_ONLINE);
    if (!raw) return DEFAULT_WATCH_ONLINE;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? { ...DEFAULT_WATCH_ONLINE, ...parsed } : DEFAULT_WATCH_ONLINE;
  } catch {
    return DEFAULT_WATCH_ONLINE;
  }
}

export function saveManagedWatchOnline(settings: WatchOnlineSettings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.WATCH_ONLINE, JSON.stringify(settings));
    triggerSync("watchOnline");
  } catch (err) {
    console.error("Failed to save watchOnline settings:", err);
  }
}

// ─── Reset Store ─────────────────────────────────────────────────────────────
export function resetContentStore(
  type: "all" | "sermons" | "events" | "blogs" | "gallery" | "leadership" | "houseFellowship" | "watchOnline" = "all"
) {
  if (typeof window === "undefined") return;
  if (type === "all" || type === "sermons") localStorage.removeItem(STORAGE_KEYS.SERMONS);
  if (type === "all" || type === "events") localStorage.removeItem(STORAGE_KEYS.EVENTS);
  if (type === "all" || type === "blogs") localStorage.removeItem(STORAGE_KEYS.BLOGS);
  if (type === "all" || type === "gallery") localStorage.removeItem(STORAGE_KEYS.GALLERY);
  if (type === "all" || type === "leadership") localStorage.removeItem(STORAGE_KEYS.LEADERSHIP);
  if (type === "all" || type === "houseFellowship") localStorage.removeItem(STORAGE_KEYS.HOUSE_FELLOWSHIP);
  if (type === "all" || type === "watchOnline") localStorage.removeItem(STORAGE_KEYS.WATCH_ONLINE);
  triggerSync(type);
}

// ─── Backup & Restore ────────────────────────────────────────────────────────
export function exportContentBackup(): string {
  const backup = {
    church: "RCCG Court of His Majesty",
    timestamp: new Date().toISOString(),
    version: "1.0",
    sermons: getManagedSermons(),
    events: getManagedEvents(),
    blogs: getManagedBlogs(),
    gallery: getManagedGallery(),
    leadership: getManagedLeadership(),
    houseFellowship: getManagedHouseFellowship(),
  };
  return JSON.stringify(backup, null, 2);
}

export function importContentBackup(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.sermons && Array.isArray(parsed.sermons)) saveManagedSermons(parsed.sermons);
    if (parsed.events && Array.isArray(parsed.events)) saveManagedEvents(parsed.events);
    if (parsed.blogs && Array.isArray(parsed.blogs)) saveManagedBlogs(parsed.blogs);
    if (parsed.gallery && Array.isArray(parsed.gallery)) saveManagedGallery(parsed.gallery);
    if (parsed.leadership && Array.isArray(parsed.leadership)) saveManagedLeadership(parsed.leadership);
    if (parsed.houseFellowship && Array.isArray(parsed.houseFellowship)) saveManagedHouseFellowship(parsed.houseFellowship);
    triggerSync("all");
    return true;
  } catch {
    return false;
  }
}

// ─── React Hooks with Sanity Live Synchronization ───────────────────────────
export function useManagedSermons(): [Sermon[], (items: Sermon[]) => void, boolean] {
  const [data, setData] = useState<Sermon[]>(SERMONS_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const local = getManagedSermons();
    setData(local);
    setIsLoaded(true);

    getSharedContentBundle()
      .then((bundle) => {
        if (bundle && Array.isArray(bundle.sermons) && bundle.sermons.length > 0) {
          setData(bundle.sermons);
          saveManagedSermons(bundle.sermons);
        }
      })
      .catch((err) => {
        console.warn("[Sanity] Live sermons fetch fallback:", err);
      });

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ type?: string }>;
      if (!customEvent.detail || customEvent.detail.type === "sermons" || customEvent.detail.type === "all") {
        setData(getManagedSermons());
      }
    };

    window.addEventListener(SYNC_EVENT_NAME, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener(SYNC_EVENT_NAME, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const update = (items: Sermon[]) => {
    setData(items);
    saveManagedSermons(items);
  };

  return [data, update, isLoaded];
}

export function useManagedEvents(): [EventItem[], (items: EventItem[]) => void, boolean] {
  const [data, setData] = useState<EventItem[]>(ALL_EVENTS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const local = getManagedEvents();
    setData(local);
    setIsLoaded(true);

    getSharedContentBundle()
      .then((bundle) => {
        if (bundle && Array.isArray(bundle.events) && bundle.events.length > 0) {
          setData(bundle.events);
          saveManagedEvents(bundle.events);
        }
      })
      .catch((err) => {
        console.warn("[Sanity] Live events fetch fallback:", err);
      });

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ type?: string }>;
      if (!customEvent.detail || customEvent.detail.type === "events" || customEvent.detail.type === "all") {
        setData(getManagedEvents());
      }
    };

    window.addEventListener(SYNC_EVENT_NAME, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener(SYNC_EVENT_NAME, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const update = (items: EventItem[]) => {
    setData(items);
    saveManagedEvents(items);
  };

  return [data, update, isLoaded];
}

export function useManagedBlogs(): [BlogPost[], (items: BlogPost[]) => void, boolean] {
  const [data, setData] = useState<BlogPost[]>(ALL_BLOG_POSTS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const local = getManagedBlogs();
    setData(local);
    setIsLoaded(true);

    getSharedContentBundle()
      .then((bundle) => {
        if (bundle && Array.isArray(bundle.blogs) && bundle.blogs.length > 0) {
          setData(bundle.blogs);
          saveManagedBlogs(bundle.blogs);
        }
      })
      .catch((err) => {
        console.warn("[Sanity] Live blogs fetch fallback:", err);
      });

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ type?: string }>;
      if (!customEvent.detail || customEvent.detail.type === "blogs" || customEvent.detail.type === "all") {
        setData(getManagedBlogs());
      }
    };

    window.addEventListener(SYNC_EVENT_NAME, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener(SYNC_EVENT_NAME, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const update = (items: BlogPost[]) => {
    setData(items);
    saveManagedBlogs(items);
  };

  return [data, update, isLoaded];
}

export function useManagedGallery(): [GalleryImage[], (items: GalleryImage[]) => void, boolean] {
  const [data, setData] = useState<GalleryImage[]>(GALLERY_IMAGES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const local = getManagedGallery();
    setData(local);
    setIsLoaded(true);

    getSharedContentBundle()
      .then((bundle) => {
        if (bundle && Array.isArray(bundle.gallery) && bundle.gallery.length > 0) {
          setData(bundle.gallery);
          saveManagedGallery(bundle.gallery);
        }
      })
      .catch((err) => {
        console.warn("[Sanity] Live gallery fetch fallback:", err);
      });

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ type?: string }>;
      if (!customEvent.detail || customEvent.detail.type === "gallery" || customEvent.detail.type === "all") {
        setData(getManagedGallery());
      }
    };

    window.addEventListener(SYNC_EVENT_NAME, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener(SYNC_EVENT_NAME, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const update = (items: GalleryImage[]) => {
    setData(items);
    saveManagedGallery(items);
  };

  return [data, update, isLoaded];
}

export function useManagedLeadership(): [Leader[], (items: Leader[]) => void, boolean] {
  const fallback = [SENIOR_PASTORS, ...LEADERSHIP_TEAM];
  const [data, setData] = useState<Leader[]>(fallback);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const local = getManagedLeadership();
    setData(local);
    setIsLoaded(true);

    getSharedContentBundle()
      .then((bundle) => {
        if (bundle && Array.isArray(bundle.leadership) && bundle.leadership.length > 0) {
          setData(bundle.leadership);
          saveManagedLeadership(bundle.leadership);
        }
      })
      .catch((err) => {
        console.warn("[Sanity] Live leadership fetch fallback:", err);
      });

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ type?: string }>;
      if (!customEvent.detail || customEvent.detail.type === "leadership" || customEvent.detail.type === "all") {
        setData(getManagedLeadership());
      }
    };

    window.addEventListener(SYNC_EVENT_NAME, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener(SYNC_EVENT_NAME, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const update = (items: Leader[]) => {
    setData(items);
    saveManagedLeadership(items);
  };

  return [data, update, isLoaded];
}

export function useManagedHouseFellowship(): [FellowshipCenter[], (items: FellowshipCenter[]) => void, boolean] {
  const [data, setData] = useState<FellowshipCenter[]>(HOUSE_FELLOWSHIP_CENTERS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const local = getManagedHouseFellowship();
    setData(local);
    setIsLoaded(true);

    getSharedContentBundle()
      .then((bundle) => {
        if (bundle && Array.isArray(bundle.houseFellowship) && bundle.houseFellowship.length > 0) {
          setData(bundle.houseFellowship);
          saveManagedHouseFellowship(bundle.houseFellowship);
        }
      })
      .catch((err) => {
        console.warn("[Sanity] Live house fellowship fetch fallback:", err);
      });

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ type?: string }>;
      if (!customEvent.detail || customEvent.detail.type === "houseFellowship" || customEvent.detail.type === "all") {
        setData(getManagedHouseFellowship());
      }
    };

    window.addEventListener(SYNC_EVENT_NAME, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener(SYNC_EVENT_NAME, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const update = (items: FellowshipCenter[]) => {
    setData(items);
    saveManagedHouseFellowship(items);
  };

  return [data, update, isLoaded];
}

export function useManagedWatchOnline(): [WatchOnlineSettings, (settings: WatchOnlineSettings) => void, boolean] {
  const [data, setData] = useState<WatchOnlineSettings>(DEFAULT_WATCH_ONLINE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const local = getManagedWatchOnline();
    setData(local);
    setIsLoaded(true);

    getSharedContentBundle()
      .then((bundle) => {
        if (bundle && bundle.watchOnline) {
          setData(bundle.watchOnline);
          saveManagedWatchOnline(bundle.watchOnline);
        }
      })
      .catch((err) => {
        console.warn("[Sanity] Live watchOnline fetch fallback:", err);
      });

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ type?: string }>;
      if (!customEvent.detail || customEvent.detail.type === "watchOnline" || customEvent.detail.type === "all") {
        setData(getManagedWatchOnline());
      }
    };

    window.addEventListener(SYNC_EVENT_NAME, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener(SYNC_EVENT_NAME, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  const update = (settings: WatchOnlineSettings) => {
    setData(settings);
    saveManagedWatchOnline(settings);
  };

  return [data, update, isLoaded];
}
