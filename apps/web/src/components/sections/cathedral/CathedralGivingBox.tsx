"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy } from "lucide-react";

export function CathedralGivingBox() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const accountDetails = {
    accountName: "RCCG NEXT LEVEL PROJECT PARTNERS ACCOUNT",
    bankName: "Polaris Bank",
    accountNumber: "4092011875",
  };

  return (
    <div
      className="bg-[rgba(36,36,36,0.25)] border border-white/10 rounded-[20px] p-6 sm:p-10 lg:p-12 w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 shadow-2xl backdrop-blur-sm"
      data-node-id="2103:9500"
      data-name="Project giving details"
    >
      {/* Left Column: Bank Transfer Details */}
      <div
        className="flex flex-col gap-6 items-start w-full lg:flex-1"
        data-node-id="2103:9501"
        data-name="Bank transfer details"
      >
        <p
          className="font-medium text-[#c8a96e] text-sm sm:text-base lg:text-[18px] tracking-wide"
          data-node-id="2103:9502"
        >
          Giving towards the Next Level Cathedral Project (Naira)
        </p>

        <h3
          className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl lg:text-[36px] text-white leading-tight"
          data-node-id="2103:9503"
        >
          Project partners account
        </h3>

        <div
          className="flex flex-col gap-5 items-start w-full pt-2"
          data-node-id="2103:9504"
          data-name="Account information"
        >
          {/* Account Name */}
          <div
            className="flex flex-col gap-1.5 w-full pb-4 border-b border-white/10"
            data-node-id="2103:9505"
            data-name="Bank detail"
          >
            <span
              className="text-[#a8a8a8] text-xs sm:text-sm uppercase tracking-wider font-mono"
              data-node-id="2103:9506"
            >
              Account Name
            </span>
            <div className="flex items-center justify-between gap-4">
              <span
                className="font-semibold text-lg sm:text-xl lg:text-[22px] text-white break-words select-all"
                data-node-id="2103:9507"
              >
                {accountDetails.accountName}
              </span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(accountDetails.accountName, "accountName")
                }
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors shrink-0 cursor-pointer"
                title="Copy account name"
                aria-label="Copy account name"
              >
                {copiedField === "accountName" ? (
                  <Check className="size-4 text-emerald-400" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Bank Name */}
          <div
            className="flex flex-col gap-1.5 w-full pb-4 border-b border-white/10"
            data-node-id="2103:9508"
            data-name="Bank detail"
          >
            <span
              className="text-[#a8a8a8] text-xs sm:text-sm uppercase tracking-wider font-mono"
              data-node-id="2103:9509"
            >
              Bank Name
            </span>
            <span
              className="font-semibold text-lg sm:text-xl lg:text-[22px] text-white"
              data-node-id="2103:9510"
            >
              {accountDetails.bankName}
            </span>
          </div>

          {/* Account Number */}
          <div
            className="flex flex-col gap-1.5 w-full pb-2"
            data-node-id="2103:9511"
            data-name="Bank detail"
          >
            <span
              className="text-[#a8a8a8] text-xs sm:text-sm uppercase tracking-wider font-mono"
              data-node-id="2103:9512"
            >
              Account Number
            </span>
            <div className="flex items-center justify-between gap-4">
              <span
                className="font-mono font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#c8a96e] tracking-wider select-all"
                data-node-id="2103:9513"
              >
                {accountDetails.accountNumber}
              </span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(accountDetails.accountNumber, "accountNumber")
                }
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#c8a96e]/20 hover:bg-[#c8a96e]/30 border border-[#c8a96e]/40 text-[#c8a96e] text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer"
                title="Copy account number"
              >
                {copiedField === "accountNumber" ? (
                  <>
                    <Check className="size-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
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

        <p
          className="text-[#e8e8e8]/75 text-xs sm:text-sm lg:text-[15px] leading-relaxed mt-2"
          data-node-id="2103:9514"
        >
          These details are carried over from the church’s existing Give page.
          Please confirm them with the church office before making a transfer.
        </p>
      </div>

      {/* Right Column: Project Updates QR Code */}
      <div
        className="flex flex-col items-center gap-5 shrink-0 w-full sm:w-[300px]"
        data-node-id="2103:9515"
        data-name="Project updates code"
      >
        <div
          className="bg-[rgba(31,31,31,0.3)] border border-white/10 p-4 rounded-[20px] size-[280px] sm:size-[300px] flex items-center justify-center shadow-lg"
          data-node-id="2103:9516"
          data-name="QR surround"
        >
          <div
            className="bg-white rounded-[16px] p-3 size-full flex items-center justify-center relative overflow-hidden shadow-inner"
            data-node-id="2103:9517"
            data-name="Project QR code"
          >
            <Image
              src="/images/cathedral/cathedral-project-qr.png"
              alt="Scan QR code for Next Level Cathedral project updates"
              width={268}
              height={268}
              className="object-contain size-full rounded-[12px]"
            />
          </div>
        </div>
        <p
          className="text-[#e8e8e8] text-sm sm:text-base lg:text-[18px] text-center leading-[1.5] max-w-[260px]"
          data-node-id="2103:9518"
        >
          Scan QR code to get more update on the project
        </p>
      </div>
    </div>
  );
}

