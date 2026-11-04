"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  RotateCcw,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Calendar,
  Tag,
  Check,
  ExternalLink,
  Camera,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GALLERY_IMAGES, GalleryImage, getGalleryTags, getGalleryYears } from "@/lib/gallery-data";

export function GalleryView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // Lightbox state
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const tags = useMemo(() => ["All", ...getGalleryTags()], []);
  const years = useMemo(() => ["All", ...getGalleryYears().map(String)], []);

  // Filter & sort images
  const filteredImages = useMemo(() => {
    return GALLERY_IMAGES.filter((img) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        img.title.toLowerCase().includes(q) ||
        img.eventName.toLowerCase().includes(q) ||
        img.eventTag.toLowerCase().includes(q) ||
        (img.caption && img.caption.toLowerCase().includes(q)) ||
        img.date.toLowerCase().includes(q);

      const matchesTag = selectedTag === "All" || img.eventTag.toLowerCase() === selectedTag.toLowerCase();
      const matchesYear = selectedYear === "All" || String(img.year) === selectedYear;

      return matchesSearch && matchesTag && matchesYear;
    }).sort((a, b) => {
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [searchQuery, selectedTag, selectedYear, sortBy]);

  const activePhoto: GalleryImage | null =
    activePhotoIndex !== null && filteredImages[activePhotoIndex]
      ? filteredImages[activePhotoIndex]
      : null;

  const handleNextPhoto = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! + 1 >= filteredImages.length ? 0 : prev! + 1));
    }
  }, [activePhotoIndex, filteredImages.length]);

  const handlePrevPhoto = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! - 1 < 0 ? filteredImages.length - 1 : prev! - 1));
    }
  }, [activePhotoIndex, filteredImages.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") setActivePhotoIndex(null);
      if (e.key === "ArrowRight") handleNextPhoto();
      if (e.key === "ArrowLeft") handlePrevPhoto();
    };

    if (activePhotoIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePhotoIndex, handleNextPhoto, handlePrevPhoto]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedTag("All");
    setSelectedYear("All");
    setSortBy("newest");
  };

  const isFiltered = searchQuery !== "" || selectedTag !== "All" || selectedYear !== "All" || sortBy !== "newest";

  const handleSharePhoto = (photo: GalleryImage) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share && navigator.canShare && navigator.canShare({ url })) {
      navigator
        .share({
          title: photo.title,
          text: `${photo.title} — ${photo.eventName} at RCCG Court of His Majesty`,
          url,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen">
      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <section className="relative w-full bg-[#051202] text-white pt-36 pb-14 sm:pb-20 overflow-hidden border-b border-white/10">
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1920"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051202] via-[#051202]/80 to-transparent" />
        </div>

        <Container className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#c8a96e] text-xs font-semibold uppercase tracking-widest mb-4">
            <Camera className="size-3.5" />
            <span>Moments of Grace & Fellowship</span>
          </div>

          <h1 className="font-display font-recursive-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Church Photo Gallery
          </h1>
          <p className="font-sans text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Relive moments of heartfelt worship, kingdom encounters, leadership conferences, and vibrant fellowship at RCCG Court of His Majesty.
          </p>
        </Container>
      </section>

      {/* ─── Filter & Search Bar Section ───────────────────────────── */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
        <Container>
          <div className="flex flex-col gap-4">
            {/* Top row: Search input & Date dropdowns */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Search Field */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by event, moment, or tag..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:border-[#180c62] focus:ring-2 focus:ring-[#180c62]/10 text-sm text-[#0a0a0a] bg-white outline-none transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              {/* Year & Sort Filters */}
              <div className="flex items-center gap-2.5 flex-wrap shrink-0">
                {/* Year Dropdown */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-300 rounded-full px-3 py-1.5">
                  <Calendar className="size-3.5 text-gray-500" />
                  <span className="font-medium">Year:</span>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="bg-transparent font-semibold text-[#0a0a0a] outline-none cursor-pointer pr-1"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y === "All" ? "All Years" : y}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-300 rounded-full px-3 py-1.5">
                  <span className="font-medium">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
                    className="bg-transparent font-semibold text-[#0a0a0a] outline-none cursor-pointer pr-1"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                  </select>
                </div>

                {/* Reset button */}
                {isFiltered && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="size-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Bottom row: Horizontal Event Tag Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
              {tags.map((tag) => {
                const isSelected = selectedTag.toLowerCase() === tag.toLowerCase();
                const count =
                  tag === "All"
                    ? GALLERY_IMAGES.length
                    : GALLERY_IMAGES.filter((img) => img.eventTag.toLowerCase() === tag.toLowerCase()).length;

                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#180c62] text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span>{tag}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Gallery Grid Section ──────────────────────────────────── */}
      <section className="py-10 sm:py-14 lg:py-16">
        <Container>
          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200 text-xs sm:text-sm text-gray-600">
            <p>
              Showing <span className="font-bold text-[#0a0a0a]">{filteredImages.length}</span>{" "}
              {filteredImages.length === 1 ? "photo" : "photos"}
              {selectedTag !== "All" && (
                <>
                  {" "}in <span className="font-semibold text-[#180c62]">{selectedTag}</span>
                </>
              )}
              {selectedYear !== "All" && (
                <>
                  {" "}from <span className="font-semibold text-[#0a0a0a]">{selectedYear}</span>
                </>
              )}
            </p>
          </div>

          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filteredImages.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => setActivePhotoIndex(index)}
                  className="group relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3] cursor-pointer"
                >
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {photo.eventTag}
                    </span>
                    <div className="size-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="size-4" />
                    </div>
                  </div>

                  {/* Bottom Captions */}
                  <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                    <p className="text-[11px] font-medium text-[#c8a96e] uppercase tracking-wider mb-0.5">
                      {photo.date}
                    </p>
                    <h3 className="font-display font-recursive-sans font-bold text-base sm:text-lg leading-tight line-clamp-1 group-hover:text-[#F9BAB8] transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-1 mt-0.5">
                      {photo.eventName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center justify-center gap-4 bg-white rounded-3xl border border-gray-200 shadow-sm max-w-lg mx-auto">
              <div className="size-14 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
                <Camera className="size-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-recursive-sans font-bold text-xl text-[#0a0a0a]">
                  No photos match your filter
                </h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Try adjusting your search terms, selecting a different tag, or resetting filters.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-full bg-[#180c62] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#251394] transition-all cursor-pointer shadow-sm"
              >
                Reset all filters
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* ─── Lightbox Modal ────────────────────────────────────────── */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActivePhotoIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Controls Bar */}
          <div
            className="flex items-center justify-between text-white z-20 pb-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-mono text-gray-400">
                {activePhotoIndex! + 1} / {filteredImages.length}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white uppercase tracking-wider">
                {activePhoto.eventTag}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSharePhoto(activePhoto)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Share photo"
              >
                {copied ? <Check className="size-4 text-emerald-400" /> : <Share2 className="size-4" />}
              </button>
              <a
                href={activePhoto.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={`CHM_${activePhoto.id}.jpg`}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Open full image in new tab"
              >
                <Download className="size-4" />
              </a>
              <button
                type="button"
                onClick={() => setActivePhotoIndex(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Middle: Active Image + Prev / Next Arrows */}
          <div
            className="relative flex-1 flex items-center justify-center my-2 max-h-[75vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute left-2 sm:left-4 z-20 size-11 rounded-full bg-black/60 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
              title="Previous photo (Arrow Left)"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute right-2 sm:right-4 z-20 size-11 rounded-full bg-black/60 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
              title="Next photo (Arrow Right)"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Image */}
            <div className="relative w-full h-full max-w-5xl max-h-[72vh] flex items-center justify-center">
              <Image
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>
          </div>

          {/* Bottom Caption & Event Details */}
          <div
            className="bg-black/70 backdrop-blur-md rounded-2xl p-4 sm:p-5 max-w-3xl mx-auto w-full text-white text-center flex flex-col items-center gap-2 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-xs text-[#c8a96e] font-semibold uppercase tracking-wider">
              <span>{activePhoto.date}</span>
              <span>•</span>
              {activePhoto.eventSlug ? (
                <Link
                  href={`/events/${activePhoto.eventSlug}`}
                  className="hover:underline text-[#F9BAB8] inline-flex items-center gap-1"
                >
                  <span>{activePhoto.eventName}</span>
                  <ExternalLink className="size-3" />
                </Link>
              ) : (
                <span>{activePhoto.eventName}</span>
              )}
            </div>

            <h2 className="font-display font-recursive-sans font-bold text-lg sm:text-xl text-white">
              {activePhoto.title}
            </h2>

            {activePhoto.caption && (
              <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                {activePhoto.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

