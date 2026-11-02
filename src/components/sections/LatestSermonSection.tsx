"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

const sermonsList = [
  {
    id: "walking-in-divine-destiny",
    title: "Walking in Divine Destiny",
    date: "October 24, 2026",
    convener: "Pastor Fred Odekhian",
    series: "Destiny Unfolding",
    videoThumbnail: "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://youtube.com/@courtofhismajesty",
  },
  {
    id: "the-power-of-consecration",
    title: "The Power of Consecration",
    date: "October 17, 2026",
    convener: "Pastor Mrs. Fred Odekhian",
    series: "Spiritual Foundations",
    videoThumbnail: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://youtube.com/@courtofhismajesty",
  },
  {
    id: "overflowing-grace",
    title: "Overflowing Grace for Greater Exploits",
    date: "October 10, 2026",
    convener: "Pastor Caleb Okedere",
    series: "Grace Upon Grace",
    videoThumbnail: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://youtube.com/@courtofhismajesty",
  },
];

export function LatestSermonSection() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? sermonsList.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === sermonsList.length - 1 ? 0 : i + 1));

  const sermon = sermonsList[index];

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
                <h3 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3 text-white">
                  {sermon.title}
                </h3>
                <p className="font-display font-recursive-sans italic text-lg sm:text-xl text-gray-300">
                  {sermon.convener}
                </p>
                <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">
                  Series: {sermon.series}
                </p>
              </div>

              {/* Navigation Chevrons */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous sermon"
                  className="size-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next sermon"
                  className="size-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronRight className="size-6" />
                </button>
              </div>
            </div>

            {/* Right Column: Video Preview Thumbnail */}
            <div className="lg:col-span-7">
              <a
                href={sermon.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full aspect-video rounded-[24px] overflow-hidden bg-gray-900 border border-white/10 shadow-lg cursor-pointer"
              >
                <Image
                  src={sermon.videoThumbnail}
                  alt={sermon.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Watch Button Badge */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white group-hover:bg-[#c8a96e] group-hover:text-[#051202] transition-colors">
                  <Play className="size-4 fill-current" />
                  <span className="text-sm font-semibold tracking-wide">Watch Message</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

