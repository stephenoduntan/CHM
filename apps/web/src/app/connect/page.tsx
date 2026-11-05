"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";

export default function ConnectPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formType, setFormType] = useState<"general" | "prayer" | "testimony">("general");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType,
          fullName,
          phoneNumber,
          email,
          message,
          testimony: formType === "testimony" ? message : undefined,
          prayerRequest: formType === "prayer" ? message : undefined,
          source: "Connect Page",
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit. Please try again.");
      }

      setSubmitted(true);
      setFullName("");
      setPhoneNumber("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred while submitting.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white pb-24">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-auto pt-[140px] pb-16 text-white flex items-center justify-center overflow-hidden">
        {/* <Image
          src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1920"
          alt="Connect with Church Family"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051202] via-[#051202]/70 to-transparent" /> */}

        <Container className="relative z-10 text-center py-20">
          {/* <span className="inline-block px-4 py-1.5 rounded-full bg-[#c8a96e]/20 border border-[#c8a96e]/40 text-[#c8a96e] text-xs font-semibold uppercase tracking-wider mb-4">
            Fellowship & Care
          </span> */}
          <h1 className="font-display font-recursive-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0a0a0a] mb-4 uppercase tracking-tight">
            Connect With Us
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            We are here to pray with you, celebrate what God is doing in your life, and help you find your community.
          </p>
        </Container>
      </section>

      {/* ─── Contact Info & Interactive Form ──────────────────────── */}
      <section className="py-2 lg:py-4 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#c8a96e] font-semibold mb-2 block">
                  Get in Touch
                </span>
                <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#051202] mb-6">
                  We&apos;d Love to Hear From You
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-8">
                  Whether you have questions about our services, want to request pastoral counseling, or desire to join a department, our team is at your service.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="size-12 text-[#D61812] flex items-center justify-center shrink-0">
                      <MapPin className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#051202] text-lg">Address</h3>
                      <p className="text-gray-600 text-sm mt-0.5">{SITE_CONFIG.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="size-12 text-[#D61812] flex items-center justify-center shrink-0">
                      <Phone className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#051202] text-lg">Phone</h3>
                      <p className="text-gray-600 text-sm mt-0.5">{SITE_CONFIG.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="size-12 text-[#D61812] flex items-center justify-center shrink-0">
                      <Mail className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#051202] text-lg">Email</h3>
                      <p className="text-gray-600 text-sm mt-0.5">{SITE_CONFIG.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-[28px] bg-gray-50 border border-gray-200 mt-8">
                <h4 className="font-sans font-bold text-lg text-[#051202] mb-1">
                  Need Immediate Prayer?
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Our Prayer Champions line is available to stand with you in faith. Call or send a message directly to our pastoral team.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-12 rounded-[32px] border border-gray-200 shadow-xl">
                {/* Form Type Selectors */}
                <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-gray-100 rounded-2xl">
                  {[
                    { id: "general", label: "General Inquiry" },
                    { id: "prayer", label: "Prayer Request" },
                    { id: "testimony", label: "Share Testimony" },
                    // { id: "volunteer", label: "Join a Team" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setFormType(tab.id as any)}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap text-center ${
                        formType === tab.id
                          ? "bg-[#051202] text-white shadow-sm"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {submitted ? (
                  <div className="text-center py-16">
                    <CheckCircle2 className="size-16 text-emerald-600 mx-auto mb-4" />
                    <h3 className="font-sans font-bold text-2xl text-[#051202] mb-2">
                      Thank You! Message Received.
                    </h3>
                    <p className="text-gray-600 text-base max-w-md mx-auto mb-6">
                      Our pastoral care and admin team have received your submission. God bless you abundantly!
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#051202]"
                    >
                      Send Another Note
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm">
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Brother John Doe"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#051202] focus:ring-1 focus:ring-[#051202] text-sm text-gray-900 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+234 800 000 0000"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#051202] focus:ring-1 focus:ring-[#051202] text-sm text-gray-900 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#051202] focus:ring-1 focus:ring-[#051202] text-sm text-gray-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                        {formType === "prayer"
                          ? "Your Prayer Request *"
                          : formType === "testimony"
                          ? "Your Praise Report / Testimony *"
                          : "Your Message *"}
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={
                          formType === "prayer"
                            ? "Please write what you would like the pastoral team to intercede with you for..."
                            : formType === "testimony"
                            ? "Tell us how the Lord has blessed or delivered you..."
                            : "How can we assist you today?"
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#051202] focus:ring-1 focus:ring-[#051202] text-sm text-gray-900 outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center w-full justify-center gap-2 px-7 py-4 rounded-full bg-[#f0a505] hover:bg-[#d99404] disabled:opacity-60 text-[#0a0a0a] font-sans font-semibold text-[14px] uppercase shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="size-4" />
                          <span>Submit Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
