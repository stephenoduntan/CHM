"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";
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

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Calculates continuous 3D transform and styling for any float offset.
 * Maintains strict 40px gap between cards, 0 border radius, and progressive blur/overlay.
 */
function getPanelStyle(effectiveOffset: number, panelW: number, gap: number = 40) {
  const step = panelW + gap;
  const off = effectiveOffset;

  let x: number;
  let rotateY: number;
  let scale: number;
  let originX: string;
  let blur: number;
  let overlay: number;
  let zIndex: number;

  if (off <= -1) {
    const t = Math.min(1, Math.max(0, -off - 1));
    x = lerp(-1 * step, -2 * step, t);
    rotateY = lerp(48, 56, t);
    scale = lerp(0.96, 0.88, t);
    originX = "100% 50%";
    blur = lerp(2.5, 5, t);
    overlay = lerp(0.55, 0.75, t);
    zIndex = Math.round(lerp(6, 2, t));
  } else if (off < 0) {
    const t = -off;
    x = lerp(0, -1 * step, t);
    rotateY = lerp(0, 48, t);
    scale = lerp(1, 0.96, t);
    originX = "100% 50%";
    blur = lerp(0, 2.5, t);
    overlay = lerp(0, 0.55, t);
    zIndex = Math.round(lerp(10, 6, t));
  } else if (off <= 1) {
    const t = off;
    x = lerp(0, 1 * step, t);
    rotateY = lerp(0, -48, t);
    scale = lerp(1, 0.96, t);
    originX = "0% 50%";
    blur = lerp(0, 2.5, t);
    overlay = lerp(0, 0.55, t);
    zIndex = Math.round(lerp(10, 6, t));
  } else {
    const t = Math.min(1, Math.max(0, off - 1));
    x = lerp(1 * step, 2 * step, t);
    rotateY = lerp(-48, -56, t);
    scale = lerp(0.96, 0.88, t);
    originX = "0% 50%";
    blur = lerp(2.5, 5, t);
    overlay = lerp(0.55, 0.75, t);
    zIndex = Math.round(lerp(6, 2, t));
  }

  return { x, rotateY, scale, originX, blur, overlay, zIndex };
}

interface PanelProps {
  offset: number;
  slide: EventItem;
  isCenter: boolean;
  panelWidth: number;
  panelHeight: number;
  gap: number;
  motionProgress: MotionValue<number>;
  isMuted: boolean;
  toggleMute: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  centerVideoRef: React.MutableRefObject<HTMLVideoElement | null>;
  onSelect: () => void;
  hasDragged: React.MutableRefObject<boolean>;
}

