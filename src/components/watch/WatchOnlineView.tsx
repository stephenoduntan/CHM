"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Heart,
  Download,
  Copy,
  Check,
  Share2,
  Trash2,
  BookOpen,
  Calendar,
  Clock,
  Tv,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Radio,
  FileText,
  Volume2,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GiveModal } from "@/components/give/GiveModal";
import { SERMONS_DATA } from "@/lib/sermons-data";

export interface StreamItem {
  id: string;
  title: string;
  speaker: string;
  date: string;
  series: string;
  youtubeId: string;
  thumbnail: string;
  isLive?: boolean;
  passage?: string;
  description: string;
}

const BROADCAST_STREAMS: StreamItem[] = [
  {
    id: "live-sunday-service",
    title: "Sunday Celebration Service — Live Worship & Word",
    speaker: "Pastor Fred Odekhian",
    date: "November 2, 2026",
    series: "Sunday Celebration",
    youtubeId: "vBvP_h0k_X8",
    thumbnail: "/images/sermons/sermon-hero-video.png",
    isLive: true,
    passage: "1 Corinthians 2:4-5",
    description:
      "Join us live from the Court of His Majesty sanctuary as we worship together in Spirit and in truth. Expect a transformative encounter with God through praise, worship, and the unadulterated Word.",
  },
  {
    id: "festival-of-destiny",
    title: "Festival of Destiny: Alignment Precedes Acceleration",
    speaker: "Pastor Fred Odekhian",
    date: "October 24, 2026",
    series: "Festival of Destiny Series",
    youtubeId: "vBvP_h0k_X8",
    thumbnail: "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?auto=format&fit=crop&q=80&w=1200",
    passage: "Joshua 3:5; 1 Corinthians 2:4",
    description:
      "A profound teaching on divine order and supernatural speed. Learn how aligning your heart, prayer life, and obedience unleashes God's acceleration.",
  },
  {
    id: "walking-in-destiny",
    title: "Walking in Divine Destiny",
    speaker: "Pastor Fred Odekhian",
    date: "October 17, 2026",
    series: "Destiny Series",
    youtubeId: "vBvP_h0k_X8",
    thumbnail: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=1200",
    passage: "Jeremiah 29:11",
    description:
      "Discover God's sovereign blueprint for your journey. Steps to discerning His voice and stepping into your predestined victory.",
  },
  {
    id: "midweek-service",
    title: "Midweek Communion & Prayer Service: Faith That Moves Mountains",
    speaker: "Pastor Fred Odekhian",
    date: "October 14, 2026",
    series: "Victorious Faith",
    youtubeId: "vBvP_h0k_X8",
    thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1200",
    passage: "Mark 11:23-24",
    description:
      "Enforce God's Word over every contrary situation. Unshakable faith removes mountains and establishes His victory.",
  },
];

const LOCAL_STORAGE_KEY = "chm_watch_notes_v1";

