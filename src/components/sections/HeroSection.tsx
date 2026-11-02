"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";

interface VideoNode {
  id: string;
  title: string;
  label: string;
  videoUrl: string;
  left: number; // % in 1920 canvas
  top: number; // % in 1316 canvas
  width: number; // % in 1920 canvas
  height: number; // % in 1316 canvas
  aspect: "portrait" | "landscape";
  depth: "foreground" | "midground" | "background";
}

// 10 Video Nodes precisely matched to Figma node 2086:90 / 2114:12576 geometry
const HERO_VIDEO_NODES: VideoNode[] = [
  // Top Row (5 cards)
  {
    id: "node-top-1",
    title: "Congregation in Worship",
    label: "Worship Service",
    videoUrl: "./videos/Pst. Agu Irukwu.webm",
    left: 0.62, // 12px / 1920
    top: 0.0, // 0px
    width: 10.42, // 200px / 1920
    height: 27.05, // 356px / 1316
    aspect: "portrait",
    depth: "foreground",
  },
  {
    id: "node-top-2",
    title: "Choose Life Conference",
    label: "29 Years Festival",
    videoUrl: "./videos/men conf..webm",
    left: 17.5, // 336px / 1920
    top: 4.41, // 58px / 1316
    width: 20.83, // 400px / 1920
    height: 18.24, // 240px / 1316
    aspect: "landscape",
    depth: "midground",
  },
  {
    id: "node-top-3",
    title: "Word of Faith Ministration",
    label: "Pulpit Message",
    videoUrl: "./videos/guest min..webm",
    left: 44.79, // 860px / 1920
    top: 0.0, // 0px
    width: 10.42, // 200px / 1920
    height: 27.05, // 356px / 1316
    aspect: "portrait",
    depth: "foreground",
  },
  {
    id: "node-top-4",
    title: "Sunlight of His Glory",
    label: "Cathedral Grace",
    videoUrl: "./videos/choose life action.webm",
    left: 61.67, // 1184px / 1920
    top: 4.41, // 58px / 1316
    width: 20.83, // 400px / 1920
    height: 18.24, // 240px / 1316
    aspect: "landscape",
    depth: "background",
  },
  {
    id: "node-top-5",
    title: "Gospel Choir Ministration",
    label: "Voices of Praise",
    videoUrl: "./videos/Pst. Agu Irukwu.webm",
    left: 88.96, // 1708px / 1920
    top: 0.0, // 0px
    width: 10.42, // 200px / 1920
    height: 27.05, // 356px / 1316
    aspect: "portrait",
    depth: "background",
  },

  // Middle Row Sides (2 cards)
  {
    id: "node-mid-left",
    title: "Altar of Prayer & Intercession",
    label: "Holy Communion",
    videoUrl: "./videos/hymnal sunday.webm",
    left: 12.29, // (136 + 100) / 1920
    top: 33.5, // 480px / 1316
    width: 10.42, // 200px / 1920
    height: 27.05, // 356px / 1316
    aspect: "portrait",
    depth: "midground",
  },
  {
    id: "node-mid-right",
    title: "Joyful Praise & Adoration",
    label: "Sunday Celebration",
    videoUrl: "./videos/guest min..webm",
    left: 77.29, // (1384 + 100) / 1920
    top: 33.5, // 480px / 1316
    width: 10.42, // 200px / 1920
    height: 27.05, // 356px / 1316
    aspect: "portrait",
    depth: "midground",
  },

  // Bottom Row (3 cards)
  {
    id: "node-bot-1",
    title: "Choral Hymns of Old",
    label: "Sacred Harmonies",
    videoUrl: "./videos/ezzer women montage.webm",
    left: 17.5, // 336px / 1920
    top: 66, // 1018px / 1316
    width: 20.83, // 400px / 1920
    height: 18.24, // 240px / 1316
    aspect: "landscape",
    depth: "background",
  },
  {
    id: "node-bot-2",
    title: "Sanctuary of Faith",
    label: "The Cross & Fellowship",
    videoUrl: "./videos/hymnal sunday.webm",
    left: 44.79, // 860px / 1920
    top: 60.50, // 960px / 1316
    width: 10.42, // 200px / 1920
    height: 27.05, // 356px / 1316
    aspect: "portrait",
    depth: "foreground",
  },
  {
    id: "node-bot-3",
    title: "Stained Glass Radiance",
    label: "Heritage & Vision",
    videoUrl: "./videos/Pst. Agu Irukwu.webm",
    left: 61.67, // 1184px / 1920
    top: 66, // 1018px / 1316
    width: 20.83, // 400px / 1920
    height: 18.24, // 240px / 1316
    aspect: "landscape",
    depth: "background",
  },
];

