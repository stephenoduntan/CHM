import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CathedralGivingBox } from "@/components/sections/cathedral/CathedralGivingBox";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Next Level Cathedral",
  description:
    "The new auditorium project for RCCG Court of His Majesty. A vision for a place to worship, belong and grow together.",
};

export default function NextLevelCathedralPage() {
  return (
    <div className="w-full bg-white select-none">
      {/* ── 1. Hero Section ────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-[#f5f5f5]"
        data-node-id="2103:9172"
        data-name="hero"
      >
        {/* Background Architectural Render with Figma Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          data-node-id="2111:11263"
        >
          <Image
            src="/images/cathedral/cathedral-hero-full.png"
            alt="Next Level Cathedral building render"
            fill
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
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

        <Container className="max-w-[1440px] relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-16 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-[96px] lg:pb-[80px]">
            {/* Left Column: Project Introduction */}
            <div
              className="flex flex-col items-start gap-6 lg:gap-7 w-full lg:max-w-3xl"
              data-node-id="2103:9290"
              data-name="Project introduction"
            >
              <p
                className="font-sans italic text-[#0a0a0a] text-xl sm:text-[22px] tracking-normal"
                data-node-id="2103:9291"
              >
                Be a part of the
              </p>

              <h1
                className="font-display font-recursive-sans font-semibold text-3xl sm:text-5xl lg:text-[56px] leading-[1.15] text-[#0a0a0a] uppercase tracking-tight"
                data-node-id="2103:9292"
                style={{ fontVariationSettings: '"CASL" 0, "CRSV" 0.5, "MONO" 0' }}
              >
                NEXT LEVEL CATHEDRAL
              </h1>

              <div
                className="w-[124px] h-[6px] bg-[#d61812] rounded-full"
                data-node-id="2103:9293"
                data-name="Heading underline"
              />

              <p
                className="font-sans text-[#3d3d3d] text-lg sm:text-xl lg:text-[24px] leading-[1.6] max-w-2xl"
                data-node-id="2103:9294"
              >
                The new auditorium project for RCCG Court of His Majesty. A vision
                for a place to worship, belong and grow together.
              </p>

              {/* Action Buttons */}
              <div
                className="flex flex-wrap gap-4 items-center pt-2"
                data-node-id="2103:9295"
                data-name="Project actions"
              >
                <a
                  href="#vision"
                  className="bg-[#b2a1ed]/10 border border-[#b2a1ed] text-[#180c62] hover:bg-[#b2a1ed]/20 transition-all rounded-[28px] px-6 py-3.5 sm:px-7 sm:py-4 font-semibold text-base sm:text-[18px] flex items-center gap-2 group cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                  data-node-id="2103:9296"
                  data-name="Action"
                >
                  <span data-node-id="2103:9297">Explore the vision</span>
                  <div
                    className="relative size-5 shrink-0 transition-transform group-hover:translate-x-1"
                    data-node-id="2103:9298"
                  >
                    <Image
                      src="/images/cathedral/action-arrow.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </a>

                <a
                  href="#partner"
                  className="bg-[#b2a1ed]/10 border border-[#b2a1ed] text-[#180c62] hover:bg-[#b2a1ed]/20 transition-all rounded-[28px] px-6 py-3.5 sm:px-7 sm:py-4 font-semibold text-base sm:text-[18px] flex items-center gap-2 group cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                  data-node-id="2103:9299"
                  data-name="Action"
                >
                  <span data-node-id="2103:9300">Ways to partner</span>
                  <div
                    className="relative size-5 shrink-0 transition-transform group-hover:translate-x-1"
                    data-node-id="2103:9301"
                  >
                    <Image
                      src="/images/cathedral/action-arrow.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Floating Vision Statement Disclaimer Card */}
            <div
              className="w-full lg:max-w-[560px] shrink-0"
              data-node-id="2103:9321"
            >
              <div
                className="bg-[#051202] rounded-[16px] p-8 sm:p-10 shadow-[0px_0px_16px_0px_rgba(10,10,10,0.15)] text-white flex flex-col gap-3 w-full border border-white/5"
                data-node-id="2103:9311"
                data-name="Vision statement"
              >
                <div
                  className="flex flex-col gap-3 items-start w-full"
                  data-node-id="2103:9313"
                  data-name="Vision status"
                >
                  <p
                    className="font-semibold text-base sm:text-[16px] text-[#f5f5f5]"
                    data-node-id="2103:9314"
                  >
                    Proposed vision
                  </p>
                  <p
                    className="font-normal text-sm sm:text-[16px] leading-[1.5] text-[#e8e8e8]/90"
                    data-node-id="2103:9315"
                  >
                    An expression of purpose, not an architectural rendering or an
                    approved building specification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. Project Vision Section ──────────────────────────────── */}
      <section
        id="vision"
        className="w-full bg-[#f5f5f5] py-20 lg:pt-[80px] lg:pb-[72px] border-b border-[#e5e5e5]"
        data-node-id="2103:9451"
        data-name="Project vision"
      >
        <Container className="max-w-[1440px]">
          {/* Vision Introduction: 2-Column Layout */}
          <div
            className="flex flex-col lg:flex-row gap-8 lg:gap-[96px] items-start w-full"
            data-node-id="2103:9452"
            data-name="Vision introduction"
          >
            <div
              className="flex flex-col gap-4 items-start w-full lg:w-[520px] shrink-0"
              data-node-id="2103:9453"
              data-name="Vision heading"
            >
              <p
                className="font-semibold text-[#616161] text-sm sm:text-base lg:text-[18px] uppercase tracking-wider"
                data-node-id="2103:9454"
              >
                The heart behind the project
              </p>
              <h2
                className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl lg:text-[40px] leading-[1.2] text-[#0a0a0a]"
                data-node-id="2103:9455"
              >
                More than a building. A place for people.
              </h2>
            </div>

            <div
              className="flex flex-col gap-5 text-[#3d3d3d] text-base sm:text-lg lg:text-[20px] leading-[1.6] w-full"
              data-node-id="2103:9456"
              data-name="Vision description"
            >
              <p data-node-id="2103:9457">
                At Court of His Majesty, our desire is to see lives impacted and
                communities changed. The Next Level Cathedral is our new
                auditorium project, rooted in that same heart for people.
              </p>
              <p data-node-id="2103:9458">
                The ideas below describe the purpose we hope this new space will
                serve. They are a proposed ministry vision, not confirmed
                facilities or construction commitments.
              </p>
            </div>
          </div>

          {/* Vision Pillars (3 Cards) */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12 lg:mt-16"
            data-node-id="2103:9459"
            data-name="Vision pillars"
          >
            {/* Pillar 1: Gather in worship */}
            <div
              className="border border-[#d0d2d6] rounded-[16px] p-8 flex flex-col gap-6 bg-white/70 backdrop-blur-sm hover:border-[#180c62]/30 hover:shadow-md transition-all duration-300"
              data-node-id="2103:9460"
              data-name="Vision pillar"
            >
              <div
                className="relative size-10 shrink-0"
                data-node-id="2103:9461"
                data-name="church"
              >
                <Image
                  src="/images/cathedral/icon-church.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="block size-10"
                />
              </div>
              <h3
                className="font-semibold text-xl sm:text-2xl lg:text-[28px] text-[#0a0a0a] leading-[1.2]"
                data-node-id="2103:9463"
              >
                Gather in worship
              </h3>
              <p
                className="text-[#616161] text-base lg:text-[18px] leading-[1.6]"
                data-node-id="2103:9464"
              >
                A vision for an auditorium where our church family can come
                together in prayer, praise and the teaching of God’s Word.
              </p>
            </div>

            {/* Pillar 2: Grow in community */}
            <div
              className="border border-[#d0d2d6] rounded-[16px] p-8 flex flex-col gap-6 bg-white/70 backdrop-blur-sm hover:border-[#180c62]/30 hover:shadow-md transition-all duration-300"
              data-node-id="2103:9465"
              data-name="Vision pillar"
            >
              <div
                className="relative size-10 shrink-0"
                data-node-id="2103:9466"
                data-name="users"
              >
                <Image
                  src="/images/cathedral/icon-users.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="block size-10"
                />
              </div>
              <h3
                className="font-semibold text-xl sm:text-2xl lg:text-[28px] text-[#0a0a0a] leading-[1.2]"
                data-node-id="2103:9468"
              >
                Grow in community
              </h3>
              <p
                className="text-[#616161] text-base lg:text-[18px] leading-[1.6]"
                data-node-id="2103:9469"
              >
                A hope for a welcoming home where people can find belonging and
                build relationships across generations.
              </p>
            </div>

            {/* Pillar 3: Make a difference */}
            <div
              className="border border-[#d0d2d6] rounded-[16px] p-8 flex flex-col gap-6 bg-white/70 backdrop-blur-sm hover:border-[#180c62]/30 hover:shadow-md transition-all duration-300"
              data-node-id="2103:9470"
              data-name="Vision pillar"
            >
              <div
                className="relative size-10 shrink-0"
                data-node-id="2103:9471"
                data-name="heart-handshake"
              >
                <Image
                  src="/images/cathedral/icon-heart-handshake.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="block size-10"
                />
              </div>
              <h3
                className="font-semibold text-xl sm:text-2xl lg:text-[28px] text-[#0a0a0a] leading-[1.2]"
                data-node-id="2103:9473"
              >
                Make a difference
              </h3>
              <p
                className="text-[#616161] text-base lg:text-[18px] leading-[1.6]"
                data-node-id="2103:9474"
              >
                An aspiration to equip people to serve and carry the love of Christ
                into everyday life and the wider community.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3. Project Partnership & Giving Section ─────────────────── */}
      <section
        id="partner"
        className="w-full bg-[#051202] text-white py-20 lg:pt-[80px] lg:pb-[80px] relative overflow-hidden"
        data-node-id="2103:9617"
      >
        <Container className="max-w-[1440px] relative z-10 flex flex-col gap-14 lg:gap-16">
          {/* Section Heading & Ways to Partner */}
          <div
            className="flex flex-col gap-10 items-start w-full"
            data-node-id="2103:9485"
            data-name="Project partnership"
          >
            <div
              className="flex flex-col gap-4 items-start w-full"
              data-node-id="2103:9486"
              data-name="Section heading"
            >
              <h2
                className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl lg:text-[40px] leading-[1.2] text-[#f5f5f5]"
                data-node-id="2103:9487"
              >
                Be part of the vision
              </h2>
              <div
                className="bg-[#f5f5f5] h-[5px] w-[124px] rounded-full"
                data-node-id="2103:9488"
                data-name="Heading underline"
              />
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 w-full"
              data-node-id="2103:9489"
              data-name="Ways to partner"
            >
              {/* Option 1: Pray with us */}
              <div
                className="flex flex-col gap-4 items-start"
                data-node-id="2103:9490"
                data-name="Partnership option"
              >
                <h3
                  className="font-semibold text-xl sm:text-2xl lg:text-[28px] leading-[1.2] text-[#f5f5f5]"
                  data-node-id="2103:9491"
                >
                  Pray with us
                </h3>
                <p
                  className="text-[#e3e3e3] text-base sm:text-lg lg:text-[19px] leading-[1.6]"
                  data-node-id="2103:9492"
                >
                  Pray for wisdom, faithful stewardship and a project that serves
                  people and honours God.
                </p>
              </div>

              {/* Option 2: Stay connected */}
              <div
                className="flex flex-col gap-4 items-start"
                data-node-id="2103:9493"
                data-name="Partnership option"
              >
                <h3
                  className="font-semibold text-xl sm:text-2xl lg:text-[28px] leading-[1.2] text-[#f5f5f5]"
                  data-node-id="2103:9494"
                >
                  Stay connected
                </h3>
                <p
                  className="text-[#e3e3e3] text-base sm:text-lg lg:text-[19px] leading-[1.6]"
                  data-node-id="2103:9495"
                >
                  Follow official church announcements and ask the church office
                  about the latest project information.
                </p>
              </div>

              {/* Option 3: Give towards the project */}
              <div
                className="flex flex-col gap-4 items-start"
                data-node-id="2103:9496"
                data-name="Partnership option"
              >
                <h3
                  className="font-semibold text-xl sm:text-2xl lg:text-[28px] leading-[1.2] text-[#f5f5f5]"
                  data-node-id="2103:9497"
                >
                  Give towards the project
                </h3>
                <p
                  className="text-[#e3e3e3] text-base sm:text-lg lg:text-[19px] leading-[1.6]"
                  data-node-id="2103:9498"
                >
                  If you choose to give, use the church’s project giving
                  information and confirm the details before transferring.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Giving Details Box */}
          <CathedralGivingBox />
        </Container>
      </section>

      {/* ── 4. Questions About the Project ─────────────────────────── */}
      <section
        className="w-full bg-white py-20 lg:pt-[80px] lg:pb-[96px]"
        data-node-id="2103:9519"
        data-name="Project questions"
      >
        <Container className="max-w-[1440px]">
          <div
            className="flex flex-col gap-4 items-start w-full mb-12"
            data-node-id="2103:9520"
            data-name="Section heading"
          >
            <h2
              className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl lg:text-[40px] leading-[1.2] text-[#0a0a0a]"
              data-node-id="2103:9521"
            >
              Questions about the project
            </h2>
            <div
              className="bg-[#d61812] h-[5px] w-[124px] rounded-full"
              data-node-id="2103:9522"
              data-name="Heading underline"
            />
          </div>

          <div className="flex flex-col w-full divide-y divide-[#d0d2d6]">
            {/* Question 1 */}
            <div
              className="pt-7 pb-8 grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-4 lg:gap-20 items-start"
              data-node-id="2103:9523"
              data-name="Project question"
            >
              <h3
                className="font-semibold text-lg sm:text-xl lg:text-[24px] leading-[1.4] text-[#0a0a0a]"
                data-node-id="2103:9524"
              >
                What is the Next Level Cathedral?
              </h3>
              <p
                className="text-[#242424] text-base sm:text-lg lg:text-[20px] leading-[1.6]"
                data-node-id="2103:9525"
              >
                It is the new auditorium project for RCCG Court of His Majesty.
                The purpose described on this page is a proposed vision for
                worship, community and service.
              </p>
            </div>

            {/* Question 2 */}
            <div
              className="pt-7 pb-8 grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-4 lg:gap-20 items-start"
              data-node-id="2103:9526"
              data-name="Project question"
            >
              <h3
                className="font-semibold text-lg sm:text-xl lg:text-[24px] leading-[1.4] text-[#0a0a0a]"
                data-node-id="2103:9527"
              >
                Where can I find confirmed plans and updates?
              </h3>
              <p
                className="text-[#242424] text-base sm:text-lg lg:text-[20px] leading-[1.6]"
                data-node-id="2103:9528"
              >
                Please contact the church office or use the project update QR
                code above. This page does not confirm architectural plans,
                construction milestones or a completion date.
              </p>
            </div>

            {/* Question 3 */}
            <div
              className="pt-7 pb-8 grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-4 lg:gap-20 items-start"
              data-node-id="2103:9529"
              data-name="Project question"
            >
              <h3
                className="font-semibold text-lg sm:text-xl lg:text-[24px] leading-[1.4] text-[#0a0a0a]"
                data-node-id="2103:9530"
              >
                How can I ask a question about giving?
              </h3>
              <p
                className="text-[#242424] text-base sm:text-lg lg:text-[20px] leading-[1.6]"
                data-node-id="2103:9531"
              >
                Speak with the church office on {SITE_CONFIG.phone} or ask a member
                of the team when you visit. Confirm the account information
                directly before transferring.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

