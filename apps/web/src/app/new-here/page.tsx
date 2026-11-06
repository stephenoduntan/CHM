import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";
import { NewHereHero } from "@/components/sections/NewHereHero";

export const metadata = {
  title: "New Here",
  description: "Welcome to RCCG Court of His Majesty. Here is what to expect on your first visit.",
};

interface MissionVisionItem {
  num: string;
  text: string;
  nodeId: string;
  orderClass: string;
}

const MISSION_VISION_POINTS: MissionVisionItem[] = [
  {
    num: "01",
    text: "To make heaven",
    nodeId: "2086:352",
    orderClass: "order-1 lg:order-1",
  },
  {
    num: "04",
    text: "To accomplish No. 1 above, holiness will be our lifestyle.",
    nodeId: "2086:357",
    orderClass: "order-4 lg:order-2",
  },
  {
    num: "02",
    text: "To take as many people with us.",
    nodeId: "2086:362",
    orderClass: "order-2 lg:order-3",
  },
  {
    num: "05",
    text: "To accomplish No. 2 and 3 above, we will plant churches within five minutes walking distance in every city and town of developing countries and within five minutes driving distance in every city and town of developed countries.",
    nodeId: "2086:367",
    orderClass: "order-5 lg:order-4",
  },
  {
    num: "03",
    text: "To have a member of RCCG in every family of all nations.",
    nodeId: "2086:372",
    orderClass: "order-3 lg:order-5",
  },
  {
    num: "06",
    text: "We will pursue these objectives until every Nation in the world is reached for the Lord Jesus Christ.",
    nodeId: "2086:377",
    orderClass: "order-6 lg:order-6",
  },
];

const missionLocations = [
  { name: "Lafenwa", region: "Ogun State Mission Field" },
  { name: "Ipatira", region: "Community Outreach Center" },
  { name: "Ilogbo", region: "Community Outreach Center" },
  { name: "Salala", region: "Rural Evangelism Field, Oman" },
];

interface ExpectationItem {
  icon: string;
  title: string;
  desc: string;
  nodeId: string;
  iconNodeId: string;
  titleNodeId: string;
  descNodeId: string;
}

