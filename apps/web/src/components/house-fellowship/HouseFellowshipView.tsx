"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  User,
  Clock,
  Calendar,
  Search,
  Check,
  Copy,
  Heart,
  Home,
  BookOpen,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import {
  FellowshipCenter,
  HOUSE_FELLOWSHIP_ZONES,
  HOUSE_FELLOWSHIP_CENTERS,
  FELLOWSHIP_BENEFITS,
} from "@/lib/house-fellowship-data";

export function HouseFellowshipView() {
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);

  const handleCopyPhone = async (id: string, phone: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(phone);
      setCopiedPhoneId(id);
      setTimeout(() => setCopiedPhoneId(null), 2500);
    }
  };

  // Filtered centers
  const filteredCenters = useMemo(() => {
    return HOUSE_FELLOWSHIP_CENTERS.filter((center) => {
      // Zone match
      const matchesZone =
        selectedZone === "all" || center.landmark === selectedZone;

      // Search match
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        center.name.toLowerCase().includes(q) ||
        center.address.toLowerCase().includes(q) ||
        center.hostName.toLowerCase().includes(q) ||
        center.landmarkArea.toLowerCase().includes(q) ||
        center.landmark.toLowerCase().includes(q);

      return matchesZone && matchesSearch;
    });
  }, [selectedZone, searchQuery]);

  // Group centers by landmark for sectional display
  const centersByLandmark = useMemo(() => {
    const groups: { [key: string]: FellowshipCenter[] } = {};

    filteredCenters.forEach((center) => {
      if (!groups[center.landmark]) {
        groups[center.landmark] = [];
      }
      groups[center.landmark].push(center);
    });

    return groups;
  }, [filteredCenters]);

  const activeLandmarks = Object.keys(centersByLandmark);

  return (
    <div className="w-full bg-white text-[#0a0a0a]">
      {/* ─── Hero Section ───────────────────────────────────────────── */}
      <section className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] bg-[#051202] text-white flex items-center justify-center overflow-hidden pt-24 sm:pt-28">
        <Image
          src="/images/blog/church-family.png"
          alt="House Fellowship at RCCG Court of His Majesty"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051202] via-[#051202]/75 to-transparent" />

        <Container className="relative z-10 text-center py-16 sm:py-20 max-w-[1100px]">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b2a1ed]/15 border border-[#b2a1ed]/30 text-[#b2a1ed] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <span>House to House • Life to Life</span>
          </span>

          <h1 className="font-display font-recursive-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 uppercase tracking-tight">
            House Fellowship Centers
          </h1>

          <blockquote className="font-sans italic text-sm sm:text-base lg:text-lg text-[#c8a96e] max-w-2xl mx-auto mb-4 leading-relaxed">
            &ldquo;And they, continuing daily with one accord in the temple, and
            breaking bread from house to house, did eat their meat with gladness
            and singleness of heart.&rdquo;
            <cite className="block not-italic text-xs font-semibold uppercase tracking-wider text-gray-300 mt-1">
              — Acts 2:46
            </cite>
          </blockquote>

          <p className="text-gray-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Experience the warmth of Christian family right where you live. Meet
            weekly with believers in your neighborhood for Bible study, intimate
            prayer, and mutual encouragement across Alimosho and beyond.
          </p>

          {/* Quick Stats / Action Banner */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#centers-list"
              className="bg-[#180c62] hover:bg-[#180c62]/90 border border-[#b2a1ed]/40 text-white font-sans font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all shadow-md hover:scale-[1.02] cursor-pointer"
            >
              Find a Center Near You
            </a>
            <a
              href="#connect-callout"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-sans font-medium text-sm sm:text-base px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-colors cursor-pointer"
            >
              Host a Fellowship
            </a>
          </div>
        </Container>
      </section>

      {/* ─── Search & Zone Filter Bar ───────────────────────────────── */}
      <section
        id="centers-list"
        className="sticky top-[120px] z-30 bg-white/95 backdrop-blur-md border-b border-[#e5e5e5] py-4 shadow-2xs"
      >
        <Container className="max-w-[1440px]">
          <div className="flex flex-col items-stretch lg:items-center justify-between gap-8">
            {/* Live Search */}
            {/* <div className="relative w-full lg:w-[360px]">
              <Search className="size-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search center, street, or host..."
                className="w-full pl-9 pr-8 py-2.5 text-sm bg-[#f9fafb] border border-[#d0d2d6] rounded-full focus:outline-none focus:ring-2 focus:ring-[#180c62]/20 focus:border-[#180c62] text-[#0a0a0a] placeholder:text-[#9ca3af] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9ca3af] hover:text-[#0a0a0a] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div> */}

            {/* Landmark Zone Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {HOUSE_FELLOWSHIP_ZONES.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setSelectedZone(zone.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedZone === zone.id
                      ? "bg-[#180c62] text-white shadow-sm font-semibold"
                      : "bg-[#f8f9fa] hover:bg-[#f1f2f4] text-[#616161] border border-[#e5e5e5]"
                  }`}
                >
                  {zone.name}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── House Fellowship Centers List (Sectionalized by Landmark) ─ */}
      <section className="py-12 sm:py-16 bg-white w-full">
        <Container className="max-w-[1440px]">
          {/* Result Status */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm sm:text-base font-semibold text-[#0a0a0a]">
                Showing {filteredCenters.length}{" "}
                {filteredCenters.length === 1 ? "Fellowship Center" : "Fellowship Centers"}
              </p>
              {selectedZone !== "all" && (
                <p className="text-xs sm:text-sm text-[#737373]">
                  Filtered by landmark:{" "}
                  <span className="font-semibold text-[#180c62]">
                    {HOUSE_FELLOWSHIP_ZONES.find((z) => z.id === selectedZone)?.name}
                  </span>
                </p>
              )}
            </div>

            {(selectedZone !== "all" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedZone("all");
                  setSearchQuery("");
                }}
                className="text-xs sm:text-sm text-[#180c62] hover:underline font-medium cursor-pointer"
              >
                Reset all filters
              </button>
            )}
          </div>

          {activeLandmarks.length > 0 ? (
            <div className="flex flex-col gap-12 sm:gap-16">
              {activeLandmarks.map((landmark) => {
                const centers = centersByLandmark[landmark];
                return (
                  <div key={landmark} className="flex flex-col gap-6">
                    {/* Landmark Header */}
                    <div className="flex items-center gap-3">
                      {/* <div className="size-8 rounded-full bg-[#180c62]/10 text-[#180c62] flex items-center justify-center">
                        <MapPin className="size-4 text-[#180c62]" />
                      </div> */}
                      <div>
                        <h2 className="font-display font-recursive-sans font-bold text-xl sm:text-2xl text-[#0a0a0a]">
                          {landmark} Zone
                        </h2>
                        <p className="text-xs text-[#737373]">
                          {centers.length} {centers.length === 1 ? "center" : "centers"} in this area
                        </p>
                      </div>
                    </div>

                    {/* Landmark Centers Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {centers.map((center) => (
                        <div
                          key={center.id}
                          className="bg-white border border-[#d0d2d6] hover:border-[#180c62]/40 rounded-[20px] p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group relative"
                        >
                          <div>
                            {/* Header / Center Name & Area */}
                            {/* <div className="flex items-start justify-between gap-2 mb-3">
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#180c62]/10 text-[#180c62]">
                                {center.landmarkArea}
                              </span>
                              <span className="text-xs font-medium text-[#737373] flex items-center gap-1">
                                <Clock className="size-3 text-[#180c62]" />
                                <span>{center.meetingTime}</span>
                              </span>
                            </div> */}

                            <h3 className="font-display font-recursive-sans font-bold text-xl text-[#0a0a0a] group-hover:text-[#180c62] transition-colors mb-3">
                              {center.name}
                            </h3>

                            {/* Address */}
                            <div className="flex items-start gap-2.5 text-sm text-[#404040] mb-4">
                              <MapPin className="size-4 text-[#d61812] shrink-0 mt-0.5" />
                              <div>
                                <p className="leading-snug">{center.address}</p>
                                {center.directionsHint && (
                                  <p className="text-xs text-[#737373] mt-1 italic">
                                    Hint: {center.directionsHint}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Host Details & Actions */}
                          <div className="pt-4 border-t border-[#f0f0f0] flex flex-col gap-3">
                            <div className="flex items-center justify-between text-xs sm:text-sm">
                              <div className="flex items-center gap-2 text-[#616161]">
                                {/* <User className="size-3.5 text-[#180c62]" /> */}
                                <span className="font-medium text-[#0a0a0a]">
                                  {center.hostName}
                                </span>
                              </div>
                            </div>

                            {/* Phone & Direct Action */}
                            <div className="flex items-center justify-between gap-2 pt-1">
                              <a
                                href={`tel:${center.hostPhone}`}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#f0a505]/15 hover:bg-[#f0a505]/30 text-[#0a0a0a] rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                              >
                                <Phone className="size-3.5 text-[#d97706]" />
                                <span>{center.hostPhone}</span>
                              </a>

                              <button
                                type="button"
                                onClick={() =>
                                  handleCopyPhone(center.id, center.hostPhone)
                                }
                                className="inline-flex items-center gap-1 text-xs text-[#616161] hover:text-[#180c62] transition-colors cursor-pointer p-1.5 rounded-md hover:bg-neutral-100"
                                title="Copy phone number"
                              >
                                {copiedPhoneId === center.id ? (
                                  <>
                                    <Check className="size-3.5 text-emerald-600" />
                                    <span className="text-emerald-700 font-medium">
                                      Copied
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="size-3.5" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-8 max-w-xl mx-auto">
              <Home className="size-10 text-[#9ca3af] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#0a0a0a]">
                No fellowship centers found
              </h3>
              <p className="text-sm text-[#737373] mt-1 leading-relaxed">
                We couldn&apos;t find any centers matching &ldquo;{searchQuery}&rdquo;.
                Try searching by street name or choose another neighborhood.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedZone("all");
                  setSearchQuery("");
                }}
                className="mt-4 px-5 py-2.5 bg-[#180c62] text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-[#180c62]/90 transition-colors cursor-pointer"
              >
                View all centers
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* ─── Why Join a House Fellowship Section ───────────────────── */}
      <section className="py-16 bg-[#f2f2f2]/15 w-full">
        <Container className="max-w-[1440px]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#180c62] bg-[#180c62]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              The Heart of Community
            </span>
            <h2 className="font-display font-recursive-sans font-bold text-2xl sm:text-3xl lg:text-[40px] text-[#0a0a0a] leading-tight">
              Why Join a House Fellowship?
            </h2>
            <p className="text-sm sm:text-base text-[#616161] mt-2">
              Sunday worship celebrates our unity as a whole church. House fellowship
              nurtures personal relationships and spiritual growth throughout the week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FELLOWSHIP_BENEFITS.map((benefit, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-2xs flex flex-col gap-3"
              >
                <div className="size-10 rounded-full bg-[#180c62]/10 text-[#180c62] flex items-center justify-center font-bold text-base">
                  {i + 1}
                </div>
                <h3 className="font-sans font-semibold text-lg text-[#0a0a0a]">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#616161] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Connect Call-Out Card ─────────────────────────────────── */}
      <section id="connect-callout" className="py-16 sm:py-20 bg-white w-full">
        <Container className="max-w-[1440px]">
          <div className="bg-[#f2f2f2] rounded-[24px] p-8 sm:p-12 lg:p-16 border border-[#e5e5e5] relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 sm:gap-12 shadow-xs">
            <div className="flex flex-col gap-3.5 max-w-[760px]">
              {/* <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#180c62]">
                <Sparkles className="size-4 text-[#f0a505]" />
                <span>Get Connected Today</span>
              </span> */}
              <h2 className="font-display font-recursive-sans font-bold text-2xl sm:text-3xl lg:text-[40px] text-[#0a0a0a] leading-[1.2]">
                Join a House Fellowship Centre
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#616161] leading-relaxed">
                Can&apos;t find a center on your street, or interested in opening your
                living room as a fellowship host? The House Fellowship Directorate of
                RCCG Court of His Majesty is ready to assist you.
              </p>
              {/* <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#404040] pt-2">
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-emerald-600" /> Free weekly study outline
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-emerald-600" /> Warm hospitality
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-emerald-600" /> Neighborhood prayer cover
                </span>
              </div> */}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 w-full sm:w-auto">
              {/* <Link
                href="/connect"
                className="bg-[#180c62] hover:bg-[#180c62]/90 text-white rounded-full px-7 py-4 text-base font-semibold transition-all shadow-md text-center cursor-pointer hover:scale-[1.02]"
              >
                Locate My Center
              </Link> */}
              <a
                href="tel:+2348033068989"
                className="bg-white hover:bg-neutral-50 border border-[#d0d2d6] text-[#0a0a0a] rounded-full px-6 py-4 text-base font-medium transition-colors text-center inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Phone className="size-4 text-[#180c62]" />
                <span>Call Directorate</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

