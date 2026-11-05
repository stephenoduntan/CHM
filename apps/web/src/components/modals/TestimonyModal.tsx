"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { COUNTRIES_LIST } from "@/lib/constants";

export interface TestimonyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TestimonyModal({ isOpen, onClose }: TestimonyModalProps) {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("Prefer not to say");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [testimony, setTestimony] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Manage body scroll lock and escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setErrorMessage("");
    }, 300);
  };

  const resetForm = () => {
    setFullName("");
    setGender("Prefer not to say");
    setEmail("");
    setPhoneNumber("");
    setCountry("Nigeria");
    setTestimony("");
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "testimony",
          fullName,
          gender,
          email,
          phoneNumber,
          country,
          testimony,
          source: "Watch Online",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit testimony. Please try again.");
      }

      setIsSuccess(true);
      resetForm();
    } catch (err: any) {
      setErrorMessage(
        err.message || "An unexpected error occurred. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="testimony-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      {/* Click-outside backdrop */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="flex items-start justify-between px-5 sm:px-8 pt-6 pb-4 border-b border-gray-100 bg-linear-to-r from-amber-50/50 via-white to-purple-50/30">
          <div className="pr-4 space-y-1">
            {/* <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="size-3 text-amber-600" />
              <span>Praise Report</span>
            </div> */}
            <h2
              id="testimony-modal-title"
              className="font-display font-recursive-sans font-bold text-lg sm:text-xl text-[#0a0a0a] leading-snug tracking-tight"
            >
              Testify the goodness of God
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 italic">
              &ldquo;And they overcame him by the blood of the Lamb, and by the word of their testimony...&rdquo; Revelation 12:11.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="size-8 sm:size-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer shrink-0 mt-0.5"
            aria-label="Close modal"
          >
            <X className="size-4 sm:size-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5">
          {isSuccess ? (
            <div className="py-8 sm:py-12 flex flex-col items-center text-center">
              <div className="size-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4 shadow-inner">
                <CheckCircle2 className="size-9" />
              </div>
              <h3 className="font-display font-bold text-2xl text-[#0a0a0a] mb-2">
                Hallelujah! Testimony Received
              </h3>
              <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
                Thank you for declaring God&apos;s wonders in your life. Your testimony encourages the brethren and glorifies God. Our pastoral team will review your praise report.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#180c62] hover:bg-[#251394] transition-all cursor-pointer shadow-md"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm">
                  {errorMessage}
                </div>
              )}

              {/* Full Name & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sister Grace Adeleke"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#180c62] focus:ring-1 focus:ring-[#180c62] text-sm text-gray-900 outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:border-[#180c62] focus:ring-1 focus:ring-[#180c62] text-sm text-gray-900 outline-none bg-white transition-colors cursor-pointer"
                  >
                    <option value="Prefer not to say">Select</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Email & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="grace.adeleke@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#180c62] focus:ring-1 focus:ring-[#180c62] text-sm text-gray-900 outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#180c62] focus:ring-1 focus:ring-[#180c62] text-sm text-gray-900 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Country Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#180c62] focus:ring-1 focus:ring-[#180c62] text-sm text-gray-900 outline-none bg-white transition-colors cursor-pointer"
                >
                  {COUNTRIES_LIST.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Your Testimony */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Your Testimony <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={testimony}
                  onChange={(e) => setTestimony(e.target.value)}
                  placeholder="Share the details of what the Lord has done for you and your family..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#180c62] focus:ring-1 focus:ring-[#180c62] text-sm text-gray-900 outline-none transition-colors resize-y"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#f0a505] hover:bg-[#d99404] disabled:opacity-60 text-[#0a0a0a] font-semibold text-sm transition-all shadow-md active:scale-[0.99] cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Submitting Testimony...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" />
                      <span>Share Testimony</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

