"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Calendar, User, Headphones } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SERMONS_DATA } from "@/lib/sermons-data";

export default function SermonsPage() {
  return (
    <div className="w-full bg-white pb-24">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-[720px] bg-[#051202] text-white flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?auto=format&fit=crop&q=80&w=1920"
          alt="Sermons Archive"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051202] via-[#051202]/70 to-transparent" />

        <Container className="relative z-10 text-center py-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#c8a96e]/20 border border-[#c8a96e]/40 text-[#c8a96e] text-xs font-semibold uppercase tracking-wider mb-4">
            Word of Life
          </span>
          <h1 className="font-display font-recursive-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 uppercase tracking-tight">
            Sermons & Teachings
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Faith comes by hearing, and hearing by the Word of God. Catch up on our latest Sunday messages and series.
          </p>
        </Container>
      </section>

      {/* ─── Sermons Grid ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERMONS_DATA.map((sermon) => (
              <div
                key={sermon.id}
                className="bg-white rounded-[28px] overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                    <Image
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                    <Link
                      href={`/sermons/${sermon.id}`}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    >
                      <div className="size-14 rounded-full bg-[#c8a96e] text-[#051202] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="size-6 fill-current translate-x-0.5" />
                      </div>
                    </Link>

                    <span className="absolute bottom-3 right-3 text-xs bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-md text-white font-medium">
                      {sermon.duration}
                    </span>
                  </div>

                  <div className="p-6 sm:p-7">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#c8a96e] block mb-2">
                      {sermon.series}
                    </span>
                    <h3 className="font-sans font-bold text-xl text-[#051202] mb-3 group-hover:text-[#c8a96e] transition-colors leading-snug">
                      <Link href={`/sermons/${sermon.id}`}>
                        {sermon.title}
                      </Link>
                    </h3>

                    <div className="flex flex-col gap-1.5 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <User className="size-3.5" />
                        <span>{sermon.speaker}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        <span>{sermon.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
                  <Link
                    href={`/sermons/${sermon.id}`}
                    className="text-xs font-semibold uppercase tracking-wider text-[#051202] hover:text-[#c8a96e] transition-colors"
                  >
                    Watch Video →
                  </Link>
                  <button
                    type="button"
                    onClick={() => alert("Audio podcast streaming will be connected with your Sanity CMS uploaded sermons.")}
                    className="text-xs font-semibold text-gray-500 hover:text-[#051202] flex items-center gap-1 cursor-pointer"
                  >
                    <Headphones className="size-3.5" />
                    <span>Audio</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