function Panel({
  offset,
  slide,
  isCenter,
  panelWidth,
  panelHeight,
  gap,
  motionProgress,
  isMuted,
  toggleMute,
  onMouseEnter,
  onMouseLeave,
  centerVideoRef,
  onSelect,
  hasDragged,
}: PanelProps) {
  const x = useTransform(motionProgress, (p) => getPanelStyle(offset - p, panelWidth, gap).x);
  const rotateY = useTransform(motionProgress, (p) => getPanelStyle(offset - p, panelWidth, gap).rotateY);
  const scale = useTransform(motionProgress, (p) => getPanelStyle(offset - p, panelWidth, gap).scale);
  const transformOrigin = useTransform(motionProgress, (p) => getPanelStyle(offset - p, panelWidth, gap).originX);
  const filter = useTransform(motionProgress, (p) => `blur(${getPanelStyle(offset - p, panelWidth, gap).blur.toFixed(2)}px)`);
  const overlayOpacity = useTransform(motionProgress, (p) => getPanelStyle(offset - p, panelWidth, gap).overlay);
  const zIndex = useTransform(motionProgress, (p) => getPanelStyle(offset - p, panelWidth, gap).zIndex);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isCenter && videoRef.current) {
      centerVideoRef.current = videoRef.current;
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => {});
    }
  }, [isCenter, isMuted, centerVideoRef]);

  return (
    <motion.div
      data-panel-offset={offset}
      onMouseEnter={() => {
        if (isCenter) onMouseEnter?.();
      }}
      onMouseLeave={() => {
        if (isCenter) onMouseLeave?.();
      }}
      onClick={(e) => {
        if (hasDragged.current) return;
        if (!isCenter) {
          e.stopPropagation();
          onSelect();
        } else {
          toggleMute();
        }
      }}
      style={{
        position: "absolute",
        width: panelWidth,
        height: panelHeight,
        left: "50%",
        top: "45%",
        marginLeft: -panelWidth / 2,
        marginTop: -panelHeight / 2,
        transformStyle: "preserve-3d",
        x,
        rotateY,
        scale,
        transformOrigin,
        zIndex,
        userSelect: "none",
        cursor: "pointer",
        pointerEvents: Math.abs(offset) > 1 ? "none" : "auto",
      }}
    >
      {/* Soft floor shadow under center card */}
      {isCenter && (
        <div
          style={{
            position: "absolute",
            inset: -20,
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
      )}

      {/* RECTANGULAR CINEMATIC VIDEO (No border-radius, subtle blur on sides) */}
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#080808",
          borderRadius: 0,
          filter,
          boxShadow: isCenter
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            : "0 10px 25px -5px rgba(0, 0, 0, 0.15)",
        }}
      >
        <video
          ref={videoRef}
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
      </motion.div>

      {/* DISTINCTIVE DARK OVERLAY ON SIDE CARDS */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "#051202",
          opacity: overlayOpacity,
          pointerEvents: "none",
          zIndex: 1,
          borderRadius: 0,
        }}
      />

      {/* Audio Mute/Hover Pill (Center Card Only) */}
      {isCenter && (
        <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md text-white border border-white/20 transition-all cursor-pointer shadow-lg group/mute"
            aria-label={isMuted ? "Hover to unmute" : "Sound on"}
            title={isMuted ? "Hover for sound" : "Sound on"}
          >
            {isMuted ? (
              <>
                <VolumeX className="size-4 text-white/80 group-hover/mute:text-white" />
                <span className="text-xs font-medium tracking-wide text-white/90 pr-0.5">Hover for sound</span>
              </>
            ) : (
              <>
                <Volume2 className="size-4 text-[#c8a96e] animate-pulse" />
                <span className="text-xs font-medium tracking-wide text-[#c8a96e] pr-0.5">Sound on</span>
              </>
            )}
          </button>
        </div>
      )}
    </motion.div>
  );
}

