"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";

const eventsData = [
  {
    id: "festival-of-destiny",
    title: "Festival of Destiny Conference 2026",
    theme: "Choose Life",
    date: "November 8th - 15th, 2026",
    time: "6:00 PM Daily",
    location: "Main Auditorium, Court of His Majesty",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    isFeatured: true,
  },
  {
    id: "holy-ghost-service",
    title: "Monthly Holy Ghost Service",
    theme: "Power from on High",
    date: "First Friday of Every Month",
    time: "7:00 PM",
    location: "RCCG Redemption City & Livestream",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
    isFeatured: false,
  },
  {
    id: "youth-ignite",
    title: "Youth & Singles Ignite Encounter",
    theme: "Purpose Unveiled",
    date: "November 28th, 2026",
    time: "4:00 PM",
    location: "Youth Arena, Court of His Majesty",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200",
    isFeatured: false,
  },
];

export function EventsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevEvent = () => {
    setCurrentIndex((prev) => (prev === 0 ? eventsData.length - 1 : prev - 1));
  };

  const nextEvent = () => {
    setCurrentIndex((prev) => (prev === eventsData.length - 1 ? 0 : prev + 1));
  };

  const currentEvent = eventsData[currentIndex];

  return (
    <section className="w-full py-16 lg:py-24 bg-gray-50/70 overflow-hidden">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-gray-200">
          <div>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#051202]">
              Upcoming Events
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Join us in celebration, worship, and spiritual empowerment.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-medium text-base text-[#051202] hover:text-[#c8a96e] transition-colors group"
          >
            <span>see all events</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Carousel / Event Showcase Card */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Main Card */}
          <div className="relative rounded-[32px] overflow-hidden min-h-[460px] sm:min-h-[520px] bg-[#051202] text-white shadow-2xl flex flex-col justify-end p-8 sm:p-14">
            {/* Background Image Layer */}
            <Image
              src={currentEvent.image}
              alt={currentEvent.title}
              fill
              className="object-cover opacity-35 transition-all duration-700"
            />
            {/* Glowing Accent Ring / Clock Motif */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#051202] via-[#051202]/60 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[320px] sm:size-[400px] border border-cyan-500/20 rounded-full blur-[1px] pointer-events-none" />

            {/* Event Info */}
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#c8a96e]/20 border border-[#c8a96e]/40 text-[#c8a96e] text-xs font-semibold uppercase tracking-wider mb-4">
                Featured Program
              </span>

              <h3 className="font-sans font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-2 text-white">
                {currentEvent.title}
              </h3>

              <p className="font-display font-recursive-sans text-xl sm:text-2xl text-[#c8a96e] italic mb-6">
                Theme: &quot;{currentEvent.theme}&quot;
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm sm:text-base text-gray-300 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-[#c8a96e]" />
                  <span>{currentEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-[#c8a96e]" />
                  <span>{currentEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-[#c8a96e]" />
                  <span>{currentEvent.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/events/${currentEvent.id}`}
                  className="px-8 py-3.5 rounded-full font-semibold text-white bg-[#051202] border border-[#c8a96e] hover:bg-[#c8a96e] hover:text-[#051202] transition-all text-sm uppercase tracking-wider shadow-md"
                >
                  View Details & Register
                </Link>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
              <button
                type="button"
                onClick={prevEvent}
                className="size-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="Previous event"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={nextEvent}
                className="size-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="Next event"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

