"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Copy, Heart, Building2, Gift, Globe, X } from "lucide-react";

export interface BankAccount {
  category: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  icon: typeof Gift;
}

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    category: "Tithe & Offering",
    bank: "Polaris Bank",
    accountNumber: "1771023394",
    accountName: "RCCG Court of His Majesty",
    icon: Gift,
  },
  {
    category: "Destiny Conference",
    bank: "Polaris Bank",
    accountNumber: "1771237216",
    accountName: "RCCG Court of His Majesty",
    icon: Gift,
  },
  {
    category: "Project Partners",
    bank: "Polaris Bank",
    accountNumber: "4092011875",
    accountName: "RCCG Next Level Project Partners",
    icon: Building2,
  },
  {
    category: "Men's Fellowship",
    bank: "Providus Bank",
    accountNumber: "1809046723",
    accountName: "Men Court of His Majesty RCCG",
    icon: Globe,
  },
  {
    category: "Good Women's Fellowship",
    bank: "Polaris Bank",
    accountNumber: "1771923810",
    accountName: "RCCG CHM Good Women Fellowship",
    icon: Globe,
  },
  {
    category: "Welfare",
    bank: "Polaris Bank",
    accountNumber: "4091907966",
    accountName: "RCCG Court of His Majesty Welfare",
    icon: Heart,
  },
];

export interface GiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "online" | "bank";
  defaultGivingType?: string;
}