// Vector motion definitions for the 3 requested colors: #B3FFE0, #FCDFDE, #FCF6E8
interface VectorBlobConfig {
  id: string;
  color: string;
  initialX: string;
  initialY: string;
  width: string;
  height: string;
  blur: string;
  opacity: number;
  // Multi-frequency harmonic motion parameters for organic random drift
  fx1: number;
  fy1: number;
  fx2: number;
  fy2: number;
  phaseX: number;
  phaseY: number;
  ampX: number;
  ampY: number;
}

const VECTOR_BLOBS: VectorBlobConfig[] = [
  // 1. #B3FFE0 - Mint pastel (top-right drifting down towards center)
  {
    id: "blob-mint-top",
    color: "#B3FFE0",
    initialX: "60%",
    initialY: "2%",
    width: "820px",
    height: "640px",
    blur: "120px",
    opacity: 0.65,
    fx1: 0.28,
    fy1: 0.32,
    fx2: 0.17,
    fy2: 0.22,
    phaseX: 0.5,
    phaseY: 1.2,
    ampX: 90,
    ampY: 110,
  },
  // 2. #FCDFDE - Soft blush rose (mid-left drifting down across hero & countdown)
  {
    id: "blob-rose-left",
    color: "#FCDFDE",
    initialX: "2%",
    initialY: "30%",
    width: "780px",
    height: "680px",
    blur: "130px",
    opacity: 0.75,
    fx1: 0.22,
    fy1: 0.27,
    fx2: 0.14,
    fy2: 0.19,
    phaseX: 2.3,
    phaseY: 0.8,
    ampX: 110,
    ampY: 130,
  },
  // 3. #FCF6E8 - Warm cream/peach (center & lower seam bleeding directly into CountdownSection)
  {
    id: "blob-cream-center",
    color: "#FCF6E8",
    initialX: "32%",
    initialY: "58%",
    width: "880px",
    height: "720px",
    blur: "110px",
    opacity: 0.85,
    fx1: 0.25,
    fy1: 0.21,
    fx2: 0.18,
    fy2: 0.15,
    phaseX: 4.1,
    phaseY: 3.2,
    ampX: 85,
    ampY: 120,
  },
  // 4. #B3FFE0 - Mint pastel lower blob (bleeding deeply into CountdownSection)
  {
    id: "blob-mint-bottom",
    color: "#B3FFE0",
    initialX: "55%",
    initialY: "78%",
    width: "760px",
    height: "620px",
    blur: "130px",
    opacity: 0.6,
    fx1: 0.19,
    fy1: 0.24,
    fx2: 0.12,
    fy2: 0.16,
    phaseX: 1.7,
    phaseY: 4.8,
    ampX: 100,
    ampY: 95,
  },
  // 5. #FCDFDE - Secondary blush rose (bleeding into bottom right countdown area)
  {
    id: "blob-rose-bottom",
    color: "#FCDFDE",
    initialX: "78%",
    initialY: "72%",
    width: "720px",
    height: "590px",
    blur: "120px",
    opacity: 0.65,
    fx1: 0.26,
    fy1: 0.23,
    fx2: 0.15,
    fy2: 0.18,
    phaseX: 3.5,
    phaseY: 2.1,
    ampX: 95,
    ampY: 115,
  },
];

