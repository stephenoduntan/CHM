"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  BookOpen,
  Mail,
  X,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import {
  Leader,
  SENIOR_PASTORS,
  LEADERSHIP_TEAM,
  LEADERSHIP_CATEGORIES,
  LEADERSHIP_VALUES,
} from "@/lib/leadership-data";

export function LeadershipView() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  const allLeaders = [SENIOR_PASTORS, ...LEADERSHIP_TEAM];

  const filteredLeaders =
    activeCategory === "all"
      ? allLeaders
      : allLeaders.filter((leader) => leader.category === activeCategory);

  return (
    <div className="w-full bg-white text-[#0a0a0a]">
      <Container className="max-w-[1440px] w-full pt-[120px] sm:pt-[140px] pb-16 sm:pb-24">
        {/* ─── Page Introduction ────────────────────────────────────── */}
        <section className="flex flex-col items-center pb-10 sm:pb-[64px] pt-6 sm:pt-[60px] px-4 text-center w-full">
          <div className="flex flex-col gap-4 sm:gap-[20px] items-center max-w-[1100px] w-full">
            {/* <p className="font-serif italic text-base sm:text-[20px] text-[#616161]">
              Spiritual Shepherds & Servant Leaders
            </p> */}
            <h1 className="font-display font-recursive-sans font-bold text-4xl sm:text-5xl lg:text-[56px] text-[#0a0a0a] leading-[1.2] tracking-tight">
              Our Leadership
            </h1>
            <p className="font-sans font-normal text-base sm:text-xl lg:text-[22px] leading-relaxed text-[#616161] max-w-[1000px]">
              Meet the dedicated pastoral team and spiritual mentors called by God
              to teach His Word, shepherd the congregation, and lead RCCG Court of
              His Majesty (Lagos Province 94 HQ) in faith, revival, and community transformation.
            </p>
          </div>
        </section>

        {/* ─── Senior Pastors Spotlight Feature ──────────────────────── */}
        <section className="bg-[#f2f2f2] rounded-[24px] overflow-hidden p-6 sm:p-10 lg:p-[48px] mb-16 sm:mb-24 relative shadow-xs">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">
            {/* Portrait Card */}
            <div className="w-full lg:w-[45%] shrink-0">
              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full rounded-[20px] overflow-hidden bg-neutral-200 shadow-md">
                <Image
                  src={SENIOR_PASTORS.image}
                  alt={SENIOR_PASTORS.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  {/* <span className="inline-block px-3.5 py-1 rounded-full bg-[#180c62] text-xs font-semibold uppercase tracking-wider mb-2 text-[#b2a1ed] border border-[#b2a1ed]/30 shadow-xs">
                    {SENIOR_PASTORS.badge}
                  </span> */}
                  <h3 className="font-display font-recursive-sans text-xl sm:text-2xl font-bold">
                    {SENIOR_PASTORS.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-200 mt-1">
                    {SENIOR_PASTORS.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Narrative & Quote */}
            <div className="flex-1 flex flex-col gap-6 justify-between">
              <div className="flex flex-col gap-4">
                {/* <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#d61812]" />
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#180c62]">
                    Senior Pastorate & Provincial Oversight
                  </span>
                </div> */}
                <h2 className="font-display font-recursive-sans font-bold text-2xl sm:text-3xl lg:text-[38px] text-[#0a0a0a] leading-[1.2]">
                  Pastor and Pastor Mrs. Fred Odekhian
                </h2>
                <p className="text-base sm:text-lg text-[#616161] leading-relaxed">
                  {SENIOR_PASTORS.fullBio[0]}
                </p>
                <p className="text-base sm:text-lg text-[#616161] leading-relaxed">
                  {SENIOR_PASTORS.fullBio[1]}
                </p>
              </div>

              {/* Anchor Scripture Card */}
              <div className="bg-white rounded-2xl border-l-4 border-[#d61812] p-5 sm:p-6 shadow-2xs">
                <blockquote className="font-sans text-base sm:text-lg text-[#0a0a0a] italic leading-relaxed">
                  {SENIOR_PASTORS.scripture.quote}
                </blockquote>
                <cite className="block text-xs sm:text-sm font-semibold text-[#180c62] not-italic mt-2">
                  — {SENIOR_PASTORS.scripture.reference}
                </cite>
              </div>

              {/* Actions & Official Signature */}
              <div className="flex flex-wrap items-center justify-between gap-6 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedLeader(SENIOR_PASTORS)}
                    className="bg-[#f0a505] hover:bg-[#d99404]/90 text-[#0a0a0a] rounded-full px-6 py-3 text-sm sm:text-base font-semibold transition-all shadow-sm cursor-pointer"
                  >
                    Read Full Biography
                  </button>
                  {/* <Link
                    href="/connect"
                    className="bg-white hover:bg-neutral-50 border border-[#d0d2d6] text-[#0a0a0a] rounded-full px-5 py-3 text-sm sm:text-base font-medium transition-colors cursor-pointer"
                  >
                    Connect with Pastors
                  </Link> */}
                </div>

                {/* <div className="relative h-12 w-36 opacity-85">
                  <Image
                    src="/images/pastor-fred-signature.png"
                    alt="Pastor Fred Odekhian signature"
                    fill
                    className="object-contain"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Category Filter Navigation ───────────────────────────── */}
        <section className="flex flex-col gap-8 sm:gap-10 pb-16 sm:pb-20 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e5e5e5] pb-6">
            <div>
              <h2 className="font-display font-recursive-sans font-bold text-2xl sm:text-3xl lg:text-[40px] text-[#0a0a0a] leading-[1.2]">
                Pastoral Leadership & Ministers
              </h2>
              <div className="bg-[#d61812] h-[5px] w-[124px] rounded-full mt-3" />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {LEADERSHIP_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-[#180c62] text-white shadow-sm font-semibold"
                      : "bg-[#f8f9fa] hover:bg-[#f1f2f4] text-[#616161] border border-[#e5e5e5]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* ─── Leaders Grid ───────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
            {filteredLeaders.map((leader) => (
              <div
                key={leader.id}
                className="bg-white border border-[#d0d2d6] rounded-[20px] overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                {/* Photo with Badge */}
                <div className="relative aspect-[16/11] w-full bg-neutral-100 overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#180c62]/90 backdrop-blur-md text-white border border-white/20">
                      {leader.badge}
                    </span>
                  </div> */}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-1 gap-5">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display font-recursive-sans font-semibold text-xl sm:text-[22px] text-[#0a0a0a] group-hover:text-[#d61812] transition-colors">
                      {leader.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#180c62] uppercase tracking-wider">
                      {leader.role}
                    </p>
                    {/* <p className="text-sm sm:text-base text-[#616161] leading-relaxed mt-2 line-clamp-3">
                      {leader.shortBio}
                    </p> */}
                  </div>

                  <div className="pt-4 border-t border-[#f0f0f0] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedLeader(leader)}
                      className="inline-flex items-center gap-1.5 text-sm sm:text-[15px] font-semibold text-[#180c62] hover:text-[#d61812] transition-colors cursor-pointer"
                    >
                      <span>View Bio & Ministry</span>
                      <ArrowRight className="size-4" />
                    </button>

                    {/* {leader.scripture && (
                      <span className="text-xs font-mono text-[#737373] bg-[#f9fafb] px-2.5 py-1 rounded-md border border-[#e5e5e5]">
                        {leader.scripture.reference}
                      </span>
                    )} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Leadership Values Section ────────────────────────────── */}
        <section className="p-8 sm:p-12 mb-16 sm:mb-24">
          <div className="flex flex-col items-center text-center max-w-[800px] mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#180c62] bg-[#180c62]/10 px-3 py-1 rounded-full mb-3">
              Guiding Principles
            </span>
            <h2 className="font-display font-recursive-sans font-bold text-2xl sm:text-3xl lg:text-[36px] text-[#0a0a0a]">
              The Pillars of Our Leadership
            </h2>
            <p className="text-sm sm:text-base text-[#616161] mt-2">
              Every pastor, minister, and ministry director at Court of His Majesty
              leads with devotion anchored in four foundational pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP_VALUES.map((val, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-2xs flex flex-col gap-3"
              >
                <div className="size-10 rounded-full bg-[#180c62]/10 text-[#180c62] flex items-center justify-center font-bold text-base">
                  {idx + 1}
                </div>
                <h3 className="font-sans font-semibold text-lg text-[#0a0a0a]">
                  {val.title}
                </h3>
                <p className="text-sm text-[#616161] leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Pastoral Care & Counseling CTA ───────────────────────── */}
        <section className="bg-[#180c62] text-white rounded-[24px] p-8 sm:p-12 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="flex flex-col gap-3 max-w-[760px]">
              {/* <div className="flex items-center gap-2">
                <Heart className="size-5 text-[#f0a505]" />
                <span className="text-xs uppercase tracking-wider font-semibold text-[#b2a1ed]">
                  Pastoral Care & Counseling
                </span>
              </div> */}
              <h2 className="font-display font-recursive-sans font-bold text-2xl sm:text-3xl lg:text-[36px] text-white leading-tight">
                Need Spiritual Guidance or Confidential Prayer?
              </h2>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                Our pastors and pastoral counselors are dedicated to walking with you
                through life&apos;s joyful milestones and difficult valleys. All pastoral
                counseling is conducted in strict biblical confidentiality.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              {/* <Link
                href="/connect"
                className="bg-[#f0a505] hover:bg-[#d99404] text-[#0a0a0a] rounded-full px-7 py-3.5 text-base font-semibold transition-colors text-center shadow-sm"
              >
                Request Pastoral Care
              </Link> */}
              <Link
                href="/connect"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full px-6 py-3.5 text-base font-medium transition-colors text-center"
              >
                Submit Prayer Request
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Detailed Bio Modal ───────────────────────────────────── */}
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
            <div
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col"
              role="dialog"
              aria-modal="true"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#e5e5e5] px-6 py-4 flex items-center justify-end z-10">
                {/* <span className="text-xs font-semibold uppercase tracking-wider text-[#180c62] bg-[#180c62]/10 px-3 py-1 rounded-full">
                  {selectedLeader.badge}
                </span> */}
                <button
                  type="button"
                  onClick={() => setSelectedLeader(null)}
                  className="size-9 rounded-full bg-[#f3f4f6] hover:bg-[#e5e7eb] flex items-center justify-center text-[#616161] hover:text-[#0a0a0a] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="relative size-28 sm:size-32 rounded-2xl overflow-hidden shrink-0 bg-neutral-100 shadow-sm">
                    <Image
                      src={selectedLeader.image}
                      alt={selectedLeader.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display font-recursive-sans font-bold text-2xl text-[#0a0a0a]">
                      {selectedLeader.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#180c62]">
                      {selectedLeader.role}
                    </p>
                    {selectedLeader.contactEmail && (
                      <p className="text-xs text-[#737373] flex items-center gap-1.5 mt-1">
                        <Mail className="size-3.5 text-[#180c62]" />
                        <span>{selectedLeader.contactEmail}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Biography Narrative */}
                <div className="flex flex-col gap-3 text-base text-[#4b5563] leading-relaxed">
                  {selectedLeader.fullBio.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Scripture Quote */}
                {selectedLeader.scripture && (
                  <div className="bg-[#f8f9fa] border-l-4 border-[#d61812] rounded-r-xl p-4 sm:p-5">
                    <p className="text-base text-[#0a0a0a] italic leading-relaxed">
                      {selectedLeader.scripture.quote}
                    </p>
                    <p className="text-xs font-semibold text-[#180c62] mt-2 not-italic">
                      — {selectedLeader.scripture.reference}
                    </p>
                  </div>
                )}

                {/* Responsibilities */}
                {selectedLeader.responsibilities &&
                  selectedLeader.responsibilities.length > 0 && (
                    <div className="flex flex-col gap-3 pt-2">
                      <h4 className="font-sans font-semibold text-base text-[#0a0a0a]">
                        Key Areas of Oversight
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {selectedLeader.responsibilities.map((resp, rIdx) => (
                          <li
                            key={rIdx}
                            className="flex items-start gap-2.5 text-sm text-[#4b5563]"
                          >
                            <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Modal Footer Action */}
                <div className="pt-4 border-t border-[#e5e5e5] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedLeader(null)}
                    className="px-5 py-2.5 text-sm font-medium text-[#616161] hover:text-[#0a0a0a] cursor-pointer"
                  >
                    Close
                  </button>
                  {/* <Link
                    href="/connect"
                    onClick={() => setSelectedLeader(null)}
                    className="px-5 py-2.5 bg-[#180c62] hover:bg-[#180c62]/90 text-white rounded-full text-sm font-semibold transition-colors"
                  >
                    Connect with Ministry
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

