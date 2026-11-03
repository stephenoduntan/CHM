"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { BlogPost, getRelatedBlogPosts } from "@/lib/blog-data";

interface BlogDetailViewProps {
  post: BlogPost;
}

export function BlogDetailView({ post }: BlogDetailViewProps) {
  const [isCopied, setIsCopied] = useState(false);

  const relatedArticles = getRelatedBlogPosts(post.slug, 3);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="w-full bg-white text-[#0a0a0a]"
      data-node-id="2102:5501"
      data-name="Blog details"
    >
      <Container className="max-w-[1440px] w-full pt-[120px] sm:pt-[140px] pb-16 sm:pb-24">
        {/* ─── Article Introduction (Figma node 2102:5512) ─────────── */}
        <section
          className="flex flex-col gap-8 sm:gap-10 lg:gap-[48px] items-start pb-10 sm:pb-[64px] pt-4 sm:pt-[40px] relative w-full"
          data-node-id="2102:5512"
          data-name="Article introduction"
        >
          {/* Back Navigation (Figma node 2102:5513) */}
          <div
            className="flex gap-2 items-center relative"
            data-node-id="2102:5513"
            data-name="Back navigation"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2.5 text-[#0a0a0a] hover:text-[#180c62] font-sans font-normal text-base sm:text-[18px] transition-colors group cursor-pointer"
            >
              <div
                className="relative size-5 sm:size-6 transition-transform group-hover:-translate-x-1"
                data-node-id="2102:5514"
                data-name="Back arrow"
              >
                <Image
                  src="/images/blog/arrow-left-s-line.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <span data-node-id="2102:5516" data-name="Back label">
                Back to Blog
              </span>
            </Link>
          </div>

          {/* Article Heading Block (Figma node 2102:5517) */}
          <div
            className="flex flex-col gap-4 sm:gap-6 items-start w-full lg:max-w-[1040px]"
            data-node-id="2102:5517"
            data-name="Article heading"
          >
            <span
              className="font-sans font-semibold text-xs sm:text-[17px] text-[#616161] uppercase tracking-wider"
              data-node-id="2102:5518"
              data-name="Category"
            >
              {post.category}
            </span>

            <h1
              className="font-display font-recursive-sans font-semibold text-3xl sm:text-4xl lg:text-[56px] text-[#0a0a0a] leading-[1.2] tracking-tight"
              data-node-id="2102:5519"
              data-name="Heading"
            >
              {post.title}
            </h1>

            <p
              className="font-sans font-normal text-lg sm:text-xl lg:text-[24px] leading-relaxed text-[#616161]"
              data-node-id="2102:5520"
              data-name="Supporting copy"
            >
              {post.excerpt}
            </p>

            {/* Byline (Figma node 2102:5521) */}
            <div
              className="flex flex-wrap items-center gap-3 sm:gap-[20px] text-base sm:text-[18px] pt-1"
              data-node-id="2102:5521"
              data-name="Byline"
            >
              <span
                className="font-sans font-medium text-[#0a0a0a]"
                data-node-id="2102:5522"
                data-name="Author"
              >
                {post.author || "CHM Editorial Team"}
              </span>
              <span className="text-[#616161] hidden sm:inline">•</span>
              <span
                className="font-sans font-normal text-[#616161]"
                data-node-id="2102:5523"
                data-name="Publication details"
              >
                {post.date} &nbsp;•&nbsp; {post.readTime}
              </span>
            </div>
          </div>

          {/* Article Cover (Figma node 2102:5524) */}
          <div
            className="h-[300px] sm:h-[450px] lg:h-[620px] relative rounded-[20px] overflow-hidden w-full bg-neutral-100 shadow-sm"
            data-node-id="2102:5524"
            data-name="Article cover"
          >
            <Image
              src={post.coverImage || post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* ─── Article Reading Area (Figma node 2102:5525) ─────────── */}
        <section
          className="flex flex-col lg:flex-row gap-10 lg:gap-[96px] items-start pb-16 sm:pb-[80px] relative w-full"
          data-node-id="2102:5525"
          data-name="Article reading area"
        >
          {/* Article Sidebar (Figma node 2102:5526) */}
          <aside
            className="w-full lg:w-[304px] shrink-0 flex flex-col gap-6 sm:gap-[32px] lg:sticky lg:top-[120px]"
            data-node-id="2102:5526"
            data-name="Article sidebar"
          >
            {post.sections && post.sections.length > 0 && (
              <>
                <h3
                  className="font-sans font-semibold text-xl sm:text-[24px] text-[#0a0a0a]"
                  data-node-id="2102:5527"
                  data-name="Contents heading"
                >
                  In this article
                </h3>

                <nav
                  aria-label="Article sections"
                  className="flex flex-col gap-3.5 sm:gap-[18px]"
                >
                  {post.sections.map((sec, idx) => (
                    <button
                      key={sec.id || idx}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className="font-sans font-normal text-base sm:text-[18px] text-[#616161] hover:text-[#180c62] leading-[1.5] text-left transition-colors cursor-pointer"
                      data-node-id={`2102:552${8 + idx}`}
                      data-name="Section anchor"
                    >
                      {sec.heading}
                    </button>
                  ))}
                </nav>
              </>
            )}

            {/* Share Options (Figma node 2102:5532) */}
            <div
              className="border-t border-[#d0d2d6] flex flex-col gap-4 sm:gap-[20px] items-start pt-5 sm:pt-[24px] w-full"
              data-node-id="2102:5532"
              data-name="Share options"
            >
              <h4
                className="font-sans font-semibold text-base sm:text-[18px] text-black"
                data-node-id="2102:5533"
                data-name="Share heading"
              >
                Encourage someone
              </h4>

              <button
                type="button"
                onClick={handleShare}
                className="bg-[rgba(178,161,237,0.1)] border border-[#b2a1ed] hover:bg-[rgba(178,161,237,0.2)] flex items-center justify-center gap-2 px-6 sm:px-[40px] py-3 sm:py-[16px] rounded-[28px] transition-all cursor-pointer shadow-2xs group"
                data-node-id="2111:12292"
                data-name="Share sermon"
              >
                {isCopied ? (
                  <>
                    <Check className="size-4 sm:size-5 text-emerald-600" />
                    <span className="font-sans font-medium text-sm sm:text-[16px] text-emerald-700">
                      Link copied!
                    </span>
                  </>
                ) : (
                  <>
                    <div
                      className="relative size-4 sm:size-5 shrink-0"
                      data-node-id="2111:12293"
                      data-name="share-2"
                    >
                      <Image
                        src="/images/blog/share-icon.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span
                      className="font-sans font-medium text-sm sm:text-[16px] text-[#180c62]"
                      data-node-id="2111:12295"
                      data-name="Label"
                    >
                      Share article
                    </span>
                  </>
                )}
              </button>
            </div>
          </aside>

          {/* Article Body (Figma node 2102:5538) */}
          <article
            className="flex-1 flex flex-col gap-8 sm:gap-10 lg:gap-[40px] max-w-[1040px] w-full"
            data-node-id="2102:5538"
            data-name="Article body"
          >
            {post.sections &&
              post.sections.map((section, sIdx) => (
                <div
                  key={section.id || sIdx}
                  id={section.id}
                  className="flex flex-col gap-5 sm:gap-[24px] scroll-mt-24 w-full"
                  data-node-id="2102:5539"
                  data-name="Article section"
                >
                  <h2
                    className="font-sans font-semibold text-2xl sm:text-[32px] text-[#0a0a0a] leading-[1.2]"
                    data-node-id="2102:5540"
                    data-name="Heading"
                  >
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="font-sans font-normal text-base sm:text-lg lg:text-[21px] text-[#616161] leading-[1.6]"
                      data-node-id="2102:5541"
                      data-name="Supporting copy"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Scripture Reflection (Figma node 2102:5543) */}
                  {section.scripture && (
                    <div
                      className="bg-[#f2f2f2] border-l-4 border-[#d61812] flex flex-col gap-3 sm:gap-[16px] p-6 sm:p-[32px] rounded-r-[12px] my-2 w-full"
                      data-node-id="2102:5543"
                      data-name="Scripture reflection"
                    >
                      <blockquote
                        className="font-sans font-normal text-xl sm:text-2xl lg:text-[28px] text-[#0a0a0a] leading-[1.5]"
                        data-node-id="2102:5544"
                        data-name="Scripture"
                      >
                        {section.scripture.quote}
                      </blockquote>
                      <cite
                        className="font-sans font-normal not-italic text-sm sm:text-[16px] text-[#616161]"
                        data-node-id="2102:5545"
                        data-name="Scripture reference"
                      >
                        {section.scripture.reference}
                      </cite>
                    </div>
                  )}
                </div>
              ))}

            {/* Reflection Prompt (Figma node 2102:5558) */}
            {post.reflectionPrompt && (
              <div
                className="border-t border-b border-[#d0d2d6] flex flex-col gap-3 sm:gap-[16px] py-6 sm:py-[32px] my-2 w-full"
                data-node-id="2102:5558"
                data-name="Reflection prompt"
              >
                <h3
                  className="font-sans font-semibold text-xl sm:text-[26px] text-[#0a0a0a] leading-[1.2]"
                  data-node-id="2102:5559"
                  data-name="Heading"
                >
                  {post.reflectionPrompt.heading}
                </h3>
                <p
                  className="font-sans font-normal text-base sm:text-lg lg:text-[20px] text-[#616161] leading-[1.6]"
                  data-node-id="2102:5560"
                  data-name="Supporting copy"
                >
                  {post.reflectionPrompt.text}
                </p>
              </div>
            )}

            {/* Prayer Invitation (Figma node 2102:5561) */}
            <div
              className="flex flex-col sm:flex-row gap-6 sm:gap-[32px] items-start sm:items-center justify-between pt-2 w-full"
              data-node-id="2102:5561"
              data-name="Prayer invitation"
            >
              <div
                className="flex flex-1 flex-col gap-2 sm:gap-[12px]"
                data-node-id="2102:5562"
                data-name="Invitation copy"
              >
                <h3
                  className="font-sans font-semibold text-xl sm:text-2xl lg:text-[28px] text-[#0a0a0a] leading-[1.2]"
                  data-node-id="2102:5563"
                  data-name="Heading"
                >
                  We would love to pray with you
                </h3>
                <p
                  className="font-sans font-normal text-sm sm:text-base lg:text-[18px] text-[#616161] leading-[1.6]"
                  data-node-id="2102:5564"
                  data-name="Supporting copy"
                >
                  You do not have to carry this season on your own.
                </p>
              </div>

              <Link
                href="/connect"
                className="bg-[#f0a505] hover:bg-[#d99404] transition-colors rounded-[36px] px-6 sm:px-[28px] py-3.5 sm:py-[16px] inline-flex items-center justify-center gap-3 text-[#0a0a0a] font-sans font-semibold text-base sm:text-[18px] cursor-pointer shrink-0 shadow-xs group w-fit"
                data-node-id="2102:5565"
                data-name="Action"
              >
                <span data-node-id="2102:5566" data-name="Label">
                  Prayer Request
                </span>
                <div
                  className="relative size-5 shrink-0 transition-transform group-hover:translate-x-1"
                  data-node-id="2102:5567"
                  data-name="Action arrow"
                >
                  <Image
                    src="/images/blog/prayer-request-arrow.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>
          </article>
        </section>

        {/* ─── Related Reading (Figma node 2102:5569) ──────────────── */}
        <section
          className="border-t border-[#d0d2d6] flex flex-col gap-8 sm:gap-10 lg:gap-[40px] items-start pb-16 sm:pb-[96px] pt-10 sm:pt-[48px] relative w-full"
          data-node-id="2102:5569"
          data-name="Related reading"
        >
          {/* Related Heading (Figma node 2102:5570) */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full"
            data-node-id="2102:5570"
            data-name="Related heading"
          >
            <div
              className="flex flex-col gap-3 sm:gap-[16px] items-start"
              data-node-id="2102:5571"
              data-name="Section heading"
            >
              <h2
                className="font-sans font-semibold text-2xl sm:text-3xl lg:text-[40px] text-[#0a0a0a] leading-[1.2]"
                data-node-id="2102:5572"
                data-name="Heading"
              >
                Keep growing in faith
              </h2>
              <div
                className="bg-[#d61812] h-[5px] w-[124px] rounded-full"
                data-node-id="2102:5573"
                data-name="Heading underline"
              />
            </div>

            <Link
              href="/blog"
              className="bg-[rgba(178,161,237,0.1)] border border-[#b2a1ed] hover:bg-[rgba(178,161,237,0.2)] flex items-center justify-center gap-2 px-5 sm:px-[24px] py-3 sm:py-[16px] rounded-[28px] transition-all cursor-pointer shrink-0 shadow-2xs group"
              data-node-id="2102:5574"
              data-name="Action"
            >
              <span
                className="font-sans font-semibold text-base sm:text-[18px] text-[#180c62]"
                data-node-id="2102:5575"
                data-name="Label"
              >
                All articles
              </span>
              <div
                className="relative size-5 shrink-0 transition-transform group-hover:translate-x-1"
                data-node-id="2102:5576"
                data-name="Action arrow"
              >
                <Image
                  src="/images/blog/all-articles-arrow.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Related Articles Grid (Figma node 2102:5578) */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-[24px] w-full"
            data-node-id="2102:5578"
            data-name="Related articles"
          >
            {relatedArticles.map((relPost) => (
              <article
                key={relPost.id}
                className="border border-[#d0d2d6] rounded-[16px] overflow-hidden bg-white flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
                data-node-id="2102:5579"
                data-name="Article card"
              >
                {/* Article Image (Figma node 2102:5580) */}
                <div
                  className="relative h-[240px] sm:h-[270px] w-full shrink-0 overflow-hidden bg-neutral-100"
                  data-node-id="2102:5580"
                  data-name="Article image"
                >
                  <Image
                    src={relPost.image}
                    alt={relPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Article Content (Figma node 2102:5581) */}
                <div
                  className="p-5 sm:p-[24px] flex flex-col gap-3.5 sm:gap-[16px] flex-1 justify-between"
                  data-node-id="2102:5581"
                  data-name="Article content"
                >
                  <div className="flex flex-col gap-2.5 sm:gap-[12px]">
                    <span
                      className="font-sans font-semibold text-xs sm:text-[15px] text-[#616161] uppercase tracking-wider"
                      data-node-id="2102:5582"
                      data-name="Category"
                    >
                      {relPost.category}
                    </span>
                    <h3
                      className="font-sans font-semibold text-xl sm:text-[26px] text-[#0a0a0a] leading-[1.3] group-hover:text-[#180c62] transition-colors min-h-[56px] sm:min-h-[68px]"
                      data-node-id="2102:5583"
                      data-name="Article title"
                    >
                      {relPost.title}
                    </h3>
                    <p
                      className="font-sans font-normal text-sm sm:text-base lg:text-[18px] text-[#616161] leading-[1.5] min-h-[60px] sm:min-h-[81px]"
                      data-node-id="2102:5584"
                      data-name="Excerpt"
                    >
                      {relPost.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3.5 sm:gap-[16px] pt-1">
                    <p
                      className="font-sans font-normal text-xs sm:text-[15px] text-[#616161]"
                      data-node-id="2102:5585"
                      data-name="Metadata"
                    >
                      {relPost.date} &nbsp;•&nbsp; {relPost.readTime}
                    </p>

                    <div
                      className="border-t border-[#d0d2d6] pt-3.5 sm:pt-[16px] flex items-center gap-2.5"
                      data-node-id="2102:5586"
                      data-name="Read article"
                    >
                      <Link
                        href={`/blog/${relPost.slug}`}
                        className="inline-flex items-center gap-2.5 font-sans font-semibold text-base sm:text-[18px] text-[#180c62] group/link cursor-pointer hover:gap-3.5 transition-all"
                      >
                        <span data-node-id="2102:5587" data-name="Link label">
                          Read article
                        </span>
                        <div
                          className="relative size-5 sm:size-[24px] shrink-0"
                          data-node-id="2102:5588"
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
        </section>
      </Container>
    </div>
  );
}

