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
  {
    id: "hymnal-sunday",
    title: "Hymnal Sunday Celebration",
    theme: "Songs of the Spirit",
    date: "First Sunday of Every Month",
    time: "8:00 AM & 10:30 AM",
    location: "Main Auditorium, CHM",
    videoUrl: "/videos/hymnal sunday.webm",
    link: "/events",
  },
];

export function EventsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const reflectionVideoRef = useRef<HTMLVideoElement | null>(null);

  const total = EVENTS_DATA.length;
  const currentEvent = EVENTS_DATA[currentIndex];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Sync video audio and play states on active index change
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === currentIndex) {
        vid.muted = isMuted;
        vid.play().catch(() => {});
      } else {
        vid.muted = true;
      }
    });

    if (reflectionVideoRef.current) {
      reflectionVideoRef.current.currentTime =
        videoRefs.current[currentIndex]?.currentTime || 0;
      reflectionVideoRef.current.play().catch(() => {});
    }
  }, [currentIndex, isMuted]);

  // Toggle Mute
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    const activeVid = videoRefs.current[currentIndex];
    if (activeVid) {
      activeVid.muted = !isMuted;
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <section
      className="w-full py-16 lg:py-24 bg-white relative overflow-hidden select-none"
      data-node-id="2110:11239"
      data-name="events"
    >
      <Container className="max-w-[1440px]">
        {/* Section Header matching Figma node 2110:11241 */}
        <div className="flex items-center justify-between pb-6 mb-4 lg:mb-8">
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

        {/* 3D Cinematic Event Carousel Container (matching node 2111:11848) */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative w-full h-[520px] sm:h-[620px] md:h-[700px] lg:h-[782px] flex items-center justify-center overflow-hidden"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 48%",
          }}
          data-node-id="2111:11848"
          data-name="event carousel"
        >
          {/* Edge Navigation Overlay - PREVIOUS (Figma node 2115:12625) */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-0 top-[40px] bottom-[140px] z-30 w-[80px] sm:w-[110px] lg:w-[130px] flex items-center justify-start pl-4 sm:pl-6 text-[#f5f5f5] font-sans font-bold text-base sm:text-[18px] transition-all cursor-pointer group hover:brightness-125"
            style={{
              background:
                "linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.25) 100%)",
            }}
            aria-label="Previous Event"
            data-name="Prev"
          >
            <div className="flex items-center gap-1.5 opacity-85 group-hover:opacity-100 group-hover:-translate-x-1 transition-all">
              <ChevronLeft className="size-5 sm:size-6" />
              <span className="hidden sm:inline">Previous</span>
            </div>
          </button>

          {/* Edge Navigation Overlay - NEXT (Figma node 2115:12627) */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-0 top-[40px] bottom-[140px] z-30 w-[80px] sm:w-[110px] lg:w-[130px] flex items-center justify-end pr-4 sm:pr-6 text-[#f5f5f5] font-sans font-bold text-base sm:text-[18px] transition-all cursor-pointer group hover:brightness-125"
            style={{
              background:
                "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.25) 100%)",
            }}
            aria-label="Next Event"
            data-name="Next"
          >
            <div className="flex items-center gap-1.5 opacity-85 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="size-5 sm:size-6" />
            </div>
          </button>

          {/* 3D PANELS CONTAINER */}
          <div
            className="relative w-full h-full flex items-center justify-center pointer-events-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            {EVENTS_DATA.map((event, idx) => {
              // Calculate cyclic offset relative to current
              let offset = (idx - currentIndex + total) % total;
              if (offset > total / 2) offset -= total;

              // Compute 3D parameters matching cinematic-carousel reference
              let translateX = "0%";
              let translateZ = "0px";
              let rotateY = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 10;
              let filter = "brightness(1) blur(0px)";
              let pointerEvents = "none";

              if (offset === 0) {
                // Active Center
                translateX = "0%";
                translateZ = "0px";
                rotateY = 0;
                scale = 1;
                opacity = 1;
                zIndex = 10;
                filter = "brightness(1) blur(0px)";
                pointerEvents = "auto";
              } else if (offset === -1) {
                // Left Near
                translateX = "-54%";
                translateZ = "-100px";
                rotateY = 52;
                scale = 0.92;
                opacity = 0.45;
                zIndex = 5;
                filter = "brightness(0.65) blur(1.5px)";
                pointerEvents = "auto";
              } else if (offset === 1) {
                // Right Near
                translateX = "54%";
                translateZ = "-100px";
                rotateY = -52;
                scale = 0.92;
                opacity = 0.45;
                zIndex = 5;
                filter = "brightness(0.65) blur(1.5px)";
                pointerEvents = "auto";
              } else if (offset === -2) {
                // Left Far
                translateX = "-95%";
                translateZ = "-250px";
                rotateY = 65;
                scale = 0.82;
                opacity = 0.2;
                zIndex = 2;
                filter = "brightness(0.35) blur(3px)";
                pointerEvents = "auto";
              } else if (offset === 2) {
                // Right Far
                translateX = "95%";
                translateZ = "-250px";
                rotateY = -65;
                scale = 0.82;
                opacity = 0.2;
                zIndex = 2;
                filter = "brightness(0.35) blur(3px)";
                pointerEvents = "auto";
              } else {
                // Off-stage
                translateX = offset < 0 ? "-130%" : "130%";
                translateZ = "-400px";
                rotateY = offset < 0 ? 75 : -75;
                scale = 0.6;
                opacity = 0;
                zIndex = 0;
                filter = "brightness(0.2) blur(5px)";
              }

              const isCenter = offset === 0;

              return (
                <div
                  key={event.id}
                  onClick={() => {
                    if (!isCenter) setCurrentIndex(idx);
                  }}
                  className={`absolute top-[40px] sm:top-[30px] lg:top-[20px] rounded-[18px] sm:rounded-[24px] overflow-hidden bg-black shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isCenter ? "cursor-default" : "cursor-pointer"
                  }`}
                  style={{
                    width: "min(910px, 86vw)",
                    height: "min(510px, 50vw)",
                    transform: `translate3d(${translateX}, 0, ${translateZ}) rotateY(${rotateY}deg) scale(${scale})`,
                    transformOrigin: offset < 0 ? "right center" : offset > 0 ? "left center" : "center center",
                    opacity,
                    filter,
                    zIndex,
                    pointerEvents: pointerEvents as any,
                  }}
                >
                  {/* Video Media Component */}
                  <video
                    ref={(el) => {
                      videoRefs.current[idx] = el;
                    }}
                    src={event.videoUrl}
                    autoPlay
                    loop
                    muted={idx !== currentIndex || isMuted}
                    playsInline
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />

                  {/* Glassmorphic border ring */}
                  <div className="absolute inset-0 rounded-[18px] sm:rounded-[24px] ring-1 ring-white/15 pointer-events-none" />

                  {/* Center Video Audio Control Pill */}
                  {isCenter && (
                    <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-all cursor-pointer shadow-lg group/mute"
                        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                        title={isMuted ? "Unmute" : "Mute"}
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

          {/* FLOOR REFLECTION (Matching Figma node 2115:12610 "reflection" & cinematic-carousel) */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 -translate-x-1/2 bottom-[110px] sm:bottom-[120px] lg:bottom-[140px] pointer-events-none overflow-hidden"
            style={{
              width: "min(910px, 86vw)",
              height: "min(140px, 14vw)",
              transformOrigin: "top center",
              transform: "perspective(900px) rotateX(65deg)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.18) 45%, transparent 85%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.18) 45%, transparent 85%)",
            }}
            data-name="reflection"
          >
            <div
              className="w-full h-full"
              style={{
                transform: "scaleY(-1)",
                filter: "blur(6px)",
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

          {/* ACTIVE EVENT TITLE & DATE (Matching Figma Frame 16 node 2115:12622) */}
          <div
            className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2 px-4 transition-all duration-500"
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
