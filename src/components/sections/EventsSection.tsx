"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

export interface EventItem {
  id: string;
  title: string;
  theme?: string;
  date: string;
  time?: string;
  location?: string;
  videoUrl: string;
  link: string;
}

// Exactly 4 items (does not exceed 4 as required)
const EVENTS_DATA: EventItem[] = [
  {
    id: "festival-of-destiny",
    title: "Festival of Destiny Conference 2026",
    theme: "Choose Life",
    date: "November 8th - 15th, 2026",
    time: "6:00 PM Daily",
    location: "Main Auditorium, Court of His Majesty",
    videoUrl: "/videos/FOD 2026.webm",
    link: "/events",
  },
  {
    id: "mens-annual-conference",
    title: "Men’s Annual Conference",
    theme: "Kingdom Men of Impact",
    date: "October 18th - 20th, 2026",
    time: "9:00 AM & 5:00 PM",
    location: "Main Sanctuary, RCCG CHM",
    videoUrl: "/videos/men conf..webm",
    link: "/events",
  },
  {
    id: "ezzer-women-conference",
    title: "Ezzer Women Annual Conference",
    theme: "Women of Grace & Glory",
    date: "September 12th - 14th, 2026",
    time: "10:00 AM & 6:00 PM",
    location: "RCCG Court of His Majesty",
    videoUrl: "/videos/ezzer women montage.webm",
    link: "/events",
  },
  {
    id: "choose-life-encounter",
    title: "Choose Life Conference",
    theme: "Living Above Limits",
    date: "August 22nd - 24th, 2026",
    time: "5:30 PM",
    location: "Court of His Majesty & Livestream",
    videoUrl: "/videos/choose life action.webm",
    link: "/events",
  },
];

// Exact transform configs from cinematic-carousel.vercel.app's dd definition
const PANEL_CONFIGS: Record<
  number,
  {
    x: string;
    rotateY: number;
    scale: number;
    originX: number;
    opacity: number;
    blur: number;
    brightness: number;
    zIndex: number;
  }
> = {
  [-2]: {
    x: "-100vw",
    rotateY: 62,
    scale: 0.85,
    originX: 1,
    opacity: 0.3,
    blur: 1.5,
    brightness: 0.48,
    zIndex: 1,
  },
  [-1]: {
    x: "-41vw",
    rotateY: 60,
    scale: 1,
    originX: 1,
    opacity: 0.45,
    blur: 1,
    brightness: 0.8,
    zIndex: 3,
  },
  [0]: {
    x: "0vw",
    rotateY: 0,
    scale: 1,
    originX: 0.5,
    opacity: 1,
    blur: 0,
    brightness: 1,
    zIndex: 5,
  },
  [1]: {
    x: "41vw",
    rotateY: -60,
    scale: 1,
    originX: 0,
    opacity: 0.45,
    blur: 1,
    brightness: 0.8,
    zIndex: 3,
  },
  [2]: {
    x: "100vw",
    rotateY: -62,
    scale: 0.85,
    originX: 0,
    opacity: 0.3,
    blur: 1.5,
    brightness: 0.48,
    zIndex: 1,
  },
};

