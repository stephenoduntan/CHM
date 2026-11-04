"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SERMONS_DATA } from "@/lib/sermons-data";

export function LatestSermonSection() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? SERMONS_DATA.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === SERMONS_DATA.length - 1 ? 0 : i + 1));

  const sermon = SERMONS_DATA[index];

  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <Container>
        {/* Dark Sermon Card */}
        <div className="relative rounded-[32px] overflow-hidden bg-[#0c0f24] text-white p-8 sm:p-12 lg:p-14 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#FFFFFF]">
                Latest Sermons
              </h2>
              <div className="w-24 h-1 bg-[#F9BAB8] mt-3 rounded-full" />
            </div>

            <Link
              href="/sermons"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-[#F5F5F5] border border-white/30 hover:border-[#F5F5F5] transition-colors group"
            >
              <span>View all sermons</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Metadata */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div>
                <p className="font-sans font-semibold text-xs sm:text-sm tracking-widest text-[#c8a96e] uppercase mb-2">
                  {sermon.date}
                </p>
                <Link
                  href={`/sermons/${sermon.id}`}
                  className="group/title block"
                >
                  <h3 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3 text-white group-hover/title:text-[#F9BAB8] transition-colors">
                    {sermon.title}
                  </h3>
                </Link>
                <p className="font-display font-recursive-sans italic text-lg sm:text-xl text-gray-300">
                  {sermon.speaker}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-400">
                  {sermon.series && (
                    <span className="uppercase tracking-wider">
                      Series: {sermon.series}
                    </span>
                  )}
                  {sermon.biblePassage && (
                    <>
                      <span>•</span>
                      <span className="text-[#c8a96e] font-medium">{sermon.biblePassage}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Navigation Chevrons */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous sermon"
                  className="size-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <span className="text-xs text-gray-400 font-mono">
                  {index + 1} / {SERMONS_DATA.length}
                </span>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next sermon"
                  className="size-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                >
                  <ChevronRight className="size-6" />
                </button>
              </div>
            </div>

            {/* Right Column: Video Preview Thumbnail */}
            <div className="lg:col-span-7">
              <Link
                href={`/sermons/${sermon.id}`}
                className="group relative block w-full aspect-video rounded-[24px] overflow-hidden bg-gray-900 border border-white/10 shadow-lg cursor-pointer"
              >
                <Image
                  src={sermon.thumbnail}
                  alt={sermon.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Duration Badge */}
                {sermon.duration && (
                  <div className="absolute top-4 right-4 text-xs bg-black/75 backdrop-blur-sm px-3 py-1 rounded-full text-white font-medium border border-white/10">
                    {sermon.duration}
                  </div>
                )}

                {/* Watch Button Badge */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white group-hover:bg-[#c8a96e] group-hover:text-[#051202] transition-colors">
                  <Play className="size-4 fill-current" />
                  <span className="text-sm font-semibold tracking-wide">Watch Message</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
