"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

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
  phase: number;
  freqX: number;
  freqY: number;
  ampX: number;
  ampY: number;
}

// 10 Video Nodes precisely matched to Figma node 2086:90 / 2114:12576 geometry
const HERO_VIDEO_NODES: VideoNode[] = [
  // Top Row (5 cards)
  {
    id: "node-top-1",
    title: "Congregation in Worship",
    label: "Worship Service",
    videoUrl: "https://cdn.coverr.co/videos/coverr-congregation-in-a-church-service-8925/1080p.mp4",
    left: 0.62, // 12px / 1920
    top: 0.0, // 0px
    width: 10.42, // 200px / 1920
    height: 27.05, // 356px / 1316
    aspect: "portrait",
    depth: "foreground",
    phase: 0.2,
    freqX: 0.7,
    freqY: 0.8,
    ampX: 10,
    ampY: 14,
  },
  {
    id: "node-top-2",
    title: "Choose Life Conference",
    label: "29 Years Festival",
    videoUrl: "https://cdn.coverr.co/videos/coverr-church-service-3829/1080p.mp4",
    left: 17.5, // 336px / 1920
    top: 4.41, // 58px / 1316
    width: 20.83, // 400px / 1920
    height: 18.24, // 240px / 1316
    aspect: "landscape",
    depth: "midground",
    phase: 1.4,
    freqX: 0.5,
    freqY: 0.6,
    ampX: 8,
    ampY: 10,
  },
  {
    id: "node-top-3",
    title: "Word of Faith Ministration",
    label: "Pulpit Message",
    videoUrl: "https://cdn.coverr.co/videos/coverr-priest-preaching-from-the-pulpit-8921/1080p.mp4",
    left: 44.79, // 860px / 1920
    top: 0.0, // 0px
    width: 10.42, // 200px / 1920
    height: 27.05, // 356px / 1316
    aspect: "portrait",
    depth: "foreground",
    phase: 2.7,
    freqX: 0.8,
    freqY: 0.9,
    ampX: 12,
    ampY: 16,
  },
  {
    id: "node-top-4",
    title: "Sunlight of His Glory",
    label: "Cathedral Grace",
    videoUrl: "https://cdn.coverr.co/videos/coverr-sunlight-streaming-through-church-windows-3830/1080p.mp4",
    left: 61.67, // 1184px / 1920
    top: 4.41, // 58px / 1316
    width: 20.83, // 400px / 1920
    height: 18.24, // 240px / 1316
    aspect: "landscape",
    depth: "background",
    phase: 3.9,
    freqX: 0.4,
    freqY: 0.5,
    ampX: 6,
    ampY: 8,
  },
  {
    id: "node-top-5",
    title: "Gospel Choir Ministration",
    label: "Voices of Praise",
    videoUrl: "https://cdn.coverr.co/videos/coverr-gospel-choir-singing-in-church-8924/1080p.mp4",
    left: 88.96, // 1708px / 1920
    top: 0.0, // 0px
    width: 10.42, // 200px / 1920
    height: 27.05, // 356px / 1316
    aspect: "portrait",
    depth: "background",
    phase: 5.1,
    freqX: 0.6,
    freqY: 0.7,
    ampX: 9,
    ampY: 12,
  },

  // Middle Row Sides (2 cards)
  {
    id: "node-mid-left",
    title: "Altar of Prayer & Intercession",
    label: "Holy Communion",
    videoUrl: "https://cdn.coverr.co/videos/coverr-lighting-candles-in-a-church-3746/1080p.mp4",
    left: 12.29, // (136 + 100) / 1920
    top: 36.47, // 480px / 1316
    width: 10.42, // 200px / 1920
    height: 27.05, // 356px / 1316
    aspect: "portrait",
    depth: "midground",
    phase: 1.8,
    freqX: 0.65,
    freqY: 0.75,
    ampX: 11,
    ampY: 15,
  },
  {
    id: "node-mid-right",
    title: "Joyful Praise & Adoration",
    label: "Sunday Celebration",
    videoUrl: "https://cdn.coverr.co/videos/coverr-people-raising-their-hands-in-a-concert-6047/1080p.mp4",
    left: 77.29, // (1384 + 100) / 1920
    top: 36.47, // 480px / 1316
    width: 10.42, // 200px / 1920
    height: 27.05, // 356px / 1316
    aspect: "portrait",
    depth: "midground",
    phase: 4.5,
    freqX: 0.7,
    freqY: 0.85,
    ampX: 11,
    ampY: 14,
  },

  // Bottom Row (3 cards)
  {
    id: "node-bot-1",
    title: "Choral Hymns of Old",
    label: "Sacred Harmonies",
    videoUrl: "https://cdn.coverr.co/videos/coverr-choir-singing-hymns-8923/1080p.mp4",
    left: 17.5, // 336px / 1920
    top: 77.36, // 1018px / 1316
    width: 20.83, // 400px / 1920
    height: 18.24, // 240px / 1316
    aspect: "landscape",
    depth: "background",
    phase: 2.2,
    freqX: 0.45,
    freqY: 0.55,
    ampX: 7,
    ampY: 9,
  },
  {
    id: "node-bot-2",
    title: "Sanctuary of Faith",
    label: "The Cross & Fellowship",
    videoUrl: "https://cdn.coverr.co/videos/coverr-church-exterior-and-cross-8920/1080p.mp4",
    left: 44.79, // 860px / 1920
    top: 72.95, // 960px / 1316
    width: 10.42, // 200px / 1920
    height: 27.05, // 356px / 1316
    aspect: "portrait",
    depth: "foreground",
    phase: 3.4,
    freqX: 0.75,
    freqY: 0.95,
    ampX: 13,
    ampY: 17,
  },
  {
    id: "node-bot-3",
    title: "Stained Glass Radiance",
    label: "Heritage & Vision",
    videoUrl: "https://cdn.coverr.co/videos/coverr-stained-glass-window-in-a-church-8922/1080p.mp4",
    left: 61.67, // 1184px / 1920
    top: 77.36, // 1018px / 1316
    width: 20.83, // 400px / 1920
    height: 18.24, // 240px / 1316
    aspect: "landscape",
    depth: "background",
    phase: 5.7,
    freqX: 0.5,
    freqY: 0.6,
    ampX: 7,
    ampY: 10,
  },
];

