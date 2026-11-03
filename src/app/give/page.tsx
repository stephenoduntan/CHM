"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Copy, Heart, Building2, Gift, Globe, X } from "lucide-react";
import { Container } from "@/components/layout/Container";

const bankAccounts = [
  {
    category: "Tithe & Offering",
    bank: "Zenith Bank",
    accountNumber: "1012345678",
    accountName: "RCCG Court of His Majesty",
    icon: Gift,
  },
  {
    category: "Next Level Cathedral Project",
    bank: "Guaranty Trust Bank (GTBank)",
    accountNumber: "0123456789",
    accountName: "RCCG CHM Building Project",
    icon: Building2,
  },
  {
    category: "Missions & Evangelism",
    bank: "Access Bank",
    accountNumber: "0098765432",
    accountName: "RCCG CHM Missions",
    icon: Globe,
  },
  {
    category: "Welfare & Benevolence",
    bank: "Zenith Bank",
    accountNumber: "1098765431",
    accountName: "RCCG CHM Welfare Department",
    icon: Heart,
  },
];

export default function GivePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // Close modal on Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const copyToClipboard = (accountNum: string) => {
    navigator.clipboard.writeText(accountNum);
    setCopiedAccount(accountNum);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  return (
    <div className="w-full bg-white">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-[640px] sm:h-[720px] bg-[#051202] text-white flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=1920"
          alt="Online Giving"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051202] via-[#051202]/70 to-transparent" />

        <Container className="relative z-10 text-center py-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#c8a96e]/20 border border-[#c8a96e]/40 text-[#c8a96e] text-xs font-semibold uppercase tracking-wider mb-4">
            Partnership & Generosity
          </span>
          <h1 className="font-display font-recursive-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 uppercase tracking-tight">
            Giving to God&apos;s Work
          </h1>
          <p className="text-gray-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            &quot;Give, and it will be given to you: good measure, pressed down, shaken together, and running over...&quot; — Luke 6:38
          </p>
        </Container>
      </section>

      {/* ─── Explore: Giving Intro & Ways to Give (Figma node 2086:1517) ─── */}
      <section className="pt-16 sm:pt-20 lg:pt-[84px] pb-20 sm:pb-24 lg:pb-[124px] bg-white">
        <Container className="max-w-[1440px]">
          <div className="flex flex-col gap-12 sm:gap-14 lg:gap-[64px] items-center">
            {/* Editorial Giving Statement */}
            <div className="w-full max-w-5xl text-center">
              <p className="font-sans font-normal text-lg sm:text-xl lg:text-[24px] text-[#3d3d3d] leading-relaxed">
                Giving is an act of worship that reflects our gratitude to God for His abundant blessings. It allows us to partner with Him in advancing His Kingdom, supporting the local church, helping those in need, and making a tangible difference in the lives of others. When we give, we demonstrate faith, trust, and obedience, acknowledging that everything we have ultimately belongs to God. Generosity not only blesses others but also transforms our hearts, cultivating contentment, joy, and a deeper dependence on God’s provision.
              </p>
            </div>

            {/* Top Primary CTA Button */}
            <div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-[#f0a505] hover:bg-[#d99504] text-[#0a0a0a] font-sans font-semibold text-base sm:text-[18px] px-8 sm:px-[40px] py-3.5 sm:py-[16px] rounded-[36px] transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                Click here to Give
              </button>
            </div>

            {/* Ways to Give Section Header */}
            <div className="w-full text-left pt-6 sm:pt-10">
              <h2 className="font-display font-recursive-sans font-semibold text-3xl sm:text-4xl lg:text-[40px] text-[#0a0a0a] tracking-tight leading-tight">
                Ways to Give
              </h2>
            </div>

            {/* How It Works Steps Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-[64px] items-center w-full">
              {/* Left: Step Image */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[581px] h-[380px] sm:h-[500px] lg:h-[671px] rounded-[20px] overflow-hidden shadow-lg bg-[#0a0a0a]">
                  <Image
                    src="/images/give-step-image.png"
                    alt="Ways to Give"
                    fill
                    className="object-cover rounded-[20px]"
                    priority
                  />
                </div>
              </div>

              {/* Right: 3 Steps */}
              <div className="lg:col-span-7 flex flex-col gap-10 sm:gap-12 lg:gap-[64px] w-full">
                {/* Step 1: Give Online */}
                <div
                  className="flex gap-4 sm:gap-[16px] items-stretch cursor-pointer group"
                  onClick={() => setActiveStep(0)}
                >
                  <div
                    className={`w-[3px] rounded-full shrink-0 transition-colors duration-300 ${
                      activeStep === 0 ? "bg-[#d61812]" : "bg-[#e6e8eb]"
                    }`}
                  />
                  <div className="flex-1 flex flex-col gap-6 sm:gap-[24px] items-start justify-center pl-2">
                    <div className="flex flex-col gap-3 sm:gap-[24px] items-start w-full">
                      <h3 className="font-display font-recursive-sans font-semibold text-2xl sm:text-[28px] text-[#0a0a0a] tracking-tight">
                        Give Online
                      </h3>
                      <p className="font-sans font-normal text-base sm:text-xl lg:text-[24px] text-[#242424] leading-relaxed">
                        Giving digitally is easy and quick. Click the button to give at any time, to any ministry associated with CHM
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsModalOpen(true);
                      }}
                      className="bg-[#c88a04] hover:bg-[#b07903] text-white font-sans font-semibold text-base sm:text-[18px] px-8 sm:px-[40px] py-3.5 sm:py-[16px] rounded-[36px] transition-all cursor-pointer shadow-sm hover:shadow-md"
                    >
                      Click here to Give
                    </button>
                  </div>
                </div>

                {/* Step 2: Give In Person */}
                <div
                  className="flex gap-4 sm:gap-[16px] items-stretch cursor-pointer group"
                  onClick={() => setActiveStep(1)}
                >
                  <div
                    className={`w-[3px] rounded-full shrink-0 transition-colors duration-300 ${
                      activeStep === 1 ? "bg-[#d61812]" : "bg-[#e6e8eb]"
                    }`}
                  />
                  <div className="flex-1 flex flex-col gap-3 sm:gap-[24px] items-start justify-center pl-2">
                    <h3 className="font-display font-recursive-sans font-semibold text-2xl sm:text-[28px] text-[#0a0a0a] tracking-tight">
                      Give In Person
                    </h3>
                    <p className="font-sans font-normal text-base sm:text-xl lg:text-[24px] text-[#242424] leading-relaxed">
                      You can give in person at any one of our services
                    </p>
                  </div>
                </div>

                {/* Step 3: Mail A Cheque */}
                <div
                  className="flex gap-4 sm:gap-[16px] items-stretch cursor-pointer group"
                  onClick={() => setActiveStep(2)}
                >
                  <div
                    className={`w-[3px] rounded-full shrink-0 transition-colors duration-300 ${
                      activeStep === 2 ? "bg-[#d61812]" : "bg-[#e6e8eb]"
                    }`}
                  />
                  <div className="flex-1 flex flex-col gap-3 sm:gap-[24px] items-start justify-center pl-2">
                    <h3 className="font-display font-recursive-sans font-semibold text-2xl sm:text-[28px] text-[#0a0a0a] tracking-tight">
                      Mail A Cheque
                    </h3>
                    <p className="font-sans font-normal text-base sm:text-xl lg:text-[24px] text-[#242424] leading-relaxed">
                      Checks can be written for RCCG City of David, Lagos Nigeria, given during any of our services or sent to RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Giving Modal (Opens on "Click here to Give") ────────────── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-[28px] max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h3 className="font-display font-recursive-sans font-bold text-2xl sm:text-3xl text-[#0a0a0a]">
                  Direct Bank Transfer
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Click any account number to copy it to your banking app.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="size-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4">
              {bankAccounts.map((item) => {
                const Icon = item.icon;
                const isCopied = copiedAccount === item.accountNumber;

                return (
                  <div
                    key={item.category}
                    className="p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:border-[#f0a505] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="size-11 rounded-xl bg-[#051202] text-[#f0a505] flex items-center justify-center shrink-0">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                          {item.bank}
                        </span>
                        <h4 className="font-sans font-bold text-base sm:text-lg text-[#0a0a0a]">
                          {item.category}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.accountName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                      <span className="font-display font-recursive-mono font-bold text-lg sm:text-xl text-[#0a0a0a]">
                        {item.accountNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(item.accountNumber)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                          isCopied
                            ? "bg-emerald-600 text-white"
                            : "bg-[#051202] text-white hover:bg-[#c88a04]"
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="size-3.5" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
