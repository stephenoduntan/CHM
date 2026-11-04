"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  FEATURED_ARTICLE,
  BLOG_POSTS,
  BLOG_CATEGORIES,
} from "@/lib/blog-data";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All categories");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // Filtering & Sorting logic
  const filteredPosts = useMemo(() => {
    let result = [...BLOG_POSTS];

    // Category filter
    if (selectedCategory && selectedCategory !== "All categories") {
      result = result.filter(
        (post) => post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query filter
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      );
    }

    // Sort order
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return b.dateTimestamp - a.dateTimestamp;
      } else {
        return a.dateTimestamp - b.dateTimestamp;
      }
    });

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All categories");
    setSortBy("newest");
  };

  return (
    <div
      className="w-full bg-white text-[#0a0a0a]"
      data-node-id="2102:5300"
      data-name="Blog"
    >
      <Container className="max-w-[1440px] w-full pt-[120px] sm:pt-[140px] pb-16 sm:pb-24">
        {/* ─── Page Introduction (Figma node 2102:5311) ───────────── */}
        <section
          className="flex flex-col items-center pb-12 sm:pb-[64px] pt-8 sm:pt-[80px] px-4 text-center w-full"
          data-node-id="2102:5311"
          data-name="Page introduction"
        >
          <div
            className="flex flex-col gap-4 sm:gap-[20px] items-center max-w-[1100px] w-full"
            data-node-id="2111:12514"
          >
            {/* <p
              className="font-serif italic text-base sm:text-[20px] text-[#616161]"
              data-node-id="2102:5312"
              data-name="Eyebrow"
            >
              Encouragement for the journey
            </p> */}
            <h1
              className="font-display font-recursive-sans font-bold text-4xl sm:text-5xl lg:text-[56px] text-[#0a0a0a] leading-[1.2] tracking-tight"
              data-node-id="2102:5313"
              data-name="Page title"
            >
              Blog
            </h1>
            <p
              className="font-sans font-normal text-base sm:text-xl lg:text-[22px] leading-relaxed text-[#616161] max-w-[1000px]"
              data-node-id="2102:5314"
              data-name="Introduction"
            >
              Stories, reflections and practical encouragement to help you know God,
              grow in faith and live out His love.
            </p>
          </div>
        </section>

        {/* ─── Featured Article (Figma node 2102:5315) ─────────────── */}
        <section
          className="bg-[#f2f2f2] flex flex-col lg:flex-row items-stretch overflow-hidden rounded-[20px] w-full relative mb-12 sm:mb-[80px]"
          data-node-id="2102:5315"
          data-name="Featured article"
        >
          {/* Featured Image */}
          <div
            className="relative w-full lg:w-[53%] min-h-[300px] sm:min-h-[400px] lg:h-[520px] shrink-0 overflow-hidden"
            data-node-id="2102:5316"
            data-name="Featured image"
          >
            <Image
              src={FEATURED_ARTICLE.image}
              alt={FEATURED_ARTICLE.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Featured Content */}
          <div
            className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-10 lg:p-[48px] relative"
            data-node-id="2102:5317"
            data-name="Featured content"
          >
            <div className="flex flex-col gap-4 sm:gap-6">
              <span
                className="font-sans font-semibold text-xs sm:text-[16px] text-[#616161] uppercase tracking-wider"
                data-node-id="2102:5318"
                data-name="Featured label"
              >
                Featured • {FEATURED_ARTICLE.category}
              </span>
              <h2
                className="font-sans font-semibold text-2xl sm:text-3xl lg:text-[40px] text-[#0a0a0a] leading-[1.2]"
                data-node-id="2102:5319"
                data-name="Heading"
              >
                {FEATURED_ARTICLE.title}
              </h2>
              <p
                className="font-sans font-normal text-base sm:text-lg lg:text-[20px] leading-relaxed text-[#616161]"
                data-node-id="2102:5320"
                data-name="Supporting copy"
              >
                {FEATURED_ARTICLE.excerpt}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
              <span
                className="font-sans font-normal text-sm sm:text-[16px] text-[#616161]"
                data-node-id="2102:5321"
                data-name="Article metadata"
              >
                {FEATURED_ARTICLE.date} &nbsp;•&nbsp; {FEATURED_ARTICLE.readTime}
              </span>

              <Link
                href={`/blog/${FEATURED_ARTICLE.slug}`}
                className="bg-[#f0a505] hover:bg-[#d99404] transition-colors rounded-[36px] px-6 sm:px-[28px] py-3.5 sm:py-[16px] inline-flex items-center justify-center gap-3 text-[#0a0a0a] font-sans font-semibold text-base sm:text-[18px] cursor-pointer shrink-0 shadow-xs group w-fit"
                data-node-id="2102:5322"
                data-name="Action"
              >
                <span data-node-id="2102:5323" data-name="Label">
                  Read article
                </span>
                <div
                  className="relative size-5 shrink-0 transition-transform group-hover:translate-x-1"
                  data-node-id="2102:5324"
                  data-name="Action arrow"
                >
                  <Image
                    src="/images/blog/action-arrow.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Article Library (Figma node 2102:5326) ──────────────── */}
        <section
          className="flex flex-col gap-8 sm:gap-10 lg:gap-[40px] items-start pb-16 sm:pb-[80px] relative w-full"
          data-node-id="2102:5326"
          data-name="Article library"
        >
          {/* Section Heading (Figma node 2102:5327) */}
          <div
            className="flex flex-col gap-3 sm:gap-[16px] items-start w-full"
            data-node-id="2102:5327"
            data-name="Section heading"
          >
            <h2
              className="font-sans font-semibold text-2xl sm:text-3xl lg:text-[40px] text-[#0a0a0a] leading-[1.2]"
              data-node-id="2102:5328"
              data-name="Heading"
            >
              Latest from the Blog
            </h2>
            <div
              className="bg-[#d61812] h-[5px] w-[124px] rounded-full"
              data-node-id="2102:5329"
              data-name="Heading underline"
            />
          </div>

          {/* Article Filters Bar (Figma node 2102:5330) */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto] gap-4 sm:gap-6 items-end w-full"
            data-node-id="2102:5330"
            data-name="Article filters"
          >
            {/* Search Field */}
            <div
              className="flex flex-col gap-2 sm:gap-[10px] items-start w-full"
              data-node-id="2102:5331"
              data-name="Form field"
            >
              <label
                htmlFor="blog-search"
                className="font-sans font-normal text-sm sm:text-[18px] text-[#0a0a0a]"
                data-node-id="2102:5332"
                data-name="Label"
              >
                Search
              </label>
              <div
                className="bg-white border border-[#d0d2d6] flex h-[54px] sm:h-[60px] items-center px-4 rounded-[8px] w-full focus-within:border-[#180c62] focus-within:ring-1 focus-within:ring-[#180c62] transition-all"
                data-node-id="2102:5333"
                data-name="Input"
              >
                <input
                  id="blog-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by keyword"
                  className="w-full bg-transparent font-sans font-normal text-sm sm:text-[18px] text-[#0a0a0a] placeholder:text-[#858585] focus:outline-none"
                  data-node-id="2102:5334"
                  data-name="Placeholder"
                />
              </div>
            </div>

            {/* Category Select */}
            <div
              className="flex flex-col gap-2 sm:gap-[10px] items-start w-full"
              data-node-id="2102:5335"
              data-name="Form field"
            >
              <label
                htmlFor="blog-category"
                className="font-sans font-normal text-sm sm:text-[18px] text-[#0a0a0a]"
                data-node-id="2102:5336"
                data-name="Label"
              >
                Category
              </label>
              <div
                className="bg-white border border-[#d0d2d6] flex h-[54px] sm:h-[60px] items-center px-4 rounded-[8px] w-full relative focus-within:border-[#180c62] focus-within:ring-1 focus-within:ring-[#180c62] transition-all"
                data-node-id="2102:5337"
                data-name="Input"
              >
                <select
                  id="blog-category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent font-sans font-normal text-sm sm:text-[18px] text-[#0a0a0a] appearance-none pr-8 focus:outline-none cursor-pointer"
                  data-node-id="2102:5338"
                  data-name="Placeholder"
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div
                  className="pointer-events-none absolute right-4 size-5 shrink-0"
                  data-node-id="2102:6200"
                  data-name="chevron-down"
                >
                  <Image
                    src="/images/blog/chevron-down.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Sort by Select */}
            <div
              className="flex flex-col gap-2 sm:gap-[10px] items-start w-full"
              data-node-id="2102:5340"
              data-name="Form field"
            >
              <label
                htmlFor="blog-sort"
                className="font-sans font-normal text-sm sm:text-[18px] text-[#0a0a0a]"
                data-node-id="2102:5341"
                data-name="Label"
              >
                Sort by
              </label>
              <div
                className="bg-white border border-[#d0d2d6] flex h-[54px] sm:h-[60px] items-center px-4 rounded-[8px] w-full relative focus-within:border-[#180c62] focus-within:ring-1 focus-within:ring-[#180c62] transition-all"
                data-node-id="2102:5342"
                data-name="Input"
              >
                <select
                  id="blog-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
                  className="w-full bg-transparent font-sans font-normal text-sm sm:text-[18px] text-[#0a0a0a] appearance-none pr-8 focus:outline-none cursor-pointer"
                  data-node-id="2102:5343"
                  data-name="Placeholder"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                </select>
                <div
                  className="pointer-events-none absolute right-4 size-5 shrink-0"
                  data-node-id="2102:6203"
                  data-name="chevron-down"
                >
                  <Image
                    src="/images/blog/chevron-down.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Reset Filter Action */}
            <button
              type="button"
              onClick={handleResetFilters}
              className="font-sans font-normal text-sm sm:text-[16px] text-[#0a0a0a] hover:text-[#180c62] underline cursor-pointer py-3 lg:mb-4 lg:ml-2 text-left md:text-right lg:text-left transition-colors shrink-0"
              data-node-id="2102:5345"
              data-name="Reset filter"
            >
              Reset filter
            </button>
          </div>

          {/* Article Grid (Figma node 2102:5346) */}
          <div
            className="w-full"
            data-node-id="2102:5346"
            data-name="Article grid"
          >
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-[24px] w-full">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="border border-[#d0d2d6] rounded-[16px] overflow-hidden bg-white flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
                    data-node-id="2102:5348"
                    data-name="Article card"
                  >
                    {/* Article Image (Figma node 2102:5349) */}
                    <div
                      className="relative h-[240px] sm:h-[270px] w-full shrink-0 overflow-hidden bg-neutral-100"
                      data-node-id="2102:5349"
                      data-name="Article image"
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Article Content (Figma node 2102:5350) */}
                    <div
                      className="p-5 sm:p-[24px] flex flex-col gap-3.5 sm:gap-[16px] flex-1 justify-between"
                      data-node-id="2102:5350"
                      data-name="Article content"
                    >
                      <div className="flex flex-col gap-2.5 sm:gap-[12px]">
                        <span
                          className="font-sans font-semibold text-xs sm:text-[15px] text-[#616161] uppercase tracking-wider"
                          data-node-id="2102:5351"
                          data-name="Category"
                        >
                          {post.category}
                        </span>

                        <Link
                        href={`/blog/${post.slug}`}
                          className="font-sans font-semibold text-xl sm:text-[26px] text-[#0a0a0a] leading-[1.3] group-hover:text-[#D61812] transition-colors min-h-[56px] sm:min-h-[68px] group/link"
                          data-node-id="2102:5352"
                          data-name="Article title"
                        >
                          <h3
                            data-node-id="2102:5352"
                            data-name="Article title"
                          >
                            {post.title}
                          </h3>
                        </Link>

                        <p
                          className="font-sans font-normal text-sm sm:text-base lg:text-[18px] text-[#616161] leading-[1.5] min-h-[60px] sm:min-h-[81px]"
                          data-node-id="2102:5353"
                          data-name="Excerpt"
                        >
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3.5 sm:gap-[16px] pt-1">
                        <p
                          className="font-sans font-normal text-xs sm:text-[15px] text-[#616161]"
                          data-node-id="2102:5354"
                          data-name="Metadata"
                        >
                          {post.date} &nbsp;•&nbsp; {post.readTime}
                        </p>

                        <div
                          className="border-t border-[#d0d2d6] pt-3.5 sm:pt-[16px] flex items-center gap-2.5"
                          data-node-id="2102:5355"
                          data-name="Read article"
                        >
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-2.5 font-sans font-semibold text-base sm:text-[18px] text-[#180c62] group-hover:text-[#D61812] group/link cursor-pointer hover:gap-3.5 transition-all"
                          >
                            <span data-node-id="2102:5356" data-name="Link label">
                              Read article
                            </span>
                            <div
                              className="relative size-5 sm:size-[24px] shrink-0"
                              data-node-id="2102:5357"
                              data-name="Read arrow"
                            >
                              <Image
                                src="/images/blog/read-arrow.svg"
                                alt=""
                                fill
                                className="object-contain"
                              />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-8 w-full">
                <p className="text-lg font-medium text-[#0a0a0a]">
                  No articles found
                </p>
                <p className="text-sm text-[#737373] mt-1 max-w-md mx-auto">
                  We couldn&apos;t find any articles matching your filters. Try clearing your search or selecting another category.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-4 px-5 py-2.5 bg-[#180c62] text-white rounded-full text-sm font-medium hover:bg-[#180c62]/90 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination Section (Figma node 2102:5415) */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 w-full"
            data-node-id="2102:5415"
            data-name="Pagination"
          >
            <p
              className="font-sans font-normal text-sm sm:text-[17px] text-[#616161]"
              data-node-id="2102:5416"
              data-name="Result count"
            >
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
            </p>

            <div
              className="bg-[#051202] flex items-center justify-center rounded-full size-11 sm:size-[48px] shrink-0"
              data-node-id="2102:5417"
              data-name="Current page"
            >
              <span
                className="font-sans font-normal text-base sm:text-[18px] text-white"
                data-node-id="2102:5418"
                data-name="Page number"
              >
                1
              </span>
            </div>

            <p
              className="font-sans font-normal text-sm sm:text-[17px] text-[#616161]"
              data-node-id="2102:5419"
              data-name="Archive note"
            >
              You’re all caught up
            </p>
          </div>
        </section>

        {/* ─── Visit Invitation (Figma node 2102:5420) ─────────────── */}
        <section
          className="pb-4 sm:pb-[32px] w-full"
          data-node-id="2102:5420"
          data-name="Visit invitation"
        >
          <div
            className="bg-[#f2f2f2] flex flex-col md:flex-row gap-6 sm:gap-[64px] items-start md:items-center justify-between p-6 sm:p-10 lg:p-[48px] rounded-[16px] w-full relative"
            data-node-id="2102:5421"
            data-name="Community invitation"
          >
            <div
              className="flex flex-1 flex-col gap-3 sm:gap-[16px] items-start max-w-[850px]"
              data-node-id="2102:5422"
              data-name="Invitation"
            >
              <h2
                className="font-sans font-semibold text-2xl sm:text-3xl lg:text-[40px] text-[#0a0a0a] leading-[1.2]"
                data-node-id="2102:5423"
                data-name="Heading"
              >
                You don’t have to walk alone
              </h2>
              <p
                className="font-sans font-normal text-base sm:text-lg lg:text-[20px] text-[#616161] leading-[1.6]"
                data-node-id="2102:5424"
                data-name="Supporting copy"
              >
                Come as you are. Find encouragement, prayer and community at Court of His Majesty.
              </p>
            </div>

            <Link
              href="/connect"
              className="bg-[rgba(178,161,237,0.1)] border border-[#b2a1ed] hover:bg-[rgba(178,161,237,0.2)] flex items-center justify-center gap-2 px-5 sm:px-[24px] py-3 sm:py-[16px] rounded-[28px] transition-all cursor-pointer shrink-0 shadow-xs group"
              data-node-id="2102:5425"
              data-name="Action"
            >
              <span
                className="font-sans font-semibold text-base sm:text-[18px] text-[#180c62]"
                data-node-id="2102:5426"
                data-name="Label"
              >
                Connect with us
              </span>
              <div
                className="relative size-5 shrink-0 transition-transform group-hover:translate-x-1"
                data-node-id="2102:5427"
                data-name="Action arrow"
              >
                <Image
                  src="/images/blog/visit-arrow.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
