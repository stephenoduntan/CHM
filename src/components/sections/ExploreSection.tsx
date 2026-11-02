"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";

interface ExploreCard {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  alt: string;
}

const exploreCards: ExploreCard[] = [
  {
    id: "ministries",
    title: "Ministries",
    description:
      "Explore active ministries and departments serving children, youth, men, women, and our community with purpose and passion.",
    link: "/ministries",
    image: "/images/explore/ministries.jpg",
    alt: "RCCG Court of His Majesty Church Choir ministering passionately in church robes",
  },
  {
    id: "teachings",
    title: "Teachings",
    description:
      "In-depth Bible study, Sunday sermon series, and discipleship tracks designed to anchor your heart and deepen your roots in Christ.",
    link: "/sermons",
    image: "/images/explore/teachings.jpg",
    alt: "African pastor preaching God's Word with open Bible at the pulpit",
  },
  {
    id: "communities",
    title: "Communities",
    description:
      "Find life-giving fellowship through small groups, regional house fellowships, and vibrant family circles across Lagos and beyond.",
    link: "/groups",
    image: "/images/explore/communities.jpg",
    alt: "African church community fellowship and youth worship team gathered together",
  },
  {
    id: "get-involved",
    title: "Get Involved",
    description:
      "Find your place of service, volunteer with purpose, touch lives, and make an eternal difference in the Kingdom of God.",
    link: "/connect",
    image: "/images/explore/get-involved.jpg",
    alt: "Church congregation and worshippers passionately lifting hands in praise and service",
  },
];

export function ExploreSection() {
  const [activeId, setActiveId] = useState<string>("ministries");

  return (
    <section className="w-full py-16 lg:py-24 bg-white relative overflow-hidden" data-name="explore">
      <Container className="max-w-[1440px]">
        {/* Section Heading matching Figma */}
        <div className="flex flex-col items-center text-center gap-3 mb-10 lg:mb-12">
          <p className="font-display font-recursive-mono italic text-xl md:text-2xl text-[#242424] tracking-tight">
            Explore What&apos;s On At
          </p>
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0a0a0a] tracking-wide uppercase">
            {SITE_CONFIG.name}
          </h2>
        </div>

        {/* Desktop Horizontal Expanding Accordion (lg+) */}
        <div className="hidden lg:flex gap-4 h-[420px] w-full items-center relative">
          {exploreCards.map((card) => {
            const isActive = activeId === card.id;

            return (
              <div
                key={card.id}
                onClick={() => setActiveId(card.id)}
                onMouseEnter={() => setActiveId(card.id)}
                className={`group relative h-full rounded-[20px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer select-none ${
                  isActive
                    ? "flex-[1_0_0] min-w-[340px]"
                    : "w-[160px] xl:w-[200px] shrink-0 hover:brightness-110"
                }`}
                aria-label={card.title}
              >
                {/* Background Image Layer */}
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  priority={isActive}
                  sizes={isActive ? "(min-width: 1024px) 700px" : "(min-width: 1024px) 200px"}
                  className={`object-cover object-center transition-transform duration-700 ${
                    isActive ? "scale-100" : "scale-105 group-hover:scale-110"
                  }`}
                />

                {/* Overlays */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? "bg-gradient-to-t from-black/85 via-black/45 to-black/20"
                      : "bg-black/60 group-hover:bg-black/50"
                  }`}
                />

                {/* ACTIVE CARD CONTENT (Horizontal Layout) */}
                <div
                  className={`absolute inset-0 p-8 flex flex-col justify-end items-start transition-all duration-500 ${
                    isActive
                      ? "opacity-100 pointer-events-auto translate-y-0"
                      : "opacity-0 pointer-events-none translate-y-4"
                  }`}
                >
                  <div className="relative z-10 flex flex-col gap-3 max-w-xl text-left">
                    <h3 className="font-display font-recursive-sans font-semibold text-3xl sm:text-4xl xl:text-[48px] text-white leading-[1.1] tracking-tight">
                      {card.title}
                    </h3>
                    <p className="font-sans font-normal text-sm sm:text-base text-white/90 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <Link
                    href={card.link}
                    onClick={(e) => e.stopPropagation()}
                    className="relative z-10 mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[rgba(247,248,250,0.2)] hover:bg-white text-white hover:text-[#051202] border border-[#9b9ea3]/80 backdrop-blur-md text-[15px] font-medium tracking-wide transition-all duration-200 shadow-md group/btn"
                  >
                    <span>Learn more</span>
                    <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>

                {/* INACTIVE CARD CONTENT (Rotated Vertical Title) */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 pointer-events-none ${
                    isActive
                      ? "opacity-0 scale-95"
                      : "opacity-100 scale-100"
                  }`}
                >
                  <div className="-rotate-90 whitespace-nowrap flex items-center justify-center">
                    <p className="font-display font-recursive-sans font-semibold text-3xl xl:text-[40px] text-white tracking-wider leading-none">
                      {card.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet Accordion (< lg) */}
        <div className="flex lg:hidden flex-col gap-3 w-full">
          {exploreCards.map((card) => {
            const isActive = activeId === card.id;

            return (
              <div
                key={card.id}
                onClick={() => setActiveId(card.id)}
                className={`relative rounded-[20px] overflow-hidden transition-all duration-500 cursor-pointer ${
                  isActive ? "min-h-[380px]" : "h-[90px]"
                }`}
              >
                {/* Background Image Layer */}
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="100vw"
                  className={`object-cover object-center transition-transform duration-700 ${
                    isActive ? "scale-100" : "scale-105"
                  }`}
                />

                {/* Overlays */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isActive
                      ? "bg-gradient-to-t from-black/90 via-black/55 to-black/25"
                      : "bg-black/60"
                  }`}
                />

                {/* Collapsed Header Bar */}
                <div
                  className={`relative z-10 h-[90px] px-6 flex items-center justify-between transition-opacity duration-300 ${
                    isActive ? "opacity-0 pointer-events-none hidden" : "opacity-100"
                  }`}
                >
                  <h3 className="font-display font-recursive-sans font-semibold text-2xl text-white">
                    {card.title}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-white/75 font-semibold px-3 py-1 rounded-full border border-white/30 bg-white/10">
                    Tap to expand
                  </span>
                </div>

                {/* Expanded Content */}
                <div
                  className={`relative z-10 p-6 sm:p-8 h-full flex flex-col justify-end items-start transition-all duration-300 ${
                    isActive ? "opacity-100 flex" : "opacity-0 hidden"
                  }`}
                >
                  <h3 className="font-display font-recursive-sans font-semibold text-3xl sm:text-4xl text-white mb-2 leading-tight">
                    {card.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed mb-6 max-w-md">
                    {card.description}
                  </p>
                  <Link
                    href={card.link}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[rgba(247,248,250,0.2)] hover:bg-white text-white hover:text-[#051202] border border-[#9b9ea3] backdrop-blur-md text-sm font-medium transition-all"
                  >
                    <span>Learn more</span>
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
