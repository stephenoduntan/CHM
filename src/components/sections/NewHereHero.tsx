"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function NewHereHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlayAudio = () => {
    if (!videoRef.current) return;

    // If currently muted, unmute and ensure playing
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().catch(() => {});
      setIsPlaying(false);
    } else {
      // If already unmuted, toggle pause/play
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMuteOnly = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(false);
    }
  };

  return (
    <section
      className="relative w-full h-[720px] bg-black text-white flex flex-col justify-end overflow-hidden select-none"
      data-node-id="2086:330"
      data-name="hero"
    >
      {/* ─── Background Video Layer (replaces static picture) ─────────── */}
      <video
        ref={videoRef}
        src="/videos/choose life action.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 size-full object-cover object-center"
      />

      {/* ─── Cinematic Dark Overlay (Figma Frame 7 Gradient) ─────────── */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/35 pointer-events-none"
        data-node-id="2086:318"
      />

      {/* ─── Centered Play Button (Figma fluent:play-circle-hint) ──────── */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center cursor-pointer group"
        onClick={togglePlayAudio}
        data-node-id="2091:3426"
        data-name="fluent:play-circle-hint-20-regular"
        aria-label={isMuted ? "Play video with audio" : isPlaying ? "Pause video" : "Resume video"}
      >
        <div className="relative size-[96px] sm:size-[112px] lg:size-[124px] transition-all duration-300 group-hover:scale-110 active:scale-95 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
          <Image
            src="/images/icons/play-circle-hint.svg"
            alt="Play Video"
            fill
            className={`object-contain transition-opacity duration-300 ${
              !isMuted && isPlaying ? "opacity-75" : "opacity-100"
            }`}
          />
        </div>

        {/* Dynamic status pill below the icon */}
        <div className="mt-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold tracking-wider uppercase transition-opacity duration-300 group-hover:bg-[#f0a505] group-hover:text-black group-hover:border-[#f0a505]">
          {isMuted ? "Tap for sound" : isPlaying ? "Playing with sound" : "Paused"}
        </div>
      </div>

      {/* ─── Bottom-Right Quick Audio Toggle ──────────────────────────── */}
      <button
        onClick={toggleMuteOnly}
        className="absolute bottom-6 right-6 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all shadow-md active:scale-95 flex items-center gap-1.5"
        title={isMuted ? "Unmute audio" : "Mute audio"}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted ? (
          <>
            <VolumeX className="size-4 text-white/80" />
            <span className="text-[11px] font-medium pr-1 text-white/80 hidden sm:inline">Muted</span>
          </>
        ) : (
          <>
            <Volume2 className="size-4 text-[#f0a505] animate-pulse" />
            <span className="text-[11px] font-bold pr-1 text-[#f0a505] hidden sm:inline">Audio On</span>
          </>
        )}
      </button>

      {/* ─── Bottom Left Headline Block (Figma Frame 5 / Frame 22) ────── */}
      <Container className="relative z-10 w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div
          className="pb-10 sm:pb-14 lg:pb-[64px] max-w-[706px]"
          data-node-id="2086:331"
          data-name="Frame 5"
        >
          <div data-node-id="2086:332" data-name="Frame 22">
            <h1
              className="font-sans font-bold text-2xl sm:text-3xl md:text-[32px] text-[#f5f5f5] uppercase tracking-wide leading-[1.25] text-left"
              data-node-id="2086:333"
              data-name="Know God, Find Freedom, Discover Purpose, Make a Difference"
            >
              <span className="block">Know God, Find Freedom,</span>
              <span className="block">Discover Purpose, Make a Difference</span>
            </h1>
          </div>
        </div>
      </Container>
    </section>
  );
}