export function GiveModal({
  isOpen,
  onClose,
  defaultTab = "online",
  defaultGivingType = "",
}: GiveModalProps) {
  const [modalTab, setModalTab] = useState<"online" | "bank">(defaultTab);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [givingType, setGivingType] = useState(defaultGivingType);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setModalTab(defaultTab);
      if (defaultGivingType) setGivingType(defaultGivingType);
    }
  }, [isOpen, defaultTab, defaultGivingType]);

  // Close on Escape key & manage scroll lock
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
      setIsSubmitted(false);
      setErrorMessage("");
    }, 200);
  };

  const copyToClipboard = (accountNum: string) => {
    navigator.clipboard.writeText(accountNum);
    setCopiedAccount(accountNum);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      setErrorMessage("Please enter a valid amount.");
      return;
    }
    if (!currency) {
      setErrorMessage("Please select a currency.");
      return;
    }
    if (!givingType) {
      setErrorMessage("Please select a giving type.");
      return;
    }
    if (!firstName.trim()) {
      setErrorMessage("Please enter your first name.");
      return;
    }
    if (!lastName.trim()) {
      setErrorMessage("Please enter your last name.");
      return;
    }

    setErrorMessage("");
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-hidden"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-[20px] max-w-[620px] w-full max-h-[85vh] sm:max-h-[82vh] shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        data-node-id="2086:1821"
        data-name="GiveModal"
      >
        {/* Pinned Top Header with Segmented Tab Switcher & Close Button */}
        <div className="flex items-center justify-between px-4 sm:px-8 pt-4 pb-3.5 shrink-0 border-b border-gray-100 bg-white z-10 gap-2 sm:gap-3">
          {/* Segmented Switcher */}
          <div className="inline-flex p-1 bg-gray-100 rounded-full" role="tablist" aria-label="Giving Method">
            <button
              type="button"
              role="tab"
              aria-selected={modalTab === "online"}
              onClick={() => setModalTab("online")}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                modalTab === "online"
                  ? "bg-[#180c62] text-white shadow-sm"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Online Giving
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={modalTab === "bank"}
              onClick={() => setModalTab("bank")}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                modalTab === "bank"
                  ? "bg-[#180c62] text-white shadow-sm"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Direct Bank Transfer
            </button>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            className="size-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5">
          {modalTab === "online" ? (
            /* ─── Online Giving Form View ─── */
            !isSubmitted ? (
              <form id="give-modal-form" onSubmit={handlePaymentSubmit} className="w-full flex flex-col gap-5 sm:gap-6">
                {/* Header Title */}
                <div className="w-full">
                  <h3 className="font-sans font-bold text-sm sm:text-base text-black leading-tight text-center sm:text-left">
                    GOD WILL SURELY BLESS THE FRUITS OF YOUR LABOUR IN JESUS NAME
                  </h3>
                </div>

                {errorMessage && (
                  <div className="w-full p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                    {errorMessage}
                  </div>
                )}

                {/* Amount Field */}
                <div className="flex flex-col gap-1.5 items-start w-full">
                  <label className="font-sans font-normal text-sm sm:text-base text-black">
                    Amount
                  </label>
                  <div className="border-b border-[#d0d2d6] flex items-center justify-center py-2 w-full">
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      required
                      className="w-full text-center font-sans font-normal text-3xl sm:text-4xl text-black outline-none bg-transparent placeholder:text-gray-300"
                    />
                  </div>
                </div>

                {/* Currency Dropdown */}
                <div className="flex flex-col gap-1.5 items-start w-full">
                  <label className="font-sans font-normal text-sm sm:text-base text-black">
                    Currency <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-full">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      required
                      className="w-full appearance-none border border-[#d0d2d6] rounded-[8px] p-3 text-sm sm:text-base text-black bg-white outline-none focus:border-[#180c62] pr-10 cursor-pointer"
                    >
                      <option value="NGN">NGN (Nigerian Naira - ₦)</option>
                      <option value="USD">USD (US Dollar - $)</option>
                      <option value="GBP">GBP (British Pound - £)</option>
                      <option value="EUR">EUR (Euro - €)</option>
                      <option value="CAD">CAD (Canadian Dollar - C$)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                      <Image
                        src="/images/fluent-chevron-down.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="size-5"
                      />
                    </div>
                  </div>
                </div>

                {/* Type Dropdown */}
                <div className="flex flex-col gap-1.5 items-start w-full">
                  <label className="font-sans font-normal text-sm sm:text-base text-black">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-full">
                    <select
                      value={givingType}
                      onChange={(e) => setGivingType(e.target.value)}
                      required
                      className={`w-full appearance-none border border-[#d0d2d6] rounded-[8px] p-3 text-sm sm:text-base bg-white outline-none focus:border-[#180c62] pr-10 cursor-pointer ${
                        givingType ? "text-black" : "text-[#a8a8a8]"
                      }`}
                    >
                      <option value="" disabled>Select option</option>
                      <option value="Tithe">Tithe</option>
                      <option value="Offering">Offering</option>
                      <option value="Thanksgiving">Thanksgiving</option>
                      <option value="Cathedral Project">Next Level Cathedral Project</option>
                      <option value="Missions">Missions & Evangelism</option>
                      <option value="Welfare">Welfare & Benevolence</option>
                      <option value="First Fruit">First Fruit</option>
                      <option value="Seed Faith">Seed Faith</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                      <Image
                        src="/images/fluent-chevron-down.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="size-5"
                      />
                    </div>
                  </div>
                </div>

                {/* First Name Field */}
                <div className="flex flex-col gap-1.5 items-start w-full">
                  <label className="font-sans font-normal text-sm sm:text-base text-black">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="border border-[#d0d2d6] rounded-[8px] p-3 w-full">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter first name"
                      required
                      className="w-full text-sm sm:text-base text-black outline-none bg-transparent placeholder:text-[#a8a8a8]"
                    />
                  </div>
                </div>

                {/* Last Name Field */}
                <div className="flex flex-col gap-1.5 items-start w-full">
                  <label className="font-sans font-normal text-sm sm:text-base text-black">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="border border-[#d0d2d6] rounded-[8px] p-3 w-full">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter last name"
                      required
                      className="w-full text-sm sm:text-base text-black outline-none bg-transparent placeholder:text-[#a8a8a8]"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5 items-start w-full">
                  <label className="font-sans font-normal text-sm sm:text-base text-black">
                    Email
                  </label>
                  <div className="border border-[#d0d2d6] rounded-[8px] p-3 w-full">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full text-sm sm:text-base text-black outline-none bg-transparent placeholder:text-[#a8a8a8]"
                    />
                  </div>
                </div>

                {/* Country Dropdown */}
                <div className="flex flex-col gap-1.5 items-start w-full">
                  <label className="font-sans font-normal text-sm sm:text-base text-black">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-full">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      className="w-full appearance-none border border-[#d0d2d6] rounded-[8px] p-3 text-sm sm:text-base text-black bg-white outline-none focus:border-[#180c62] pr-10 cursor-pointer"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Ghana">Ghana</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                      <Image
                        src="/images/fluent-chevron-down.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="size-5"
                      />
                    </div>
                  </div>
                </div>

                {/* Switch to Direct Bank Transfer */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setModalTab("bank")}
                    className="text-xs sm:text-sm font-semibold text-[#180c62] hover:underline cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Prefer direct bank transfer?</span>
                    <span className="underline">View Bank Transfer Accounts →</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Success / Payment Gateway State */
              <div className="w-full flex flex-col items-center text-center gap-5 py-4">
                <div className="size-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                  <Check className="size-7" />
                </div>
                <div>
                  <h4 className="font-display font-recursive-sans font-bold text-xl sm:text-2xl text-[#0a0a0a] mb-1.5">
                    Payment Gateway Initiated
                  </h4>
                  <p className="text-gray-600 text-sm max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-black">{firstName}</span>! Your giving of{" "}
                    <span className="font-bold text-black">{currency} {amount}</span> for{" "}
                    <span className="font-semibold text-black">{givingType}</span> has been logged.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 w-full text-left text-xs sm:text-sm space-y-1.5">
                  <p><span className="text-gray-500">Name:</span> <span className="font-medium text-black">{firstName} {lastName}</span></p>
                  {email && <p><span className="text-gray-500">Email:</span> <span className="font-medium text-black">{email}</span></p>}
                  <p><span className="text-gray-500">Country:</span> <span className="font-medium text-black">{country}</span></p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="flex-1 py-2.5 px-5 rounded-full border border-gray-300 hover:bg-gray-50 font-semibold text-gray-700 text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Back to form
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 py-2.5 px-5 rounded-full bg-[#180c62] hover:bg-[#251394] text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer shadow-md"
                  >
                    Done
                  </button>
                </div>
              </div>
            )
          ) : (
            /* ─── Direct Bank Transfer View ─── */
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="font-sans font-bold text-sm sm:text-base text-black uppercase tracking-wide">
                  Direct Bank Transfer Accounts
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Transfer directly using any of our dedicated church accounts below. Click the copy button to quickly copy the account number.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                {BANK_ACCOUNTS.map((item) => {
                  const Icon = item.icon;
                  const isCopied = copiedAccount === item.accountNumber;
                  return (
                    <div
                      key={item.category}
                      className="p-3.5 sm:p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-[#180c62]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        {/* <div className="size-10 rounded-xl bg-[#051202] text-[#f0a505] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          <Icon className="size-5" />
                        </div> */}
                        <div className="space-y-0.5">
                          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#180c62] bg-[#180c62]/10 px-2 py-0.5 rounded-md">
                            {item.category}
                          </span>
                          <p className="text-xs font-semibold text-gray-700 pt-0.5">
                            {item.bank} • <span className="font-normal text-gray-500">{item.accountName}</span>
                          </p>
                          <p className="font-display font-recursive-mono font-bold text-lg sm:text-xl text-[#0a0a0a] tracking-wider pt-0.5">
                            {item.accountNumber}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end sm:justify-center shrink-0">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(item.accountNumber)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
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

              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 flex items-start gap-2.5 mt-1">
                <span className="font-bold shrink-0 text-blue-700">Note:</span>
                <p className="leading-relaxed">
                  Please include the purpose (e.g. &ldquo;Tithe&rdquo;, &ldquo;Cathedral Project&rdquo;, &ldquo;Offering&rdquo;) in your transfer narration. For receipts or confirmation, please contact the church administration.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Fixed Footer */}
        {modalTab === "online" && !isSubmitted && (
          <div className="px-6 sm:px-8 py-3.5 shrink-0 border-t border-gray-100 bg-white w-full">
            <button
              type="submit"
              form="give-modal-form"
              className="bg-[#f0a505] hover:bg-[#d99504] text-[#0a0a0a] font-sans font-semibold text-base h-[50px] sm:h-[54px] rounded-[36px] w-full flex items-center justify-center transition-all cursor-pointer shadow-md hover:shadow-lg"
            >
              Make Payment
            </button>
          </div>
        )}

        {modalTab === "bank" && (
          <div className="px-6 sm:px-8 py-3.5 shrink-0 border-t border-gray-100 bg-white w-full flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setModalTab("online")}
              className="text-xs sm:text-sm font-semibold text-[#180c62] hover:underline cursor-pointer"
            >
              ← Switch to Online Giving
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 rounded-full bg-[#f0a505] hover:bg-[#d99504] text-[#0a0a0a] text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

