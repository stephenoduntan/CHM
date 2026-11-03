"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Pause, Headphones, Calendar, Clock, Share2, Volume2 } from "lucide-react";
import { Container } from "@/components/layout/Container";

const episodes = [
  {
    id: "ep-24",
    episodeNumber: 24,
    title: "Understanding Kingdom Timing & Destiny",
    speaker: "Pastor Fred Odekhian",
    date: "October 22, 2026",
    duration: "42:15",
    description: "God is never late. Explore the prophetic seasons of divine manifestation and how to prepare your spirit for His timing.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "ep-23",
    episodeNumber: 23,
    title: "Family, Marriage & Grace in the Modern World",
    speaker: "Pastor & Pastor (Mrs.) Fred Odekhian",
    date: "October 15, 2026",
    duration: "55:30",
    description: "Honest conversations on cultivating enduring peace, communication, and spiritual unity in marital unions.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "ep-22",
    episodeNumber: 22,
    title: "The Fire of Personal Devotion",
    speaker: "Pastor Caleb Okedere",
    date: "October 08, 2026",
    duration: "38:40",
    description: "Rekindling the altar of secret prayer and maintaining spiritual consistency amid a noisy world.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    thumbnail: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=800",
  },
];

export default function PodcastsPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    setPlayingId((current) => (current === id ? null : id));
  };

  return (
    <div className="w-full bg-white pb-24">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-[720px] bg-[#051202] text-white flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1920"
          alt="Church Podcast Studio"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051202] via-[#051202]/70 to-transparent" />

        <Container className="relative z-10 text-center py-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#c8a96e]/20 border border-[#c8a96e]/40 text-[#c8a96e] text-xs font-semibold uppercase tracking-wider mb-4">
            Voice of Majesty
          </span>
          <h1 className="font-display font-recursive-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 uppercase tracking-tight">
            Court of His Majesty Podcast
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Take the Word with you on the go. Listen on Spotify, Apple Podcasts, or stream directly in your browser.
          </p>
        </Container>
      </section>

      {/* ─── Episodes List ────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="space-y-8 max-w-4xl mx-auto">
            {episodes.map((ep) => {
              const isPlaying = playingId === ep.id;

              return (
                <div
                  key={ep.id}
                  className={`p-6 sm:p-8 rounded-[32px] border transition-all duration-300 flex flex-col md:flex-row items-center gap-6 ${
                    isPlaying
                      ? "bg-gray-50 border-[#c8a96e] shadow-xl"
                      : "bg-white border-gray-200/90 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="relative size-28 sm:size-32 rounded-2xl overflow-hidden shrink-0 shadow-md">
                    <Image
                      src={ep.thumbnail}
                      alt={ep.title}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => togglePlay(ep.id)}
                      className="absolute inset-0 bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors cursor-pointer"
                      aria-label={isPlaying ? "Pause episode" : "Play episode"}
                    >
                      {isPlaying ? (
                        <Pause className="size-8 fill-current text-[#c8a96e]" />
                      ) : (
                        <Play className="size-8 fill-current translate-x-0.5 text-white" />
                      )}
                    </button>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-gray-500 mb-2">
                      <span className="font-display font-recursive-mono font-bold text-[#c8a96e]">
                        Episode #{ep.episodeNumber}
                      </span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        <span>{ep.date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="size-3" />
                        <span>{ep.duration}</span>
                      </div>
                    </div>

                    <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#051202] mb-2 leading-snug">
                      {ep.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {ep.description}
                    </p>

                    <div className="flex items-center justify-center md:justify-start gap-4">
                      <button
                        type="button"
                        onClick={() => togglePlay(ep.id)}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#051202] hover:bg-[#c8a96e] hover:text-[#051202] transition-colors"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="size-3.5 fill-current" />
                            <span>Pause Audio</span>
                          </>
                        ) : (
                          <>
                            <Headphones className="size-3.5" />
                            <span>Listen Now</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => alert(`Share link for Episode ${ep.episodeNumber} copied!`)}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                        aria-label="Share episode"
                      >
                        <Share2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
