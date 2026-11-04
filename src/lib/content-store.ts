"use client";

import { useState, useEffect } from "react";
import { SERMONS_DATA, Sermon } from "@/lib/sermons-data";
import { ALL_EVENTS, EventItem } from "@/lib/events-data";
import { ALL_BLOG_POSTS, BlogPost } from "@/lib/blog-data";
import { GALLERY_IMAGES, GalleryImage } from "@/lib/gallery-data";

export const STORAGE_KEYS = {
  SERMONS: "chm_managed_sermons_v1",
  EVENTS: "chm_managed_events_v1",
  BLOGS: "chm_managed_blogs_v1",
  GALLERY: "chm_managed_gallery_v1",
} as const;

export const SYNC_EVENT_NAME = "chm_content_sync";

function triggerSync(type: "sermons" | "events" | "blogs" | "gallery" | "all") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(SYNC_EVENT_NAME, { detail: { type } }));
  }
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

// ─── Reset Store ─────────────────────────────────────────────────────────────
export function resetContentStore(type: "all" | "sermons" | "events" | "blogs" | "gallery" = "all") {
  if (typeof window === "undefined") return;
  if (type === "all" || type === "sermons") localStorage.removeItem(STORAGE_KEYS.SERMONS);
  if (type === "all" || type === "events") localStorage.removeItem(STORAGE_KEYS.EVENTS);
  if (type === "all" || type === "blogs") localStorage.removeItem(STORAGE_KEYS.BLOGS);
  if (type === "all" || type === "gallery") localStorage.removeItem(STORAGE_KEYS.GALLERY);
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
    triggerSync("all");
    return true;
  } catch {
    return false;
  }
}

// ─── React Hooks ─────────────────────────────────────────────────────────────
export function useManagedSermons(): [Sermon[], (items: Sermon[]) => void, boolean] {
  const [data, setData] = useState<Sermon[]>(SERMONS_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setData(getManagedSermons());
    setIsLoaded(true);

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
    setData(getManagedEvents());
    setIsLoaded(true);

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
    setData(getManagedBlogs());
    setIsLoaded(true);

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
    setData(getManagedGallery());
    setIsLoaded(true);

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