export function WatchOnlineView() {
  const [activeStream, setActiveStream] = useState<StreamItem>(BROADCAST_STREAMS[0]);
  const [isGiveModalOpen, setIsGiveModalOpen] = useState(false);
  const [giveModalTab, setGiveModalTab] = useState<"online" | "bank">("online");

  // Notepad states
  const [noteTitle, setNoteTitle] = useState(BROADCAST_STREAMS[0].title);
  const [noteSpeaker, setNoteSpeaker] = useState(BROADCAST_STREAMS[0].speaker);
  const [noteDate, setNoteDate] = useState("");
  const [notePassage, setNotePassage] = useState(BROADCAST_STREAMS[0].passage || "");
  const [noteBody, setNoteBody] = useState("");
  const [isSaved, setIsSaved] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize date & restore notes from localStorage on mount
  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setNoteDate(today);

    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.noteBody) setNoteBody(parsed.noteBody);
        if (parsed.noteTitle) setNoteTitle(parsed.noteTitle);
        if (parsed.noteSpeaker) setNoteSpeaker(parsed.noteSpeaker);
        if (parsed.notePassage) setNotePassage(parsed.notePassage);
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  // Save notes to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          noteTitle,
          noteSpeaker,
          noteDate,
          notePassage,
          noteBody,
          updatedAt: new Date().toISOString(),
        })
      );
      setIsSaved(true);
    } catch {
      // ignore storage error
    }
  }, [noteTitle, noteSpeaker, noteDate, notePassage, noteBody]);

  // When switching streams, update default note fields if user hasn't typed extensively
  const handleSelectStream = (stream: StreamItem) => {
    setActiveStream(stream);
    if (!noteBody.trim()) {
      setNoteTitle(stream.title);
      setNoteSpeaker(stream.speaker);
      if (stream.passage) setNotePassage(stream.passage);
    }
  };

  // Quick insert tags into note
  const insertTag = (tag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setNoteBody((prev) => (prev ? `${prev}\n${tag} ` : `${tag} `));
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = textarea.value;
    const addition = `\n${tag} `;
    const updated = current.substring(0, start) + addition + current.substring(end);

    setNoteBody(updated);
    setIsSaved(false);

    // Re-focus after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + addition.length, start + addition.length);
    }, 10);
  };

  // Download Note as .txt file
  const handleDownloadNotes = () => {
    const divider = "============================================================";
    const subDivider = "------------------------------------------------------------";

    const content = [
      divider,
      "RCCG COURT OF HIS MAJESTY — ONLINE SERMON NOTES",
      divider,
      `Sermon / Theme : ${noteTitle}`,
      `Preacher       : ${noteSpeaker}`,
      `Date           : ${noteDate}`,
      `Scripture      : ${notePassage || "Not specified"}`,
      subDivider,
      "NOTES & REVELATIONS:",
      "",
      noteBody || "(No notes taken)",
      "",
      subDivider,
      "RCCG Court of His Majesty",
      "163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      "Website : https://courtofhismajesty.org",
      "YouTube : https://youtube.com/@courtofhismajesty",
      divider,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeTitle = noteTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 30);
    link.href = url;
    link.download = `CHM_Sermon_Notes_${safeTitle || "watch"}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy notes to clipboard
  const handleCopyNotes = () => {
    const content = `RCCG Court of His Majesty — Sermon Notes\nTitle: ${noteTitle}\nPreacher: ${noteSpeaker}\nDate: ${noteDate}\nScripture: ${notePassage}\n\nNotes:\n${noteBody}`;
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Clear notes with confirmation
  const handleClearNotes = () => {
    if (window.confirm("Are you sure you want to clear your current notes?")) {
      setNoteBody("");
      setNotePassage("");
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  // Share stream
  const handleShare = () => {
    const shareData = {
      title: activeStream.title,
      text: `Join me live worshipping at RCCG Court of His Majesty: "${activeStream.title}"`,
      url: typeof window !== "undefined" ? window.location.href : "https://courtofhismajesty.org/watch-online",
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareData.url);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2500);
    }
  };

  const openGiveModal = (tab: "online" | "bank") => {
    setGiveModalTab(tab);
    setIsGiveModalOpen(true);
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen text-[#1a1a1a]">
      {/* ─── Hero / Header Banner ──────────────────────────────────── */}
      <section className="relative w-full bg-[#051202] text-white pt-36 pb-12 sm:pb-16 overflow-hidden border-b border-white/10">
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?auto=format&fit=crop&q=80&w=1920"
            alt="Watch Online"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051202] via-[#051202]/85 to-transparent" />
        </div>

        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              {/* Live Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/90 text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-red-900/30">
                <span className="size-2 rounded-full bg-white animate-ping" />
                <span className="size-2 rounded-full bg-white -ml-3" />
                <span>{activeStream.isLive ? "Live Broadcast" : "Recent Broadcast"}</span>
              </div>

              <h1 className="font-display font-recursive-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                Watch Online & Experience God&apos;s Presence
              </h1>
              <p className="font-sans text-base sm:text-lg text-gray-300 max-w-2xl mt-3 leading-relaxed">
                Connect with the Court of His Majesty family from anywhere across the globe. Worship, receive God&apos;s Word, take personal notes, and sow into Kingdom advancement.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => openGiveModal("online")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c8a96e] hover:bg-[#d8b97e] text-[#051202] font-semibold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Heart className="size-4 fill-current" />
                <span>Give Online</span>
              </button>

              <a
                href="https://youtube.com/@courtofhismajesty"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all cursor-pointer"
              >
                <Image
                  src="/images/youtube.svg"
                  alt="YouTube"
                  width={18}
                  height={18}
                  className="size-4 invert"
                />
                <span>Our Channel</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Main Content: 2-Column Split (Player + Notepad) ──────── */}
      <section className="py-8 sm:py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* ─── Left Column (8 cols): Video Player & Details ─── */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
              {/* YouTube Player Container */}
              <div className="relative w-full aspect-video rounded-[24px] overflow-hidden bg-black shadow-2xl border border-gray-200">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeStream.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
                  title={activeStream.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 size-full border-0"
                />
              </div>

              {/* Broadcast Info & Utility Controls */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-gray-200 flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-gray-100">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#180c62] uppercase tracking-wider">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#180c62]/10">
                        {activeStream.series}
                      </span>
                      <span>•</span>
                      <span className="text-gray-500">{activeStream.date}</span>
                    </div>
                    <h2 className="font-display font-recursive-sans font-bold text-2xl sm:text-3xl text-[#0a0a0a] leading-snug">
                      {activeStream.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 font-medium">
                      Minister: <span className="text-[#051202] font-semibold">{activeStream.speaker}</span>
                    </p>
                  </div>

                  {/* Share & Open on YouTube */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleShare}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
                      title="Share broadcast"
                    >
                      {isShared ? (
                        <>
                          <Check className="size-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Link Copied</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="size-3.5" />
                          <span>Share</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`https://www.youtube.com/watch?v=${activeStream.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-700 border border-red-200 transition-colors"
                      title="Watch directly on YouTube"
                    >
                      <ExternalLink className="size-3.5" />
                      <span>YouTube</span>
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {activeStream.description}
                </p>

                {/* Service Schedule Banner */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#051202] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-xl bg-white/10 flex items-center justify-center text-[#c8a96e] shrink-0">
                      <Radio className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#c8a96e] font-semibold">
                        Broadcasting Schedule
                      </p>
                      <p className="text-sm font-medium text-gray-200 mt-0.5">
                        Sundays: 7:45 AM & 10:15 AM (WAT) • Tuesdays: 6:00 PM (WAT)
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openGiveModal("online")}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#c8a96e] hover:bg-[#d8b97e] text-[#051202] font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 shadow-sm"
                  >
                    <Heart className="size-4 fill-current" />
                    <span>Sow Seed / Give</span>
                  </button>
                </div>
              </div>

              {/* ─── Stream Selector: Recent Livestreams & Broadcasts ─── */}
              <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Tv className="size-5 text-[#180c62]" />
                    <h3 className="font-display font-recursive-sans font-bold text-lg sm:text-xl text-[#0a0a0a]">
                      Select Broadcast / Recent Streams
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {BROADCAST_STREAMS.length} Available
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BROADCAST_STREAMS.map((stream) => {
                    const isSelected = activeStream.id === stream.id;
                    return (
                      <button
                        key={stream.id}
                        type="button"
                        onClick={() => handleSelectStream(stream)}
                        className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 group ${
                          isSelected
                            ? "bg-[#180c62]/5 border-[#180c62] shadow-sm ring-1 ring-[#180c62]/20"
                            : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100/70"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 w-full">
                          <span
                            className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                              stream.isLive
                                ? "bg-red-600 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {stream.isLive ? "● Live Stream" : "Replay"}
                          </span>
                          {isSelected && (
                            <span className="text-xs font-semibold text-[#180c62] flex items-center gap-1">
                              <Volume2 className="size-3.5 animate-pulse" /> Playing
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="font-display font-recursive-sans font-semibold text-sm sm:text-base text-[#0a0a0a] line-clamp-2 group-hover:text-[#180c62] transition-colors">
                            {stream.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {stream.speaker} • {stream.date}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ─── Online Giving Card Component ─── */}
              <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-br from-[#180c62] to-[#0c0f24] text-white p-6 sm:p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F9BAB8] text-xs font-semibold uppercase tracking-wider">
                      <Heart className="size-3.5 fill-current" />
                      <span>Kingdom Giving</span>
                    </div>
                    <h3 className="font-display font-recursive-sans font-bold text-2xl sm:text-3xl text-white">
                      Worship Through Giving
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      &ldquo;Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.&rdquo; — 2 Corinthians 9:7
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => openGiveModal("online")}
                      className="px-6 py-3 rounded-full bg-[#c8a96e] hover:bg-[#d8b97e] text-[#051202] font-semibold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Give Online Now
                    </button>
                    <button
                      type="button"
                      onClick={() => openGiveModal("bank")}
                      className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all cursor-pointer"
                    >
                      Bank Transfer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Right Column (4 cols / Sticky): Sermon Notepad ─── */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-28">
              <div className="bg-white rounded-[24px] shadow-lg border border-gray-200 overflow-hidden flex flex-col">
                {/* Notepad Header */}
                <div className="bg-[#051202] text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <FileText className="size-5 text-[#c8a96e]" />
                    <div>
                      <h3 className="font-display font-recursive-sans font-bold text-base sm:text-lg text-white">
                        Sermon Notepad
                      </h3>
                      <p className="text-[11px] text-gray-300">
                        {isSaved ? "✓ Auto-saved locally" : "Saving..."}
                      </p>
                    </div>
                  </div>

                  {/* Actions: Copy & Clear */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleCopyNotes}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title="Copy notes to clipboard"
                    >
                      {isCopied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={handleClearNotes}
                      className="p-2 rounded-lg bg-white/10 hover:bg-red-500/30 text-white transition-colors cursor-pointer"
                      title="Clear notes"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Notepad Metadata Inputs */}
                <div className="p-4 sm:p-5 bg-gray-50 border-b border-gray-200 space-y-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                      Sermon Theme / Title
                    </label>
                    <input
                      type="text"
                      value={noteTitle}
                      onChange={(e) => {
                        setNoteTitle(e.target.value);
                        setIsSaved(false);
                      }}
                      placeholder="Title of message"
                      className="w-full text-sm font-semibold text-[#0a0a0a] bg-white border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-[#180c62] shadow-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                        Preacher
                      </label>
                      <input
                        type="text"
                        value={noteSpeaker}
                        onChange={(e) => {
                          setNoteSpeaker(e.target.value);
                          setIsSaved(false);
                        }}
                        placeholder="Speaker name"
                        className="w-full text-xs sm:text-sm text-[#0a0a0a] bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#180c62] shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                        Scripture
                      </label>
                      <input
                        type="text"
                        value={notePassage}
                        onChange={(e) => {
                          setNotePassage(e.target.value);
                          setIsSaved(false);
                        }}
                        placeholder="e.g. 1 Cor 2:4"
                        className="w-full text-xs sm:text-sm text-[#0a0a0a] bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 outline-none focus:border-[#180c62] shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Quick-insert Tag Pills */}
                  <div className="pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                      Quick Tags (Click to insert)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => insertTag("📖 Scripture:")}
                        className="text-xs px-2.5 py-1 rounded-md bg-white hover:bg-gray-200 border border-gray-200 text-gray-700 font-medium transition-colors cursor-pointer"
                      >
                        📖 Scripture
                      </button>
                      <button
                        type="button"
                        onClick={() => insertTag("⭐ Key Point:")}
                        className="text-xs px-2.5 py-1 rounded-md bg-white hover:bg-gray-200 border border-gray-200 text-gray-700 font-medium transition-colors cursor-pointer"
                      >
                        ⭐ Key Point
                      </button>
                      <button
                        type="button"
                        onClick={() => insertTag("🙏 Prayer Point:")}
                        className="text-xs px-2.5 py-1 rounded-md bg-white hover:bg-gray-200 border border-gray-200 text-gray-700 font-medium transition-colors cursor-pointer"
                      >
                        🙏 Prayer Point
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                          insertTag(`⏱️ [${timeStr}]`);
                        }}
                        className="text-xs px-2.5 py-1 rounded-md bg-white hover:bg-gray-200 border border-gray-200 text-gray-700 font-medium transition-colors cursor-pointer"
                      >
                        ⏱️ Timestamp
                      </button>
                    </div>
                  </div>
                </div>

                {/* Textarea */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <textarea
                    ref={textareaRef}
                    value={noteBody}
                    onChange={(e) => {
                      setNoteBody(e.target.value);
                      setIsSaved(false);
                    }}
                    placeholder="Write your sermon insights, revelations, and prayer notes here..."
                    rows={12}
                    className="w-full text-sm sm:text-base text-[#1a1a1a] leading-relaxed p-3 rounded-xl border border-gray-200 focus:border-[#180c62] focus:ring-2 focus:ring-[#180c62]/10 outline-none resize-none font-sans bg-white shadow-inner"
                  />

                  {/* Bottom Download CTA */}
                  <div className="pt-4 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadNotes}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#180c62] hover:bg-[#251394] text-white text-sm font-semibold transition-all shadow-md active:scale-98 cursor-pointer"
                    >
                      <Download className="size-4" />
                      <span>Download Notes (.txt)</span>
                    </button>
                    <p className="text-[11px] text-center text-gray-400">
                      Notes are stored in your browser and will remain here when you return.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Explore More Sermons Catalog ──────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white border-t border-gray-200">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#180c62] block mb-1">
                From Our Archive
              </span>
              <h2 className="font-display font-recursive-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0a0a0a]">
                More Sermons & Messages
              </h2>
            </div>

            <Link
              href="/sermons"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#180c62] hover:underline"
            >
              <span>Explore all sermons</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERMONS_DATA.slice(0, 3).map((sermon) => (
              <Link
                key={sermon.id}
                href={`/sermons/${sermon.id}`}
                className="group border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-[#180c62]/40 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                  <Image
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 text-white text-xs backdrop-blur-sm">
                    <Play className="size-3 fill-current" />
                    <span>{sermon.duration}</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <span className="text-xs font-semibold text-[#c8a96e] uppercase tracking-wider block mb-1">
                      {sermon.date}
                    </span>
                    <h3 className="font-display font-recursive-sans font-semibold text-lg text-[#0a0a0a] group-hover:text-[#180c62] transition-colors line-clamp-2">
                      {sermon.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{sermon.speaker}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#180c62] group-hover:underline inline-flex items-center gap-1 pt-2">
                    Watch Message →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CTA: "Watch more on our channel" ──────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#051202] text-white relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=1920"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
            <div className="size-16 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-900/40">
              <Image
                src="/images/youtube.svg"
                alt="YouTube"
                width={32}
                height={32}
                className="size-8 invert"
              />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#c8a96e]">
                Court of His Majesty Official YouTube Channel
              </span>
              <h2 className="font-display font-recursive-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
                Watch More on Our Channel
              </h2>
              <p className="font-sans text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Subscribe to our YouTube channel for weekly Sunday livestreams, midweek power messages, Festival of Destiny broadcasts, youth summits, and uplifting choir ministrations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a
                href="https://youtube.com/@courtofhismajesty"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-sans font-bold text-base transition-all shadow-xl hover:shadow-red-600/30 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Image
                  src="/images/youtube.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="size-5 invert"
                />
                <span>Watch More on Our Channel</span>
                <ArrowRight className="size-4" />
              </a>

              <button
                type="button"
                onClick={() => openGiveModal("online")}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition-all cursor-pointer"
              >
                <Heart className="size-4 fill-current text-[#F9BAB8]" />
                <span>Partner with Us</span>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Give Online Modal ─────────────────────────────────────── */}
      <GiveModal
        isOpen={isGiveModalOpen}
        onClose={() => setIsGiveModalOpen(false)}
        defaultTab={giveModalTab}
      />
    </div>
  );
}

