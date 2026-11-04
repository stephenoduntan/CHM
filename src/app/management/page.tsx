"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Video,
  Calendar,
  FileText,
  Camera,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  ExternalLink,
  Search,
  Sparkles,
  RefreshCw,
  Download,
  Upload,
  Eye,
  Image as ImageIcon,
  X,
  AlertCircle,
  ArrowRight,
  Clock,
  MapPin,
  User,
  Tag,
  Check,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";
import {
  useManagedSermons,
  useManagedEvents,
  useManagedBlogs,
  useManagedGallery,
  resetContentStore,
  exportContentBackup,
  importContentBackup,
} from "@/lib/content-store";
import { Sermon } from "@/lib/sermons-data";
import { EventItem } from "@/lib/events-data";
import { BlogPost } from "@/lib/blog-data";
import { GalleryImage } from "@/lib/gallery-data";

type TabType = "sermons" | "events" | "blogs" | "gallery";

export default function ManagementPortal() {
  const [activeTab, setActiveTab] = useState<TabType>("sermons");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // Live Managed Stores
  const [sermons, setSermons, sermonsLoaded] = useManagedSermons();
  const [events, setEvents, eventsLoaded] = useManagedEvents();
  const [blogs, setBlogs, blogsLoaded] = useManagedBlogs();
  const [gallery, setGallery, galleryLoaded] = useManagedGallery();

  // Feedback banner state
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Modal State for Add / Edit
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string; type: TabType } | null>(null);

  // Form State
  const [sermonForm, setSermonForm] = useState({
    id: "",
    title: "",
    speaker: "Pastor Fred Odekhian",
    series: "Sunday Celebration",
    date: "October 24, 2026",
    duration: "1 hr 15 mins",
    biblePassage: "1 Corinthians 2:4",
    youtubeId: "vBvP_h0k_X8",
    description: "",
    thumbnail: "/images/sermons/sermon-hero-video.png",
    keyPoints: "",
  });

  const [eventForm, setEventForm] = useState({
    id: "",
    title: "",
    theme: "",
    date: "November 8th - 15th, 2026",
    startDateIso: "2026-11-08T18:00:00Z",
    time: "6:00 PM Daily",
    location: "Church Auditorium",
    badge: "Special Service",
    image: "/images/events/fod-2026-poster.webp",
    description: "",
    isPast: false,
  });

  const [blogForm, setBlogForm] = useState({
    id: "",
    title: "",
    author: "Pastor Fred Odekhian",
    category: "Faith & everyday life",
    date: "October 24, 2026",
    readTime: "5 min read",
    excerpt: "",
    image: "/images/blog/article-cover.png",
    content: "",
  });

  const [galleryForm, setGalleryForm] = useState({
    id: "",
    title: "",
    caption: "",
    imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
    eventName: "Sunday Celebration Service",
    eventTag: "Sunday Service",
    date: "October 24, 2026",
    year: 2026,
  });

  // Open Add Modal
  const handleOpenAdd = () => {
    setModalMode("add");
    setEditingItemId(null);

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    if (activeTab === "sermons") {
      setSermonForm({
        id: `sermon-${Date.now()}`,
        title: "",
        speaker: "Pastor Fred Odekhian",
        series: "Destiny Series",
        date: formattedDate,
        duration: "1 hr 15 mins",
        biblePassage: "",
        youtubeId: "GAtafaSSyxw",
        description: "",
        thumbnail: "/images/sermons/sermon-hero-video.png",
        keyPoints: "",
      });
    } else if (activeTab === "events") {
      setEventForm({
        id: `event-${Date.now()}`,
        title: "",
        theme: "",
        date: formattedDate,
        startDateIso: now.toISOString(),
        time: "6:00 PM Daily",
        location: "Church Auditorium",
        badge: "Special Encounter",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
        description: "",
        isPast: false,
      });
    } else if (activeTab === "blogs") {
      setBlogForm({
        id: `blog-${Date.now()}`,
        title: "",
        author: "CHM Editorial Team",
        category: "Faith & everyday life",
        date: formattedDate,
        readTime: "4 min read",
        excerpt: "",
        image: "/images/blog/featured-bible-hands.png",
        content: "",
      });
    } else if (activeTab === "gallery") {
      setGalleryForm({
        id: `photo-${Date.now()}`,
        title: "",
        caption: "",
        imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
        eventName: "Church Celebration Encounter",
        eventTag: "Sunday Service",
        date: formattedDate,
        year: now.getFullYear(),
      });
    }

    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (id: string) => {
    setModalMode("edit");
    setEditingItemId(id);

    if (activeTab === "sermons") {
      const item = sermons.find((s) => s.id === id);
      if (item) {
        setSermonForm({
          id: item.id,
          title: item.title,
          speaker: item.speaker,
          series: item.series,
          date: item.date,
          duration: item.duration,
          biblePassage: item.biblePassage || "",
          youtubeId: item.youtubeId,
          description: item.description,
          thumbnail: item.thumbnail,
          keyPoints: item.keyPoints ? item.keyPoints.join("\n") : "",
        });
      }
    } else if (activeTab === "events") {
      const item = events.find((e) => e.id === id);
      if (item) {
        setEventForm({
          id: item.id,
          title: item.title,
          theme: item.theme,
          date: item.date,
          startDateIso: item.startDateIso || new Date().toISOString(),
          time: item.time,
          location: item.location,
          badge: item.badge,
          image: item.image,
          description: item.description,
          isPast: !!item.isPast,
        });
      }
    } else if (activeTab === "blogs") {
      const item = blogs.find((b) => b.id === id || b.slug === id);
      if (item) {
        const textContent = item.sections?.map((s) => `${s.heading}\n${s.paragraphs.join("\n\n")}`).join("\n\n") || "";
        setBlogForm({
          id: item.id,
          title: item.title,
          author: item.author,
          category: item.category,
          date: item.date,
          readTime: item.readTime,
          excerpt: item.excerpt,
          image: item.coverImage || item.image,
          content: textContent,
        });
      }
    } else if (activeTab === "gallery") {
      const item = gallery.find((g) => g.id === id);
      if (item) {
        setGalleryForm({
          id: item.id,
          title: item.title,
          caption: item.caption || "",
          imageUrl: item.imageUrl,
          eventName: item.eventName,
          eventTag: item.eventTag,
          date: item.date,
          year: item.year,
        });
      }
    }

    setIsModalOpen(true);
  };

  // Submit Form (Add or Edit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "sermons") {
      const keyPointsArray = sermonForm.keyPoints
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean);

      const updatedSermon: Sermon = {
        id: sermonForm.id || `sermon-${Date.now()}`,
        title: sermonForm.title.trim(),
        speaker: sermonForm.speaker.trim() || "Pastor Fred Odekhian",
        series: sermonForm.series.trim() || "General Sermons",
        date: sermonForm.date.trim(),
        duration: sermonForm.duration.trim() || "1 hr 15 mins",
        biblePassage: sermonForm.biblePassage.trim() || undefined,
        youtubeId: sermonForm.youtubeId.trim() || "GAtafaSSyxw",
        description: sermonForm.description.trim() || sermonForm.title,
        supportingCopy: "Watch the full message and continue exploring sermons from Court of His Majesty.",
        thumbnail: sermonForm.thumbnail.trim() || "/images/sermons/sermon-hero-video.png",
        keyPoints: keyPointsArray.length > 0 ? keyPointsArray : undefined,
      };

      if (modalMode === "edit" && editingItemId) {
        setSermons(sermons.map((s) => (s.id === editingItemId ? updatedSermon : s)));
        showNotification(`Updated sermon: "${updatedSermon.title}"`);
      } else {
        setSermons([updatedSermon, ...sermons]);
        showNotification(`Added new sermon: "${updatedSermon.title}"`);
      }
    } else if (activeTab === "events") {
      const safeId = eventForm.id || eventForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const updatedEvent: EventItem = {
        id: safeId,
        title: eventForm.title.trim(),
        theme: eventForm.theme.trim() || "Encounter Service",
        watermark: [eventForm.theme.slice(0, 10).toUpperCase(), "ENCOUNTER"],
        date: eventForm.date.trim(),
        startDateIso: eventForm.startDateIso,
        time: eventForm.time.trim() || "6:00 PM Daily",
        location: eventForm.location.trim() || "Church Auditorium",
        description: eventForm.description.trim() || eventForm.title,
        image: eventForm.image.trim() || "/images/events/fod-2026-poster.webp",
        badge: eventForm.badge.trim() || "Church Event",
        isPast: eventForm.isPast,
      };

      if (modalMode === "edit" && editingItemId) {
        setEvents(events.map((e) => (e.id === editingItemId ? updatedEvent : e)));
        showNotification(`Updated event: "${updatedEvent.title}"`);
      } else {
        setEvents([updatedEvent, ...events]);
        showNotification(`Added new event: "${updatedEvent.title}"`);
      }
    } else if (activeTab === "blogs") {
      const slug = blogForm.id || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const paragraphs = blogForm.content
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean);

      const updatedBlog: BlogPost = {
        id: slug,
        slug: slug,
        title: blogForm.title.trim(),
        author: blogForm.author.trim() || "CHM Editorial Team",
        category: blogForm.category.trim() || "Faith & everyday life",
        date: blogForm.date.trim(),
        dateTimestamp: new Date().getTime(),
        readTime: blogForm.readTime.trim() || "5 min read",
        excerpt: blogForm.excerpt.trim() || blogForm.title,
        image: blogForm.image.trim() || "/images/blog/featured-bible-hands.png",
        coverImage: blogForm.image.trim() || "/images/blog/article-cover.png",
        sections: paragraphs.length > 0 ? [{ id: "section-1", heading: "Reflection & Truth", paragraphs }] : undefined,
      };

      if (modalMode === "edit" && editingItemId) {
        setBlogs(blogs.map((b) => (b.id === editingItemId || b.slug === editingItemId ? updatedBlog : b)));
        showNotification(`Updated blog article: "${updatedBlog.title}"`);
      } else {
        setBlogs([updatedBlog, ...blogs]);
        showNotification(`Added new blog article: "${updatedBlog.title}"`);
      }
    } else if (activeTab === "gallery") {
      const updatedGallery: GalleryImage = {
        id: galleryForm.id || `photo-${Date.now()}`,
        title: galleryForm.title.trim(),
        caption: galleryForm.caption.trim() || undefined,
        imageUrl: galleryForm.imageUrl.trim(),
        eventName: galleryForm.eventName.trim() || "Church Fellowship",
        eventTag: galleryForm.eventTag.trim() || "General",
        date: galleryForm.date.trim(),
        year: Number(galleryForm.year) || 2026,
        month: galleryForm.date.split(" ")[0] || "October",
      };

      if (modalMode === "edit" && editingItemId) {
        setGallery(gallery.map((g) => (g.id === editingItemId ? updatedGallery : g)));
        showNotification(`Updated photo: "${updatedGallery.title}"`);
      } else {
        setGallery([updatedGallery, ...gallery]);
        showNotification(`Added new photo to gallery: "${updatedGallery.title}"`);
      }
    }

    setIsModalOpen(false);
  };

  // Delete Action
  const confirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === "sermons") {
      setSermons(sermons.filter((s) => s.id !== deleteTarget.id));
      showNotification(`Deleted sermon: "${deleteTarget.title}"`);
    } else if (deleteTarget.type === "events") {
      setEvents(events.filter((e) => e.id !== deleteTarget.id));
      showNotification(`Deleted event: "${deleteTarget.title}"`);
    } else if (deleteTarget.type === "blogs") {
      setBlogs(blogs.filter((b) => b.id !== deleteTarget.id && b.slug !== deleteTarget.id));
      showNotification(`Deleted blog: "${deleteTarget.title}"`);
    } else if (deleteTarget.type === "gallery") {
      setGallery(gallery.filter((g) => g.id !== deleteTarget.id));
      showNotification(`Deleted photo: "${deleteTarget.title}"`);
    }

    setDeleteTarget(null);
  };

  // Restore Defaults
  const handleResetDefaults = () => {
    if (window.confirm("Are you sure you want to reset all site content to church default seed data? This will overwrite local additions.")) {
      resetContentStore("all");
      showNotification("All website content has been reset to defaults!");
    }
  };

  // Backup Export
  const handleExportBackup = () => {
    const json = exportContentBackup();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CHM_Website_Content_Backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showNotification("Backup file downloaded successfully!");
  };

  // Backup Import
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const success = importContentBackup(text);
      if (success) {
        showNotification("Content restored from backup file successfully!");
      } else {
        alert("Invalid backup file format. Please upload a valid JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Filtered views for active tab
  const filteredSermons = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return sermons.filter((s) => {
      const matchSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.speaker.toLowerCase().includes(q) ||
        s.series.toLowerCase().includes(q);
      const matchCat = filterCategory === "All" || s.series === filterCategory;
      return matchSearch && matchCat;
    });
  }, [sermons, searchQuery, filterCategory]);

  const filteredEvents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return events.filter((e) => {
      const matchSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.theme.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q);
      const matchCat =
        filterCategory === "All" ||
        (filterCategory === "Upcoming" && !e.isPast) ||
        (filterCategory === "Past" && e.isPast);
      return matchSearch && matchCat;
    });
  }, [events, searchQuery, filterCategory]);

  const filteredBlogs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return blogs.filter((b) => {
      const matchSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q);
      const matchCat = filterCategory === "All" || b.category === filterCategory;
      return matchSearch && matchCat;
    });
  }, [blogs, searchQuery, filterCategory]);

  const filteredGallery = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return gallery.filter((g) => {
      const matchSearch =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.eventName.toLowerCase().includes(q) ||
        g.eventTag.toLowerCase().includes(q);
      const matchCat = filterCategory === "All" || g.eventTag === filterCategory;
      return matchSearch && matchCat;
    });
  }, [gallery, searchQuery, filterCategory]);

  // Extract unique filter categories
  const sermonSeriesOptions = useMemo(() => Array.from(new Set(sermons.map((s) => s.series))), [sermons]);
  const blogCategoryOptions = useMemo(() => Array.from(new Set(blogs.map((b) => b.category))), [blogs]);
  const galleryTagOptions = useMemo(() => Array.from(new Set(gallery.map((g) => g.eventTag))), [gallery]);

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen pt-[112px] pb-24 text-[#1a1a1a]">
      <Container className="max-w-[1400px]">
        {/* Notification Toast */}
        {notification && (
          <div className="fixed top-24 right-6 z-50 bg-[#051202] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#c8a96e]/40 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
            <CheckCircle className="size-5 text-[#c8a96e]" />
            <span className="text-sm font-medium">{notification}</span>
          </div>
        )}

        {/* ─── Header & Top Actions ───────────────────────────────────── */}
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-gray-200/80 shadow-sm mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c8a96e] mb-1.5">
              <Sparkles className="size-3.5" />
              <span>Church Media &amp; Website Administration Suite</span>
            </div>
            <h1 className="font-display font-recursive-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#051202] tracking-tight">
              Website Management Portal
            </h1>
            <p className="text-gray-500 text-sm mt-1 max-w-2xl leading-relaxed">
              Add new records, edit existing entries, and manage published content across Sermons, Events, Blogs, and Photo Gallery for {SITE_CONFIG.fullName}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Backup / Export */}
            <button
              type="button"
              onClick={handleExportBackup}
              title="Download JSON backup of all website content"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <Download className="size-3.5 text-gray-600" />
              <span>Export Backup</span>
            </button>

            {/* Import Backup */}
            <label
              title="Restore from JSON backup file"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <Upload className="size-3.5 text-gray-600" />
              <span>Import Backup</span>
              <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
            </label>

            {/* Reset to Defaults */}
            <button
              type="button"
              onClick={handleResetDefaults}
              title="Reset all content to original church defaults"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <RefreshCw className="size-3.5 text-amber-700" />
              <span>Reset Defaults</span>
            </button>

            {/* Add New Button */}
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white bg-[#051202] hover:bg-[#c8a96e] hover:text-[#051202] shadow-md transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              <Plus className="size-4" />
              <span>Add New {activeTab === "gallery" ? "Photo" : activeTab === "blogs" ? "Article" : activeTab.slice(0, -1)}</span>
            </button>
          </div>
        </div>

        {/* ─── Metric Overview Cards (Tabs) ───────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Sermons Card */}
          <div
            onClick={() => {
              setActiveTab("sermons");
              setFilterCategory("All");
              setSearchQuery("");
            }}
            className={`p-6 rounded-[24px] border cursor-pointer transition-all ${
              activeTab === "sermons"
                ? "bg-[#051202] text-white shadow-xl scale-[1.02] border-[#051202]"
                : "bg-white border-gray-200 text-gray-900 hover:border-[#c8a96e]/50 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-75">Sermons</span>
              <Video className={`size-5 ${activeTab === "sermons" ? "text-[#c8a96e]" : "text-gray-400"}`} />
            </div>
            <p className="text-3xl font-extrabold tracking-tight">{sermons.length}</p>
            <p className={`text-xs mt-2 ${activeTab === "sermons" ? "text-gray-300" : "text-gray-500"}`}>
              Video messages &amp; transcripts
            </p>
          </div>

          {/* Events Card */}
          <div
            onClick={() => {
              setActiveTab("events");
              setFilterCategory("All");
              setSearchQuery("");
            }}
            className={`p-6 rounded-[24px] border cursor-pointer transition-all ${
              activeTab === "events"
                ? "bg-[#051202] text-white shadow-xl scale-[1.02] border-[#051202]"
                : "bg-white border-gray-200 text-gray-900 hover:border-[#c8a96e]/50 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-75">Events</span>
              <Calendar className={`size-5 ${activeTab === "events" ? "text-[#c8a96e]" : "text-gray-400"}`} />
            </div>
            <p className="text-3xl font-extrabold tracking-tight">{events.length}</p>
            <p className={`text-xs mt-2 ${activeTab === "events" ? "text-gray-300" : "text-gray-500"}`}>
              {events.filter((e) => !e.isPast).length} Upcoming · {events.filter((e) => e.isPast).length} Past
            </p>
          </div>

          {/* Blogs Card */}
          <div
            onClick={() => {
              setActiveTab("blogs");
              setFilterCategory("All");
              setSearchQuery("");
            }}
            className={`p-6 rounded-[24px] border cursor-pointer transition-all ${
              activeTab === "blogs"
                ? "bg-[#051202] text-white shadow-xl scale-[1.02] border-[#051202]"
                : "bg-white border-gray-200 text-gray-900 hover:border-[#c8a96e]/50 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-75">Blogs &amp; Articles</span>
              <FileText className={`size-5 ${activeTab === "blogs" ? "text-[#c8a96e]" : "text-gray-400"}`} />
            </div>
            <p className="text-3xl font-extrabold tracking-tight">{blogs.length}</p>
            <p className={`text-xs mt-2 ${activeTab === "blogs" ? "text-gray-300" : "text-gray-500"}`}>
              Devotionals &amp; teachings
            </p>
          </div>

          {/* Photo Gallery Card */}
          <div
            onClick={() => {
              setActiveTab("gallery");
              setFilterCategory("All");
              setSearchQuery("");
            }}
            className={`p-6 rounded-[24px] border cursor-pointer transition-all ${
              activeTab === "gallery"
                ? "bg-[#051202] text-white shadow-xl scale-[1.02] border-[#051202]"
                : "bg-white border-gray-200 text-gray-900 hover:border-[#c8a96e]/50 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-75">Photo Gallery</span>
              <Camera className={`size-5 ${activeTab === "gallery" ? "text-[#c8a96e]" : "text-gray-400"}`} />
            </div>
            <p className="text-3xl font-extrabold tracking-tight">{gallery.length}</p>
            <p className={`text-xs mt-2 ${activeTab === "gallery" ? "text-gray-300" : "text-gray-500"}`}>
              High-res church event photos
            </p>
          </div>
        </div>

        {/* ─── Main Content Container ─────────────────────────────────── */}
        <div className="bg-white rounded-[32px] border border-gray-200/90 shadow-sm overflow-hidden">
          {/* Content Subheader & Filters */}
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-sans font-bold text-lg sm:text-xl text-[#051202] capitalize">
                {activeTab === "blogs" ? "Blog Articles" : activeTab === "gallery" ? "Photo Gallery" : activeTab} Management
              </span>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200/60 flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Live on website
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative min-w-[220px]">
                <Search className="size-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeTab}...`}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#051202] focus:bg-white transition-all"
                />
              </div>

              {/* Dynamic Filter Dropdown */}
              {activeTab === "sermons" && (
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#051202] text-gray-700 cursor-pointer"
                >
                  <option value="All">All Series</option>
                  {sermonSeriesOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              )}

              {activeTab === "events" && (
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#051202] text-gray-700 cursor-pointer"
                >
                  <option value="All">All Events</option>
                  <option value="Upcoming">Upcoming Only</option>
                  <option value="Past">Past Events Only</option>
                </select>
              )}

              {activeTab === "blogs" && (
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#051202] text-gray-700 cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  {blogCategoryOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              )}

              {activeTab === "gallery" && (
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-[#051202] text-gray-700 cursor-pointer"
                >
                  <option value="All">All Tags</option>
                  {galleryTagOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              )}

              {/* View Live Page Link */}
              <Link
                href={activeTab === "blogs" ? "/blog" : `/${activeTab}`}
                target="_blank"
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-[#051202] hover:text-[#c8a96e] transition-colors"
              >
                <span>View Live Page</span>
                <ExternalLink className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* ─── TAB 1: SERMONS TABLE ─────────────────────────────────── */}
          {activeTab === "sermons" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Sermon</th>
                    <th className="px-6 py-4">Preacher</th>
                    <th className="px-6 py-4">Series &amp; Passage</th>
                    <th className="px-6 py-4">Date &amp; Length</th>
                    <th className="px-6 py-4 text-center">Video</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSermons.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                        No sermons matching your filter or search query.
                      </td>
                    </tr>
                  ) : (
                    filteredSermons.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative size-12 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                              <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-semibold text-[#051202] line-clamp-1">{item.title}</p>
                              <p className="text-xs text-gray-400 line-clamp-1">{item.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700 font-medium whitespace-nowrap">{item.speaker}</td>
                        <td className="px-6 py-4">
                          <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/50 mb-1">
                            {item.series}
                          </span>
                          {item.biblePassage && (
                            <p className="text-xs text-gray-500 font-mono">{item.biblePassage}</p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap text-xs">
                          <p>{item.date}</p>
                          <p className="text-gray-400">{item.duration}</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200/50">
                            YT: {item.youtubeId}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/sermons/${item.id}`}
                              target="_blank"
                              title="View live sermon page"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-[#051202] hover:bg-gray-100 transition-colors"
                            >
                              <Eye className="size-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(item.id)}
                              title="Edit sermon details"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-[#c8a96e] hover:bg-amber-50 transition-colors cursor-pointer"
                            >
                              <Edit2 className="size-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteTarget({ id: item.id, title: item.title, type: "sermons" })}
                              title="Delete sermon"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ─── TAB 2: EVENTS TABLE ──────────────────────────────────── */}
          {activeTab === "events" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Event</th>
                    <th className="px-6 py-4">Theme</th>
                    <th className="px-6 py-4">Date &amp; Time</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredEvents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                        No events matching your filter or search query.
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative size-12 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                              <Image src={item.image} alt={item.title} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-semibold text-[#051202] line-clamp-1">{item.title}</p>
                              <span className="text-[11px] text-[#c8a96e] font-semibold">{item.badge}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700 italic font-medium">{item.theme}</td>
                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap text-xs">
                          <p className="font-medium text-gray-900">{item.date}</p>
                          <p className="text-gray-400">{item.time}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-xs">{item.location}</td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          {item.isPast ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                              Past Event
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                              <CheckCircle className="size-3" />
                              Upcoming
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/events/${item.id}`}
                              target="_blank"
                              title="View live event page"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-[#051202] hover:bg-gray-100 transition-colors"
                            >
                              <Eye className="size-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(item.id)}
                              title="Edit event details"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-[#c8a96e] hover:bg-amber-50 transition-colors cursor-pointer"
                            >
                              <Edit2 className="size-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteTarget({ id: item.id, title: item.title, type: "events" })}
                              title="Delete event"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ─── TAB 3: BLOGS TABLE ───────────────────────────────────── */}
          {activeTab === "blogs" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Article</th>
                    <th className="px-6 py-4">Author</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Published Date</th>
                    <th className="px-6 py-4 text-center">Read Time</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBlogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                        No articles matching your filter or search query.
                      </td>
                    </tr>
                  ) : (
                    filteredBlogs.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative size-12 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                              <Image src={item.coverImage || item.image} alt={item.title} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-semibold text-[#051202] line-clamp-1">{item.title}</p>
                              <p className="text-xs text-gray-400 line-clamp-1">{item.excerpt}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700 whitespace-nowrap text-xs font-medium">{item.author}</td>
                        <td className="px-6 py-4">
                          <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/50">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap text-xs">{item.date}</td>
                        <td className="px-6 py-4 text-center text-xs text-gray-500">{item.readTime}</td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/blog/${item.slug || item.id}`}
                              target="_blank"
                              title="View live blog post"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-[#051202] hover:bg-gray-100 transition-colors"
                            >
                              <Eye className="size-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(item.id)}
                              title="Edit blog article"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-[#c8a96e] hover:bg-amber-50 transition-colors cursor-pointer"
                            >
                              <Edit2 className="size-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteTarget({ id: item.id, title: item.title, type: "blogs" })}
                              title="Delete blog article"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ─── TAB 4: PHOTO GALLERY TABLE ───────────────────────────── */}
          {activeTab === "gallery" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Photo</th>
                    <th className="px-6 py-4">Associated Event</th>
                    <th className="px-6 py-4">Tag / Ministry</th>
                    <th className="px-6 py-4">Date &amp; Year</th>
                    <th className="px-6 py-4">Caption</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredGallery.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                        No photos matching your filter or search query.
                      </td>
                    </tr>
                  ) : (
                    filteredGallery.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative size-14 rounded-xl overflow-hidden bg-gray-200 shrink-0 shadow-xs border border-gray-100">
                              <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-semibold text-[#051202] line-clamp-1">{item.title}</p>
                              <p className="text-[11px] font-mono text-gray-400">ID: {item.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700 font-medium text-xs">{item.eventName}</td>
                        <td className="px-6 py-4">
                          <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/50">
                            {item.eventTag}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap text-xs">
                          <p>{item.date}</p>
                          <p className="text-gray-400 font-mono text-[11px]">{item.year}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-xs max-w-xs line-clamp-2">
                          {item.caption || "No caption provided"}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href="/gallery"
                              target="_blank"
                              title="View on live gallery page"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-[#051202] hover:bg-gray-100 transition-colors"
                            >
                              <Eye className="size-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(item.id)}
                              title="Edit photo details"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-[#c8a96e] hover:bg-amber-50 transition-colors cursor-pointer"
                            >
                              <Edit2 className="size-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteTarget({ id: item.id, title: item.title, type: "gallery" })}
                              title="Delete photo"
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>

      {/* ─── ADD / EDIT MODAL ─────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto my-8 border border-gray-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h2 className="font-display font-recursive-sans font-bold text-2xl text-[#051202] capitalize">
                  {modalMode === "add" ? "Add New" : "Edit"}{" "}
                  {activeTab === "gallery" ? "Photo" : activeTab === "blogs" ? "Blog Article" : activeTab.slice(0, -1)}
                </h2>
                <p className="text-gray-500 text-xs mt-0.5">
                  {modalMode === "add"
                    ? "Fill in the fields below to publish live to the website."
                    : "Update details and save to immediately reflect changes on the live website."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ─── SERMON FORM FIELDS ───────────────────────────────── */}
              {activeTab === "sermons" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Sermon Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={sermonForm.title}
                        onChange={(e) => setSermonForm({ ...sermonForm, title: e.target.value })}
                        placeholder="e.g. Alignment Precedes Acceleration"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Preacher / Speaker *
                      </label>
                      <input
                        type="text"
                        required
                        value={sermonForm.speaker}
                        onChange={(e) => setSermonForm({ ...sermonForm, speaker: e.target.value })}
                        placeholder="Pastor Fred Odekhian"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Series Name
                      </label>
                      <input
                        type="text"
                        value={sermonForm.series}
                        onChange={(e) => setSermonForm({ ...sermonForm, series: e.target.value })}
                        placeholder="e.g. Festival of Destiny Series"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Preached Date
                      </label>
                      <input
                        type="text"
                        value={sermonForm.date}
                        onChange={(e) => setSermonForm({ ...sermonForm, date: e.target.value })}
                        placeholder="e.g. October 24, 2026"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Scripture Reference
                      </label>
                      <input
                        type="text"
                        value={sermonForm.biblePassage}
                        onChange={(e) => setSermonForm({ ...sermonForm, biblePassage: e.target.value })}
                        placeholder="e.g. 1 Corinthians 2:4"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={sermonForm.duration}
                        onChange={(e) => setSermonForm({ ...sermonForm, duration: e.target.value })}
                        placeholder="e.g. 1 hr 15 mins"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        YouTube Video ID or Link *
                      </label>
                      <input
                        type="text"
                        required
                        value={sermonForm.youtubeId}
                        onChange={(e) => {
                          let val = e.target.value.trim();
                          if (val.includes("v=")) val = val.split("v=")[1].split("&")[0];
                          if (val.includes("youtu.be/")) val = val.split("youtu.be/")[1].split("?")[0];
                          setSermonForm({ ...sermonForm, youtubeId: val });
                        }}
                        placeholder="e.g. vBvP_h0k_X8 or full YouTube URL"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Thumbnail Image URL
                      </label>
                      <input
                        type="text"
                        value={sermonForm.thumbnail}
                        onChange={(e) => setSermonForm({ ...sermonForm, thumbnail: e.target.value })}
                        placeholder="/images/sermons/sermon-hero-video.png"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Sermon Summary / Description
                      </label>
                      <textarea
                        rows={3}
                        value={sermonForm.description}
                        onChange={(e) => setSermonForm({ ...sermonForm, description: e.target.value })}
                        placeholder="Provide an overview of the message..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Key Points (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={sermonForm.keyPoints}
                        onChange={(e) => setSermonForm({ ...sermonForm, keyPoints: e.target.value })}
                        placeholder="Point 1: Divine alignment&#10;Point 2: Power in the Spirit"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* ─── EVENT FORM FIELDS ────────────────────────────────── */}
              {activeTab === "events" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Event Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={eventForm.title}
                        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                        placeholder="e.g. 2026 Festival of Destiny Conference"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Theme
                      </label>
                      <input
                        type="text"
                        value={eventForm.theme}
                        onChange={(e) => setEventForm({ ...eventForm, theme: e.target.value })}
                        placeholder="e.g. Choose Life"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Ministry Badge / Category
                      </label>
                      <input
                        type="text"
                        value={eventForm.badge}
                        onChange={(e) => setEventForm({ ...eventForm, badge: e.target.value })}
                        placeholder="Annual Convention, Youth Ministry, etc."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Date Label *
                      </label>
                      <input
                        type="text"
                        required
                        value={eventForm.date}
                        onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                        placeholder="e.g. November 8th - 15th, 2026"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Time
                      </label>
                      <input
                        type="text"
                        value={eventForm.time}
                        onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                        placeholder="e.g. 6:00 PM Daily"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Location / Venue
                      </label>
                      <input
                        type="text"
                        value={eventForm.location}
                        onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                        placeholder="Church Auditorium, Court of His Majesty"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Poster Image URL
                      </label>
                      <input
                        type="text"
                        value={eventForm.image}
                        onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                        placeholder="/images/events/fod-2026-poster.webp or Unsplash URL"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={eventForm.isPast}
                          onChange={(e) => setEventForm({ ...eventForm, isPast: e.target.checked })}
                          className="size-4 rounded text-[#051202] focus:ring-0"
                        />
                        <span className="text-xs font-semibold text-gray-700">
                          Mark as Past Event (Will show event gallery section instead of join in person)
                        </span>
                      </label>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Event Description / About
                      </label>
                      <textarea
                        rows={3}
                        value={eventForm.description}
                        onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                        placeholder="Describe the conference or service..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* ─── BLOG FORM FIELDS ─────────────────────────────────── */}
              {activeTab === "blogs" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Article Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        placeholder="e.g. Finding peace in the waiting"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Author
                      </label>
                      <input
                        type="text"
                        value={blogForm.author}
                        onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                        placeholder="Pastor Fred Odekhian"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        placeholder="Faith & everyday life, Prayer, Community, etc."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Published Date
                      </label>
                      <input
                        type="text"
                        value={blogForm.date}
                        onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                        placeholder="e.g. October 24, 2026"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Read Time
                      </label>
                      <input
                        type="text"
                        value={blogForm.readTime}
                        onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                        placeholder="e.g. 5 min read"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Cover Image URL
                      </label>
                      <input
                        type="text"
                        value={blogForm.image}
                        onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                        placeholder="/images/blog/featured-bible-hands.png or Unsplash URL"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Excerpt / Short Summary
                      </label>
                      <textarea
                        rows={2}
                        value={blogForm.excerpt}
                        onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                        placeholder="A short teaser shown on the blog feed..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Article Body / Paragraphs
                      </label>
                      <textarea
                        rows={5}
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        placeholder="Write article paragraphs here (separate paragraphs with blank lines)..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* ─── GALLERY FORM FIELDS ──────────────────────────────── */}
              {activeTab === "gallery" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Photo Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        placeholder="e.g. Worship & Praise Celebration"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Image URL *
                      </label>
                      <input
                        type="text"
                        required
                        value={galleryForm.imageUrl}
                        onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/... or /images/..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                      {galleryForm.imageUrl && (
                        <div className="mt-2 relative h-32 w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                          <Image src={galleryForm.imageUrl} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Associated Event Name
                      </label>
                      <input
                        type="text"
                        value={galleryForm.eventName}
                        onChange={(e) => setGalleryForm({ ...galleryForm, eventName: e.target.value })}
                        placeholder="e.g. Festival of Destiny 2026"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Event Tag / Category
                      </label>
                      <input
                        type="text"
                        value={galleryForm.eventTag}
                        onChange={(e) => setGalleryForm({ ...galleryForm, eventTag: e.target.value })}
                        placeholder="Sunday Service, Men's Fellowship, Youth, etc."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="text"
                        value={galleryForm.date}
                        onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                        placeholder="e.g. October 24, 2026"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Year
                      </label>
                      <input
                        type="number"
                        value={galleryForm.year}
                        onChange={(e) => setGalleryForm({ ...galleryForm, year: Number(e.target.value) })}
                        placeholder="2026"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                        Caption / Note
                      </label>
                      <textarea
                        rows={2}
                        value={galleryForm.caption}
                        onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                        placeholder="Describe the moment captured..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm outline-none focus:border-[#051202]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-100 uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full text-xs font-semibold text-white bg-[#051202] hover:bg-[#c8a96e] hover:text-[#051202] uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  {modalMode === "add" ? "Publish to Website" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── DELETE CONFIRMATION MODAL ───────────────────────────────── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 border border-gray-100 text-center">
            <div className="size-14 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center mb-4">
              <AlertCircle className="size-7" />
            </div>
            <h3 className="font-display font-recursive-sans font-bold text-xl text-[#051202] mb-2">
              Confirm Deletion
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-6 leading-relaxed">
              Are you sure you want to remove <strong className="text-gray-900">&ldquo;{deleteTarget.title}&rdquo;</strong> from the website? This will take effect immediately.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 uppercase tracking-wider shadow-sm cursor-pointer"
              >
                Delete Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
