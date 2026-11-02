import Image from "next/image";
import Link from "next/link";
import { Sparkles, Car, Clock, Baby, GraduationCap, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";
import { NewHereHero } from "@/components/sections/NewHereHero";

export const metadata = {
  title: "New Here",
  description: "Welcome to RCCG Court of His Majesty. Here is what to expect on your first visit.",
};

const missionVisionPoints = [
  {
    num: "01",
    title: "To make heaven",
    desc: "Our primary objective as followers of Christ.",
  },
  {
    num: "02",
    title: "To take as many people with us",
    desc: "Fulfilling the great commission through passionate evangelism.",
  },
  {
    num: "03",
    title: "To have a member of RCCG in every family of all nations",
    desc: "Impacting households everywhere with the gospel of hope.",
  },
  {
    num: "04",
    title: "Holiness as a lifestyle",
    desc: "To accomplish No. 1 above, holiness will be our lifestyle in all conduct.",
  },
  {
    num: "05",
    title: "Planting churches in every city and community",
    desc: "Planting churches within five minutes walking distance in developing nations and five minutes driving distance in developed countries.",
  },
  {
    num: "06",
    title: "Global Kingdom Reach",
    desc: "We will pursue these objectives until every Nation in the world is reached for the Lord Jesus Christ.",
  },
];

const missionLocations = [
  { name: "Lafenwa", region: "Ogun State Mission Field" },
  { name: "Ipatira", region: "Community Outreach Center" },
  { name: "Ilogbo", region: "Community Outreach Center" },
  { name: "Salala", region: "Rural Evangelism Field" },
];

const expectations = [
  {
    icon: Sparkles,
    title: "Come as you are",
    description:
      "Dress how you feel is most comfortable. You'll see people dressed casually as well as in traditional or formal attire.",
  },
  {
    icon: Car,
    title: "Parking",
    description:
      "Our Parking & Traffic team will guide you to an available space safely to make your arrival stress-free.",
  },
  {
    icon: Clock,
    title: "Service Flow",
    description:
      "Our services start with vibrant praise and worship, followed by an inspiring, practical message from God's Word.",
  },
  {
    icon: Baby,
    title: "For Your Kids",
    description:
      "Age-appropriate, safe, and fun Bible services are available for children from 6 weeks to 12 years of age.",
  },
  {
    icon: GraduationCap,
    title: "For Students & Teens",
    description:
      "Weekly meetings, discipleship sessions, and vibrant fellowship designed for middle school, high school, and varsity students.",
  },
];

const pastors = [
  {
    name: "Pastor & Pastor (Mrs.) Fred Odekhian",
    role: "Pastor-in-Charge of Province (PICP), Lagos Province 94 HQ",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
    isLead: true,
  },
  {
    name: "Pastor & Pastor (Mrs.) Caleb Okedere",
    role: "National Secretary, RCCG",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    isLead: false,
  },
  {
    name: "Associate Ministers & Pastoral Team",
    role: "Leadership & Congregational Care",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    isLead: false,
  },
];

export default function NewHerePage() {
  return (
    <div className="w-full bg-white pb-24">
      {/* ─── Hero Section (Figma Node 2086:330) ─────────────────── */}
      <NewHereHero />

      {/* ─── A Place Where You Belong (Figma Node 2086:334) ─────── */}
      <section
        className="w-full bg-white py-16 sm:py-20 lg:pt-[124px] lg:pb-[84px]"
        data-node-id="2086:334"
        data-name="explore"
      >
        <Container className="max-w-[1440px]">
          <div
            className="flex flex-col lg:flex-row gap-10 lg:gap-[40px] items-stretch w-full"
            data-node-id="2086:336"
            data-name="Frame 17"
          >
            {/* Left Photo Column (Figma Frame 2085668955) */}
            <div
              className="w-full lg:w-[560px] min-h-[380px] sm:min-h-[480px] lg:min-h-[766px] relative shrink-0 rounded-2xl lg:rounded-none overflow-hidden self-stretch"
              data-node-id="2086:337"
              data-name="Frame 2085668955"
            >
              <Image
                src="/images/explore/communities.jpg"
                alt="Church family fellowship and community at Court of His Majesty"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover object-center pointer-events-none"
                priority
              />
            </div>

            {/* Right Text Column (Figma Frame 2085668914) */}
            <div
              className="flex-1 max-w-[840px] flex flex-col gap-6 lg:gap-[24px] items-start justify-center text-left"
              data-node-id="2086:338"
              data-name="Frame 2085668914"
            >
              {/* Header block (Figma Frame 2085668901) */}
              <div
                className="flex flex-col gap-3 lg:gap-[16px] items-start w-full"
                data-node-id="2086:339"
                data-name="Frame 2085668901"
              >
                <p
                  className="font-sans font-semibold text-lg sm:text-xl lg:text-[24px] text-[#3d3d3d] uppercase tracking-wide"
                  data-node-id="2086:340"
                >
                  A Place Where You Belong
                </p>
                <h2
                  className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] text-[#0a0a0a] leading-[1.15] tracking-tight"
                  data-node-id="2086:341"
                >
                  <span>We&apos;re so glad you&apos;re thinking about visiting </span>
                  <span className="uppercase">Court of His Majesty</span>
                </h2>
              </div>

              {/* Body text & Signature (Figma Frame 2085668955) */}
              <div
                className="flex flex-col gap-8 lg:gap-[40px] items-start w-full"
                data-node-id="2086:342"
              >
                <div
                  className="flex flex-col gap-5 text-[#242424] text-base sm:text-lg lg:text-[20px] xl:text-[22px] leading-[1.65] font-normal"
                  data-node-id="2086:343"
                >
                  <p>
                    We know that if this is your first time in church, you may be feeling and thinking all kinds of things like: &lsquo;Will I fit in?&rsquo;, &lsquo;I won&rsquo;t know what to do&rsquo;, &lsquo;what will people say to me&rsquo;, &lsquo;what if I get ignored.&rsquo; You may feel anxious, nervous, scared or shy.
                  </p>
                  <p>
                    There is no need to worry; you will be guaranteed a warm welcome. The preacher will lead the service, nothing will be asked of you. This page will hopefully give you an idea of what to expect at Sunday morning worship.
                  </p>
                  <p>
                    We believe the church is a family. We love welcoming people home and inviting them to become part of the family. Our passion is to show people God&rsquo;s love and create an environment where they can experience His power, because we know there is no limit to what God can do!
                  </p>
                </div>

                {/* Pastor Fred Signature (Figma pic-5 1) */}
                <div
                  className="pt-2 sm:pt-4"
                  data-node-id="2086:344"
                  data-name="pic-5 1"
                >
                  <div className="relative w-[220px] sm:w-[263px] h-[88px] sm:h-[106px]">
                    <Image
                      src="/images/pastor-fred-signature.png"
                      alt="Pastor Fred Signature"
                      fill
                      sizes="263px"
                      className="object-contain object-left pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Mission & Vision (6 Numbered Points) ─────────────────── */}
      <section className="py-16 lg:py-24 bg-gray-50/70 border-y border-gray-200/70">
        <Container>
          <div className="max-w-3xl mb-14">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#051202] mb-3">
              Our Mission & Vision
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              As received by the General Overseer, Pastor E. A. Adeboye, and communicated to the leaders of RCCG, our vision and mission statement remain unwavering:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missionVisionPoints.map((item) => (
              <div
                key={item.num}
                className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <span className="font-display font-recursive-mono font-bold text-6xl text-gray-100 group-hover:text-[#c8a96e]/20 transition-colors absolute top-4 right-6 pointer-events-none">
                  {item.num}
                </span>
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#051202]/5 text-[#051202] font-semibold text-xs tracking-wider uppercase mb-4">
                    Pillar {item.num}
                  </span>
                  <h3 className="font-sans font-bold text-xl text-[#051202] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Community Mission Fields ──────────────────────────────── */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#051202] mb-8 text-center sm:text-left">
            We currently have missions in the following communities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionLocations.map((loc) => (
              <div
                key={loc.name}
                className="p-8 rounded-[24px] bg-[#051202] text-white flex flex-col justify-between min-h-[220px] shadow-lg hover:scale-[1.02] transition-transform"
              >
                <div className="size-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold text-[#c8a96e]">
                  📍
                </div>
                <div>
                  <h3 className="font-sans font-bold text-2xl mb-1 text-white">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    {loc.region}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Our Pastors ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-gray-50/70 border-t border-gray-200/70">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#051202] mb-3">
              Our Pastors & Leadership
            </h2>
            <p className="text-gray-600 text-base">
              Dedicated shepherds passionate about teaching God&apos;s word and nurturing every member.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastors.map((p) => (
              <div
                key={p.name}
                className="bg-white rounded-[28px] overflow-hidden border border-gray-100 shadow-md group"
              >
                <div className="relative h-[340px] w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#c8a96e]">
                      {p.isLead ? "Senior Pastor" : "Pastoral Minister"}
                    </span>
                    <h3 className="font-sans font-bold text-lg sm:text-xl">
                      {p.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 leading-snug font-medium">
                    {p.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── What to Expect ───────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#051202] mb-3">
              What to Expect
            </h2>
            <p className="text-gray-600 text-base">
              Here is what a typical Sunday morning looks like at Court of His Majesty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expectations.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-8 rounded-[24px] bg-gray-50 border border-gray-100 hover:border-gray-300 transition-colors"
                >
                  <div className="size-12 rounded-2xl bg-[#051202] text-[#c8a96e] flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-sans font-bold text-xl text-[#051202] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─── See You Next Sunday CTA ──────────────────────────────── */}
      <section className="py-20 bg-[#051202] text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white mb-6">
              See You Next Sunday
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
              If you have any questions about who we are as a church, want to know more about Sunday services, or are planning to visit this Sunday, our team would love to welcome you!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/connect"
                className="px-8 py-3.5 rounded-full font-semibold text-[#051202] bg-[#c8a96e] hover:bg-[#b8985c] shadow-md transition-all text-base"
              >
                Contact Us
              </Link>
              <Link
                href="/events"
                className="px-8 py-3.5 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-base"
              >
                Upcoming Programs
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
