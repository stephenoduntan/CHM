"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative w-full pt-6 pb-16 overflow-hidden bg-white">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-emerald-100/40 via-amber-100/30 to-teal-100/40 blur-3xl rounded-full -z-10 pointer-events-none" />

      <Container>
        <div className="relative min-h-[720px] lg:min-h-[840px] flex flex-col justify-center items-center">
          {/* Mosaic Gallery Layer */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8 lg:mb-0">
            {/* Top Row Cards */}
            <div className="relative h-[180px] sm:h-[220px] rounded-[24px] overflow-hidden shadow-sm group">
              <Image
                src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=800"
                alt="Worship in His presence"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="relative h-[180px] sm:h-[220px] rounded-[24px] overflow-hidden shadow-sm group bg-amber-950/20 border border-amber-200/50 flex flex-col items-center justify-center p-4 text-center">
              <span className="font-display font-recursive-mono text-2xl md:text-3xl font-bold text-amber-700">
                29 YEARS
              </span>
              <span className="text-sm font-semibold tracking-widest text-[#051202] uppercase mt-1">
                Festival of Destiny
              </span>
            </div>

            <div className="relative h-[180px] sm:h-[220px] rounded-[24px] overflow-hidden shadow-sm group">
              <Image
                src="https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?auto=format&fit=crop&q=80&w=800"
                alt="Word Ministration"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <div className="relative h-[180px] sm:h-[220px] rounded-[24px] overflow-hidden shadow-sm group hidden sm:block">
              <Image
                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800"
                alt="Joyful Praise"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>

          {/* Central Hero Headline & CTAs */}
          <div className="my-8 lg:my-12 z-20 max-w-[720px] mx-auto text-center px-4 py-8 rounded-[32px] bg-white/70 backdrop-blur-md border border-gray-100 shadow-xl">
            <p className="font-display font-recursive-mono italic text-xl md:text-2xl text-[#051202] mb-2">
              Welcome to
            </p>
            <h1 className="font-sans font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#051202] tracking-tight leading-tight uppercase">
              {SITE_CONFIG.name}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-lg mx-auto">
              A house of prayer, dynamic worship, and supernatural transformation for the whole family.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/new-here"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-white bg-[#c8a96e] hover:bg-[#b59556] shadow-md hover:shadow-lg transition-all text-base"
              >
                Plan a Visit
              </Link>
              <Link
                href="/watch-live"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow transition-all text-base group"
              >
                <span>Watch Online</span>
                <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Bottom Row Mosaic Cards */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-4">
            <div className="relative h-[180px] sm:h-[220px] rounded-[24px] overflow-hidden shadow-sm group">
              <Image
                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800"
                alt="Community and Fellowship"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="relative h-[180px] sm:h-[220px] rounded-[24px] overflow-hidden shadow-sm group">
              <Image
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800"
                alt="Choir Ministration"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="relative h-[180px] sm:h-[220px] rounded-[24px] overflow-hidden shadow-sm group">
              <Image
                src="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=800"
                alt="Prayer and Intercession"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="relative h-[180px] sm:h-[220px] rounded-[24px] overflow-hidden shadow-sm group hidden sm:block">
              <Image
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800"
                alt="Outreach and Missions"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