export function HeroSection() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Hover & Audio State
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [unmutedId, setUnmutedId] = useState<string | null>(null);

  // Background Vectors Random Motion Animation Loop
  useEffect(() => {
    let animId: number;
    const start = Date.now();

    const animateBlobs = () => {
      const elapsed = (Date.now() - start) / 1000;

      VECTOR_BLOBS.forEach((blob, idx) => {
        const el = blobRefs.current[idx];
        if (!el) return;

        // Organic multi-harmonic random drift
        const dx =
          Math.sin(elapsed * blob.fx1 + blob.phaseX) * blob.ampX +
          Math.cos(elapsed * blob.fx2 + blob.phaseY) * (blob.ampX * 0.45);
        const dy =
          Math.cos(elapsed * blob.fy1 + blob.phaseY) * blob.ampY +
          Math.sin(elapsed * blob.fy2 + blob.phaseX) * (blob.ampY * 0.45);
        const scale = 1 + Math.sin(elapsed * 0.18 + blob.phaseX) * 0.08;

        // Animate the background blur vector smoothly
        el.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) scale(${scale.toFixed(3)})`;
      });

      animId = requestAnimationFrame(animateBlobs);
    };

    animId = requestAnimationFrame(animateBlobs);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Card Mouse Enter: Unmute hovered video, mute all others
  const handleMouseEnterCard = useCallback((id: string, index: number) => {
    setHoveredId(id);
    setUnmutedId(id);

    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === index) {
        vid.muted = false;
        // Ensure playback continues with audio
        const p = vid.play();
        if (p !== undefined) {
          p.catch(() => {
            // Autoplay with audio was restricted; video continues muted
          });
        }
      } else {
        vid.muted = true;
      }
    });
  }, []);

  // Card Mouse Leave: Mute video immediately
  const handleMouseLeaveCard = useCallback((index: number) => {
    setHoveredId(null);
    setUnmutedId(null);

    const vid = videoRefs.current[index];
    if (vid) {
      vid.muted = true;
    }
  }, []);

  // Global mouse leave: ensure all videos are muted
  const handleGlobalMouseLeave = useCallback(() => {
    setHoveredId(null);
    setUnmutedId(null);
    videoRefs.current.forEach((vid) => {
      if (vid) vid.muted = true;
    });
  }, []);

  return (
    <section
      onMouseLeave={handleGlobalMouseLeave}
      className="relative w-full overflow-x-clip overflow-y-visible bg-white select-none pt-[20px] xl:pt-[24px] 2xl:pt-[40px]"
      data-node-id="2086:90"
      data-name="hero"
    >
      {/* ─── Blurred Vectors (#B3FFE0, #FCDFDE, #FCF6E8) ─── */}
      {/* Bleeds out beyond HeroSection down into CountdownSection */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[145%] min-h-[1600px] z-0 overflow-visible"
        aria-hidden="true"
        data-node-id="2104:9688"
      >
        {VECTOR_BLOBS.map((blob, idx) => (
          <div
            key={blob.id}
            ref={(el) => {
              blobRefs.current[idx] = el;
            }}
            className="absolute rounded-full will-change-transform"
            style={{
              left: blob.initialX,
              top: blob.initialY,
              width: blob.width,
              height: blob.height,
              backgroundColor: blob.color,
              filter: `blur(${blob.blur})`,
              opacity: blob.opacity,
              transformOrigin: "center center",
              transition: "opacity 1s ease",
            }}
          />
        ))}
      </div>

      {/* ─── DESKTOP CANVAS (Figma 1920x1316 Layout Geometry) ─── */}
      <div className="hidden lg:block relative w-full h-[1080px] xl:h-[1200px] 2xl:h-[1316px] max-w-[1920px] mx-auto z-10">
        {/* Fixed Video Cards (NO translate3d transform) */}
        {HERO_VIDEO_NODES.map((node, index) => {
          const isHovered = hoveredId === node.id;
          const isDimmed = hoveredId !== null && !isHovered;
          const isUnmuted = unmutedId === node.id;

          return (
            <div
              key={node.id}
              className="absolute pointer-events-auto transition-opacity duration-300 ease-out"
              style={{
                left: `${node.left}%`,
                top: `${node.top}%`,
                width: `${node.width}%`,
                height: `${node.height}%`,
                zIndex: isHovered ? 35 : node.depth === "foreground" ? 20 : node.depth === "midground" ? 15 : 10,
                opacity: isDimmed ? 0.45 : 1,
              }}
              onMouseEnter={() => handleMouseEnterCard(node.id, index)}
              onMouseLeave={() => handleMouseLeaveCard(index)}
            >
              {/* Static Card Container without translate3d */}
              <div
                className={`relative size-full rounded-[10px] overflow-hidden transition-all duration-300 ${
                  isHovered
                    ? "scale-[1.04] shadow-[0px_20px_45px_rgba(4,4,4,0.30)] ring-2 ring-[#f0a505]"
                    : "drop-shadow-[0px_0px_8px_rgba(4,4,4,0.15)] shadow-md"
                }`}
              >
                {/* HTML5 Looping Autoplay Video (Muted on load, unmuted on hover) */}
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={node.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="size-full object-cover pointer-events-none"
                />

                {/* Subtle Cinematic Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                {/* Video Info Badge & Audio Status */}
                <div
                  className={`absolute bottom-0 inset-x-0 p-3 flex items-center justify-between transition-opacity duration-300 ${
                    isHovered ? "opacity-0" : "opacity-0"
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#f0a505]">
                      {node.label}
                    </span>
                    <span className="text-xs font-semibold text-white drop-shadow-sm truncate max-w-[140px] xl:max-w-[180px]">
                      {node.title}
                    </span>
                  </div>

                  <div
                    className="p-1.5 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center gap-1"
                    title={isUnmuted ? "Playing with sound" : "Muted"}
                  >
                    {isUnmuted ? (
                      <>
                        <Volume2 className="size-3.5 text-[#f0a505] animate-pulse" />
                        <span className="text-[10px] font-bold text-[#f0a505] pr-1">Audio On</span>
                      </>
                    ) : (
                      <VolumeX className="size-3.5 text-white/80" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* ─── Central Welcome Card (Figma Frame 5 / node 2114:12589) ─── */}
        <div
          className="absolute left-1/2 top-1/3 mt-[96px] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto"
          data-node-id="2114:12589"
        >
          <div
            className="flex flex-col items-center justify-center text-center w-[580px] xl:w-[620px]  backdrop-blur-md"
            // style={{
            //   backgroundImage:
            //     "radial-gradient(circle at center, rgba(255,255,255,0.96) 0%, rgba(248,248,248,0.72) 25%)",
            // }}
          >
            {/* Title Block (Figma Frame 22) */}
            <div className="flex flex-col items-center gap-[8px]" data-node-id="2114:12590">
              <p
                className="font-display font-recursive-sans font-medium italic text-[#242424] text-[24px] xl:text-[28px] leading-normal"
                data-node-id="2114:12591"
                style={{ fontVariationSettings: '"CASL" 0, "CRSV" 1, "MONO" 1' }}
              >
                Welcome to
              </p>
              <h1
                className="font-sans font-bold text-[#D61812] text-[34px] xl:text-[40px] tracking-tight leading-none whitespace-nowrap"
                data-node-id="2114:12592"
              >
                COURT OF HIS MAJESTY
              </h1>
            </div>

            {/* CTA Buttons (Figma Frame 24) */}
            <div className="flex items-center justify-center gap-[16px] mt-[28px]" data-node-id="2114:12593">
              <Link
                href="/new-here"
                className="inline-flex items-center justify-center px-[38px] py-[16px] rounded-[36px] bg-[#f0a505] hover:bg-[#d99404] text-[#0a0a0a] font-sans font-semibold text-[17px] shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                data-node-id="2114:12594"
              >
                Plan a Visit
              </Link>

              <Link
                href="https://youtube.com/@rccgchm?si=JSIawZL2BpxMx_OW"
                target="_blank"
                className="inline-flex items-center justify-center gap-[8px] px-[36px] py-[15px] rounded-[28px] border border-[#b2a1ed] bg-[#b2a1ed]/10 hover:bg-[#b2a1ed]/20 text-[#180c62] font-sans font-semibold text-[17px] transition-all group"
                data-node-id="2114:12596"
              >
                <span>Watch Online</span>
                <ArrowUpRight className="size-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MOBILE & TABLET RESPONSIVE VIEW (< lg) ─── */}
      <div className="block lg:hidden relative w-full sm:px-8 py-10 z-10">
        {/* Central Hero Headline */}
        <div className="max-w-[500px] mx-auto text-center p-6 sm:p-8 rounded-[28px] backdrop-blur-md mb-8">
          <p
            className="font-display font-recursive-mono italic text-xl sm:text-2xl text-[#242424] mb-2"
            style={{ fontVariationSettings: '"CASL" 0, "CRSV" 1, "MONO" 1' }}
          >
            Welcome to
          </p>
          <h1 className="font-sans font-bold text-2xl sm:text-3xl text-[#D61812] tracking-tight leading-tight">
            COURT OF HIS MAJESTY
          </h1>
          {/* <p className="mt-3 text-sm sm:text-base text-gray-600">
            A house of prayer, dynamic worship, and supernatural transformation for the whole family.
          </p> */}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/new-here"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-[#0a0a0a] bg-[#f0a505] hover:bg-[#d99404] text-sm shadow-sm transition-all"
            >
              Plan a Visit
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full font-semibold text-[#180c62] border border-[#b2a1ed] bg-[#b2a1ed]/10 text-sm transition-all"
            >
              <span>Watch Online</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Mobile Horizontal Video Stream */}
        <div className="w-full flex gap-4 overflow-x-auto pb-4 pt-2 no-scrollbar snap-x snap-mandatory">
          {HERO_VIDEO_NODES.slice(0, 6).map((node, mIdx) => (
            <div
              key={node.id}
              className="relative shrink-0 snap-center w-[220px] sm:w-[260px] h-[320px] rounded-[16px] overflow-hidden shadow-lg border border-gray-100"
              onClick={() => {
                const vid = videoRefs.current[mIdx];
                if (vid) {
                  vid.muted = !vid.muted;
                  setUnmutedId(vid.muted ? null : node.id);
                }
              }}
            >
              <video
                src={node.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="size-full object-cover"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#f0a505]">
                  {node.label}
                </span>
                <span className="text-xs font-semibold text-white truncate">{node.title}</span>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