const DEPTH_MULTIPLIERS = {
  foreground: 1.0,
  midground: 0.55,
  background: 0.25,
};

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Interaction State
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [unmutedId, setUnmutedId] = useState<string | null>(null);

  // Mouse Parallax Physics (lerped)
  const mousePos = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Mouse Move Handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    mousePos.current.targetX = Math.max(-1, Math.min(1, x));
    mousePos.current.targetY = Math.max(-1, Math.min(1, y));
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePos.current.targetX = 0;
    mousePos.current.targetY = 0;
    setHoveredId(null);
  }, []);

  // Animation Loop: Drift Inertia + Mouse Parallax (Reference from dirty-jobs-event-memory-graph)
  useEffect(() => {
    const loop = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;

      // Lerp mouse coordinates smoothly
      mousePos.current.currentX += (mousePos.current.targetX - mousePos.current.currentX) * 0.05;
      mousePos.current.currentY += (mousePos.current.targetY - mousePos.current.currentY) * 0.05;

      HERO_VIDEO_NODES.forEach((node, index) => {
        const el = cardElementsRef.current[index];
        if (!el) return;

        const depthFactor = DEPTH_MULTIPLIERS[node.depth];

        // 1. Organic Drift / Harmonic Float
        const driftX = Math.sin(elapsed * node.freqX + node.phase) * node.ampX;
        const driftY = Math.cos(elapsed * node.freqY + node.phase) * node.ampY;
        const tilt = Math.sin(elapsed * 0.4 + node.phase) * (node.depth === "foreground" ? 1.2 : 0.6);

        // 2. Parallax Shift from Mouse
        const parallaxX = mousePos.current.currentX * 36 * depthFactor;
        const parallaxY = mousePos.current.currentY * 36 * depthFactor;

        const totalX = driftX + parallaxX;
        const totalY = driftY + parallaxY;

        // Apply smooth 3D translation & rotation
        el.style.transform = `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0px) rotate(${tilt.toFixed(2)}deg)`;
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Toggle Video Sound on Click
  const toggleSound = (nodeId: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[index];
    if (!vid) return;

    if (unmutedId === nodeId) {
      vid.muted = true;
      setUnmutedId(null);
    } else {
      // Mute any previously unmuted video
      videoRefs.current.forEach((v) => {
        if (v) v.muted = true;
      });
      vid.muted = false;
      setUnmutedId(nodeId);
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden bg-white select-none"
      data-node-id="2086:90"
      data-name="hero"
    >
      {/* ─── Ambient Glow Blobs (Figma Frame 7 / node 2104:9688) ─── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        data-node-id="2104:9688"
      >
        {/* Vector 130: Top-Right Cyan/Emerald Glow */}
        <div
          className="absolute -top-[10%] right-[5%] w-[820px] h-[590px] rounded-full blur-[130px] opacity-25"
          style={{ background: "radial-gradient(circle, #0bcc12 0%, #00e5ff 70%, transparent 100%)" }}
        />
        {/* Vector 131: Bottom-Right Mint Glow */}
        <div
          className="absolute top-[40%] right-[0%] w-[810px] h-[480px] rounded-full blur-[120px] opacity-20"
          style={{ background: "radial-gradient(circle, #05d5a5 0%, #b2a1ed 80%, transparent 100%)" }}
        />
        {/* Vector 132: Bottom-Left Rose/Peach Glow */}
        <div
          className="absolute top-[35%] left-[5%] w-[650px] h-[610px] rounded-full blur-[110px] opacity-25"
          style={{ background: "radial-gradient(circle, #ff6b8b 0%, #f0a505 75%, transparent 100%)" }}
        />
      </div>

      {/* ─── DESKTOP CANVAS (Scaled Interactive Memory Graph Stage) ─── */}
      <div className="hidden lg:block relative w-full h-[1080px] xl:h-[1200px] 2xl:h-[1316px] max-w-[1920px] mx-auto z-10">
        {/* Floating Video Cards */}
        {HERO_VIDEO_NODES.map((node, index) => {
          const isHovered = hoveredId === node.id;
          const isDimmed = hoveredId !== null && !isHovered;
          const isUnmuted = unmutedId === node.id;

          return (
            <div
              key={node.id}
              className="absolute pointer-events-auto transition-opacity duration-500 ease-out"
              style={{
                left: `${node.left}%`,
                top: `${node.top}%`,
                width: `${node.width}%`,
                height: `${node.height}%`,
                zIndex: isHovered ? 35 : node.depth === "foreground" ? 20 : node.depth === "midground" ? 15 : 10,
                opacity: isDimmed ? 0.45 : 1,
              }}
              onMouseEnter={() => setHoveredId(node.id)}
            >
              <div
                ref={(el) => {
                  cardElementsRef.current[index] = el;
                }}
                className={`relative size-full rounded-[10px] overflow-hidden transition-shadow duration-300 ${
                  isHovered
                    ? "shadow-[0px_16px_40px_rgba(4,4,4,0.30)] ring-2 ring-[#f0a505]/80 scale-[1.05]"
                    : "drop-shadow-[0px_0px_10px_rgba(4,4,4,0.15)] shadow-md"
                }`}
                style={{
                  transformOrigin: "center center",
                  transition: "transform 0.15s ease-out, box-shadow 0.3s ease-out, filter 0.3s ease-out",
                }}
              >
                {/* HTML5 Looping Background Video */}
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

                {/* Subtle Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                {/* Video Info Badge & Audio Toggle on Hover */}
                <div
                  className={`absolute bottom-0 inset-x-0 p-3 flex items-center justify-between transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
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

                  <button
                    onClick={(e) => toggleSound(node.id, index, e)}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-transform hover:scale-110"
                    title={isUnmuted ? "Mute video" : "Listen with sound"}
                    aria-label="Toggle sound"
                  >
                    {isUnmuted ? <Volume2 className="size-3.5 text-[#f0a505]" /> : <VolumeX className="size-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* ─── Central Welcome Card (Figma Frame 5 / node 2114:12589) ─── */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto"
          data-node-id="2114:12589"
        >
          <div
            className="flex flex-col items-center justify-center text-center p-[40px] w-[580px] xl:w-[620px] rounded-[32px] bg-white/85 backdrop-blur-md border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(248,248,248,0.7) 100%)",
            }}
          >
            {/* Title Block (Figma Frame 22) */}
            <div className="flex flex-col items-center gap-[8px]" data-node-id="2114:12590">
              <p
                className="font-display font-recursive-mono font-medium italic text-[#242424] text-[24px] xl:text-[28px] leading-normal"
                data-node-id="2114:12591"
                style={{ fontVariationSettings: '"CASL" 0, "CRSV" 1, "MONO" 1' }}
              >
                Welcome to
              </p>
              <h1
                className="font-sans font-bold text-[#0a0a0a] text-[34px] xl:text-[40px] tracking-tight leading-none whitespace-nowrap"
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
                href="/services"
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
      <div className="block lg:hidden relative w-full px-4 sm:px-8 py-10 z-10">
        {/* Central Hero Headline */}
        <div className="max-w-[500px] mx-auto text-center p-6 sm:p-8 rounded-[28px] bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl mb-8">
          <p
            className="font-display font-recursive-mono italic text-xl sm:text-2xl text-[#242424] mb-2"
            style={{ fontVariationSettings: '"CASL" 0, "CRSV" 1, "MONO" 1' }}
          >
            Welcome to
          </p>
          <h1 className="font-sans font-bold text-2xl sm:text-3xl text-[#0a0a0a] tracking-tight leading-tight">
            COURT OF HIS MAJESTY
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            A house of prayer, dynamic worship, and supernatural transformation for the whole family.
          </p>

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

        {/* Mobile Horizontal Video Stream with Gentle Floating Cards */}
        <div className="w-full flex gap-4 overflow-x-auto pb-4 pt-2 no-scrollbar snap-x snap-mandatory">
          {HERO_VIDEO_NODES.slice(0, 6).map((node) => (
            <div
              key={node.id}
              className="relative shrink-0 snap-center w-[220px] sm:w-[260px] h-[320px] rounded-[16px] overflow-hidden shadow-lg border border-gray-100"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#f0a505]">
                  {node.label}
                </span>
                <span className="text-xs font-semibold text-white truncate">{node.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
