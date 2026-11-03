"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy, CreditCard, Heart, Building2, Gift, Globe } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";

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
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = (accountNum: string) => {
    navigator.clipboard.writeText(accountNum);
    setCopiedAccount(accountNum);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  return (
    <div className="w-full bg-white pb-24">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-[720px] bg-[#051202] text-white flex items-center justify-center overflow-hidden">
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

      {/* ─── Bank Transfer Accounts ───────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#051202] mb-3">
              Direct Bank Transfer
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Click any account number to copy it directly to your banking app.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {bankAccounts.map((item) => {
              const Icon = item.icon;
              const isCopied = copiedAccount === item.accountNumber;

              return (
                <div
                  key={item.category}
                  className="p-8 rounded-[28px] bg-gray-50 border border-gray-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="size-12 rounded-2xl bg-[#051202] text-[#c8a96e] flex items-center justify-center">
                        <Icon className="size-6" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                          {item.bank}
                        </span>
                        <h3 className="font-sans font-bold text-xl text-[#051202]">
                          {item.category}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold mb-1">
                      Account Name:
                    </p>
                    <p className="text-sm font-medium text-gray-900 mb-6">
                      {item.accountName}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        Account Number
                      </span>
                      <p className="font-display font-recursive-mono text-2xl font-bold text-[#051202]">
                        {item.accountNumber}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.accountNumber)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                        isCopied
                          ? "bg-emerald-600 text-white"
                          : "bg-[#051202] text-white hover:bg-[#c8a96e] hover:text-[#051202]"
                      }`}
                    >
                      {isCopied ? (
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
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─── Online Payment Card ──────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <Container>
          <div className="max-w-2xl mx-auto text-center p-10 rounded-[32px] bg-white border border-gray-200 shadow-xl">
            <CreditCard className="size-12 text-[#c8a96e] mx-auto mb-4" />
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#051202] mb-3">
              Give via Debit Card / Online Payment
            </h2>
            <p className="text-gray-600 text-base mb-8 leading-relaxed">
              Fast, secure online giving powered by Paystack / Flutterwave. You can give tithes, pledges, or support the Next Level Cathedral.
            </p>
            <button
              type="button"
              onClick={() => alert("Secure payment gateway integration connects with your church Paystack/Flutterwave account.")}
              className="px-10 py-4 rounded-full font-semibold text-white bg-[#051202] hover:bg-[#c8a96e] hover:text-[#051202] transition-colors text-base shadow-md cursor-pointer uppercase tracking-wider"
            >
              Pay Online Now
            </button>
          </div>
        </Container>
      </section>
    </div>
  );
}

