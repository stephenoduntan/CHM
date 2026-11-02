import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";

export function CathedralSection() {
  return (
    <section
      className="relative w-full py-16 sm:py-24 lg:py-32 xl:py-[160px] overflow-hidden flex items-center justify-center bg-[#f5f5f5] select-none"
      data-node-id="2086:244"
      data-name="next cathedral project"
    >
      {/* ── Background Architectural Render & Atmospheric Gradient Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        data-node-id="2086:245"
      >
        <Image
          src="/images/cathedral/cathedral-bg.png"
          alt="Next Level Cathedral architectural render"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/50 via-[#bfbfbf]/85 to-[#f5f5f5]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(191, 191, 191, 0.85) 50%, #f5f5f5 100%)",
          }}
        />
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

      {/* ── Main Content Container ── */}
      <Container className="max-w-[1440px] relative z-10 w-full">
        <div
          className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 lg:gap-16 w-full"
          data-node-id="2086:248"
        >
          {/* Left Column: Heading, Red Accent Line & CTA Button */}
          <div
            className="flex flex-col gap-6 lg:gap-[35px] items-start w-full lg:max-w-2xl"
            data-node-id="2086:249"
          >
            <div
              className="flex flex-col gap-3 lg:gap-4 items-start"
              data-node-id="2086:250"
            >
              <p
                className="font-sans font-medium text-[#242424] text-xl sm:text-2xl lg:text-[28px] tracking-normal"
                data-node-id="2086:251"
              >
                Be a part of the
              </p>

              <h2
                className="font-display font-recursive-sans font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-[#0a0a0a] leading-tight lg:leading-[56px] tracking-tight uppercase"
                data-node-id="2086:252"
                style={{ fontVariationSettings: '"CASL" 0, "CRSV" 0.5, "MONO" 0' }}
              >
                NEXT LEVEL CATHEDRAL
              </h2>

              <div
                className="w-[124px] h-[6px] relative"
                data-node-id="2086:253"
              >
                <Image
                  src="/images/cathedral/cathedral-line.svg"
                  alt=""
                  width={124}
                  height={6}
                  className="block w-[124px] h-[6px]"
                />
              </div>
            </div>

            <Link
              href="/next-level-cathedral"
              className="inline-flex items-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 rounded-[28px] bg-[#b2a1ed]/10 hover:bg-[#b2a1ed]/20 border border-[#b2a1ed] transition-all duration-200 group cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              data-node-id="2111:12509"
              data-name="View all sermons"
            >
              <span
                className="font-sans font-medium text-sm sm:text-base text-[#180c62] tracking-wide"
                data-node-id="2111:12510"
              >
                Learn more
              </span>
              <div
                className="relative size-5 sm:size-6 flex items-center justify-center group-hover:translate-x-1 transition-transform"
                data-node-id="2111:12511"
                data-name="View all arrow"
              >
                <Image
                  src="/images/cathedral/cathedral-arrow.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="size-5 sm:size-6"
                />
              </div>
            </Link>
          </div>

          {/* Right Column: QR Code Card & Subtext */}
          <div
            className="flex flex-col gap-4 sm:gap-5 items-center lg:items-start shrink-0 w-full sm:w-[340px]"
            data-node-id="2086:259"
          >
            {/* Frosted Glass Outer Container */}
            <div
              className="w-full h-[280px] sm:h-[320px] p-3 rounded-[20px] bg-[#1b1b1b]/20 backdrop-blur-md border border-white/30 shadow-xl flex items-center justify-center"
              data-node-id="2086:260"
            >
              {/* Crisp White Inner QR Box */}
              <div
                className="w-full h-full bg-white rounded-[16px] p-4 flex items-center justify-center relative shadow-sm"
                data-node-id="2086:261"
                data-name="image 5"
              >
                <Image
                  src="/images/cathedral/cathedral-qr.png"
                  alt="Scan QR code for project updates"
                  width={280}
                  height={280}
                  className="size-full object-contain"
                  priority
                />
              </div>
            </div>

            {/* Explanatory Caption */}
            <div
              className="w-full text-center lg:text-left"
              data-node-id="2086:262"
            >
              <p
                className="font-sans font-medium text-base sm:text-lg lg:text-[20px] text-[#242424] leading-snug"
                data-node-id="2086:263"
              >
                Scan QR code to get more update on the project
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
