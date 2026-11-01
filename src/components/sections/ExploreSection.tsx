"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";

const exploreCards = [
  {
    id: "ministries",
    title: "Ministries",
    description: "Explore over 20 active departments serving children, youth, men, women, and the community.",
    link: "/ministries",
    bgImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "teachings",
    title: "Teachings",
    description: "In-depth Bible study, Sunday School, and discipleship tracks designed to deepen your roots in Christ.",
    link: "/sermons",
    bgImage: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "communities",
    title: "Communities",
    description: "Small group fellowships and regional house fellowships connecting members across Lagos and beyond.",
    link: "/connect",
    bgImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "get-involved",
    title: "Get Involved",
    description: "Find your place of service, volunteer with purpose, and make an eternal difference in our community.",
    link: "/ministries#join",
    bgImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800",
  },
];

export function ExploreSection() {
  const [activeCard, setActiveCard] = useState<string>("ministries");

  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <Container>
        {/* Section Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="font-display font-recursive-mono italic text-lg sm:text-xl text-[#051202] mb-2">
            Explore What&apos;s On At
          </p>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#051202] tracking-wide uppercase">
            {SITE_CONFIG.name}
          </h2>
        </div>

        {/* 4 Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreCards.map((card) => {
            const isFeatured = activeCard === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setActiveCard(card.id)}
                className={`group relative rounded-[28px] overflow-hidden min-h-[420px] transition-all duration-500 cursor-pointer flex flex-col justify-end p-8 ${
                  isFeatured
                    ? "ring-2 ring-[#c8a96e] shadow-2xl scale-[1.02]"
                    : "bg-[#051202] shadow-md hover:shadow-xl"
                }`}
              >
                {/* Background Image Layer */}
                <Image
                  src={card.bgImage}
                  alt={card.title}
                  fill
                  className={`object-cover transition-all duration-700 ${
                    isFeatured ? "opacity-40 scale-105" : "opacity-15 group-hover:opacity-30"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051202] via-[#051202]/70 to-transparent" />

                {/* Content */}
                <div className="relative z-10 text-white">
                  <h3 className="font-display font-recursive-sans text-2xl lg:text-3xl font-bold mb-3 tracking-wide text-white">
                    {card.title}
                  </h3>

                  <p
                    className={`text-sm text-gray-300 leading-relaxed transition-all duration-300 ${
                      isFeatured ? "opacity-100 max-h-24 mb-6" : "opacity-80 max-h-16 mb-4 line-clamp-2"
                    }`}
                  >
                    {card.description}
                  </p>

                  <Link
                    href={card.link}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 hover:bg-white text-white hover:text-[#051202] backdrop-blur-sm transition-all"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="size-3.5" />
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
