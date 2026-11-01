"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { UPCOMING_EVENT } from "@/lib/constants";

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 13,
    hours: 17,
    minutes: 27,
    seconds: 27,
  });

  useEffect(() => {
    const targetDate = new Date(`${UPCOMING_EVENT.startDate}T09:00:00`).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 lg:py-28 w-full bg-white relative overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Event Details Text */}
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <p className="font-display font-recursive-mono font-medium uppercase text-lg sm:text-xl text-[#1a1a1a] tracking-wider">
              {UPCOMING_EVENT.name}
            </p>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-[#0a0a0a] tracking-[3px] uppercase">
              {UPCOMING_EVENT.theme}
            </h2>
            <p className="font-sans font-normal text-lg sm:text-xl text-[#3d3d3d] uppercase tracking-wider">
              {UPCOMING_EVENT.dateLabel}
            </p>
          </div>

          {/* Futuristic Glowing Countdown Card */}
          <div className="relative w-full max-w-[680px] h-[180px] sm:h-[196px] flex items-center justify-center">
            {/* Glow Background Layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(11,204,18,0.55)] to-[rgba(11,185,171,0.55)] rounded-[20px] blur-[28px] -z-10" />

            {/* Top reflective bar */}
            <div className="absolute top-[-4px] left-[4%] w-[92%] h-[6px] bg-[#9e9e9e] blur-[4px] rounded-full" />

            {/* Main Timer Display */}
            <div className="w-full h-full bg-gradient-to-b from-[#051202] to-[#0e0826] rounded-[20px] p-6 sm:p-10 flex items-center justify-around shadow-[0px_0px_16px_0px_rgba(11,204,18,0.4),0px_4px_16px_0px_rgba(11,185,171,0.4)] text-[#f5f5f5]">
              {/* Days */}
              <div className="flex flex-col items-center justify-center min-w-[60px]">
                <span className="font-display font-recursive-mono text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-medium text-white/80 mt-1 italic">
                  days
                </span>
              </div>

              <span className="font-display font-recursive-mono text-2xl sm:text-4xl text-[#c8a96e] pb-4">
                :
              </span>

              {/* Hours */}
              <div className="flex flex-col items-center justify-center min-w-[60px]">
                <span className="font-display font-recursive-mono text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-medium text-white/80 mt-1 italic">
                  hours
                </span>
              </div>

              <span className="font-display font-recursive-mono text-2xl sm:text-4xl text-[#c8a96e] pb-4">
                :
              </span>

              {/* Minutes */}
              <div className="flex flex-col items-center justify-center min-w-[60px]">
                <span className="font-display font-recursive-mono text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-medium text-white/80 mt-1 italic">
                  minutes
                </span>
              </div>

              <span className="font-display font-recursive-mono text-2xl sm:text-4xl text-[#c8a96e] pb-4">
                :
              </span>

              {/* Seconds */}
              <div className="flex flex-col items-center justify-center min-w-[60px]">
                <span className="font-display font-recursive-mono text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#00ff88]">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-xs sm:text-sm md:text-base font-medium text-white/80 mt-1 italic">
                  seconds
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