export function EventsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const dragStartX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const centerVideoRef = useRef<HTMLVideoElement | null>(null);
  const reflectionVideoRef = useRef<HTMLVideoElement | null>(null);

  const total = EVENTS_DATA.length;
  const currentEvent = EVENTS_DATA[currentIndex];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Synchronize audio and playback on index change
  useEffect(() => {
    if (centerVideoRef.current) {
      centerVideoRef.current.muted = isMuted;
      centerVideoRef.current.play().catch(() => {});
    }
    if (reflectionVideoRef.current) {
      reflectionVideoRef.current.currentTime = centerVideoRef.current?.currentTime || 0;
      reflectionVideoRef.current.play().catch(() => {});
    }
  }, [currentIndex, isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (centerVideoRef.current) {
      centerVideoRef.current.muted = !isMuted;
    }
  };

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Offsets matching cinematic-carousel.vercel.app's rendered window [-2, -1, 0, 1, 2]
  const visibleOffsets = [-2, -1, 0, 1, 2];

  return (
    <section
      className="w-full py-16 lg:py-24 bg-white relative overflow-hidden select-none"
      data-node-id="2110:11239"
      data-name="events"
    >
      <Container className="max-w-[1440px]">
        {/* Section Header matching Figma node 2110:11241 */}
        <div className="flex items-center justify-between pb-6 mb-2 lg:mb-4">
          <div>
            <h2 className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl md:text-[40px] text-[#0a0a0a] tracking-tight">
              Upcoming Events
            </h2>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-sans italic font-medium text-base sm:text-xl lg:text-[24px] text-[#0a0a0a] hover:text-[#c8a96e] transition-colors group"
          >
            <span>see all events</span>
            <span className="font-sans not-italic font-bold tracking-tighter text-lg sm:text-xl group-hover:translate-x-1.5 transition-transform duration-200">
              →
            </span>
          </Link>
        </div>

        {/* Outer Carousel Viewport with 3D perspective and dynamic CSS variables */}
        <div
          className="relative w-full h-[580px] sm:h-[680px] lg:h-[782px] flex items-center justify-center overflow-hidden"
          style={
            {
              "--panel-w": "min(680px, 86vw)",
              "--panel-h": "calc(var(--panel-w) * 405 / 680)",
            } as React.CSSProperties
          }
          data-node-id="2111:11848"
          data-name="event carousel"
        >
          {/* FLOOR REFLECTION (Matching cinematic-carousel.vercel.app's Ad component & Figma reflection) */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: "calc(50% + (var(--panel-h) / 2) + 7px)",
              height: "260px",
              zIndex: 0,
              maskImage:
                "linear-gradient(to bottom, black 0%, black 20%, transparent 80%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 20%, transparent 80%)",
              opacity: 0.45,
            }}
            data-name="reflection"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: "var(--panel-w)",
                height: "var(--panel-h)",
                marginLeft: "calc(-1 * var(--panel-w) / 2)",
                transformOrigin: "top center",
                transform: "perspective(900px) rotateX(60deg)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "scaleY(-1)",
                  filter: "blur(6px)",
                  opacity: 0.5,
                }}
              >
                <video
                  ref={reflectionVideoRef}
                  src={currentEvent.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* EXACT .panels-container FROM CINEMATIC-CAROUSEL.VERCEL.APP */}
          <div
            className="panels-container"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              touchAction: "pan-y",
              perspective: "1400px",
              cursor: "default",
            }}
            onPointerDown={(e) => {
              isDragging.current = true;
              dragStartX.current = e.clientX;
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerUp={(e) => {
              if (!isDragging.current) return;
              isDragging.current = false;
              const delta = e.clientX - dragStartX.current;
              if (Math.abs(delta) > 40) {
                if (delta < 0) handleNext();
                else handlePrev();
              }
            }}
            onPointerCancel={() => {
              isDragging.current = false;
            }}
          >
            {visibleOffsets.map((offset) => {
              const slideIdx = ((currentIndex + offset) % total + total) % total;
              const slide = EVENTS_DATA[slideIdx];
              const cfg = PANEL_CONFIGS[offset];
              const isCenter = offset === 0;

              return (
                <div
                  key={`${slide.id}-${offset}`}
                  data-panel-offset={offset}
                  onClick={() => {
                    if (!isCenter) {
                      setCurrentIndex(slideIdx);
                    }
                  }}
                  style={{
                    position: "absolute",
                    width: "var(--panel-w)",
                    height: "var(--panel-h)",
                    left: "50%",
                    top: "50%",
                    marginLeft: "calc(-1 * var(--panel-w) / 2)",
                    marginTop: "calc(-1 * var(--panel-h) / 2)",
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity, filter",
                    transform: `translate3d(${cfg.x}, 0px, 0px) rotateY(${cfg.rotateY}deg) scale(${cfg.scale})`,
                    transformOrigin: `${cfg.originX * 100}% center`,
                    opacity: cfg.opacity,
                    filter: `blur(${cfg.blur}px) brightness(${cfg.brightness})`,
                    zIndex: cfg.zIndex,
                    userSelect: "none",
                    cursor: isCenter ? "default" : "pointer",
                    pointerEvents: Math.abs(offset) <= 1 ? "auto" : "none",
                    transition:
                      "transform 700ms cubic-bezier(0.25, 1, 0.5, 1), opacity 500ms ease, filter 500ms ease",
                  }}
                >
                  {/* Subtle radial glow underneath active center panel */}
                  {isCenter && (
                    <div
                      style={{
                        position: "absolute",
                        inset: -50,
                        borderRadius: 16,
                        background:
                          "radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 65%)",
                        pointerEvents: "none",
                        zIndex: -1,
                      }}
                    />
                  )}

                  {/* Panel video box */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      background: "#080808",
                      borderRadius: 16,
                      boxShadow: isCenter
                        ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                        : "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <div style={{ position: "absolute", inset: 0 }}>
                      <video
                        ref={(el) => {
                          if (isCenter) centerVideoRef.current = el;
                        }}
                        src={slide.videoUrl}
                        autoPlay
                        loop
                        muted={!isCenter || isMuted}
                        playsInline
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Overlay Darkness (matching cinematic-carousel reference) */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgb(0,0,0)",
                      opacity: isCenter ? 0 : 0.35,
                      pointerEvents: "none",
                      zIndex: 1,
                      borderRadius: 16,
                      transition: "opacity 500ms ease",
                    }}
                  />

                  {/* Center Audio Control Toggle */}
                  {isCenter && (
                    <div className="absolute bottom-4 right-4 z-20">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-all cursor-pointer shadow-lg group/mute"
                        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                        title={isMuted ? "Unmute audio" : "Mute audio"}
                      >
                        {isMuted ? (
                          <VolumeX className="size-4 text-white/80 group-hover/mute:text-white" />
                        ) : (
                          <Volume2 className="size-4 text-[#c8a96e]" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cinematic Vignettes from Reference */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.65) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.65) 100%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              background:
                "linear-gradient(to bottom, transparent 65%, rgba(0,0,0,0.5) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Figma Overlay Button - PREVIOUS (Node 2115:12625) */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-0 top-[30px] bottom-[140px] z-20 w-[90px] sm:w-[120px] flex items-center justify-start pl-4 sm:pl-6 text-[#f5f5f5] font-sans font-bold text-base sm:text-[18px] transition-all cursor-pointer group hover:brightness-125"
            style={{
              background:
                "linear-gradient(269.7deg, rgba(0, 0, 0, 0) 1.38%, rgba(0, 0, 0, 0.35) 46.85%, rgba(0, 0, 0, 0.2) 92.3%)",
            }}
            aria-label="Previous Event"
            data-name="Prev"
          >
            <div className="flex items-center gap-1.5 opacity-85 group-hover:opacity-100 group-hover:-translate-x-1 transition-all">
              <ChevronLeft className="size-5 sm:size-6" />
              <span className="hidden sm:inline">Previous</span>
            </div>
          </button>

          {/* Figma Overlay Button - NEXT (Node 2115:12627) */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-0 top-[30px] bottom-[140px] z-20 w-[90px] sm:w-[120px] flex items-center justify-end pr-4 sm:pr-6 text-[#f5f5f5] font-sans font-bold text-base sm:text-[18px] transition-all cursor-pointer group hover:brightness-125"
            style={{
              background:
                "linear-gradient(269.7deg, rgba(0, 0, 0, 0.2) 1.38%, rgba(0, 0, 0, 0.35) 46.85%, rgba(0, 0, 0, 0) 92.3%)",
            }}
            aria-label="Next Event"
            data-name="Next"
          >
            <div className="flex items-center gap-1.5 opacity-85 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="size-5 sm:size-6" />
            </div>
          </button>

          {/* ACTIVE EVENT TITLE & DATE (Matching Figma Frame 16 node 2115:12622) */}
          <div
            className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center text-center gap-1 sm:gap-2 px-4 transition-all duration-500"
            data-node-id="2115:12622"
            data-name="Frame 16"
          >
            <h3
              key={`title-${currentEvent.id}`}
              className="font-sans font-semibold text-xl sm:text-2xl md:text-3xl lg:text-[36px] text-[#0a0a0a] tracking-tight animate-fade-in"
              data-node-id="2115:12623"
            >
              {currentEvent.title}
            </h3>

            <p
              key={`date-${currentEvent.id}`}
              className="font-sans font-medium text-sm sm:text-base md:text-[18px] text-[#242424] tracking-normal"
              data-node-id="2115:12624"
            >
              {currentEvent.date}
            </p>

            <Link
              href={currentEvent.link}
              className="mt-1 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#051202] hover:text-[#c8a96e] transition-colors"
            >
              <span>View Details</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
