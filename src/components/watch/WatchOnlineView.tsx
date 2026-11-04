"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Heart,
  FileText,
  Download,
  Copy,
  Check,
  X,
  Trash2,
  ExternalLink,
  ArrowRight,
  Radio,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GiveModal } from "@/components/give/GiveModal";

const LOCAL_STORAGE_KEY = "chm_sermon_notepad_v1";

export function WatchOnlineView() {
  const [isLive, setIsLive] = useState(true);
  const [isGiveModalOpen, setIsGiveModalOpen] = useState(false);
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);

  // Notepad states
  const [noteTitle, setNoteTitle] = useState("Sunday Celebration Service");
  const [noteSpeaker, setNoteSpeaker] = useState("Pastor Fred Odekhian");
  const [noteDate, setNoteDate] = useState("");
  const [notePassage, setNotePassage] = useState("1 Corinthians 2:4");
  const [noteBody, setNoteBody] = useState("");
  const [isSaved, setIsSaved] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Default YouTube livestream ID (CHM stream fallback)
  const youtubeId = "vBvP_h0k_X8";

  // Initialize date & restore notes on mount
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
      // ignore storage error
    }
  }, []);

  // Auto-save notes
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

  // Insert tag helper
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
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + addition.length, start + addition.length);
    }, 10);
  };

  // Download note as .txt
  const handleDownloadNotes = () => {
    const divider = "============================================================";
    const content = [
      divider,
      "RCCG COURT OF HIS MAJESTY — SERMON NOTES",
      divider,
      `Sermon / Theme : ${noteTitle}`,
      `Preacher       : ${noteSpeaker}`,
      `Date           : ${noteDate}`,
      `Scripture      : ${notePassage || "Not specified"}`,
      "------------------------------------------------------------",
      "NOTES & REVELATIONS:",
      "",
      noteBody || "(No notes taken)",
      "",
      "------------------------------------------------------------",
      "RCCG Court of His Majesty (Lagos Province 94 HQ)",
      "163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      "https://courtofhismajesty.org",
      divider,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeTitle = noteTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30);
    link.href = url;
    link.download = `CHM_Notes_${safeTitle || "sermon"}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyNotes = () => {
    const content = `RCCG Court of His Majesty — Sermon Notes\nTheme: ${noteTitle}\nPreacher: ${noteSpeaker}\nDate: ${noteDate}\nScripture: ${notePassage}\n\n${noteBody}`;
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleClearNotes = () => {
    if (window.confirm("Are you sure you want to clear your current notes?")) {
      setNoteBody("");
      setNotePassage("");
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  return (
    <div className="w-full text-white min-h-screen flex flex-col justify-between">
      {/* ─── Top Header & Controls ─────────────────────────────────── */}
      <section className="w-full pt-[64px] sm:pt-36 pb-6">
        <Container className="max-w-[1440px]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-center gap-6 pb-2">
            {/* Left: Indicator & Title */}
            <div className="space-y-3 text-center">
              {/* Live / Recent Broadcast Indicator */}
              {/* <div className="inline-flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsLive((prev) => !prev)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isLive
                      ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
                      : "bg-white/15 text-gray-300 hover:bg-white/20"
                  }`}
                  title="Click to toggle Live / Recent indicator"
                >
                  <span className={`size-2 rounded-full ${isLive ? "bg-white animate-ping" : "bg-gray-400"}`} />
                  <span className={`size-2 rounded-full ${isLive ? "bg-white -ml-4" : "hidden"}`} />
                  <span>{isLive ? "● LIVE" : "RECENT BROADCAST"}</span>
                </button>
                <span className="text-xs text-gray-400">
                  {isLive ? "Streaming Now" : "Last Livestream Available"}
                </span>
              </div> */}

              {/* Title */}
              <h1 className="font-display font-recursive-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0a0a0a] tracking-tight leading-tight">
                Watch Online &amp; Experience God&apos;s Presence
              </h1>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── YouTube Player (Full Viewport Width) ───────────────────── */}
      <section className="w-full relative">
        <Container className="max-w-[1440px] px-4 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-10">
          <div className="w-full aspect-video max-h-[85vh] rounded-xl relative overflow-hidden bg-black shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1`}
              title="Watch Online & Experience God's Presence — RCCG Court of His Majesty"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </Container>
      </section>

      <section className="w-full py-4 sm:py-6 lg:py-8">
        {/* Right: Give Online & Sermon Notepad Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0 justify-center">
          {/* Give Online Button */}
          <button
            type="button"
            onClick={() => setIsGiveModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f0a505] hover:bg-[#d99504] text-[#051202] font-semibold text-sm sm:text-base transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Heart className="size-4 fill-current" />
            <span>Give Online</span>
          </button>

          {/* Sermon Notepad Button */}
          <button
            type="button"
            onClick={() => setIsNotepadOpen((prev) => !prev)}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-semibold border transition-all active:scale-95 cursor-pointer ${
              isNotepadOpen
                ? "bg-white text-[#051202] border-white shadow-lg"
                : "bg-[#b2a1ed]/10 hover:bg-[#b2a1ed] text-[#180c62] border-[#b2a1ed]"
            }`}
          >
            <FileText className="size-4" />
            <span>{isNotepadOpen ? "Hide Notepad" : "Sermon Notepad"}</span>
          </button>
        </div>
      </section>

      {/* ─── CTA: Watch More on Our YouTube Channel (Light Grey BG) ─── */}
      <section className="w-full text-[#0a0a0a] py-14 sm:py-18 lg:py-20">
        <Container className="max-w-[1440px]">
          <div className="flex flex-col bg-[#f2f2f2] rounded-[24px] p-8 sm:p-12 lg:p-16 border border-[#e5e5e5] relative overflow-hidden items-center justify-center gap-8 shadow-xs">
            {/* YouTube Red Icon Pill */}
            <div className="size-14 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/20">
              <Image
                src="/images/youtube.svg"
                alt="YouTube"
                width={28}
                height={28}
                className="size-7 invert"
              />
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-recursive-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0a0a0a] tracking-tight">
                Watch More on Our YouTube Channel
              </h2>
              <p className="font-sans text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
                Subscribe to our YouTube channel for weekly Sunday livestreams, midweek power messages, worship sessions, and past sermon archives.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="https://youtube.com/@rccgchm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-sans font-semibold text-sm sm:text-base transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Image
                  src="/images/youtube.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="size-5 invert"
                />
                <span>Watch more on our YouTube channel</span>
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Sermon Notepad Modal (NO Background, Bottom Right) ─────── */}
      {isNotepadOpen && (
        <aside
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] max-h-[82vh] bg-white text-[#1a1a1a] rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
          role="complementary"
          aria-label="Sermon Notepad"
        >
          {/* Notepad Header */}
          <div className="bg-[#051202] text-white px-5 py-3.5 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <FileText className="size-4 text-[#c8a96e]" />
              <div>
                <h3 className="font-display font-recursive-sans font-bold text-sm text-white">
                  Sermon Notepad
                </h3>
                <p className="text-[10px] text-gray-300">
                  {isSaved ? "✓ Auto-saved locally" : "Saving..."}
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleCopyNotes}
                className="p-1.5 rounded-md hover:bg-white/10 text-white transition-colors cursor-pointer"
                title="Copy notes"
              >
                {isCopied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
              </button>
              <button
                type="button"
                onClick={handleClearNotes}
                className="p-1.5 rounded-md hover:bg-red-500/30 text-white transition-colors cursor-pointer"
                title="Clear notes"
              >
                <Trash2 className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsNotepadOpen(false)}
                className="p-1.5 rounded-md hover:bg-white/10 text-white transition-colors cursor-pointer"
                title="Close notepad"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Metadata Inputs */}
          <div className="p-3.5 bg-gray-50 border-b border-gray-200 space-y-2 shrink-0">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-0.5">
                Theme / Title
              </label>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => {
                  setNoteTitle(e.target.value);
                  setIsSaved(false);
                }}
                className="w-full text-xs font-semibold text-[#0a0a0a] bg-white border border-gray-300 rounded-md px-2.5 py-1.5 outline-none focus:border-[#180c62]"
                placeholder="Message Title"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-0.5">
                  Preacher
                </label>
                <input
                  type="text"
                  value={noteSpeaker}
                  onChange={(e) => {
                    setNoteSpeaker(e.target.value);
                    setIsSaved(false);
                  }}
                  className="w-full text-xs text-[#0a0a0a] bg-white border border-gray-300 rounded-md px-2 py-1 outline-none focus:border-[#180c62]"
                  placeholder="Speaker name"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-0.5">
                  Scripture
                </label>
                <input
                  type="text"
                  value={notePassage}
                  onChange={(e) => {
                    setNotePassage(e.target.value);
                    setIsSaved(false);
                  }}
                  className="w-full text-xs text-[#0a0a0a] bg-white border border-gray-300 rounded-md px-2 py-1 outline-none focus:border-[#180c62]"
                  placeholder="e.g. 1 Cor 2:4"
                />
              </div>
            </div>

            {/* Quick Tag Pills */}
            <div className="flex flex-wrap gap-1 pt-0.5">
              <button
                type="button"
                onClick={() => insertTag("📖 Scripture:")}
                className="text-[11px] px-2 py-0.5 rounded bg-white hover:bg-gray-200 border border-gray-200 text-gray-700 font-medium cursor-pointer"
              >
                📖 Scripture
              </button>
              <button
                type="button"
                onClick={() => insertTag("⭐ Key Point:")}
                className="text-[11px] px-2 py-0.5 rounded bg-white hover:bg-gray-200 border border-gray-200 text-gray-700 font-medium cursor-pointer"
              >
                ⭐ Key Point
              </button>
              <button
                type="button"
                onClick={() => insertTag("🙏 Prayer Point:")}
                className="text-[11px] px-2 py-0.5 rounded bg-white hover:bg-gray-200 border border-gray-200 text-gray-700 font-medium cursor-pointer"
              >
                🙏 Prayer
              </button>
              <button
                type="button"
                onClick={() => {
                  const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                  insertTag(`⏱️ [${timeStr}]`);
                }}
                className="text-[11px] px-2 py-0.5 rounded bg-white hover:bg-gray-200 border border-gray-200 text-gray-700 font-medium cursor-pointer"
              >
                ⏱️ Timestamp
              </button>
            </div>
          </div>

          {/* Textarea */}
          <div className="p-3.5 flex-1 flex flex-col min-h-[180px]">
            <textarea
              ref={textareaRef}
              value={noteBody}
              onChange={(e) => {
                setNoteBody(e.target.value);
                setIsSaved(false);
              }}
              placeholder="Type your sermon notes and revelations here..."
              rows={8}
              className="w-full flex-1 text-xs sm:text-sm text-[#1a1a1a] leading-relaxed p-2.5 rounded-lg border border-gray-200 focus:border-[#180c62] outline-none resize-none bg-white"
            />

            {/* Download Button */}
            <div className="pt-2.5">
              <button
                type="button"
                onClick={handleDownloadNotes}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#180c62] hover:bg-[#251394] text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-98"
              >
                <Download className="size-3.5" />
                <span>Download Notes (.txt)</span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* ─── Give Online Modal ─────────────────────────────────────── */}
      <GiveModal
        isOpen={isGiveModalOpen}
        onClose={() => setIsGiveModalOpen(false)}
        defaultTab="online"
      />
    </div>
  );
}
