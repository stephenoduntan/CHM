"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, Heart, Building2, Gift, Globe, ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { GiveModal, BANK_ACCOUNTS } from "@/components/give/GiveModal";
import { HowItWorksStepsShowcase } from "@/components/give/HowItWorksStepsShowcase";

export default function GivePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"online" | "bank">("online");
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

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

          {/* Top Primary CTA Button */}
            <div className="mt-8 sm:mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-4 bg-white hover:bg-gray-100 text-[#0a0a0a] font-sans font-semibold text-base sm:text-[18px] px-8 sm:px-[40px] py-3.5 sm:py-[16px] rounded-[36px] transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <Heart className="size-4 fill-current" />
                Click here to Give
              </button>
            </div>
            
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
            {/* <div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-[#f0a505] hover:bg-[#d99504] text-[#0a0a0a] font-sans font-semibold text-base sm:text-[18px] px-8 sm:px-[40px] py-3.5 sm:py-[16px] rounded-[36px] transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                Click here to Give
              </button>
            </div> */}

            {/* Ways to Give Section Header */}
            <div className="w-full text-left pt-6 sm:pt-10">
              <h2 className="font-display font-recursive-sans font-semibold text-3xl sm:text-4xl lg:text-[40px] text-[#0a0a0a] tracking-tight leading-tight">
                Ways to Give
              </h2>
            </div>

            {/* How It Works Steps Showcase (Figma node 2111:12074) */}
            <HowItWorksStepsShowcase onOpenGiveModal={() => setIsModalOpen(true)} />
          </div>
        </Container>
      </section>

      {/* ─── Next Level Cathedral Card (Figma node 2111:11886) ──────── */}
      <section className="relative w-full overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-end py-16 sm:py-20 lg:py-24">
        {/* Background Architectural Render & Gradient Overlay */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/cathedral-give-bg.png"
            alt="Next Level Cathedral"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0.5)] via-[rgba(191,191,191,0.85)] to-[#f5f5f5]" />

          {/* Top Accent Stripe */}
          <div
            className="absolute top-0 left-0 right-0 h-6 opacity-80"
            data-node-id="2111:12543"
          >
            <Image
              src="/images/cathedral/cathedral-accent.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Card Content (node 2111:11886) */}
        <Container className="relative z-10 max-w-[1440px] w-full">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-[64px] items-start lg:items-end justify-between w-full">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-6 lg:gap-[35px] items-start max-w-2xl">
              <div className="flex flex-col gap-3 sm:gap-[16px] items-start">
                <p className="font-sans font-medium text-xl sm:text-2xl lg:text-[28px] text-[#242424] leading-normal">
                  Be a part of the
                </p>
                <h2 className="font-display font-recursive-sans font-bold text-3xl sm:text-4xl lg:text-[48px] text-[#0a0a0a] leading-tight lg:leading-[56px] tracking-tight">
                  NEXT LEVEL CATHEDRAL
                </h2>
                <div className="w-[124px] h-[6px] shrink-0">
                  <Image
                    src="/images/line-accent.svg"
                    alt=""
                    width={124}
                    height={6}
                    className="w-[124px] h-[6px]"
                  />
                </div>
              </div>

              <p className="font-sans font-normal text-lg sm:text-xl lg:text-[24px] text-[#242424] leading-relaxed">
                To give towards the Next Level Cathedral Project (Naira), Please use the details on the side.
              </p>
            </div>

            {/* Right Column: Vision statement box */}
            <div className="bg-white/35 backdrop-blur-md border border-white/60 p-6 sm:p-8 lg:p-[40px] rounded-[16px] w-full lg:w-[560px] shrink-0 shadow-sm flex flex-col gap-4 sm:gap-[24px] items-start">
              <span className="font-sans font-semibold text-xs sm:text-[16px] tracking-[0.64px] uppercase text-[#242424]">
                Support the cause
              </span>

              <div className="font-sans font-bold text-base sm:text-lg lg:text-[24px] text-[#0a0a0a] leading-relaxed lg:leading-[43px] w-full space-y-1">
                <p className="text-xs sm:text-sm lg:text-[16px] font-medium text-gray-700">Account Name:</p>
                <p className="font-bold mb-2">RCCG NEXT LEVEL PROJECT PARTNERS ACCOUNT</p>

                <p className="text-xs sm:text-sm lg:text-[16px] font-medium text-gray-700">Bank Name:</p>
                <p className="font-bold mb-2">Polaris Bank</p>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <div>
                    <p className="text-xs sm:text-sm lg:text-[16px] font-medium text-gray-700">Account Number:</p>
                    <p className="font-display font-recursive-mono font-bold text-2xl sm:text-3xl text-[#0a0a0a] tracking-wider">
                      4092011875
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("4092011875")}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shrink-0 shadow-sm ${
                      copiedAccount === "4092011875"
                        ? "bg-emerald-600 text-white"
                        : "bg-[#051202] text-white hover:bg-[#c88a04]"
                    }`}
                  >
                    {copiedAccount === "4092011875" ? (
                      <>
                        <Check className="size-4" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

            {/* ─── Give CTA Modal (Figma node 2086:1821) ────────────────── */}
      <GiveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultTab={modalTab}
      />
    </div>
  );
}