const EXPECTATIONS: ExpectationItem[] = [
  {
    icon: "/images/icons/coat-fill.svg",
    title: "Come as you are",
    desc: "Dress how you feel is most comfortable. You’ll see people dressed casually as well as dressy.",
    nodeId: "2086:480",
    iconNodeId: "2092:3554",
    titleNodeId: "2086:483",
    descNodeId: "2086:485",
  },
  {
    icon: "/images/icons/car-fill.svg",
    title: "Parking",
    desc: "Our Parking team will help guide you to a space to make your experience as easy as possible.",
    nodeId: "2086:486",
    iconNodeId: "2092:3556",
    titleNodeId: "2086:489",
    descNodeId: "2086:491",
  },
  {
    icon: "/images/icons/clock-fill.svg",
    title: "Service Flow",
    desc: "Our services start with worship, followed by a message from God's Word.",
    nodeId: "2086:492",
    iconNodeId: "2092:3552",
    titleNodeId: "2086:495",
    descNodeId: "2086:497",
  },
  {
    icon: "/images/icons/baby-fill.svg",
    title: "For Your Kids",
    desc: "Age-appropriate services are available for kids 6 weeks to 12 years of age.",
    nodeId: "2086:498",
    iconNodeId: "2092:3558",
    titleNodeId: "2086:501",
    descNodeId: "2086:503",
  },
  {
    icon: "/images/icons/hat-graduation-fill.svg",
    title: "For Students",
    desc: "We offer weekly meetings for Middle and High School students on Wednesday evenings.",
    nodeId: "2086:509",
    iconNodeId: "2092:3560",
    titleNodeId: "2086:512",
    descNodeId: "2086:514",
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
              className="w-full lg:w-[560px] min-h-[380px] sm:min-h-[480px] lg:min-h-[766px] relative bg-[#051202] rounded-[20px] hidden sm:block shrink-0 overflow-hidden self-stretch before:content-[''] before:absolute before:inset-0 before:bg-[image:var(--radial-pattern)] before:opacity-20 before:pointer-events-none"
              style={{
                ['--radial-pattern' as any]:
                'repeating-radial-gradient(circle at 70% 20%, rgba(159, 195, 230, 0.14) 0 1px transparent 1px 28px)',
              }}
              data-node-id="2086:337"
              data-name="Frame 2085668955"
            >
              <Image
                src="/images/new-here/Pst. Fred.webp"
                alt="Pastor Fred Odekhian, Pastor-in-Charge of Province (PICP), Lagos Province 94 HQ"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover object-center pointer-events-none transform scale-120 hover:scale-125 transition-transform duration-500 top-0 sm:top-[35%] md:top-[0]"
                priority
              />

              <div className="absolute bottom-4 left-4 p-4 lg:p-[24px] bg-white/50 border border-white/50 backdrop-blur-sm rounded-[12px] lg:rounded-[20px] flex flex-col gap-1 lg:gap-2 items-start justify-center" data-node-id="2086:338" data-name="PICP Portrait"
              >
                
                <p className="text-[#051202] text-lg md:text-3xl font-semibold">
                  Pastor Fred Odekhian
                </p>
                <span className="text-gray-800 text-sm sm:text-md font-normal">
                  Pastor-in-Charge of Province (PICP), Lagos Province 94 HQ
                </span>
              </div>
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
                  className="font-sans font-semibold text-md sm:text-lg lg:text-[24px] text-[#3d3d3d] uppercase tracking-wide"
                  data-node-id="2086:340"
                >
                  A Place Where You Belong
                </p>
                <h2
                  className="font-display font-recursive-sans font-semibold text-xl sm:text-2xl md:text-3xl lg:text-[40px] text-[#0a0a0a] leading-[1.15] tracking-tight"
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

      {/* ─── Mission & Vision Section (Figma Node 2086:345) ───────── */}
      <section
        className="w-full bg-white py-16 sm:py-20 lg:py-[64px]"
        data-node-id="2086:345"
        data-name="explore"
      >
        <Container className="max-w-[1440px]">
          <div
            className="flex flex-col gap-8 lg:gap-[40px] items-start w-full"
            data-node-id="2086:346"
          >
            {/* Heading & Subtitle Block (Figma Node 2086:347) */}
            <div
              className="flex flex-col gap-4 lg:gap-[16px] items-start w-full"
              data-node-id="2086:347"
            >
              <h2
                className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl lg:text-[36px] text-[#0a0a0a] leading-tight"
                data-node-id="2086:349"
                style={{ fontVariationSettings: '"CASL" 0, "CRSV" 0.5, "MONO" 0' }}
              >
                Our Mission & Vision
              </h2>
              <p
                className="font-sans font-normal text-base sm:text-lg lg:text-[24px] text-[#242424] leading-relaxed"
                data-node-id="2086:350"
              >
                As received by the General Overseer (G.O.), Pastor E. A. Adeboye,
                and communicated to the Headquarters leaders, our vision and
                mission statement shall remain intact. They are as follows:
              </p>
            </div>

            {/* How It Works Row / 6 Numbered Cards (Figma Node 2086:351) */}
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-x-[40px] gap-y-10 lg:gap-y-[40px] w-full"
              data-node-id="2086:351"
              data-name="How it works row"
            >
              {MISSION_VISION_POINTS.map((item) => (
                <div
                  key={item.num}
                  className={`border-t-4 border-[#d61812] relative flex flex-col justify-start min-h-[160px] sm:min-h-[180px] lg:h-[210px] w-full pt-[40px] sm:pt-[48px] pl-0 sm:pl-[24px] lg:pl-[48px] ${item.orderClass}`}
                  data-node-id={item.nodeId}
                >
                  {/* Background Watermark Number (Figma Node: 01, 02, etc.) */}
                  <div
                    className="absolute top-[-4px] left-0 pointer-events-none select-none opacity-25 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span
                      className="font-display font-recursive-sans font-semibold text-[80px] sm:text-[96px] text-[#8b72e3] leading-none"
                      style={{ fontVariationSettings: '"CASL" 0, "CRSV" 0.5, "MONO" 0' }}
                    >
                      {item.num}
                    </span>
                  </div>

                  {/* Foreground Content */}
                  <div className="relative z-10 w-full">
                    <p className="font-sans font-medium text-lg sm:text-xl lg:text-[24px] text-[#0a0a0a] leading-normal tracking-normal">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
      <section id="pastors" className="py-16 lg:py-24 bg-gray-50/70 border-t border-gray-200/70 scroll-mt-12">
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

      {/* ─── What to Expect Section (Figma Node 2086:475) ───────────── */}
      <section
        className="relative w-full py-20 lg:py-[84px] px-6 sm:px-8 lg:px-[24px] overflow-hidden bg-black text-white"
        data-node-id="2086:475"
        data-name="card 1"
      >
        {/* Background Image with Subtle Dark Radial & Linear Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/new-here/what-to-expect-bg.webp"
            alt="Court of His Majesty congregation worship service"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Subtle dark shade overlay combining radial vignette and linear gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(5, 18, 2, 0.76) 0%, rgba(5, 18, 2, 0.90) 65%, #051202 100%), linear-gradient(180deg, rgba(5, 18, 2, 0.88) 0%, rgba(5, 18, 2, 0.72) 45%, rgba(5, 18, 2, 0.92) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col gap-12 lg:gap-[40px] items-center">
          {/* Section Heading */}
          <div
            className="flex items-center justify-center w-full text-center"
            data-node-id="2086:477"
          >
            <h2
              className="font-display font-recursive-sans font-semibold text-3xl sm:text-4xl lg:text-[48px] text-white tracking-tight leading-normal"
              data-node-id="2086:478"
              style={{ fontVariationSettings: '"CASL" 0, "CRSV" 0.5, "MONO" 0' }}
            >
              What to Expect
            </h2>
          </div>

          {/* 5 Expectation Cards: 3 in Row 1, 2 Centered in Row 2 */}
          <div
            className="flex flex-wrap gap-8 lg:gap-[40px] items-start justify-center w-full"
            data-node-id="2086:479"
          >
            {EXPECTATIONS.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-5 sm:gap-[24px] items-start w-full md:w-[calc(50%-20px)] lg:w-[calc(33.333%-27px)] shrink-0 text-left"
                data-node-id={item.nodeId}
              >
                <div
                  className="relative size-10 shrink-0"
                  data-node-id={item.iconNodeId}
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="object-contain size-10"
                  />
                </div>

                <div
                  className="flex items-center w-full"
                  data-node-id={item.titleNodeId}
                >
                  <h3
                    className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl lg:text-[36px] text-white leading-normal"
                    style={{ fontVariationSettings: '"CASL" 0, "CRSV" 0.5, "MONO" 0' }}
                  >
                    {item.title}
                  </h3>
                </div>

                <div
                  className="flex items-start w-full"
                  data-node-id={item.descNodeId}
                >
                  <p className="font-sans font-normal text-base sm:text-lg lg:text-[24px] text-[#f5f5f5] leading-[1.4] opacity-90">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── See You Next Sunday & More About Us (Figma Node 2086:522) ─ */}
      <section
        className="w-full bg-white py-16 sm:py-20 lg:py-[64px] px-6 sm:px-8 lg:px-[64px]"
        data-node-id="2086:522"
        data-name="card 1"
      >
        <div
          className="max-w-[1440px] mx-auto w-full flex flex-col gap-12 lg:gap-[40px] items-center text-center"
          data-node-id="2086:523"
        >
          {/* Top Block: See You Next Sunday (Node 2086:524) */}
          <div
            className="flex flex-col items-center w-full"
            data-node-id="2086:524"
          >
            <div data-node-id="2086:525">
              <h2
                className="font-display font-recursive-sans font-bold text-3xl sm:text-4xl lg:text-[48px] text-[#0a0a0a] leading-tight lg:leading-[56px] text-center tracking-tight"
                data-node-id="2086:526"
                style={{ fontVariationSettings: '"CASL" 0, "CRSV" 0.5, "MONO" 0' }}
              >
                See You Next Sunday
              </h2>
            </div>

            <div
              className="max-w-[1086px] mx-auto mt-4 sm:mt-6 lg:mt-[35px]"
              data-node-id="2086:527"
            >
              <p className="font-sans font-normal text-lg sm:text-xl lg:text-[28px] text-[#3d3d3d] leading-relaxed">
                If you have any questions about who we are as a church, want to
                know more about Sunday services, or are planning to visit this
                Sunday, our team would be happy to connect with you!
              </p>
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-[35px]" data-node-id="2086:528">
              <Link
                href="/connect"
                className="inline-flex items-center justify-center rounded-[28px] px-[25px] py-[15px] bg-[#b2a1ed]/10 hover:bg-[#b2a1ed]/20 border border-[#b2a1ed] text-[#180c62] font-sans font-medium text-[16px] transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                data-node-id="2086:531"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Bottom Block: More About Us (Node 2086:533) */}
          <div
            className="flex flex-col items-center w-full pt-4 lg:pt-[10px]"
            data-node-id="2086:533"
          >
            <div data-node-id="2086:534">
              <h3
                className="font-display font-recursive-sans font-bold text-3xl sm:text-4xl lg:text-[48px] text-[#0a0a0a] leading-tight lg:leading-[56px] text-center tracking-tight"
                data-node-id="2086:535"
                style={{ fontVariationSettings: '"CASL" 0, "CRSV" 0.5, "MONO" 0' }}
              >
                More About Us
              </h3>
            </div>

            <div
              className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center mt-6 sm:mt-8 lg:mt-[35px]"
              data-node-id="2086:536"
            >
              <Link
                href="/leadership"
                className="inline-flex items-center justify-center rounded-[28px] px-[25px] py-[15px] bg-[#b2a1ed]/10 hover:bg-[#b2a1ed]/20 border border-[#b2a1ed] text-[#180c62] font-sans font-medium text-[16px] transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                data-node-id="2086:537"
              >
                Meet Our Leadership
              </Link>

              <Link
                href="/our-beliefs"
                className="inline-flex items-center justify-center rounded-[28px] px-[25px] py-[15px] bg-[#b2a1ed]/10 hover:bg-[#b2a1ed]/20 border border-[#b2a1ed] text-[#180c62] font-sans font-medium text-[16px] transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                data-node-id="2086:542"
              >
                Our Belief
              </Link>

              <Link
                href="/events"
                className="inline-flex items-center justify-center rounded-[28px] px-[25px] py-[15px] bg-[#b2a1ed]/10 hover:bg-[#b2a1ed]/20 border border-[#b2a1ed] text-[#180c62] font-sans font-medium text-[16px] transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                data-node-id="2086:547"
              >
                Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
