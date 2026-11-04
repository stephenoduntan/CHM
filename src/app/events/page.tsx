"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Search,
  ChevronDown,
  History,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { EventsSection } from "@/components/sections/EventsSection";

interface EventItem {
  id: string;
  title: string;
  theme: string;
  watermark: [string, string];
  date: string;
  startDateIso: string;
  time: string;
  location: string;
  description: string;
  image: string;
  badge: string;
  isPast?: boolean;
}

// Reference current date for Court of His Majesty church calendar
// Anchored at November 3rd, 2026
const CURRENT_DATE = new Date("2026-11-03T12:00:00Z");

// Cutoff date for past events: Exactly 6 months prior (May 3rd, 2026)
const SIX_MONTHS_AGO = new Date("2026-05-03T00:00:00Z");

const ALL_EVENTS: EventItem[] = [
  // ─── UPCOMING EVENTS ───────────────────────────────────────────────────────
  {
    id: "festival-of-destiny",
    title: "2026 Festival of Destiny Conference",
    theme: "Choose Life",
    watermark: ["CHOOSE", "LIFE"],
    date: "November 8th - 15th, 2026",
    startDateIso: "2026-11-08T18:00:00Z",
    time: "6:00 PM Daily (Grand Finale: 8:00 AM Sunday)",
    location: "Church Auditorium",
    description:
      "Our signature annual convention celebrating 29 years of God's faithfulness with international guest speakers, prophetic worship, and signs and wonders.",
    image: "/images/events/fod-2026-poster.webp",
    badge: "Annual Convention",
  },
  {
    id: "youth-ignite",
    title: "Youth & Singles Ignite Encounter",
    theme: "Purpose Unveiled",
    watermark: ["PURPOSE", "UNVEILED"],
    date: "November 28th, 2026",
    startDateIso: "2026-11-28T16:00:00Z",
    time: "4:00 PM",
    location: "Youth Arena, Court of His Majesty",
    description:
      "Vibrant worship, breakout career and relationship masterclasses, and an altar encounter specifically for teenagers, students, and young professionals.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
    badge: "Youth Ministry",
  },
  {
    id: "good-women-thanksgiving",
    title: "Good Women End of Year Thanksgiving",
    theme: "Joy Unspeakable",
    watermark: ["JOY", "UNSPEAKABLE"],
    date: "December 12th, 2026",
    startDateIso: "2026-12-12T10:00:00Z",
    time: "10:00 AM",
    location: "Fellowship Hall, Court of His Majesty",
    description:
      "A grand annual celebration of God’s faithfulness, provisions, and protection over our families throughout 2026 with joyful praises and community banquet.",
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1200",
    badge: "Women Fellowship",
  },
  {
    id: "crossover-service",
    title: "Crossover Night of Glory & Restoration",
    theme: "Exceeding Grace",
    watermark: ["EXCEEDING", "GRACE"],
    date: "December 31st, 2026",
    startDateIso: "2026-12-31T21:00:00Z",
    time: "9:00 PM till 1:00 AM",
    location: "Main Auditorium, Court of His Majesty",
    description:
      "Step boldly into the new year with prophetic declarations, high praises, thanksgiving, and communion as we receive the prophetic theme for 2027.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
    badge: "Crossover Service",
  },
  {
    id: "annual-fasting-prayer",
    title: "21 Days Annual Prayer & Fasting",
    theme: "Dominion & Power",
    watermark: ["DOMINION", "& POWER"],
    date: "January 11th - 31st, 2027",
    startDateIso: "2027-01-11T18:00:00Z",
    time: "6:00 PM Daily",
    location: "Church Auditorium & Online",
    description:
      "Consecrate the first month of 2027 to seek the face of God in fasting, prayer, and word encounters for total dominion throughout the year.",
    image:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
    badge: "Prayer & Fasting",
  },
  {
    id: "divine-elevation",
    title: "Divine Elevation Encounter Service",
    theme: "Next Level Shift",
    watermark: ["NEXT LEVEL", "SHIFT"],
    date: "February 14th, 2027",
    startDateIso: "2027-02-14T08:00:00Z",
    time: "8:00 AM & 10:00 AM",
    location: "Main Sanctuary, RCCG CHM",
    description:
      "A special anointing service for breakthroughs in careers, businesses, families, and personal destiny with transformative worship and prophetic declarations.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200",
    badge: "Encounter Service",
  },

  // ─── PAST LATEST EVENTS (Last 6 Months: May 3rd, 2026 – Nov 3rd, 2026) ─────
  {
    id: "mens-annual-conference",
    title: "Men’s Annual Conference",
    theme: "Kingdom Men of Impact",
    watermark: ["KINGDOM", "MEN"],
    date: "October 18th - 20th, 2026",
    startDateIso: "2026-10-18T09:00:00Z",
    time: "9:00 AM & 5:00 PM",
    location: "Main Sanctuary, RCCG CHM",
    description:
      "A strategic gathering of men discovering biblical leadership, career excellence, spiritual authority, and strong family foundations.",
    image:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
    badge: "Men Fellowship",
    isPast: true,
  },
  {
    id: "ezzer-women-conference",
    title: "Ezzer Women Annual Conference",
    theme: "Women of Grace & Glory",
    watermark: ["GRACE &", "GLORY"],
    date: "September 12th - 14th, 2026",
    startDateIso: "2026-09-12T10:00:00Z",
    time: "10:00 AM & 6:00 PM",
    location: "Main Sanctuary, RCCG CHM",
    description:
      "Empowering women across marriage, spiritual warfare, family, and enterprise through prayer, teachings, and sisterhood.",
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1200",
    badge: "Women Fellowship",
    isPast: true,
  },
  {
    id: "choose-life-encounter",
    title: "Choose Life Mid-Year Encounter",
    theme: "Living Above Limits",
    watermark: ["ABOVE", "LIMITS"],
    date: "August 22nd - 24th, 2026",
    startDateIso: "2026-08-22T17:30:00Z",
    time: "5:30 PM Daily",
    location: "Church Auditorium & Livestream",
    description:
      "A powerful weekend of intensive prayer, deliverance, divine healing, and breakthrough encounters in God's presence.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200",
    badge: "Spiritual Encounter",
    isPast: true,
  },
  {
    id: "kingdom-leadership-summit",
    title: "Kingdom Leadership & Business Summit",
    theme: "Marketplace Apostles",
    watermark: ["MARKETPLACE", "APOSTLES"],
    date: "July 17th - 19th, 2026",
    startDateIso: "2026-07-17T17:00:00Z",
    time: "5:00 PM Daily",
    location: "Main Auditorium, Court of His Majesty",
    description:
      "Equipping executives, entrepreneurs, and professionals with biblical leadership principles and Kingdom wealth creation strategies.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    badge: "Leadership Summit",
    isPast: true,
  },
  {
    id: "midyear-praise-night",
    title: "Mid-Year Praise & Deliverance Night",
    theme: "Hallelujah Victory",
    watermark: ["HALLELUJAH", "VICTORY"],
    date: "June 26th, 2026",
    startDateIso: "2026-06-26T22:00:00Z",
    time: "10:00 PM till Dawn",
    location: "Church Auditorium, Court of His Majesty",
    description:
      "An explosive all-night worship celebration marking the conclusion of the first half of 2026 in high praise and deliverance.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
    badge: "Praise Night",
    isPast: true,
  },
  {
    id: "family-marriage-weekend",
    title: "Family & Marriage Enrichment Weekend",
    theme: "Built to Last",
    watermark: ["BUILT TO", "LAST"],
    date: "May 23rd - 24th, 2026",
    startDateIso: "2026-05-23T10:00:00Z",
    time: "10:00 AM & 4:00 PM",
    location: "Fellowship Hall, Court of His Majesty",
    description:
      "Strengthening matrimonial bonds, parenting communication, and generational blessings across families in our church.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
    badge: "Family Ministry",
    isPast: true,
  },

  // ─── OLDER THAN 6 MONTHS (April 2026 - Excluded from Past 6 Months) ────────
  {
    id: "easter-faith-convention",
    title: "Easter Faith & Power Convention",
    theme: "Resurrection Power",
    watermark: ["RESURRECTION", "POWER"],
    date: "April 3rd - 6th, 2026",
    startDateIso: "2026-04-03T18:00:00Z",
    time: "6:00 PM Daily",
    location: "Main Auditorium, Court of His Majesty",
    description:
      "Celebrating the victory of the cross with teachings on faith, salvation, and the resurrected life in Jesus Christ.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    badge: "Easter Convention",
    isPast: true,
  },
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleUpcomingCount, setVisibleUpcomingCount] = useState(3);
  const [visiblePastCount, setVisiblePastCount] = useState(3);

  // 1. Filter Upcoming Events: Date >= CURRENT_DATE
  const allUpcomingEvents = useMemo(() => {
    return ALL_EVENTS.filter((e) => {
      const d = new Date(e.startDateIso);
      return d >= CURRENT_DATE;
    });
  }, []);

  // 2. Filter Past Latest Events: Date < CURRENT_DATE AND Date >= SIX_MONTHS_AGO
  // Strictly enforces the "only show events from the last 6 months to the current date" rule
  const allPastLatestEvents = useMemo(() => {
    return ALL_EVENTS.filter((e) => {
      const d = new Date(e.startDateIso);
      return d < CURRENT_DATE && d >= SIX_MONTHS_AGO;
    });
  }, []);

  // Apply search query to Upcoming Events
  const filteredUpcoming = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allUpcomingEvents;
    return allUpcomingEvents.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.theme.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.date.toLowerCase().includes(q) ||
        e.badge.toLowerCase().includes(q)
    );
  }, [allUpcomingEvents, searchQuery]);

  // Apply search query to Past Events as well
  const filteredPast = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allPastLatestEvents;
    return allPastLatestEvents.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.theme.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.date.toLowerCase().includes(q) ||
        e.badge.toLowerCase().includes(q)
    );
  }, [allPastLatestEvents, searchQuery]);

  // Displayed subsets based on pagination counts (Max 3 on initial load)
  const displayedUpcoming = filteredUpcoming.slice(0, visibleUpcomingCount);
  const displayedPast = filteredPast.slice(0, visiblePastCount);

  const hasMoreUpcoming = filteredUpcoming.length > visibleUpcomingCount;
  const hasMorePast = filteredPast.length > visiblePastCount;

  return (
    <div className="w-full bg-white pb-24">
      {/* ─── Hero: Event Carousel with Solid Background (Figma node 2086:1269) ─── */}
      <EventsSection variant="solid" />

      {/* ─── UPCOMING EVENTS SECTION (Figma node 2086:1292 "explore") ──────── */}
      <section
        id="upcoming-events"
        className="w-full pt-16 sm:pt-20 lg:pt-[84px] pb-16 lg:pb-20 bg-white scroll-mt-24"
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
              {/* <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-[#180C62]/10 text-[#180C62] border border-[#180C62]/20 uppercase tracking-wider mb-2">
                Calendar of Gatherings
              </span> */}
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleUpcomingCount(3);
                  setVisiblePastCount(3);
                }}
                placeholder="Search for event"
                className="w-full bg-transparent text-base sm:text-[18px] text-[#0a0a0a] placeholder:text-[#696369] outline-none font-sans"
                data-node-id="2086:1298"
                aria-label="Search for event"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setVisibleUpcomingCount(3);
                    setVisiblePastCount(3);
                  }}
                  className="text-xs font-semibold text-gray-400 hover:text-gray-700 uppercase tracking-wider px-1 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Upcoming Events Cards Container (Max 3 on initial display) */}
          <div
            className="w-full flex flex-col gap-12 sm:gap-16 lg:gap-[64px]"
            data-node-id="2086:1300"
          >
            {filteredUpcoming.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl border border-gray-100 p-8">
                <p className="font-sans text-lg sm:text-xl text-[#606060] mb-4">
                  No upcoming events found matching &quot;{searchQuery}&quot;
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2.5 rounded-full bg-[#180C62] text-white text-sm font-semibold hover:bg-[#c8a96e] transition-colors cursor-pointer"
                >
                  View All Upcoming Events
                </button>
              </div>
            ) : (
              displayedUpcoming.map((event, index) => (
                <article
                  key={event.id}
                  id={event.id}
                  className="scroll-mt-32 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[40px] items-stretch min-h-[380px] lg:h-[400px] border border-gray-100 rounded-[20px] p-4 sm:p-6 lg:p-0 lg:border-none shadow-sm lg:shadow-none hover:shadow-md lg:hover:shadow-none transition-shadow"
                  data-node-id={`2086:1302-${index}`}
                  data-name={`upcoming-card-${index + 1}`}
                >
                  {/* Left Column: Watermark + Event Info + Retained Icons & Buttons */}
                  <div
                    className="lg:col-span-6 relative flex flex-col justify-between overflow-hidden rounded-[16px] lg:bg-transparent"
                    data-node-id="2086:1303"
                  >
                    {/* Giant Red Theme Watermark (Figma node 2086:1304 & 2086:1305) */}
                    <div
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 opacity-15 pointer-events-none select-none z-0 max-w-[500px]"
                      data-node-id="2086:1304"
                    >
                      <div
                        className="font-display font-black text-[#d61812] text-5xl sm:text-7xl lg:text-[96px] leading-[0.92] tracking-tighter uppercase"
                        data-node-id="2086:1305"
                        style={{ fontVariationSettings: '"CASL" 0, "CRSV" 0.5, "MONO" 0' }}
                      >
                        <p className="leading-none mb-0">{event.watermark?.[0] || event.theme.slice(0, 10) || "CHURCH"}</p>
                        <p className="leading-none">{event.watermark?.[1] || "ENCOUNTER"}</p>
                      </div>
                    </div>

                    {/* Foreground Info aligned right to mirror Figma node 2086:1306 */}
                    <div
                      className="relative z-10 flex flex-col items-start lg:items-end justify-center h-full text-left lg:text-right gap-3.5 sm:gap-4 lg:pb-[24px] lg:pr-6"
                      data-node-id="2086:1306"
                    >
                      {/* Category Badge */}
                      {/* <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#180C62]/10 text-[#180C62] border border-[#180C62]/20">
                        {event.badge}
                      </span> */}

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
                        <Clock className="size-4 text-[#d61812] shrink-0" />
                        <span>{event.time}</span>
                      </div>

                      {/* Retained Action Button Elements */}
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <Link
                          href={`/events/${event.id}`}
                          className="inline-flex items-center justify-center rounded-full gap-2 px-7 py-3 bg-[#b2a1ed]/10 hover:bg-[#b2a1ed]/20 border border-[#b2a1ed] text-[#180c62] font-sans font-medium text-[16px] transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        >
                          <span>View event details</span>
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

          {/* ─── Control Method: Load More Upcoming Events Button (Max 3 on display) ─── */}
          {hasMoreUpcoming && (
            <div className="flex flex-col items-center justify-center mt-12 sm:mt-16 pt-4">
              <button
                type="button"
                onClick={() => setVisibleUpcomingCount((prev) => prev + 3)}
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base text-[#180C62] bg-[#180C62]/5 hover:bg-[#180C62] hover:text-white border border-[#180C62]/20 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md active:scale-95 group"
                aria-label="Load more upcoming events"
              >
                <span>Load More Upcoming Events</span>
                <ChevronDown className="size-4 sm:size-5 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <p className="text-xs text-gray-400 mt-3">
                Showing {displayedUpcoming.length} of {filteredUpcoming.length} upcoming events
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* ─── Subtle Section Divider ────────────────────────────────────────── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200/80" />
      </div>

      {/* ─── PAST LATEST EVENTS SECTION (Last 6 Months: May 2026 – Present) ── */}
      <section
        id="past-events"
        className="w-full pt-16 sm:pt-20 lg:pt-[84px] pb-16 lg:pb-24 bg-white scroll-mt-24"
      >
        <Container className="max-w-[1440px]">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20 pb-4 border-b border-gray-100">
            <div>
              {/* <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200 uppercase tracking-wider mb-2">
                <History className="size-3.5 text-gray-500" />
                <span>Last 6 Months Archive (May 2026 – Nov 2026)</span>
              </div> */}
              <h2 className="font-display font-recursive-sans font-semibold text-3xl sm:text-4xl lg:text-[48px] text-[#0a0a0a] tracking-tight leading-tight">
                Past Events
              </h2>
              <p className="text-[#606060] text-sm sm:text-base max-w-2xl mt-2 font-sans">
                Explore highlights, themes, and recordings from our recent gatherings and conferences over the last six months.
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs font-medium text-gray-400">
                {filteredPast.length} concluded gatherings recorded
              </span>
            </div>
          </div>

          {/* Past Events Cards Container (Max 3 on initial display) */}
          <div className="w-full flex flex-col gap-12 sm:gap-16 lg:gap-[64px]">
            {filteredPast.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl border border-gray-100 p-8">
                <p className="font-sans text-lg sm:text-xl text-[#606060] mb-4">
                  No past events found matching &quot;{searchQuery}&quot;
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2.5 rounded-full bg-[#180C62] text-white text-sm font-semibold hover:bg-[#c8a96e] transition-colors cursor-pointer"
                >
                  View All Past Events
                </button>
              </div>
            ) : (
              displayedPast.map((event, index) => (
                <article
                  key={event.id}
                  id={event.id}
                  className="scroll-mt-32 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[40px] items-stretch min-h-[380px] lg:h-[400px] border border-gray-100 rounded-[20px] p-4 sm:p-6 lg:p-0 lg:border-none shadow-sm lg:shadow-none hover:shadow-md lg:hover:shadow-none transition-shadow"
                >
                  {/* Left Column: Watermark + Event Info + Retained Icons & Buttons */}
                  <div className="lg:col-span-6 relative flex flex-col justify-between overflow-hidden rounded-[16px] lg:bg-transparent">
                    {/* Giant Dark Watermark */}
                    <div
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 opacity-15 sm:opacity-20 pointer-events-none select-none z-0 max-w-[500px]"
                    >
                      <div
                        className="font-display font-black text-gray-500 text-5xl sm:text-7xl lg:text-[96px] leading-[0.92] tracking-tighter uppercase"
                        style={{ fontVariationSettings: '"CASL" 0, "CRSV" 0.5, "MONO" 0' }}
                      >
                        <p className="leading-none mb-0">{event.watermark?.[0] || event.theme.slice(0, 10) || "CHURCH"}</p>
                        <p className="leading-none">{event.watermark?.[1] || "ENCOUNTER"}</p>
                      </div>
                    </div>

                    {/* Foreground Info */}
                    <div className="relative z-10 flex flex-col items-start lg:items-end justify-center h-full text-left lg:text-right gap-3.5 sm:gap-4 lg:pb-[24px] lg:pr-6">
                      {/* Concluded Badge */}
                      {/* <div className="flex items-center gap-2">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                          {event.badge}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          <Sparkles className="size-3" />
                          <span>Concluded</span>
                        </span>
                      </div> */}

                      {/* Event Title */}
                      <h3 className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl lg:text-[28px] text-[#0a0a0a] tracking-tight leading-snug">
                        {event.title}
                      </h3>

                      {/* Date with Calendar Icon */}
                      <div className="flex items-center gap-2 text-base sm:text-lg lg:text-[22px] font-medium text-[#0a0a0a]">
                        <Calendar className="size-5 text-gray-400 shrink-0" />
                        <span>{event.date}</span>
                      </div>

                      {/* Venue with MapPin Icon */}
                      <div className="flex items-center gap-2 text-base sm:text-lg lg:text-[22px] font-medium text-[#0a0a0a]">
                        <MapPin className="size-5 text-gray-400 shrink-0" />
                        <span>{event.location}</span>
                      </div>

                      {/* Time with Clock Icon */}
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                        <Clock className="size-4 text-gray-400 shrink-0" />
                        <span>{event.time}</span>
                      </div>

                      {/* Retained Action Buttons */}
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <Link
                          href={`/events/${event.id}`}
                          className="inline-flex items-center justify-center rounded-full gap-2 px-7 py-3 bg-[#b2a1ed]/10 hover:bg-[#b2a1ed]/20 border border-[#b2a1ed] text-[#180c62] font-sans font-medium text-[16px] transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        >
                          <span>View recap & details</span>
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>

                        {/* <Link
                          href="/sermons"
                          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full font-semibold text-xs text-[#180C62] hover:text-[#c8a96e] hover:bg-gray-100 transition-colors uppercase tracking-wider"
                        >
                          <span>Listen to Sermons</span>
                          <ExternalLink className="size-3" />
                        </Link> */}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Poster Image with subtle grayscale hover effect */}
                  <div className="lg:col-span-6 relative w-full h-[280px] sm:h-[340px] lg:h-full min-h-[340px] lg:min-h-[400px] rounded-[16px] overflow-hidden shadow-lg border border-gray-100 group">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 700px"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                      Archive
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* ─── Control Method: Load More Past Events Button (Max 3 on display) ─── */}
          {hasMorePast && (
            <div className="flex flex-col items-center justify-center mt-12 sm:mt-16 pt-4">
              <button
                type="button"
                onClick={() => setVisiblePastCount((prev) => prev + 3)}
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base text-[#180C62] bg-[#180C62]/5 hover:bg-[#180C62] hover:text-white border border-[#180C62]/20 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md active:scale-95 group"
                aria-label="Load more past events"
              >
                <span>Load More Past Events</span>
                <ChevronDown className="size-4 sm:size-5 group-hover:translate-y-0.5 transition-transform" />
              </button>
              <p className="text-xs text-gray-400 mt-3">
                Showing {displayedPast.length} of {filteredPast.length} past events from the last 6 months
              </p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
