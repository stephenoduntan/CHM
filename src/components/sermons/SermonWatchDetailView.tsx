"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Sermon, getRelatedSermons } from "@/lib/sermons-data";

interface SermonWatchDetailViewProps {
  sermon: Sermon;
}

export function SermonWatchDetailView({ sermon }: SermonWatchDetailViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<"1x" | "1.25x" | "1.5x" | "2x">("1x");
  const [isCopied, setIsCopied] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  const relatedSermons = getRelatedSermons(sermon.id, 3);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const cycleSpeed = () => {
    const speeds: ("1x" | "1.25x" | "1.5x" | "2x")[] = ["1x", "1.25x", "1.5x", "2x"];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div
      className="w-full bg-white text-[#0a0a0a]"
      data-node-id="2096:6013"
      data-name="Sermon watch and detail"
    >
      <Container className="max-w-[1440px] w-full pt-140 pb-20 sm:pb-24">
        {/* ─── Watch Sermon Section (Figma node 2096:6015) ────────────── */}
        <section
          className="flex flex-col gap-6 sm:gap-[32px] items-start pt-6 sm:pt-[40px] relative w-full"
          data-node-id="2096:6015"
          data-name="Watch sermon"
        >
          {/* Back Navigation (Figma node 2096:6016) */}
          <div
            className="flex gap-2 items-center relative w-full"
            data-node-id="2096:6016"
            data-name="Back navigation"
          >
            <Link
              href="/sermons"
              className="inline-flex items-center gap-2 text-[#0a0a0a] hover:text-[#180c62] font-sans font-medium text-base sm:text-[18px] transition-colors group cursor-pointer"
            >
              <ChevronLeft className="size-5 transition-transform group-hover:-translate-x-1" />
              <span data-node-id="2096:6018">Back to sermons</span>
            </Link>
          </div>

          {/* Video Player (Figma node 2096:6019) */}
          <div
            ref={videoRef}
            className="relative w-full h-[380px] sm:h-[540px] lg:h-[810px] rounded-[20px] overflow-hidden bg-black shadow-2xl flex flex-col justify-between p-4 sm:p-6 lg:p-[32px]"
            data-node-id="2096:6019"
            data-name="Video player • paused"
          >
            {/* Background Thumbnail or Video Embed */}
            {!isPlaying ? (
              <>
                <Image
                  src={sermon.thumbnail}
                  alt={sermon.title}
                  fill
                  priority
                  className="object-cover opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60 pointer-events-none" />
              </>
            ) : (
              <div className="absolute inset-0 z-0 bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${sermon.youtubeId}?autoplay=1&rel=0`}
                  title={sermon.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            )}

            {/* Video Identification (Top Bar, Figma node 2096:6020) */}
            <div
              className={`relative z-10 flex items-center justify-between w-full transition-opacity duration-300 ${
                isPlaying ? "opacity-0 hover:opacity-100 pointer-events-none" : "opacity-100"
              }`}
              data-node-id="2096:6020"
              data-name="Video identification"
            >
              <p
                className="font-sans font-medium text-sm sm:text-base lg:text-[18px] text-[#f5f5f5]"
                data-node-id="2096:6021"
              >
                Court of His Majesty
              </p>
              <div
                className="border border-white/25 rounded-[36px] px-3.5 sm:px-[16px] py-1.5 sm:py-[8px] bg-black/30 backdrop-blur-sm"
                data-node-id="2096:6022"
                data-name="Viewing format"
              >
                <span
                  className="font-sans font-normal text-xs sm:text-[14px] text-[#f5f5f5]"
                  data-node-id="2096:6023"
                >
                  Sermon
                </span>
              </div>
            </div>

            {/* Center Play Button (Figma node 2096:6024) */}
            {!isPlaying && (
              <div
                className="relative z-10 flex flex-col items-center justify-center my-auto cursor-pointer"
                onClick={() => setIsPlaying(true)}
                data-node-id="2096:6024"
                data-name="Paused video cover"
              >
                <button
                  type="button"
                  aria-label="Play sermon video"
                  className="size-16 sm:size-20 lg:size-[88px] relative transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer drop-shadow-2xl"
                  data-node-id="2096:6025"
                  data-name="Play sermon"
                >
                  <Image
                    src="/images/sermons/play-sermon.svg"
                    alt="Play"
                    fill
                    className="object-contain"
                  />
                </button>
              </div>
            )}

            {/* Playback Controls (Bottom Bar, Figma node 2096:6029) */}
            <div
              className={`relative z-10 flex flex-col gap-3 sm:gap-[20px] items-start w-full transition-opacity duration-300 ${
                isPlaying ? "opacity-0 hover:opacity-100 pointer-events-none" : "opacity-100"
              }`}
              data-node-id="2096:6029"
              data-name="Playback controls"
            >
              {/* Seek Track */}
              <div
                className="bg-[#626262] h-[4px] rounded-[2px] w-full relative cursor-pointer group"
                onClick={() => setIsPlaying(true)}
                data-node-id="2096:6030"
                data-name="Seek track"
              >
                <div
                  className="bg-[#f5f5f5] h-[4px] rounded-[2px] w-[8px] sm:w-[12px] group-hover:w-[24px] transition-all"
                  data-node-id="2096:6031"
                  data-name="Playback position"
                />
              </div>

              {/* Control Bar */}
              <div
                className="flex items-center justify-between w-full"
                data-node-id="2096:6032"
                data-name="Control bar"
              >
                {/* Playback and Audio */}
                <div
                  className="flex gap-3 sm:gap-[20px] items-center"
                  data-node-id="2096:6033"
                  data-name="Playback and audio"
                >
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="size-5 sm:size-[24px] relative cursor-pointer hover:opacity-80 transition-opacity"
                    data-node-id="2096:6034"
                    data-name="play"
                    aria-label="Toggle play"
                  >
                    <Image
                      src="/images/sermons/play.svg"
                      alt="Play"
                      fill
                      className="object-contain"
                    />
                  </button>

                  <button
                    type="button"
                    className="size-6 sm:size-[28px] relative cursor-pointer hover:opacity-80 transition-opacity"
                    data-node-id="2096:6036"
                    data-name="Volume"
                    aria-label="Volume"
                  >
                    <Image
                      src="/images/sermons/volume.svg"
                      alt="Volume"
                      fill
                      className="object-contain"
                    />
                  </button>

                  <span
                    className="font-sans font-normal text-xs sm:text-sm lg:text-[16px] text-[#f5f5f5]"
                    data-node-id="2096:6037"
                  >
                    0:00 / {sermon.duration}
                  </span>
                </div>

                {/* Viewing Options */}
                <div
                  className="flex gap-4 sm:gap-[24px] items-center"
                  data-node-id="2096:6038"
                  data-name="Viewing options"
                >
                  <button
                    type="button"
                    onClick={cycleSpeed}
                    className="font-sans font-normal text-xs sm:text-sm lg:text-[16px] text-[#f5f5f5] hover:text-[#b2a1ed] transition-colors cursor-pointer"
                    data-node-id="2096:6039"
                  >
                    {playbackSpeed}
                  </button>

                  <button
                    type="button"
                    className="size-5 sm:size-[24px] relative cursor-pointer hover:opacity-80 transition-opacity"
                    data-node-id="2096:6040"
                    data-name="settings"
                    aria-label="Settings"
                  >
                    <Image
                      src="/images/sermons/settings.svg"
                      alt="Settings"
                      fill
                      className="object-contain"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="size-5 sm:size-[24px] relative cursor-pointer hover:opacity-80 transition-opacity"
                    data-node-id="2096:6042"
                    data-name="maximize"
                    aria-label="Fullscreen"
                  >
                    <Image
                      src="/images/sermons/maximize.svg"
                      alt="Fullscreen"
                      fill
                      className="object-contain"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Sermon Information (Figma node 2096:6044) ──────────────── */}
        <section
          className="flex flex-col gap-6 sm:gap-[32px] items-start pb-10 sm:pb-[56px] pt-8 sm:pt-[40px] relative w-full"
          data-node-id="2096:6044"
          data-name="Sermon information"
        >
          {/* Sermon Heading (Figma node 2096:6045) */}
          <div
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 w-full"
            data-node-id="2096:6045"
            data-name="Sermon heading"
          >
            {/* Selected Sermon Title & Metadata */}
            <div
              className="flex flex-col gap-3 sm:gap-[20px] items-start max-w-4xl"
              data-node-id="2096:6046"
              data-name="Selected sermon"
            >
              <h1
                className="font-display font-recursive-sans font-semibold text-2xl sm:text-4xl lg:text-[48px] text-[#0a0a0a] uppercase leading-[1.15] tracking-tight"
                data-node-id="2096:6047"
              >
                {sermon.title}
              </h1>

              <div
                className="flex flex-wrap items-center gap-2 sm:gap-3 text-[#616161] font-sans text-sm sm:text-base lg:text-[20px]"
                data-node-id="2096:6048"
                data-name="Sermon metadata"
              >
                <span className="font-medium" data-node-id="2096:6049">
                  {sermon.speaker}
                </span>
                <span className="text-gray-400" data-node-id="2096:6050">•</span>
                <span className="font-normal" data-node-id="2096:6051">
                  {sermon.date}
                </span>
                {sermon.biblePassage && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="font-normal text-[#180c62]">{sermon.biblePassage}</span>
                  </>
                )}
              </div>
            </div>

            {/* Share Sermon Button (Figma node 2096:6052) */}
            <button
              type="button"
              onClick={handleShare}
              className="bg-[rgba(178,161,237,0.1)] border border-[#b2a1ed] hover:bg-[rgba(178,161,237,0.2)] flex items-center justify-center gap-2.5 px-6 sm:px-[40px] py-3 sm:py-[16px] rounded-[28px] transition-all cursor-pointer shrink-0 shadow-sm"
              data-node-id="2096:6052"
              data-name="Share sermon"
            >
              {isCopied ? (
                <>
                  <Check className="size-4 text-emerald-600" />
                  <span className="font-sans font-medium text-sm sm:text-[16px] text-emerald-600">
                    Link copied!
                  </span>
                </>
              ) : (
                <>
                  <div className="relative size-4 sm:size-[20px]" data-node-id="2096:6053" data-name="share-2">
                    <Image
                      src="/images/sermons/share.svg"
                      alt="Share"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span
                    className="font-sans font-medium text-sm sm:text-[16px] text-[#180c62]"
                    data-node-id="2096:6055"
                  >
                    Share sermon
                  </span>
                </>
              )}
            </button>
          </div>

          {/* About This Sermon (Figma node 2096:6056) */}
          <div
            className="border-t border-[#d0d2d6] flex flex-col lg:flex-row gap-6 sm:gap-10 lg:gap-[64px] items-start pt-6 sm:pt-[32px] w-full"
            data-node-id="2096:6056"
            data-name="About this sermon"
          >
            <h2
              className="font-sans font-semibold text-xl sm:text-2xl lg:text-[28px] text-[#0a0a0a] w-full lg:w-[360px] shrink-0"
              data-node-id="2096:6057"
            >
              About this sermon
            </h2>

            <div
              className="flex-1 flex flex-col font-sans font-normal gap-3 sm:gap-[12px] text-[#616161]"
              data-node-id="2096:6058"
              data-name="Description"
            >
              <p
                className="text-base sm:text-lg lg:text-[20px] leading-relaxed text-[#404040]"
                data-node-id="2096:6059"
              >
                {sermon.description}
              </p>
              <p
                className="text-sm sm:text-base lg:text-[18px] leading-relaxed text-[#737373]"
                data-node-id="2096:6060"
              >
                {sermon.supportingCopy}
              </p>
            </div>
          </div>
        </section>

        {/* ─── Related Sermons (Figma node 2096:6061) ──────────────────── */}
        <section
          className="border-t border-[#d0d2d6] flex flex-col gap-8 sm:gap-10 lg:gap-[40px] items-start pb-12 sm:pb-[80px] pt-8 sm:pt-[40px] relative w-full"
          data-node-id="2096:6061"
          data-name="Related sermons"
        >
          {/* Section Heading (Figma node 2096:6062) */}
          <div
            className="flex items-center justify-between w-full"
            data-node-id="2096:6062"
            data-name="Section heading"
          >
            <div
              className="flex flex-col gap-3 sm:gap-[16px] items-start"
              data-node-id="2096:6063"
              data-name="Heading"
            >
              <h3
                className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl lg:text-[40px] text-[#0a0a0a] tracking-tight"
                data-node-id="2096:6064"
              >
                Related sermons
              </h3>
              <div
                className="bg-[#d61812] h-[5px] w-[100px] sm:w-[124px] rounded-full"
                data-node-id="2096:6065"
                data-name="Heading underline"
              />
            </div>

            <Link
              href="/sermons"
              className="bg-[rgba(178,161,237,0.1)] border border-[#b2a1ed] hover:bg-[rgba(178,161,237,0.2)] flex items-center justify-center gap-2 px-4 sm:px-[24px] py-2.5 sm:py-[16px] rounded-[28px] transition-all cursor-pointer shrink-0 shadow-sm"
              data-node-id="2096:6066"
              data-name="View all sermons"
            >
              <span
                className="font-sans font-medium text-xs sm:text-sm lg:text-[16px] text-[#180c62]"
                data-node-id="2096:6067"
              >
                View all sermons
              </span>
              <div
                className="relative size-4 sm:size-5 lg:size-[24px]"
                data-node-id="2096:6068"
                data-name="View all arrow"
              >
                <Image
                  src="/images/sermons/arrow-right.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Sermon Cards Grid (Figma node 2096:6069) */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-[24px] w-full"
            data-node-id="2096:6069"
            data-name="Sermon cards"
          >
            {relatedSermons.map((item, idx) => {
              const cardNodeId = idx === 0 ? "2150:25988" : idx === 1 ? "2150:25976" : "2150:25964";
              return (
                <Link
                  key={item.id}
                  href={`/sermons/${item.id}`}
                  className="border border-[#d0d2d6] rounded-[16px] overflow-hidden bg-white hover:border-[#180c62]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  data-node-id={cardNodeId}
                  data-name={`card ${8 - idx}`}
                >
                  {/* Thumbnail with Play Icon */}
                  <div
                    className="relative w-full h-[220px] sm:h-[260px] lg:h-[280px] rounded-t-[16px] overflow-hidden bg-gray-900 flex flex-col justify-end p-4 sm:p-[24px]"
                    data-node-id={`${cardNodeId}-thumb`}
                  >
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div
                      className="relative z-10 size-10 sm:size-[48px] rounded-full drop-shadow-lg group-hover:scale-110 transition-transform"
                      data-node-id={`${cardNodeId}-play`}
                      data-name="Play sermon"
                    >
                      <Image
                        src="/images/sermons/play-sermon.svg"
                        alt="Play"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-[24px] flex flex-col gap-3 sm:gap-[16px] w-full flex-1 justify-between">
                    <div className="flex flex-col gap-3 sm:gap-[16px] w-full">
                      {/* Date */}
                      <span className="font-sans font-normal text-xs sm:text-[16px] uppercase tracking-wider text-[#616161]">
                        {item.date}
                      </span>

                      {/* Title & Convener */}
                      <div className="border-b border-[#d0d2d6] pb-4 flex flex-col gap-2 sm:gap-[16px] w-full">
                        <h4 className="font-display font-recursive-sans font-medium text-lg sm:text-[22px] lg:text-[24px] text-[#0a0a0a] uppercase leading-snug line-clamp-2 group-hover:text-[#180c62] transition-colors">
                          {item.title}
                        </h4>
                        <p className="font-sans font-medium text-sm sm:text-base lg:text-[18px] text-[#404040]">
                          {item.speaker}
                        </p>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="pt-1">
                      <span className="font-sans font-normal text-xs sm:text-sm lg:text-[16px] text-[#616161]">
                        {item.duration}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </Container>
    </div>
  );
}

