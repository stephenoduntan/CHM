"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Calendar, User, Search, RotateCcw } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SERMONS_DATA } from "@/lib/sermons-data";

export default function SermonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");

  // Derive unique categories from SERMONS_DATA
  const categories = useMemo(() => {
    const set = new Set<string>();
    SERMONS_DATA.forEach((s) => {
      if (s.series) set.add(s.series);
    });
    return Array.from(set);
  }, []);

  // Filter and sort sermons in real-time
  const filteredSermons = useMemo(() => {
    return SERMONS_DATA.filter((sermon) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        sermon.title.toLowerCase().includes(query) ||
        sermon.speaker.toLowerCase().includes(query) ||
        sermon.series.toLowerCase().includes(query) ||
        sermon.description.toLowerCase().includes(query) ||
        (sermon.biblePassage && sermon.biblePassage.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === "All" ||
        sermon.series.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("newest");
  };

  const isFiltered = searchQuery.trim() !== "" || selectedCategory !== "All" || sortBy !== "newest";

  return (
    <div className="w-full bg-white pb-24">
      {/* ─── Hero Section (Figma node 2086:1095) ───────────────────── */}
      <section
        className="relative h-auto pt-[120px] sm:pt-[140px] pb-12 sm:pb-16 bg-white text-[#0a0a0a] flex items-center justify-center overflow-hidden"
        data-node-id="2086:1095"
        data-name="hero"
      >
        <Container className="relative z-10 text-center w-full">
          <div className="max-w-3xl mx-auto mb-8 sm:mb-10">
            <h1
              className="font-display font-recursive-sans text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#0a0a0a] mb-4 uppercase tracking-tight text-center"
              data-node-id="2086:1098"
            >
              Sermons
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Faith comes by hearing, and hearing by the Word of God. Catch up on our latest Sunday messages, spiritual foundations, and sermon series.
            </p>
          </div>

          {/* ─── Sermons Filter Feature (Figma node 2086:1099) ───────── */}
          <div
            className="w-full max-w-[1024px] mx-auto flex flex-col gap-8 sm:gap-[40px] items-center"
            data-node-id="2086:1099"
            data-name="Frame 2085668978"
          >
            {/* 3 Form Fields Grid (Figma node 2086:1100) */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-[24px] w-full text-left"
              data-node-id="2086:1100"
              data-name="Frame 2085668979"
            >
              {/* Search Field (Figma node 2111:12270) */}
              <div
                className="flex flex-col gap-2.5 sm:gap-[10px] items-start w-full"
                data-node-id="2111:12270"
                data-name="Form field"
              >
                <label
                  htmlFor="sermon-search-input"
                  className="font-sans font-normal text-base sm:text-[18px] text-[#0a0a0a]"
                  data-node-id="2111:12271"
                >
                  Search
                </label>
                <div
                  className="bg-white border border-[#d0d2d6] rounded-[8px] h-[56px] sm:h-[60px] p-3 sm:p-[16px] w-full flex items-center shadow-sm focus-within:border-[#180c62] focus-within:ring-2 focus-within:ring-[#180c62]/10 transition-all"
                  data-node-id="2111:12272"
                  data-name="Input"
                >
                  <input
                    id="sermon-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search sermon by keyword"
                    className="w-full bg-transparent font-sans font-normal text-sm sm:text-base lg:text-[18px] text-[#0a0a0a] placeholder:text-[#858585] outline-none"
                    data-node-id="2111:12273"
                  />
                </div>
              </div>

              {/* Category Field (Figma node 2111:12274) */}
              <div
                className="flex flex-col gap-2.5 sm:gap-[10px] items-start w-full"
                data-node-id="2111:12274"
                data-name="Form field"
              >
                <label
                  htmlFor="sermon-category-select"
                  className="font-sans font-normal text-base sm:text-[18px] text-[#0a0a0a]"
                  data-node-id="2111:12275"
                >
                  Category
                </label>
                <div
                  className="bg-white border border-[#d0d2d6] rounded-[8px] h-[56px] sm:h-[60px] p-3 sm:p-[16px] w-full relative flex items-center shadow-sm focus-within:border-[#180c62] focus-within:ring-2 focus-within:ring-[#180c62]/10 transition-all"
                  data-node-id="2111:12276"
                  data-name="Input"
                >
                  <select
                    id="sermon-category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-transparent font-sans font-normal text-sm sm:text-base lg:text-[18px] text-[#0a0a0a] outline-none appearance-none pr-8 cursor-pointer"
                    data-node-id="2111:12277"
                  >
                    <option value="All">All categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div
                    className="pointer-events-none absolute right-4 size-5 flex items-center justify-center text-gray-500"
                    data-node-id="2111:12278"
                    data-name="chevron-down"
                  >
                    <Image
                      src="/images/fluent-chevron-down.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="size-5"
                    />
                  </div>
                </div>
              </div>

              {/* Sort by Field (Figma node 2111:12280) */}
              <div
                className="flex flex-col gap-2.5 sm:gap-[10px] items-start w-full"
                data-node-id="2111:12280"
                data-name="Form field"
              >
                <label
                  htmlFor="sermon-sort-select"
                  className="font-sans font-normal text-base sm:text-[18px] text-[#0a0a0a]"
                  data-node-id="2111:12281"
                >
                  Sort by
                </label>
                <div
                  className="bg-white border border-[#d0d2d6] rounded-[8px] h-[56px] sm:h-[60px] p-3 sm:p-[16px] w-full relative flex items-center shadow-sm focus-within:border-[#180c62] focus-within:ring-2 focus-within:ring-[#180c62]/10 transition-all"
                  data-node-id="2111:12282"
                  data-name="Input"
                >
                  <select
                    id="sermon-sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "newest" | "oldest" | "title")}
                    className="w-full bg-transparent font-sans font-normal text-sm sm:text-base lg:text-[18px] text-[#0a0a0a] outline-none appearance-none pr-8 cursor-pointer"
                    data-node-id="2111:12283"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="title">Title (A-Z)</option>
                  </select>
                  <div
                    className="pointer-events-none absolute right-4 size-5 flex items-center justify-center text-gray-500"
                    data-node-id="2111:12284"
                    data-name="chevron-down"
                  >
                    <Image
                      src="/images/fluent-chevron-down.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="size-5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Filter Button (Figma node 2086:1125) */}
            <button
              type="button"
              onClick={handleReset}
              className={`bg-[rgba(178,161,237,0.1)] border border-[#b2a1ed] hover:bg-[rgba(178,161,237,0.2)] rounded-[28px] px-6 sm:px-[21px] py-2.5 sm:py-[13px] text-[#180c62] font-sans font-medium text-sm sm:text-[16px] transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-2 ${
                isFiltered ? "opacity-100 ring-2 ring-[#b2a1ed]/30" : "opacity-90"
              }`}
              data-node-id="2086:1125"
              data-name="Button"
            >
              <RotateCcw className="size-4" />
              <span data-node-id="2086:1127">Reset filter</span>
            </button>
          </div>
        </Container>
      </section>

      {/* ─── Sermons Grid Section (Figma node 2086:1129) ─────────────── */}
      <section
        className="py-12 lg:py-16 bg-white"
        data-node-id="2086:1129"
        data-name="explore"
      >
        <Container>
          {/* Results Count Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              Showing <span className="font-bold text-[#0a0a0a]">{filteredSermons.length}</span> {filteredSermons.length === 1 ? "sermon" : "sermons"}
              {selectedCategory !== "All" && (
                <> in <span className="text-[#180c62] font-semibold">{selectedCategory}</span></>
              )}
            </p>

            {isFiltered && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs sm:text-sm font-semibold text-[#180c62] hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredSermons.length > 0 ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-[24px]"
              data-node-id="2086:1130"
              data-name="How it works row"
            >
              {filteredSermons.map((sermon) => (
                <Link
                  key={sermon.id}
                  href={`/sermons/${sermon.id}`}
                  className="border border-[#d0d2d6] rounded-[16px] overflow-hidden bg-white hover:border-[#180c62]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  data-name="sermon-card"
                >
                  {/* Thumbnail with Play Icon */}
                  <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[280px] rounded-t-[16px] overflow-hidden bg-gray-900 flex flex-col justify-end p-4 sm:p-[24px]">
                    <Image
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="relative z-10 size-10 sm:size-[48px] rounded-full drop-shadow-lg group-hover:scale-110 transition-transform">
                      <Image
                        src="/images/sermons/play-sermon.svg"
                        alt="Play"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <span className="absolute bottom-4 right-4 text-xs bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-md text-white font-medium z-10">
                      {sermon.duration}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-[24px] flex flex-col gap-3 sm:gap-[16px] w-full flex-1 justify-between">
                    <div className="flex flex-col gap-3 sm:gap-[16px] w-full">
                      {/* Date */}
                      <span className="font-sans font-normal text-xs sm:text-[16px] uppercase tracking-wider text-[#616161]">
                        {sermon.date}
                      </span>

                      {/* Title & Convener */}
                      <div className="border-b border-[#d0d2d6] pb-4 flex flex-col gap-2 sm:gap-[16px] w-full">
                        <h2 className="font-display font-recursive-sans font-medium text-lg sm:text-[22px] lg:text-[24px] text-[#0a0a0a] uppercase leading-snug line-clamp-2 group-hover:text-[#180c62] transition-colors">
                          {sermon.title}
                        </h2>
                        <p className="font-sans font-medium text-sm sm:text-base lg:text-[18px] text-[#404040]">
                          {sermon.speaker}
                        </p>
                      </div>
                    </div>

                    {/* Duration & Watch CTA */}
                    <div className="pt-1 flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-sans font-normal text-[#616161]">
                        {sermon.series}
                      </span>
                      <span className="font-semibold uppercase tracking-wider text-[#180c62] group-hover:underline">
                        Watch Sermon →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-20 text-center flex flex-col items-center justify-center max-w-md mx-auto">
              <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                <Search className="size-8" />
              </div>
              <h3 className="font-display font-recursive-sans font-bold text-xl text-[#0a0a0a] mb-2">
                No sermons found
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                We couldn&apos;t find any sermons matching &ldquo;{searchQuery}&rdquo;. Try clearing your search keyword or selecting a different category.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-[#180c62] text-white text-sm font-semibold hover:bg-[#251394] transition-colors cursor-pointer shadow-md"
              >
                Reset filters
              </button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
