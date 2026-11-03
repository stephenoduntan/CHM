"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Copy, Heart, Building2, Gift, Globe, ArrowLeft } from "lucide-react";
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

  // Modal form states
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [givingType, setGivingType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showBankAccounts, setShowBankAccounts] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Close modal on Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
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
    if (!country) {
      setErrorMessage("Please select your country.");
      return;
    }

    setErrorMessage("");
    setIsSubmitted(true);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setShowBankAccounts(false);
    setErrorMessage("");
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

      {/* ─── Give CTA Modal (Figma node 2086:1821) ────────────────── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
          onClick={resetModal}
        >
          <div
            className="bg-white rounded-[16px] max-w-[680px] w-full p-6 sm:p-10 relative shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200 flex flex-col gap-6 sm:gap-[40px] items-center"
            onClick={(e) => e.stopPropagation()}
            data-node-id="2086:1821"
            data-name="Give"
          >
            {/* Top Dismiss Button */}
            <div className="flex items-center justify-end w-full" data-node-id="2094:5813">
              <button
                type="button"
                onClick={resetModal}
                className="size-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                data-node-id="2094:5814"
                data-name="fluent:dismiss-16-filled"
                aria-label="Close"
              >
                <Image
                  src="/images/fluent-dismiss.svg"
                  alt="Close"
                  width={40}
                  height={40}
                  className="size-8 sm:size-10 object-contain"
                />
              </button>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handlePaymentSubmit} className="w-full flex flex-col gap-6 sm:gap-[24px]">
                {/* Header Title */}
                <div className="w-full" data-node-id="2086:1825">
                  <h3 className="font-sans font-bold text-base sm:text-[18px] text-black leading-tight text-center sm:text-left">
                    GOD WILL SURELY BLESS THE FRUITS OF YOUR LABOUR IN JESUS NAME
                  </h3>
                </div>

                {errorMessage && (
                  <div className="w-full p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                    {errorMessage}
                  </div>
                )}

                {/* Amount Field */}
                <div className="flex flex-col gap-2 items-start w-full" data-node-id="2086:1826">
                  <label className="font-sans font-normal text-base sm:text-[18px] text-black">
                    Amount
                  </label>
                  <div className="border-b border-[#d0d2d6] flex items-center justify-center py-2 sm:py-[16px] w-full" data-node-id="2086:1828">
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      required
                      className="w-full text-center font-sans font-normal text-3xl sm:text-[48px] text-black outline-none bg-transparent placeholder:text-gray-300"
                    />
                  </div>
                </div>

                {/* Currency Dropdown */}
                <div className="flex flex-col gap-2 items-start w-full" data-node-id="2086:1830">
                  <label className="font-sans font-normal text-base sm:text-[18px] text-black">
                    Currency <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-full" data-node-id="2086:1832">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      required
                      className="w-full appearance-none border border-[#d0d2d6] rounded-[8px] p-3.5 sm:p-[16px] text-base sm:text-[20px] text-black bg-white outline-none focus:border-[#180c62] pr-12 cursor-pointer"
                    >
                      <option value="NGN">NGN (₦) - Nigerian Naira</option>
                      <option value="USD">USD ($) - US Dollar</option>
                      <option value="GBP">GBP (£) - British Pound</option>
                      <option value="EUR">EUR (€) - Euro</option>
                      <option value="CAD">CAD ($) - Canadian Dollar</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 sm:right-4 flex items-center" data-name="fluent:chevron-down-20-filled">
                      <Image
                        src="/images/fluent-chevron-down.svg"
                        alt=""
                        width={32}
                        height={32}
                        className="size-6 sm:size-8"
                      />
                    </div>
                  </div>
                </div>

                {/* Type Dropdown */}
                <div className="flex flex-col gap-2 items-start w-full" data-node-id="2086:1836">
                  <label className="font-sans font-normal text-base sm:text-[18px] text-black">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-full" data-node-id="2086:1838">
                    <select
                      value={givingType}
                      onChange={(e) => setGivingType(e.target.value)}
                      required
                      className={`w-full appearance-none border border-[#d0d2d6] rounded-[8px] p-3.5 sm:p-[16px] text-base sm:text-[20px] bg-white outline-none focus:border-[#180c62] pr-12 cursor-pointer ${
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
                    <div className="pointer-events-none absolute inset-y-0 right-3 sm:right-4 flex items-center" data-name="fluent:chevron-down-20-filled">
                      <Image
                        src="/images/fluent-chevron-down.svg"
                        alt=""
                        width={32}
                        height={32}
                        className="size-6 sm:size-8"
                      />
                    </div>
                  </div>
                </div>

                {/* First Name Field */}
                <div className="flex flex-col gap-2 items-start w-full" data-node-id="2086:1842">
                  <label className="font-sans font-normal text-base sm:text-[18px] text-black">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="border border-[#d0d2d6] rounded-[8px] p-3.5 sm:p-[16px] w-full" data-node-id="2086:1844">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter first name"
                      required
                      className="w-full text-base sm:text-[20px] text-black outline-none bg-transparent placeholder:text-[#a8a8a8]"
                    />
                  </div>
                </div>

                {/* Last Name Field */}
                <div className="flex flex-col gap-2 items-start w-full" data-node-id="2086:1848">
                  <label className="font-sans font-normal text-base sm:text-[18px] text-black">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <div className="border border-[#d0d2d6] rounded-[8px] p-3.5 sm:p-[16px] w-full" data-node-id="2086:1850">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter last name"
                      required
                      className="w-full text-base sm:text-[20px] text-black outline-none bg-transparent placeholder:text-[#a8a8a8]"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2 items-start w-full" data-node-id="2086:1854">
                  <label className="font-sans font-normal text-base sm:text-[18px] text-black">
                    Email
                  </label>
                  <div className="border border-[#d0d2d6] rounded-[8px] p-3.5 sm:p-[16px] w-full" data-node-id="2086:1856">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full text-base sm:text-[20px] text-black outline-none bg-transparent placeholder:text-[#a8a8a8]"
                    />
                  </div>
                </div>

                {/* Country Dropdown */}
                <div className="flex flex-col gap-2 items-start w-full" data-node-id="2086:1860">
                  <label className="font-sans font-normal text-base sm:text-[18px] text-black">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <div className="relative w-full" data-node-id="2086:1862">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      className="w-full appearance-none border border-[#d0d2d6] rounded-[8px] p-3.5 sm:p-[16px] text-base sm:text-[20px] text-black bg-white outline-none focus:border-[#180c62] pr-12 cursor-pointer"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Ghana">Ghana</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 sm:right-4 flex items-center" data-name="fluent:chevron-down-20-filled">
                      <Image
                        src="/images/fluent-chevron-down.svg"
                        alt=""
                        width={32}
                        height={32}
                        className="size-6 sm:size-8"
                      />
                    </div>
                  </div>
                </div>

                {/* Make Payment CTA Button */}
                <button
                  type="submit"
                  className="bg-[#180c62] hover:bg-[#251394] text-white font-sans font-semibold text-base sm:text-[18px] h-[56px] sm:h-[60px] rounded-[36px] w-full flex items-center justify-center transition-all cursor-pointer shadow-md hover:shadow-lg mt-2 shrink-0"
                  data-node-id="2086:1866"
                >
                  Make Payment
                </button>

                {/* Option to toggle direct bank transfer accounts */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setShowBankAccounts(!showBankAccounts)}
                    className="text-sm font-semibold text-[#180c62] hover:underline cursor-pointer"
                  >
                    {showBankAccounts ? "Hide bank transfer accounts" : "Prefer direct bank transfer? View account numbers"}
                  </button>
                </div>

                {showBankAccounts && (
                  <div className="space-y-3 pt-2">
                    {bankAccounts.map((item) => {
                      const Icon = item.icon;
                      const isCopied = copiedAccount === item.accountNumber;
                      return (
                        <div
                          key={item.category}
                          className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="size-9 rounded-lg bg-[#051202] text-[#f0a505] flex items-center justify-center shrink-0">
                              <Icon className="size-4" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-semibold">{item.bank} • {item.category}</p>
                              <p className="font-display font-recursive-mono font-bold text-sm text-[#0a0a0a]">{item.accountNumber}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(item.accountNumber)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                              isCopied
                                ? "bg-emerald-600 text-white"
                                : "bg-[#051202] text-white hover:bg-[#c88a04]"
                            }`}
                          >
                            {isCopied ? "Copied" : "Copy"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </form>
            ) : (
              /* Success / Payment Gateway State */
              <div className="w-full flex flex-col items-center text-center gap-6 py-6">
                <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                  <Check className="size-8" />
                </div>
                <div>
                  <h4 className="font-display font-recursive-sans font-bold text-2xl text-[#0a0a0a] mb-2">
                    Payment Gateway Initiated
                  </h4>
                  <p className="text-gray-600 text-base max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-black">{firstName}</span>! Your giving of{" "}
                    <span className="font-bold text-black">{currency} {amount}</span> for{" "}
                    <span className="font-semibold text-black">{givingType}</span> has been logged.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 w-full text-left text-sm space-y-2">
                  <p><span className="text-gray-500">Name:</span> <span className="font-medium text-black">{firstName} {lastName}</span></p>
                  {email && <p><span className="text-gray-500">Email:</span> <span className="font-medium text-black">{email}</span></p>}
                  <p><span className="text-gray-500">Country:</span> <span className="font-medium text-black">{country}</span></p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="flex-1 py-3 px-6 rounded-full border border-gray-300 hover:bg-gray-50 font-semibold text-gray-700 text-sm transition-colors cursor-pointer"
                  >
                    Back to form
                  </button>
                  <button
                    type="button"
                    onClick={resetModal}
                    className="flex-1 py-3 px-6 rounded-full bg-[#180c62] hover:bg-[#251394] text-white font-semibold text-sm transition-colors cursor-pointer shadow-md"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
