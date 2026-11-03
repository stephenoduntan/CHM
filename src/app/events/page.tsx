"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowRight, Search } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { EventsSection } from "@/components/sections/EventsSection";

interface EventItem {
  id: string;
  title: string;
  theme: string;
  watermark: [string, string];
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  badge: string;
}

const events: EventItem[] = [
  {
    id: "festival-of-destiny",
    title: "2026 Festival of Destiny Conference",
    theme: "Choose Life",
    watermark: ["CHOOSE", "LIFE"],
    date: "November 8th - 15th, 2026",
    time: "6:00 PM Daily (Grand Finale: 8:00 AM Sunday)",
    location: "Church Auditorium",
    description:
      "Our signature annual convention celebrating 29 years of God's faithfulness with international guest speakers, prophetic worship, and signs and wonders.",
    image: "/images/events/fod-2026-poster.webp",
    badge: "Annual Convention",
  },
  {
    id: "mens-annual-conference",
    title: "Men’s Annual Conference",
    theme: "Kingdom Men of Impact",
    watermark: ["KINGDOM", "MEN"],
    date: "October 18th - 20th, 2026",
    time: "9:00 AM & 5:00 PM",
    location: "Main Sanctuary, RCCG CHM",
    description:
      "A strategic gathering of men to discover biblical leadership, career excellence, spiritual authority, and strong family foundations.",
    image:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
    badge: "Men Fellowship",
  },
  {
    id: "ezzer-women-conference",
    title: "Ezzer Women Annual Conference",
    theme: "Women of Grace & Glory",
    watermark: ["GRACE &", "GLORY"],
    date: "September 12th - 14th, 2026",
    time: "10:00 AM & 6:00 PM",
    location: "Main Sanctuary, RCCG CHM",
    description:
      "Empowering women across marriage, spiritual warfare, family, and enterprise through prayer, teachings, and sisterhood.",
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1200",
    badge: "Women Fellowship",
  },
  {
    id: "choose-life-encounter",
    title: "Choose Life Conference",
    theme: "Living Above Limits",
    watermark: ["ABOVE", "LIMITS"],
    date: "August 22nd - 24th, 2026",
    time: "5:30 PM Daily",
    location: "Church Auditorium & Livestream",
    description:
      "A powerful weekend of intensive prayer, deliverance, divine healing, and breakthrough encounters in God's presence.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200",
    badge: "Spiritual Encounter",
  },
  {
    id: "holy-ghost-service",
    title: "Monthly Holy Ghost Service",
    theme: "Power from on High",
    watermark: ["POWER", "ON HIGH"],
    date: "First Friday of Every Month",
    time: "7:00 PM till Dawn",
    location: "RCCG Redemption City & Live in Sanctuary",
    description:
      "A night of extraordinary miracles, salvation, healing, and prophetic declarations with the General Overseer, Pastor E.A. Adeboye.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
    badge: "Monthly Gathering",
  },
  {
    id: "youth-ignite",
    title: "Youth & Singles Ignite Encounter",
    theme: "Purpose Unveiled",
    watermark: ["PURPOSE", "UNVEILED"],
    date: "November 28th, 2026",
    time: "4:00 PM",
    location: "Youth Arena, Court of His Majesty",
    description:
      "Vibrant worship, breakout career and relationship masterclasses, and an altar encounter specifically for teenagers, students, and young professionals.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
    badge: "Youth Ministry",
  },
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((event) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      event.title.toLowerCase().includes(q) ||
      event.theme.toLowerCase().includes(q) ||
      event.location.toLowerCase().includes(q) ||
      event.date.toLowerCase().includes(q) ||
      event.badge.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full bg-white pb-24">
      {/* ─── Hero: Event Carousel with Solid Background (Figma node 2086:1269) ─── */}
      <EventsSection variant="solid" />

      {/* ─── Events List Interface (Figma node 2086:1292 "explore") ─── */}
      <section
        id="events-list"
        className="w-full pt-16 sm:pt-20 lg:pt-[84px] pb-20 sm:pb-24 lg:pb-[124px] bg-white scroll-mt-24"
        data-node-id="2086:1292"
        data-name="explore"
      >
        <Container className="max-w-[1440px]">
          {/* Header & Search Bar (Figma node 2086:1293) */}
          <div
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 sm:mb-16 lg:mb-20 pb-4 border-b border-gray-100"
            data-node-id="2086:1293"
          >
            <div data-node-id="2086:1294">
              <h2
                className="font-display font-recursive-sans font-semibold text-3xl sm:text-4xl lg:text-[48px] text-[#0a0a0a] tracking-tight leading-tight"
                data-node-id="2086:1295"
                style={{ fontVariationSettings: '"CASL" 0, "CRSV" 0.5, "MONO" 0' }}
              >
                Upcoming Events
              </h2>
            </div>

            {/* Search Input (Figma node 2086:1296) */}
            <div
              className="border border-[#d0d2d6] rounded-[8px] px-4 py-3 sm:py-3.5 w-full md:w-[414px] flex items-center gap-3 bg-white focus-within:border-[#180C62] focus-within:ring-2 focus-within:ring-[#180C62]/10 transition-all shadow-sm"
              data-node-id="2086:1296"
            >
              <Search className="size-5 text-[#696369] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for event"
                className="w-full bg-transparent text-base sm:text-[18px] text-[#0a0a0a] placeholder:text-[#696369] outline-none font-sans"
                data-node-id="2086:1298"
                aria-label="Search for event"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-semibold text-gray-400 hover:text-gray-700 uppercase tracking-wider px-1"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Events Cards Container (Figma node 2086:1300 & 2086:1301) */}
          <div
            className="w-full flex flex-col gap-12 sm:gap-16 lg:gap-[64px]"
            data-node-id="2086:1300"
          >
            {filteredEvents.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <p className="font-sans text-xl text-[#606060] mb-4">
                  No events found matching &quot;{searchQuery}&quot;
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2.5 rounded-full bg-[#180C62] text-white text-sm font-semibold hover:bg-[#c8a96e] transition-colors cursor-pointer"
                >
                  View All Events
                </button>
              </div>
            ) : (
              filteredEvents.map((event, index) => (
                <article
                  key={event.id}
                  id={event.id}
                  className="scroll-mt-32 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[40px] items-stretch min-h-[380px] lg:h-[400px] border border-gray-100 rounded-[20px] p-4 sm:p-6 lg:p-0 lg:border-none shadow-sm lg:shadow-none hover:shadow-md lg:hover:shadow-none transition-shadow"
                  data-node-id={`2086:1302-${index}`}
                  data-name={`card ${index + 1}`}
                >
                  {/* Left Column: Watermark + Event Info + Retained Icons & Buttons (Node 2086:1303) */}
                  <div
                    className="lg:col-span-6 relative flex flex-col justify-between overflow-hidden rounded-[16px] lg:bg-transparent"
                    data-node-id="2086:1303"
                  >
                    {/* Giant Red Theme Watermark (Figma node 2086:1304 & 2086:1305) */}
                    <div
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 opacity-20 sm:opacity-25 pointer-events-none select-none z-0 max-w-[500px]"
                      data-node-id="2086:1304"
                    >
                      <div
                        className="font-display font-black text-[#d61812] text-5xl sm:text-7xl lg:text-[96px] leading-[0.92] tracking-tighter uppercase"
                        data-node-id="2086:1305"
                        style={{ fontVariationSettings: '"CASL" 0, "CRSV" 0.5, "MONO" 0' }}
                      >
                        <p className="leading-none mb-0">{event.watermark[0]}</p>
                        <p className="leading-none">{event.watermark[1]}</p>
                      </div>
                    </div>

                    {/* Foreground Info aligned right to mirror Figma node 2086:1306 */}
                    <div
                      className="relative z-10 flex flex-col items-start lg:items-end justify-center h-full text-left lg:text-right gap-3.5 sm:gap-4 lg:pb-[24px] lg:pr-6"
                      data-node-id="2086:1306"
                    >
                      {/* Category Badge */}
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#180C62]/10 text-[#180C62] border border-[#180C62]/20">
                        {event.badge}
                      </span>

                      {/* Event Title (Node 2086:1307) */}
                      <h3
                        className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl lg:text-[28px] text-[#0a0a0a] tracking-tight leading-snug"
                        data-node-id="2086:1307"
                      >
                        {event.title}
                      </h3>

                      {/* Date with Calendar Icon (Node 2086:1308) */}
                      <div
                        className="flex items-center gap-2 text-base sm:text-lg lg:text-[22px] font-medium text-[#0a0a0a]"
                        data-node-id="2086:1308"
                      >
                        <Calendar className="size-5 text-[#d61812] shrink-0" />
                        <span>{event.date}</span>
                      </div>

                      {/* Venue with MapPin Icon (Node 2086:1309) */}
                      <div
                        className="flex items-center gap-2 text-base sm:text-lg lg:text-[22px] font-medium text-[#0a0a0a]"
                        data-node-id="2086:1309"
                      >
                        <MapPin className="size-5 text-[#d61812] shrink-0" />
                        <span>{event.location}</span>
                      </div>

                      {/* Time with Clock Icon */}
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <Clock className="size-4 text-[#c8a96e] shrink-0" />
                        <span>{event.time}</span>
                      </div>

                      {/* Retained Action Button Elements */}
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <Link
                          href={`/events/${event.id}`}
                          className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-white bg-[#051202] hover:bg-[#c8a96e] hover:text-[#051202] transition-colors text-xs uppercase tracking-wider shadow-sm cursor-pointer group"
                        >
                          <span>View Event Details</span>
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Poster Image (Node 2086:1310) */}
                  <div
                    className="lg:col-span-6 relative w-full h-[280px] sm:h-[340px] lg:h-full min-h-[340px] lg:min-h-[400px] rounded-[16px] overflow-hidden shadow-lg border border-gray-100 group"
                    data-node-id="2086:1310"
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 700px"
                    />
                  </div>
                </article>
              ))
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
