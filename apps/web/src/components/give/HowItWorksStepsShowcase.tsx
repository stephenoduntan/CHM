"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export interface StepItem {
  id: string;
  title: string;
  description: string;
  image: string;
  barHeightDesktop: string;
  hasButton?: boolean;
}

const STEPS: StepItem[] = [
  {
    id: "online",
    title: "Give Online",
    description:
      "Giving digitally is easy and quick. Click the button to give at any time, to any ministry associated with CHM",
    image: "/images/give/step-give-online.png",
    barHeightDesktop: "216px",
    hasButton: true,
  },
  {
    id: "in-person",
    title: "Give In Person",
    description: "You can give in person at any one of our services",
    image: "/images/give/step-give-in-person.png",
    barHeightDesktop: "87px",
    hasButton: false,
  },
  {
    id: "cheque",
    title: "Mail A Cheque",
    description:
      "Checks can be written for RCCG Court of His Majesty, Lagos Nigeria, given during any of our services or sent to RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
    image: "/images/give/step-mail-cheque.png",
    barHeightDesktop: "145px",
    hasButton: false,
  },
];

export interface HowItWorksStepsShowcaseProps {
  onOpenGiveModal: () => void;
  stepDurationMs?: number;
}

export function HowItWorksStepsShowcase({
  onOpenGiveModal,
  stepDurationMs = 5000,
}: HowItWorksStepsShowcaseProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  // Real-time animation loop for the filling progress bar & step switching
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 25; // 25ms tick for ultra smooth ~40fps animation
    const stepIncrement = (intervalTime / stepDurationMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + stepIncrement >= 100) {
          setActiveStep((curr) => (curr + 1) % STEPS.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeStep, isPaused, stepDurationMs]);

  // Handle manual selection
  const handleSelectStep = (index: number) => {
    if (index === activeStep) return;
    setActiveStep(index);
    setProgress(0);
  };

  return (
    <div
      className="flex flex-col lg:flex-row gap-10 lg:gap-[64px] items-center w-full"
      data-node-id="2111:12074"
      data-name="how it works steps"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ─── Left Column: Step Imagery (Cross-fading) ────────────────── */}
      <div
        className="w-full lg:w-[581px] shrink-0 flex justify-center"
        data-node-id="2111:11916"
      >
        <div
          className="relative w-full h-[380px] sm:h-[500px] lg:h-[671px] rounded-[20px] overflow-hidden shadow-2xl bg-[#0a0a0a]"
          data-node-id="2111:11917"
          data-name="step images"
        >
          {STEPS.map((step, idx) => (
            <div
              key={step.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                activeStep === idx
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-[1.03] z-0 pointer-events-none"
              }`}
            >
              <Image
                src={step.image}
                alt={step.title}
                fill
                sizes="(max-width: 1024px) 100vw, 581px"
                className="object-cover rounded-[20px]"
                priority={idx === 0}
              />
            </div>
          ))}

          {/* Subtle Step Indicator Badge on Mobile/Tablet */}
          <div className="absolute top-4 left-4 z-20 lg:hidden px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono font-medium border border-white/10">
            Step {activeStep + 1} of {STEPS.length}
          </div>
        </div>
      </div>

      {/* ─── Right Column: 3 Steps with Animated Progress Bars ────────── */}
      <div
        className="w-full lg:w-[795px] flex flex-col gap-8 sm:gap-10 lg:gap-[64px]"
        data-node-id="2111:11918"
      >
        {STEPS.map((step, idx) => {
          const isActive = activeStep === idx;

          return (
            <div
              key={step.id}
              onClick={() => handleSelectStep(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelectStep(idx);
                }
              }}
              tabIndex={0}
              role="button"
              aria-current={isActive ? "step" : undefined}
              aria-label={`Step ${idx + 1}: ${step.title}`}
              className={`flex gap-4 sm:gap-[16px] items-stretch cursor-pointer group w-full transition-all duration-300 outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-[#c8a96e] ${
                isActive ? "opacity-100" : "opacity-40 hover:opacity-75"
              }`}
            >
              {/* Vertical Progress Bar Column */}
              <div
                className="relative w-[3px] bg-[#e6e8eb] overflow-hidden rounded-full shrink-0 self-stretch my-1"
                style={{ minHeight: step.barHeightDesktop }}
                data-name="scroll-bar"
              >
                {/* Active Animated Red Progress Bar */}
                {isActive && (
                  <div
                    className="absolute top-0 left-0 w-full bg-[#d61812] rounded-full will-change-[height]"
                    style={{
                      height: `${progress}%`,
                      transition: "height 25ms linear",
                    }}
                    data-name="rule"
                  />
                )}
              </div>

              {/* Step Text & Controls */}
              <div className="flex-1 flex flex-col justify-center gap-4 sm:gap-6 py-1">
                <div className="flex flex-col gap-2.5 sm:gap-4 lg:gap-[24px] items-start w-full">
                  <h3
                    className={`font-display font-recursive-sans font-semibold text-2xl sm:text-[28px] tracking-tight transition-colors duration-300 ${
                      isActive ? "text-[#0a0a0a]" : "text-[#0a0a0a]/80 group-hover:text-[#0a0a0a]"
                    }`}
                    style={{ fontVariationSettings: '"CASL" 0, "CRSV" 0.5, "MONO" 0' }}
                  >
                    {step.title}
                  </h3>
                  <p className="font-sans font-normal text-base sm:text-lg lg:text-[24px] text-[#242424] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Step 1 CTA Button ("Click here to Give") */}
                {step.hasButton && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenGiveModal();
                      }}
                      className="bg-[#c88a04] hover:bg-[#b07903] text-white font-sans font-semibold text-base sm:text-[18px] px-8 sm:px-[40px] py-3.5 sm:py-[16px] rounded-[36px] transition-all cursor-pointer shadow-sm hover:shadow-md active:scale-95 shrink-0"
                    >
                      Click here to Give
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

