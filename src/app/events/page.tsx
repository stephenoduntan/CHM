"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

const events = [
  {
    id: "festival-of-destiny",
    title: "Festival of Destiny Conference 2026",
    theme: "Choose Life",
    date: "November 8th - 15th, 2026",
    time: "6:00 PM Daily (Grand Finale: 8:00 AM Sunday)",
    location: "Main Auditorium, Court of His Majesty",
    description: "Our signature annual convention celebrating 29 years of God's faithfulness with international guest speakers, prophetic worship, and signs and wonders.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    badge: "Annual Conference",
  },
  {
    id: "holy-ghost-service",
    title: "Monthly Holy Ghost Service",
    theme: "Power from on High",
    date: "First Friday of Every Month",
    time: "7:00 PM till Dawn",
    location: "RCCG Redemption City & Live in Sanctuary",
    description: "A night of extraordinary miracles, salvation, healing, and prophetic declarations with the General Overseer, Pastor E.A. Adeboye.",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
    badge: "Monthly Gathering",
  },
  {
    id: "youth-ignite",
    title: "Youth & Singles Ignite Encounter",
    theme: "Purpose Unveiled",
    date: "November 28th, 2026",
    time: "4:00 PM",
    location: "Youth Arena, Court of His Majesty",
    description: "Vibrant worship, breakout career and relationship masterclasses, and an altar encounter specifically for teenagers, students, and young professionals.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200",
    badge: "Youth Ministry",
  },
  {
    id: "good-women-fellowship",
    title: "Good Women Annual Convention",
    theme: "Women of Grace & Valour",
    date: "December 5th, 2026",
    time: "10:00 AM",
    location: "Fellowship Hall, Court of His Majesty",
    description: "Empowering women across marriage, spiritual warfare, family, and enterprise through prayer, teachings, and sisterhood.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1200",
    badge: "Women Fellowship",
  },
];

export default function EventsPage() {
  return (
    <div className="w-full bg-white pb-24">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-[720px] bg-[#051202] text-white flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920"
          alt="Church Events"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051202] via-[#051202]/70 to-transparent" />

        <Container className="relative z-10 text-center py-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#c8a96e]/20 border border-[#c8a96e]/40 text-[#c8a96e] text-xs font-semibold uppercase tracking-wider mb-4">
            Gatherings & Encounters
          </span>
          <h1 className="font-display font-recursive-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 uppercase tracking-tight">
            Upcoming Events
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Mark your calendar and prepare your heart for supernatural encounters with God.
          </p>
        </Container>
      </section>

      {/* ─── Events List ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="space-y-10">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-gray-50/70 border border-gray-200/90 rounded-[32px] overflow-hidden p-6 sm:p-10 hover:border-[#c8a96e] hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 relative h-[260px] sm:h-[320px] rounded-[24px] overflow-hidden shadow-md">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#051202]/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
                    {event.badge}
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <h3 className="font-sans font-bold text-2xl sm:text-3xl text-[#051202] mb-2">
                      {event.title}
                    </h3>
                    <p className="font-display font-recursive-sans text-lg text-[#c8a96e] italic mb-4">
                      Theme: &quot;{event.theme}&quot;
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-gray-600 mb-6">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-4 text-[#c8a96e]" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-4 text-[#c8a96e]" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-4 text-[#c8a96e]" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => alert(`Registration form for ${event.title} will open here.`)}
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white bg-[#051202] hover:bg-[#c8a96e] hover:text-[#051202] transition-colors text-xs uppercase tracking-wider shadow-sm cursor-pointer"
                    >
                      <span>Register for Event</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
