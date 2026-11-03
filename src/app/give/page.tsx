"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Copy, Heart, Building2, Gift, Globe, ArrowLeft, X } from "lucide-react";
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
    bank: "Polaris Bank",
    accountNumber: "4092011875",
    accountName: "RCCG NEXT LEVEL PROJECT PARTNERS ACCOUNT",
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

  // Modal states
  const [modalTab, setModalTab] = useState<"online" | "bank">("online");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [givingType, setGivingType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    setModalTab("online");
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

            {/* How It Works Steps Showcase (Figma node 2111:12078) */}
            <div
              className="flex flex-col lg:flex-row gap-10 lg:gap-[64px] items-center w-full"
              data-node-id="2111:12078"
              data-name="how it works steps"
            >
              {/* Left: Step Image */}
              <div className="w-full lg:w-[581px] shrink-0 flex justify-center">
                <div className="relative w-full h-[380px] sm:h-[500px] lg:h-[671px] rounded-[20px] overflow-hidden shadow-lg bg-[#0a0a0a]">
                  <Image
                    src="/images/give-step-image.png"
                    alt="How It Works Steps"
                    fill
                    className="object-cover rounded-[20px]"
                    priority
                  />
                </div>
              </div>

              {/* Right: 3 Steps */}
              <div className="w-full lg:w-[795px] flex flex-col gap-10 sm:gap-12 lg:gap-[64px]">
                {/* Step 1: Give Online */}
                <div
                  className="flex gap-4 sm:gap-[16px] items-start cursor-pointer group w-full"
                  onClick={() => setActiveStep(0)}
                >
                  <div
                    className={`w-[3px] rounded-full shrink-0 transition-colors duration-300 ${
                      activeStep === 0
                        ? "bg-[#d61812] h-[216px]"
                        : "bg-[#e6e8eb] h-[216px]"
                    }`}
                  />
                  <div className="flex-1 flex flex-col gap-8 sm:gap-[40px] items-start justify-center">
                    <div className="flex flex-col gap-4 sm:gap-[24px] items-start w-full">
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
                      className="bg-[#c88a04] hover:bg-[#b07903] text-[#0a0a0a] font-sans font-semibold text-base sm:text-[18px] px-8 sm:px-[40px] py-3.5 sm:py-[16px] rounded-[36px] transition-all cursor-pointer shadow-sm hover:shadow-md shrink-0"
                    >
                      Click here to Give
                    </button>
                  </div>
                </div>

                {/* Step 2: Give In Person */}
                <div
                  className="flex gap-4 sm:gap-[16px] items-start cursor-pointer group w-full"
                  onClick={() => setActiveStep(1)}
                >
                  <div
                    className={`w-[3px] rounded-full shrink-0 transition-colors duration-300 ${
                      activeStep === 1
                        ? "bg-[#d61812] h-[87px]"
                        : "bg-[#e6e8eb] h-[87px]"
                    }`}
                  />
                  <div className="flex-1 flex flex-col gap-4 sm:gap-[24px] items-start justify-center">
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
                  className="flex gap-4 sm:gap-[16px] items-start cursor-pointer group w-full"
                  onClick={() => setActiveStep(2)}
                >
                  <div
                    className={`w-[3px] rounded-full shrink-0 transition-colors duration-300 ${
                      activeStep === 2
                        ? "bg-[#d61812] h-[145px]"
                        : "bg-[#e6e8eb] h-[145px]"
                    }`}
                  />
                  <div className="flex-1 flex flex-col gap-4 sm:gap-[24px] items-start">
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
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-hidden"
          onClick={resetModal}
        >
          <div
            className="bg-white rounded-[20px] max-w-[620px] w-full max-h-[85vh] sm:max-h-[82vh] shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            data-node-id="2086:1821"
            data-name="Give"
          >
            {/* Pinned Top Header with Segmented Tab Switcher & Close Button */}
            <div className="flex items-center justify-between px-4 sm:px-8 pt-4 pb-3.5 shrink-0 border-b border-gray-100 bg-white z-10 gap-2 sm:gap-3" data-node-id="2094:5813">
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
                onClick={resetModal}
                className="size-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                data-node-id="2094:5814"
                data-name="fluent:dismiss-16-filled"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5" data-node-id="2086:1824">
              {modalTab === "online" ? (
                /* ─── Online Giving Form View ─── */
                !isSubmitted ? (
                  <form id="give-form" onSubmit={handlePaymentSubmit} className="w-full flex flex-col gap-5 sm:gap-6">
                    {/* Header Title */}
                    <div className="w-full" data-node-id="2086:1825">
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
                    <div className="flex flex-col gap-1.5 items-start w-full" data-node-id="2086:1826">
                      <label className="font-sans font-normal text-sm sm:text-base text-black">
                        Amount
                      </label>
                      <div className="border-b border-[#d0d2d6] flex items-center justify-center py-2 w-full" data-node-id="2086:1828">
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
                    <div className="flex flex-col gap-1.5 items-start w-full" data-node-id="2086:1830">
                      <label className="font-sans font-normal text-sm sm:text-base text-black">
                        Currency <span className="text-red-500">*</span>
                      </label>
                      <div className="relative w-full" data-node-id="2086:1832">
                        <select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          required
                          className="w-full appearance-none border border-[#d0d2d6] rounded-[8px] p-3 text-sm sm:text-base text-black bg-white outline-none focus:border-[#180c62] pr-10 cursor-pointer"
                        >
                          <option value="NGN">NGN (₦) - Nigerian Naira</option>
                          <option value="USD">USD ($) - US Dollar</option>
                          <option value="GBP">GBP (£) - British Pound</option>
                          <option value="EUR">EUR (€) - Euro</option>
                          <option value="CAD">CAD ($) - Canadian Dollar</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400" data-name="fluent:chevron-down-20-filled">
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
                    <div className="flex flex-col gap-1.5 items-start w-full" data-node-id="2086:1836">
                      <label className="font-sans font-normal text-sm sm:text-base text-black">
                        Type <span className="text-red-500">*</span>
                      </label>
                      <div className="relative w-full" data-node-id="2086:1838">
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
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400" data-name="fluent:chevron-down-20-filled">
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
                    <div className="flex flex-col gap-1.5 items-start w-full" data-node-id="2086:1842">
                      <label className="font-sans font-normal text-sm sm:text-base text-black">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <div className="border border-[#d0d2d6] rounded-[8px] p-3 w-full" data-node-id="2086:1844">
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
                    <div className="flex flex-col gap-1.5 items-start w-full" data-node-id="2086:1848">
                      <label className="font-sans font-normal text-sm sm:text-base text-black">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <div className="border border-[#d0d2d6] rounded-[8px] p-3 w-full" data-node-id="2086:1850">
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
                    <div className="flex flex-col gap-1.5 items-start w-full" data-node-id="2086:1854">
                      <label className="font-sans font-normal text-sm sm:text-base text-black">
                        Email
                      </label>
                      <div className="border border-[#d0d2d6] rounded-[8px] p-3 w-full" data-node-id="2086:1856">
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
                    <div className="flex flex-col gap-1.5 items-start w-full" data-node-id="2086:1860">
                      <label className="font-sans font-normal text-sm sm:text-base text-black">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <div className="relative w-full" data-node-id="2086:1862">
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
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400" data-name="fluent:chevron-down-20-filled">
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

                    {/* Quick switch to Direct Bank Transfer */}
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
                        onClick={resetModal}
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
                    {bankAccounts.map((item) => {
                      const Icon = item.icon;
                      const isCopied = copiedAccount === item.accountNumber;
                      return (
                        <div
                          key={item.category}
                          className="p-3.5 sm:p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-[#180c62]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-sm"
                        >
                          <div className="flex items-start gap-3">
                            <div className="size-10 rounded-xl bg-[#051202] text-[#f0a505] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                              <Icon className="size-5" />
                            </div>
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
                  form="give-form"
                  className="bg-[#180c62] hover:bg-[#251394] text-white font-sans font-semibold text-base h-[50px] sm:h-[54px] rounded-[36px] w-full flex items-center justify-center transition-all cursor-pointer shadow-md hover:shadow-lg"
                  data-node-id="2086:1866"
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
                  onClick={resetModal}
                  className="px-6 py-2.5 rounded-full bg-[#180c62] hover:bg-[#251394] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
