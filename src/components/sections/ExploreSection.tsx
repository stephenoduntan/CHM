"use client";

import { useState, useEffect, useRef } from "react";
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
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  // Mobile scroll-driven accordion tracking
  useEffect(() => {
    const handleScroll = () => {
      // Only process when mobile track is visible and active
      if (!mobileTrackRef.current || window.innerWidth >= 1024) return;

      const rect = mobileTrackRef.current.getBoundingClientRect();
      const trackHeight = mobileTrackRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollDistance = trackHeight - windowHeight;

      if (scrollDistance <= 0) return;

      // rect.top is distance from top of viewport to top of track
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / scrollDistance, 0), 1);

      // Determine active card index (0, 1, 2, 3)
      const cardIndex = Math.min(
        Math.floor(progress * exploreCards.length),
        exploreCards.length - 1
      );

      setActiveId(exploreCards[cardIndex].id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToCard = (index: number) => {
    setActiveId(exploreCards[index].id);
    if (!mobileTrackRef.current) return;

    const rect = mobileTrackRef.current.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const trackHeight = mobileTrackRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollDistance = trackHeight - windowHeight;

    if (scrollDistance <= 0) return;

    // Center within that card's progress segment
    const targetProgress = (index + 0.5) / exploreCards.length;
    const targetY = trackTop + targetProgress * scrollDistance;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white relative overflow-hidden" data-name="explore">
      {/* Desktop Layout (lg+) */}
      <div className="hidden lg:block w-full py-16 lg:py-24">
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
          <div className="flex gap-4 h-[420px] w-full items-center relative">
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
                    sizes="(min-width: 1024px) 700px"
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
                      isActive ? "opacity-0 scale-95" : "opacity-100 scale-100"
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
        </Container>
      </div>

      {/* Mobile / Tablet On-Scroll Accordion (< lg) */}
      <div ref={mobileTrackRef} className="block lg:hidden relative h-[220vh]">
        <div className="sticky top-0 h-[100dvh] flex flex-col justify-between py-4 px-4 sm:px-6 overflow-hidden">
          <Container className="h-full flex flex-col justify-between max-w-xl mx-auto w-full">
            {/* Mobile Section Heading */}
            <div className="flex flex-col items-center text-center gap-1 shrink-0 mb-2 pt-1">
              <p className="font-display font-recursive-mono italic text-base sm:text-lg text-[#242424] tracking-tight">
                Explore What&apos;s On At
              </p>
              <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-[#0a0a0a] tracking-wide uppercase">
                {SITE_CONFIG.name}
              </h2>

              {/* Progress Pill Indicators */}
              <div className="flex items-center gap-2 mt-2">
                {exploreCards.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => scrollToCard(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeId === c.id
                        ? "w-7 bg-[#0a0a0a]"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to ${c.title}`}
                  />
                ))}
              </div>
            </div>

            {/* Mobile Vertical Accordion Cards Container */}
            <div className="flex-1 min-h-0 flex flex-col gap-2.5 w-full my-auto justify-center">
              {exploreCards.map((card, index) => {
                const isActive = activeId === card.id;

                if (isActive) {
                  return (
                    <div
                      key={card.id}
                      className="relative flex-1 min-h-[240px] max-h-[460px] rounded-[20px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-lg"
                    >
                      {/* Background Image Layer */}
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw"
                        priority={index === 0}
                        className="object-cover object-center transition-transform duration-700 scale-100"
                      />

                      {/* Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25" />

                      {/* Active Content */}
                      <div className="relative z-10 p-5 sm:p-7 h-full flex flex-col justify-end items-start text-left">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[11px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-white/20 text-white/90 border border-white/20 backdrop-blur-sm">
                            0{index + 1}
                          </span>
                        </div>

                        <h3 className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl text-white mb-2 leading-tight">
                          {card.title}
                        </h3>

                        <p className="font-sans text-xs sm:text-sm text-white/90 leading-relaxed mb-4 max-w-md line-clamp-3 sm:line-clamp-none">
                          {card.description}
                        </p>

                        <Link
                          href={card.link}
                          className="inline-flex items-center gap-2 px-5 py-2 sm:py-2.5 rounded-full bg-[rgba(247,248,250,0.2)] hover:bg-white text-white hover:text-[#051202] border border-[#9b9ea3] backdrop-blur-md text-xs sm:text-sm font-medium transition-all group/btn"
                        >
                          <span>Learn more</span>
                          <ArrowUpRight className="size-3.5 sm:size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </Link>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={card.id}
                    onClick={() => scrollToCard(index)}
                    className="relative h-[52px] sm:h-[58px] shrink-0 rounded-[16px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer select-none group border border-black/5"
                    aria-label={`Open ${card.title}`}
                  >
                    {/* Darkened background image */}
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw"
                      className="object-cover object-center brightness-[0.35] group-hover:brightness-[0.45] transition-all duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />

                    {/* Collapsed Bar Content */}
                    <div className="relative z-10 px-4 sm:px-5 h-full flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-white/60 font-semibold tracking-wider">
                          0{index + 1}
                        </span>
                        <h3 className="font-display font-recursive-sans font-semibold text-base sm:text-lg text-white/90">
                          {card.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                        <span className="text-[11px] font-sans tracking-wide uppercase hidden xs:inline">
                          Explore
                        </span>
                        <div className="size-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs text-white/80">
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll hint helper at bottom */}
            {/* <div className="flex items-center justify-center shrink-0 pt-2 pb-1 text-black/40 text-[11px] font-sans tracking-wider uppercase">
              <span>Scroll to explore &bull; Tap any card to view</span>
            </div> */}
          </Container>
        </div>
      </div>
    </section>
  );
}
