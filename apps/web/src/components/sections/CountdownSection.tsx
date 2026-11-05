"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { UPCOMING_EVENT } from "@/lib/constants";
import { useManagedEvents } from "@/lib/content-store";
import { EventItem } from "@/lib/events-data";

export function CountdownSection() {
  const [events] = useManagedEvents();

  // Find featured countdown event set from Admin Management Portal
  const currentEvent = useMemo<EventItem>(() => {
    // 1. Explicitly toggled featured event (most recent)
    const featured = events.find((e) => e.isFeatured);
    if (featured) return featured;

    // 2. Fallback to next upcoming event
    const upcoming = events.find((e) => !e.isPast);
    if (upcoming) return upcoming;

    // 3. Fallback to first available event or hardcoded default
    return (
      events[0] || {
        id: "festival-of-destiny",
        title: UPCOMING_EVENT.name,
        theme: UPCOMING_EVENT.theme,
        date: UPCOMING_EVENT.dateLabel,
        startDateIso: `${UPCOMING_EVENT.startDate}T09:00:00`,
        link: "/events/festival-of-destiny",
        isFeatured: true,
        featuredDisplayType: "text",
      }
    );
  }, [events]);

  const [timeLeft, setTimeLeft] = useState({
    days: 13,
    hours: 17,
    minutes: 27,
    seconds: 27,
  });

  useEffect(() => {
    let targetTime = new Date(`${UPCOMING_EVENT.startDate}T09:00:00`).getTime();
    if (currentEvent.startDateIso) {
      const parsed = new Date(currentEvent.startDateIso).getTime();
      if (!isNaN(parsed) && parsed > 0) {
        targetTime = parsed;
      }
    }

    const updateTimer = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [currentEvent.startDateIso]);

  const isImageDisplay =
    currentEvent.featuredDisplayType === "image" && Boolean(currentEvent.featuredImage);

  const eventLink = currentEvent.link || `/events/${currentEvent.id}`;

  return (
    <section className="py-20 lg:py-28 w-full bg-transparent relative overflow-x-clip z-10">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
          {/* Left Column: Event Presentation (Typography or Artwork) + View Details CTA */}
          {isImageDisplay ? (
            <div className="flex flex-col gap-4 items-center lg:items-start text-center lg:text-left max-w-xl">
              <div className="relative h-[90px] sm:h-[115px] md:h-[135px] w-[260px] sm:w-[320px] md:w-[380px] max-w-full">
                <Image
                  src={currentEvent.featuredImage!}
                  alt={`${currentEvent.title}${currentEvent.theme ? ` - ${currentEvent.theme}` : ""}`}
                  fill
                  className="object-contain object-center lg:object-left"
                  priority
                />
              </div>

              <p className="font-sans font-medium text-base sm:text-lg text-[#3d3d3d] uppercase tracking-wider">
                {currentEvent.date || UPCOMING_EVENT.dateLabel}
              </p>

              <div className="pt-1 flex justify-center lg:justify-start">
                <Link
                  href={eventLink}
                  className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#180c62] hover:bg-[#180c62]/90 text-white font-sans font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer group"
                >
                  <span>View Details</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:gap-4 text-center lg:text-left max-w-xl">
              <p className="font-display font-recursive-mono font-medium uppercase text-base sm:text-lg md:text-xl text-[#1a1a1a] tracking-wider">
                {currentEvent.title || UPCOMING_EVENT.name}
              </p>

              {currentEvent.theme && (
                <h2 className="font-sans font-bold text-2xl sm:text-4xl md:text-5xl text-[#0a0a0a] tracking-[2px] sm:tracking-[3px] uppercase leading-tight">
                  {currentEvent.theme}
                </h2>
              )}

              <p className="font-sans font-normal text-base sm:text-lg md:text-xl text-[#3d3d3d] uppercase tracking-wider">
                {currentEvent.date || UPCOMING_EVENT.dateLabel}
              </p>

              <div className="pt-2 flex justify-center lg:justify-start">
                <Link
                  href={eventLink}
                  className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#180c62] hover:bg-[#180c62]/90 text-white font-sans font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer group"
                >
                  <span>View Details</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          )}

          {/* Right Column: Futuristic Glowing Countdown Card */}
          <div className="relative w-full max-w-[680px] h-[180px] sm:h-[196px] flex items-center justify-center">
            {/* Glow Background Layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(11,204,18,0.55)] to-[rgba(11,185,171,0.55)] rounded-[20px] blur-[28px] -z-10" />

            {/* Top reflective bar */}
            <div className="absolute top-[-4px] left-[4%] w-[92%] h-[6px] bg-[#9e9e9e] blur-[4px] rounded-full" />

            {/* Main Timer Display */}
            <div className="w-full h-full bg-gradient-to-b from-[#051202] to-[#0e0826] rounded-[20px] p-6 sm:p-10 flex items-center justify-around shadow-[0px_0px_16px_0px_rgba(11,204,18,0.4),0px_4px_16px_0px_rgba(11,185,171,0.4)] text-[#f5f5f5]">
              {/* Days */}
              <div className="flex flex-col items-center justify-center min-w-[60px]">
                <span className="font-display font-recursive-mono text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-medium text-white/80 mt-1 italic">
                  days
                </span>
              </div>

              <span className="font-display font-recursive-mono text-2xl sm:text-4xl text-[#c8a96e] pb-4">
                :
              </span>

              {/* Hours */}
              <div className="flex flex-col items-center justify-center min-w-[60px]">
                <span className="font-display font-recursive-mono text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-medium text-white/80 mt-1 italic">
                  hours
                </span>
              </div>

              <span className="font-display font-recursive-mono text-2xl sm:text-4xl text-[#c8a96e] pb-4">
                :
              </span>

              {/* Minutes */}
              <div className="flex flex-col items-center justify-center min-w-[60px]">
                <span className="font-display font-recursive-mono text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-medium text-white/80 mt-1 italic">
                  minutes
                </span>
              </div>

              <span className="font-display font-recursive-mono text-2xl sm:text-4xl text-[#c8a96e] pb-4">
                :
              </span>

              {/* Seconds */}
              <div className="flex flex-col items-center justify-center min-w-[60px]">
                <span className="font-display font-recursive-mono text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#00ff88]">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-medium text-white/80 mt-1 italic">
                  seconds
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