export function EventsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReflectionVisible, setIsReflectionVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [windowWidth, setWindowWidth] = useState(1440);

  const motionProgress = useMotionValue(0);
  const isAnimatingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartX = useRef(0);
  const hasDragged = useRef(false);
  const centerVideoRef = useRef<HTMLVideoElement | null>(null);

  const total = EVENTS_DATA.length;
  const currentEvent = EVENTS_DATA[currentIndex];

  // Track responsive dimensions
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Panel sizing: Responsive width, 16:9 ratio, 40px gap (24px on mobile)
  const isMobile = windowWidth < 640;
  const panelWidth = useMemo(() => {
    if (windowWidth < 640) return Math.min(520, windowWidth * 0.82);
    if (windowWidth < 1024) return Math.min(720, windowWidth * 0.68);
    return Math.min(840, windowWidth * 0.62);
  }, [windowWidth]);

  const panelHeight = useMemo(() => panelWidth * (9 / 16), [panelWidth]);
  const panelGap = isMobile ? 24 : 40;

  // Spring animation configs matching cinematic reference
  const springConfig = {
    type: "spring" as const,
    stiffness: 240,
    damping: 30,
    mass: 0.9,
  };

  const snapSpringConfig = {
    type: "spring" as const,
    stiffness: 300,
    damping: 32,
    mass: 0.8,
  };

  // Navigate to Next
  const handleNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsMuted(true);
    setIsReflectionVisible(false);

    animate(motionProgress, 1, springConfig).then(() => {
      flushSync(() => {
        setCurrentIndex((prev) => (prev + 1) % total);
        motionProgress.set(0);
      });
      isAnimatingRef.current = false;
      setTimeout(() => setIsReflectionVisible(true), 60);
    });
  }, [motionProgress, total]);

  // Navigate to Prev
  const handlePrev = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsMuted(true);
    setIsReflectionVisible(false);

    animate(motionProgress, -1, springConfig).then(() => {
      flushSync(() => {
        setCurrentIndex((prev) => (prev - 1 + total) % total);
        motionProgress.set(0);
      });
      isAnimatingRef.current = false;
      setTimeout(() => setIsReflectionVisible(true), 60);
    });
  }, [motionProgress, total]);

  // Hover volume handling (matching HeroSection.tsx)
  const handleMouseEnterCard = useCallback(() => {
    setIsMuted(false);
    if (centerVideoRef.current) {
      centerVideoRef.current.muted = false;
      centerVideoRef.current.volume = 1;
      const p = centerVideoRef.current.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    }
  }, []);

  const handleMouseLeaveCard = useCallback(() => {
    setIsMuted(true);
    if (centerVideoRef.current) {
      centerVideoRef.current.muted = true;
    }
  }, []);

  const handleGlobalMouseLeave = useCallback(() => {
    setIsMuted(true);
    if (centerVideoRef.current) {
      centerVideoRef.current.muted = true;
    }
  }, []);

  // Manual toggle fallback
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const nextMuted = !prev;
      if (centerVideoRef.current) {
        centerVideoRef.current.muted = nextMuted;
        if (!nextMuted) {
          centerVideoRef.current.volume = 1;
          centerVideoRef.current.play().catch(() => {});
        }
      }
      return nextMuted;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Pointer Drag Handlers (1:1 tracking, threshold release)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isAnimatingRef.current) return;
    dragStartX.current = e.clientX;
    hasDragged.current = false;
    isDraggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartX.current;
    if (Math.abs(deltaX) > 6) {
      hasDragged.current = true;
      setIsReflectionVisible(false);
    }
    const step = panelWidth + panelGap;
    // Normalized offset: dragging left (deltaX < 0) pushes progress positive (towards next)
    const progress = -deltaX / step;
    motionProgress.set(Math.max(-1.2, Math.min(1.2, progress)));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const deltaX = e.clientX - dragStartX.current;
    const threshold = Math.min(80, panelWidth * 0.15);

    if (deltaX < -threshold) {
      // Dragged left -> advance to Next
      isAnimatingRef.current = true;
      animate(motionProgress, 1, springConfig).then(() => {
        flushSync(() => {
          setCurrentIndex((prev) => (prev + 1) % total);
          motionProgress.set(0);
        });
        isAnimatingRef.current = false;
        setTimeout(() => setIsReflectionVisible(true), 60);
      });
    } else if (deltaX > threshold) {
      // Dragged right -> return to Prev
      isAnimatingRef.current = true;
      animate(motionProgress, -1, springConfig).then(() => {
        flushSync(() => {
          setCurrentIndex((prev) => (prev - 1 + total) % total);
          motionProgress.set(0);
        });
        isAnimatingRef.current = false;
        setTimeout(() => setIsReflectionVisible(true), 60);
      });
    } else {
      // Snap back to current
      isAnimatingRef.current = true;
      animate(motionProgress, 0, snapSpringConfig).then(() => {
        isAnimatingRef.current = false;
        setIsReflectionVisible(true);
      });
    }
  };

  const handlePointerCancel = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    isAnimatingRef.current = true;
    animate(motionProgress, 0, snapSpringConfig).then(() => {
      isAnimatingRef.current = false;
      setIsReflectionVisible(true);
    });
  };

  // 5 visible offsets for continuous 3D loop [-2, -1, 0, 1, 2]
  const visibleOffsets = [-2, -1, 0, 1, 2];

  return (
    <section
      onMouseLeave={handleGlobalMouseLeave}
      className="w-full py-16 lg:py-24 bg-white relative overflow-hidden select-none"
      data-node-id="2110:11239"
      data-name="events"
    >
      {/* Section Header */}
      <Container className="max-w-[1440px]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl md:text-[40px] text-[#0a0a0a] tracking-tight">
              Upcoming Events
            </h2>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-sans italic font-medium text-base sm:text-xl lg:text-[24px] text-[#180C62] hover:text-[#c8a96e] transition-colors group"
          >
            <span>see all events</span>
            <span className="font-sans not-italic font-bold tracking-tighter text-lg sm:text-xl group-hover:translate-x-1.5 transition-transform duration-200">
              →
            </span>
          </Link>
        </div>
      </Container>

      {/* FULL-WINDOW WIDTH EVENT CAROUSEL (Bleeds to window edges) */}
      <div
        className="w-full relative overflow-hidden bg-white"
        data-node-id="2111:11848"
        data-name="event carousel"
      >
        {/* Carousel Viewport with 3D Perspective */}
        <div
          className="relative w-full h-[400px] md:h-[512px] lg:h-[720px] flex items-center justify-center overflow-hidden"
          style={{
            perspective: "1400px",
            perspectiveOrigin: "50% 48%",
          }}
        >
          {/* FLOOR REFLECTION (Only visible for the currently centered card in view) */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: `calc(45% + ${panelHeight / 2}px + 4px)`,
              height: "240px",
              zIndex: 0,
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 22%, rgba(0,0,0,0.15) 55%, transparent 85%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 22%, rgba(0,0,0,0.15) 55%, transparent 85%)",
              opacity: isReflectionVisible ? 0.85 : 0,
              transition: isReflectionVisible
                ? "opacity 700ms cubic-bezier(0.2, 0.8, 0.2, 1)"
                : "opacity 300ms ease",
            }}
            data-name="reflection"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: panelWidth,
                height: panelHeight,
                marginLeft: -panelWidth / 2,
                transformOrigin: "top center",
                transform: "perspective(900px) rotateX(60deg)",
              }}
            >
              {/* Subtle ground contact shadow */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background:
                    "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                  zIndex: 2,
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "scaleY(-1)",
                  filter: "blur(3px)",
                  opacity: 0.85,
                }}
              >
                <video
                  key={`refl-${currentEvent.id}`}
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

          {/* EXACT .panels-container WITH HARDWARE-ACCELERATED DRAG GESTURE */}
          <div
            className="panels-container w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              touchAction: "pan-y",
              perspective: "1400px",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
          >
            {visibleOffsets.map((offset) => {
              const slideIdx = ((currentIndex + offset) % total + total) % total;
              const slide = EVENTS_DATA[slideIdx];
              const isCenter = offset === 0;

              return (
                <Panel
                  key={`${slide.id}-${offset}`}
                  offset={offset}
                  slide={slide}
                  isCenter={isCenter}
                  panelWidth={panelWidth}
                  panelHeight={panelHeight}
                  gap={panelGap}
                  motionProgress={motionProgress}
                  isMuted={isMuted}
                  toggleMute={toggleMute}
                  onMouseEnter={handleMouseEnterCard}
                  onMouseLeave={handleMouseLeaveCard}
                  centerVideoRef={centerVideoRef}
                  hasDragged={hasDragged}
                  onSelect={() => {
                    if (offset === -1) handlePrev();
                    if (offset === 1) handleNext();
                  }}
                />
              );
            })}
          </div>

          {/* Navigation Pill Buttons (Light Theme, high visibility) */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 z-30 flex items-center gap-2 px-4 sm:px-5 py-3 rounded-full bg-white/95 hover:bg-white text-gray-900 border border-gray-200/90 shadow-xl backdrop-blur-md font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Previous Event"
          >
            <ChevronLeft className="size-4 sm:size-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 z-30 flex items-center gap-2 px-4 sm:px-5 py-3 rounded-full bg-white/95 hover:bg-white text-gray-900 border border-gray-200/90 shadow-xl backdrop-blur-md font-semibold text-xs sm:text-sm tracking-wide transition-all cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Next Event"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="size-4 sm:size-5" />
          </button>
        </div>

        {/* ACTIVE EVENT TITLE & DATE (Matching Figma Frame 16 node 2115:12622) */}
        <div
          className="w-full flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2 pt-4 pb-2 px-4 transition-all duration-500 absolute bottom-0 sm:bottom-[20px]"
          data-node-id="2115:12622"
          data-name="Frame 16"
        >
          <h3
            key={`title-${currentEvent.id}`}
            className="font-display font-recursive-sans font-semibold text-xl sm:text-2xl md:text-3xl lg:text-[36px] text-[#D61812] tracking-tight animate-fade-in"
            data-node-id="2115:12623"
          >
            {currentEvent.title}
          </h3>

          <p
            key={`date-${currentEvent.id}`}
            className="font-sans font-medium text-sm sm:text-base md:text-[18px] text-[#444444] tracking-normal"
            data-node-id="2115:12624"
          >
            {currentEvent.date}
          </p>

          <Link
            href={currentEvent.link}
            className="mt-1 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#180C62] hover:text-[#c8a96e] transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
