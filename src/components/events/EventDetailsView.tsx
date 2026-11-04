"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  CalendarPlus,
  Share2,
  ArrowUpRight,
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  Camera,
  Maximize2,
  X,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { EventDetail } from "@/lib/events-data";
import { getGalleryImagesByEventSlug, GALLERY_IMAGES, GalleryImage } from "@/lib/gallery-data";

export interface EventDetailsViewProps {
  event: EventDetail;
}

export function EventDetailsView({ event }: EventDetailsViewProps) {
  const [copied, setCopied] = useState(false);
  const [calendarDownloaded, setCalendarDownloaded] = useState(false);
  const [isCalendarMenuOpen, setIsCalendarMenuOpen] = useState(false);
  const calendarMenuRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryImage | null>(null);

  const isPastEvent = event.status.toLowerCase().includes("past");
  const specificImages = getGalleryImagesByEventSlug(event.slug);
  const eventGalleryImages = specificImages.length > 0 ? specificImages : GALLERY_IMAGES.slice(0, 4);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarMenuRef.current &&
        !calendarMenuRef.current.contains(e.target as Node)
      ) {
        setIsCalendarMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCalendarMenuOpen(false);
      }
    };

    if (isCalendarMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCalendarMenuOpen]);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://rccgchm.com/events";
    const shareData = {
      title: event.title,
      text: `${event.title} - ${event.theme ? `"${event.theme}" - ` : ""}${event.date} at RCCG Court of His Majesty`,
      url,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard if share cancelled/rejected
      }
    }

    // Clipboard fallback
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleAddToCalendar = () => {
    // Format dates to ICS standard YYYYMMDDTHHmmssZ
    const formatDate = (dateStr: string) => {
      return dateStr.replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//RCCG Court of His Majesty//Events//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${event.slug}-2026@rccgchm.com`,
      `DTSTAMP:${formatDate(new Date().toISOString())}`,
      `DTSTART:${formatDate(event.calendarEvent.startDate)}`,
      `DTEND:${formatDate(event.calendarEvent.endDate)}`,
      `SUMMARY:${event.calendarEvent.title}`,
      `DESCRIPTION:${event.calendarEvent.description}`,
      `LOCATION:${event.calendarEvent.location}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${event.slug}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCalendarDownloaded(true);
    setTimeout(() => setCalendarDownloaded(false), 3500);
  };

  // Format dates for Google Calendar (YYYYMMDDTHHmmssZ)
  const gStart = event.calendarEvent.startDate.replace(/[-:]/g, "").split(".")[0] + "Z";
  const gEnd = event.calendarEvent.endDate.replace(/[-:]/g, "").split(".")[0] + "Z";

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.calendarEvent.title
  )}&dates=${gStart}/${gEnd}&details=${encodeURIComponent(
    event.calendarEvent.description
  )}&location=${encodeURIComponent(event.calendarEvent.location)}`;

  const outlookLiveUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(
    event.calendarEvent.title
  )}&startdt=${encodeURIComponent(event.calendarEvent.startDate)}&enddt=${encodeURIComponent(
    event.calendarEvent.endDate
  )}&body=${encodeURIComponent(
    event.calendarEvent.description
  )}&location=${encodeURIComponent(event.calendarEvent.location)}`;

  const office365Url = `https://outlook.office.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(
    event.calendarEvent.title
  )}&startdt=${encodeURIComponent(event.calendarEvent.startDate)}&enddt=${encodeURIComponent(
    event.calendarEvent.endDate
  )}&body=${encodeURIComponent(
    event.calendarEvent.description
  )}&location=${encodeURIComponent(event.calendarEvent.location)}`;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${event.venue}, ${event.churchName}, ${event.addressLine1} ${event.addressLine2}`
  )}`;

  return (
    <div
      className="w-full bg-white min-h-screen text-[#0a0a0a] pt-[140px] pb-24 overflow-x-hidden"
      data-node-id="2096:6833"
      data-name="Event details"
    >
      <Container className="max-w-[1440px]">
        {/* ─── Back Navigation (Figma node 2096:6836) ────────────────── */}
        <div className="mb-8 lg:mb-10" data-node-id="2096:6836" data-name="Back navigation">
          <Link
            href="/events"
            className="inline-flex items-center gap-3 text-[#0a0a0a] hover:text-[#c8a96e] transition-colors group cursor-pointer"
          >
            <div
              className="size-6 flex items-center justify-center shrink-0"
              data-node-id="2096:6837"
              data-name="arrow-left"
            >
              <ArrowLeft className="size-5 transition-transform duration-200 group-hover:-translate-x-1" />
            </div>
            <span
              className="font-sans font-normal text-base sm:text-[18px] text-[#0a0a0a] group-hover:text-[#c8a96e] transition-colors"
              data-node-id="2096:6839"
            >
              Back to Events
            </span>
          </Link>
        </div>

        {/* ─── Event Introduction / Hero (Figma node 2096:6840) ──────── */}
        <section
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start pb-12 sm:pb-16 lg:pb-20"
          data-node-id="2096:6840"
          data-name="Event hero"
        >
          {/* Left Column: Event Information (Node 2096:6841) */}
          <div
            className="lg:col-span-5 flex flex-col justify-start"
            data-node-id="2096:6841"
            data-name="Event information"
          >
            {/* Event Heading (Node 2096:6842) */}
            <div data-node-id="2096:6842" data-name="Event heading">
              <p
                className="font-sans font-semibold text-sm sm:text-base lg:text-[18px] text-[#606060] uppercase tracking-wider"
                data-node-id="2096:6843"
              >
                {event.status}
              </p>
              <h1
                className="font-display font-recursive-sans font-semibold text-3xl sm:text-4xl lg:text-[52px] text-[#0a0a0a] leading-[1.15] lg:leading-[1.2] tracking-tight mt-3 sm:mt-5"
                data-node-id="2096:6844"
              >
                {event.title}
              </h1>
            </div>

            {/* Date and Venue Facts (Node 2096:6845) */}
            <div
              className="flex flex-col gap-6 sm:gap-7 mt-8 sm:mt-10"
              data-node-id="2096:6845"
              data-name="Date and venue"
            >
              {/* Date Fact (Node 2096:6846) */}
              <div
                className="flex items-start gap-4 sm:gap-5"
                data-node-id="2096:6846"
                data-name="Event fact"
              >
                <div
                  className="size-7 sm:size-8 shrink-0 text-[#E0534C] flex items-center justify-center mt-0.5"
                  data-node-id="2096:6847"
                  data-name="calendar-days"
                >
                  <CalendarDays className="size-6 sm:size-7" />
                </div>
                <div data-node-id="2096:6849" data-name="Fact content">
                  <p
                    className="font-sans text-xs sm:text-[16px] text-[#606060] font-normal"
                    data-node-id="2096:6850"
                  >
                    Date
                  </p>
                  <p
                    className="font-display font-recursive-sans font-medium text-lg sm:text-xl lg:text-[24px] text-[#0a0a0a] tracking-tight mt-1"
                    data-node-id="2096:6851"
                  >
                    {event.date}
                  </p>
                </div>
              </div>

              {/* Venue Fact (Node 2096:6852) */}
              <div
                className="flex items-start gap-4 sm:gap-5"
                data-node-id="2096:6852"
                data-name="Event fact"
              >
                <div
                  className="size-7 sm:size-8 shrink-0 text-[#E0534C] flex items-center justify-center mt-0.5"
                  data-node-id="2096:6853"
                  data-name="map-pin"
                >
                  <MapPin className="size-6 sm:size-7" />
                </div>
                <div data-node-id="2096:6855" data-name="Fact content">
                  <p
                    className="font-sans text-xs sm:text-[16px] text-[#606060] font-normal"
                    data-node-id="2096:6856"
                  >
                    Venue
                  </p>
                  <p
                    className="font-display font-recursive-sans font-medium text-lg sm:text-xl lg:text-[24px] text-[#0a0a0a] tracking-tight mt-1"
                    data-node-id="2096:6857"
                  >
                    {event.venue}
                  </p>
                </div>
              </div>
            </div>

            {/* Add to Calendar Action with Dropdown (Node 2096:6858) */}
            {!isPastEvent ? (
              <div className="mt-8 sm:mt-10 relative inline-block text-left" ref={calendarMenuRef}>
              <button
                type="button"
                onClick={() => setIsCalendarMenuOpen((prev) => !prev)}
                className="bg-[#180C62] hover:bg-[#13005A] active:scale-95 text-[#f5f5f5] px-7 sm:px-8 py-3.5 sm:py-[18px] rounded-[36px] flex items-center gap-3 shadow-md hover:shadow-lg transition-all cursor-pointer group"
                data-node-id="2096:6858"
                data-name="Add to calendar"
                aria-label="Add event to calendar"
                aria-expanded={isCalendarMenuOpen}
                aria-haspopup="true"
              >
                <div
                  className="size-6 shrink-0 flex items-center justify-center"
                  data-node-id="2096:6859"
                  data-name="calendar-plus"
                >
                  <CalendarPlus className="size-5 group-hover:scale-110 transition-transform text-[#f5f5f5]" />
                </div>
                <span
                  className="font-sans font-semibold text-base lg:text-[18px] text-[#f5f5f5] whitespace-nowrap"
                  data-node-id="2096:6861"
                >
                  Add to calendar
                </span>
                <ChevronDown
                  className={`size-4 sm:size-5 text-[#f5f5f5]/80 transition-transform duration-200 ${
                    isCalendarMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isCalendarMenuOpen && (
                <div
                  className="absolute left-0 mt-2.5 w-72 sm:w-80 rounded-2xl bg-white shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Select your calendar
                  </div>

                  {/* 1. Google Calendar */}
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsCalendarMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-[#180C62] transition-colors group/item"
                    role="menuitem"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                        G
                      </div>
                      <div>
                        <p className="font-semibold text-[#0a0a0a] group-hover/item:text-[#180C62]">Google Calendar</p>
                        <p className="text-xs text-gray-400">Web / Android / iOS</p>
                      </div>
                    </div>
                    <ExternalLink className="size-3.5 text-gray-400 group-hover/item:text-[#180C62] transition-colors" />
                  </a>

                  {/* 2. Apple Calendar */}
                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCalendar();
                      setIsCalendarMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-[#180C62] transition-colors text-left group/item cursor-pointer"
                    role="menuitem"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-7 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0">
                        
                      </div>
                      <div>
                        <p className="font-semibold text-[#0a0a0a] group-hover/item:text-[#180C62]">Apple Calendar</p>
                        <p className="text-xs text-gray-400">Mac / iPhone / iPad</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 group-hover/item:text-[#180C62]">.ics</span>
                  </button>

                  {/* 3. Outlook.com */}
                  <a
                    href={outlookLiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsCalendarMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-[#180C62] transition-colors group/item"
                    role="menuitem"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xs shrink-0">
                        O
                      </div>
                      <div>
                        <p className="font-semibold text-[#0a0a0a] group-hover/item:text-[#180C62]">Outlook (Live / Hotmail)</p>
                        <p className="text-xs text-gray-400">Personal Microsoft account</p>
                      </div>
                    </div>
                    <ExternalLink className="size-3.5 text-gray-400 group-hover/item:text-[#180C62] transition-colors" />
                  </a>

                  {/* 4. Microsoft 365 */}
                  <a
                    href={office365Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsCalendarMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-[#180C62] transition-colors group/item"
                    role="menuitem"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                        M
                      </div>
                      <div>
                        <p className="font-semibold text-[#0a0a0a] group-hover/item:text-[#180C62]">Microsoft 365</p>
                        <p className="text-xs text-gray-400">Work / School account</p>
                      </div>
                    </div>
                    <ExternalLink className="size-3.5 text-gray-400 group-hover/item:text-[#180C62] transition-colors" />
                  </a>

                  <div className="my-1.5 border-t border-gray-100" />

                  {/* 5. Download .ICS File */}
                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCalendar();
                      setIsCalendarMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-[#180C62] transition-colors text-left group/item cursor-pointer"
                    role="menuitem"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                        <Download className="size-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0a0a0a] group-hover/item:text-[#180C62]">Download Calendar File</p>
                        <p className="text-xs text-gray-400">Standard .ics file</p>
                      </div>
                    </div>
                    {calendarDownloaded ? (
                      <Check className="size-4 text-emerald-600" />
                    ) : (
                      <span className="text-xs text-gray-400">.ics</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold border border-gray-200 shadow-sm">
                  <span className="size-2 rounded-full bg-gray-400" />
                  <span>Event Concluded</span>
                </div>
                <a
                  href="#event-gallery"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#180C62] hover:bg-[#13005A] text-white text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Camera className="size-4" />
                  <span>View Event Photos</span>
                </a>
              </div>
            )}
          </div>

          {/* Right Column: Conference Theme Banner (Node 2096:6862) */}
          <div
            className="lg:col-span-7 w-full h-[320px] sm:h-[440px] lg:h-[500px] relative rounded-[16px] overflow-hidden shadow-lg border border-gray-100"
            data-node-id="2096:6862"
            data-name="Conference theme"
          >
            <Image
              src={event.posterImage}
              alt={event.title}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 760px"
            />
          </div>
        </section>

        {/* ─── Divider Line (Figma node 2096:6868 top border) ───────── */}
        <div className="w-full border-t border-[#d0d2d6]" />

        {/* ─── Event Overview (Figma node 2096:6868) ────────────────── */}
        <section
          className="w-full py-12 sm:py-16 lg:py-[72px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-[120px] items-start"
          data-node-id="2096:6868"
          data-name="Event overview"
        >
          {/* About the conference (Node 2096:6869) */}
          <div
            className="lg:col-span-8 flex flex-col gap-6"
            data-node-id="2096:6869"
            data-name="About the conference"
          >
            <h2
              className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl lg:text-[40px] text-[#0a0a0a] tracking-tight leading-tight"
              data-node-id="2096:6870"
            >
              {event.aboutTitle}
            </h2>
            <p
              className="font-sans font-normal text-base sm:text-lg lg:text-[20px] text-[#606060] leading-[1.6]"
              data-node-id="2096:6871"
            >
              {event.overviewParagraph1}
            </p>
            <p
              className="font-sans font-normal text-base sm:text-lg lg:text-[20px] text-[#606060] leading-[1.6]"
              data-node-id="2096:6872"
            >
              {event.overviewParagraph2}
            </p>
          </div>

          {/* Share Invitation (Node 2096:6873) */}
          <div
            className="lg:col-span-4 flex flex-col gap-4 sm:gap-6 lg:pt-2"
            data-node-id="2096:6873"
            data-name="Share invitation"
          >
            <h3
              className="font-display font-recursive-sans font-semibold text-xl sm:text-2xl lg:text-[28px] text-[#0a0a0a] tracking-tight leading-tight"
              data-node-id="2096:6874"
            >
              {event.inviteHeading}
            </h3>
            <p
              className="font-sans font-normal text-base sm:text-lg lg:text-[20px] text-[#606060] leading-[1.6]"
              data-node-id="2096:6875"
            >
              {event.inviteCopy}
            </p>
            <div
              className="flex items-center gap-3 pt-1"
              data-node-id="2096:6876"
              data-name="Share event"
            >
              <div
                className="size-[22px] flex items-center justify-center text-[#180C62]"
                data-node-id="2096:6877"
                data-name="share-2"
              >
                {copied ? (
                  <Check className="size-5 text-emerald-600 animate-pulse" />
                ) : (
                  <Share2 className="size-5" />
                )}
              </div>
              <button
                type="button"
                onClick={handleShare}
                className="font-sans font-medium text-base lg:text-[18px] text-[#180C62] hover:text-[#c8a96e] underline underline-offset-4 cursor-pointer transition-colors"
                data-node-id="2096:6879"
              >
                {copied ? "Link Copied to Clipboard!" : "Share this event"}
              </button>
            </div>
          </div>
        </section>

        {/* ─── Plan Your Visit / Join Us in Person (Node 2096:6880) ──── */}
        {isPastEvent ? (
          /* ─── Event Photo Gallery (Replaces 'Join Us in Person' on Past Events ONLY) ──── */
          <section id="event-gallery" className="w-full pb-16 lg:pb-24">
            <div className="w-full bg-white border border-gray-200 rounded-[24px] p-6 sm:p-10 lg:p-12 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-5 border-b border-gray-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#180c62]/10 text-[#180c62] text-xs font-semibold uppercase tracking-wider mb-2">
                    <Camera className="size-3.5" />
                    <span>Event Photo Highlights</span>
                  </div>
                  <h3 className="font-display font-recursive-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0a0a0a]">
                    Moments from {event.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-gray-600 mt-2">
                    Captured memories, testimonies, and celebrations from this concluded gathering.
                  </p>
                </div>

                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#180c62] hover:underline shrink-0"
                >
                  <span>Explore full church gallery</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>

              {/* Event Photos Grid */}
              {eventGalleryImages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {eventGalleryImages.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => setSelectedPhoto(photo)}
                      className="group relative rounded-2xl overflow-hidden bg-gray-900 aspect-[4/3] cursor-pointer shadow-sm hover:shadow-lg transition-all"
                    >
                      <Image
                        src={photo.imageUrl}
                        alt={photo.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        {/* <p className="text-xs font-medium text-[#c8a96e] uppercase tracking-wider">
                          {photo.date}
                        </p> */}
                        <h4 className="font-display font-recursive-sans font-semibold text-sm line-clamp-1 group-hover:text-[#F9BAB8] transition-colors">
                          {photo.title}
                        </h4>
                      </div>
                      <div className="absolute top-3 right-3 size-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="size-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-sm text-gray-500">
                    Photos from this event are currently being compiled by the media team.
                  </p>
                  <Link
                    href="/gallery"
                    className="inline-block mt-3 text-sm font-semibold text-[#180c62] hover:underline"
                  >
                    View All Church Photos →
                  </Link>
                </div>
              )}
            </div>
          </section>
        ) : (
          /* ─── Plan Your Visit / Join Us in Person (Upcoming Events ONLY) ──── */
          <section
          className="w-full pb-16 lg:pb-24"
          data-node-id="2096:6880"
          data-name="Plan your visit"
        >
          <div
            className="w-full bg-[rgba(5,18,2,0.05)] rounded-[16px] p-6 sm:p-10 lg:p-[48px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12"
            data-node-id="2096:6881"
            data-name="Venue information"
          >
            {/* Venue Introduction (Node 2096:6882) */}
            <div
              className="w-full lg:w-[420px] shrink-0"
              data-node-id="2096:6882"
              data-name="Venue introduction"
            >
              <h3
                className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl lg:text-[40px] text-[#0a0a0a] tracking-tight leading-tight"
                data-node-id="2096:6883"
              >
                Join us in person
              </h3>
              <p
                className="font-sans font-normal text-base sm:text-lg lg:text-[20px] text-[#606060] leading-[1.5] mt-3 sm:mt-5"
                data-node-id="2096:6884"
              >
                We look forward to welcoming you to Court of His Majesty.
              </p>
            </div>

            {/* Address Details (Node 2096:6885) */}
            <div
              className="flex-1 flex flex-col gap-2"
              data-node-id="2096:6885"
              data-name="Address"
            >
              <p
                className="font-display font-recursive-sans font-semibold text-xl lg:text-[24px] text-[#0a0a0a] tracking-tight"
                data-node-id="2096:6886"
              >
                {event.venue}
              </p>
              <p
                className="font-sans font-normal text-base sm:text-lg lg:text-[20px] text-[#0a0a0a]"
                data-node-id="2096:6887"
              >
                {event.churchName}
              </p>
              <div
                className="font-sans font-normal text-sm sm:text-base lg:text-[20px] text-[#606060] leading-[1.5]"
                data-node-id="2096:6888"
              >
                <p>{event.addressLine1}</p>
                <p>{event.addressLine2}</p>
              </div>
            </div>

            {/* Get Directions Button (Node 2096:6889) */}
            <div className="shrink-0" data-node-id="2096:6889" data-name="Get directions">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[rgba(178,161,237,0.1)] hover:bg-[#180C62] border border-[#b2a1ed] hover:border-[#180C62] text-[#180C62] hover:text-white px-6 py-3.5 sm:py-[16px] rounded-[28px] inline-flex items-center justify-center gap-2 font-sans font-semibold text-base lg:text-[18px] transition-all duration-200 cursor-pointer shadow-sm group"
              >
                <span data-node-id="2096:6890">Get directions</span>
                <div
                  className="size-6 flex items-center justify-center"
                  data-node-id="2096:6891"
                  data-name="arrow-up-right"
                >
                  <ArrowUpRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            </div>
          </div>
        </section>
        )}

        {/* ─── Lightbox Modal for Event Gallery ──── */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
            onClick={() => setSelectedPhoto(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="flex items-center justify-between text-white z-20 pb-3"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 uppercase tracking-wider">
                {selectedPhoto.eventTag}
              </span>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div
              className="relative flex-1 flex items-center justify-center my-2 max-h-[75vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-w-4xl max-h-[70vh]">
                <Image
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div
              className="bg-black/70 backdrop-blur-md rounded-2xl p-4 max-w-2xl mx-auto w-full text-white text-center flex flex-col items-center gap-1 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs text-[#c8a96e] font-semibold uppercase">{selectedPhoto.date}</p>
              <h4 className="font-display font-recursive-sans font-bold text-lg">{selectedPhoto.title}</h4>
              {selectedPhoto.caption && <p className="text-xs text-gray-300">{selectedPhoto.caption}</p>}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
