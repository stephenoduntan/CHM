import Image from "next/image";
import Link from "next/link";
import { Play, Sparkles, Car, Clock, Baby, GraduationCap, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";

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
      {/* ─── Hero Section with Video Accent ───────────────────────── */}
      <section className="relative min-h-[500px] lg:min-h-[580px] bg-[#051202] text-white flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1920"
          alt="Welcome to Court of His Majesty"
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051202] via-[#051202]/70 to-transparent" />

        <Container className="relative z-10 text-center py-20">
          <div className="inline-flex items-center justify-center size-20 md:size-24 rounded-full bg-white/20 hover:bg-[#c8a96e] backdrop-blur-md text-white transition-all cursor-pointer mb-8 group shadow-xl">
            <Play className="size-8 md:size-10 fill-current translate-x-0.5 group-hover:scale-110 transition-transform" />
          </div>

          <h1 className="font-display font-recursive-sans text-2xl sm:text-4xl md:text-5xl font-extrabold max-w-3xl mx-auto leading-tight text-white mb-4">
            Know God, Find Freedom, Discover Purpose, Make a Difference
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto font-normal">
            Whether you are exploring faith or looking for a church family to call home, there is a place for you here.
          </p>
        </Container>
      </section>

      {/* ─── A Place Where You Belong ─────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative h-[420px] sm:h-[500px] rounded-[32px] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1000"
                alt="Church Family"
                fill
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-7">
              <p className="font-display font-recursive-mono italic text-lg sm:text-xl text-[#c8a96e] mb-2">
                A Place Where You Belong
              </p>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-[#051202] leading-tight mb-6">
                We&apos;re so glad you&apos;re thinking about visiting Court of His Majesty
              </h2>
              <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed">
                <p>
                  We know that if this is your first time in church, you may be wondering what it will feel like:
                  <em className="text-gray-900 font-medium"> &apos;Will I fit in?&apos;, &apos;I won&apos;t know what to do&apos;, &apos;What if I get ignored?&apos;</em>
                </p>
                <p>
                  You might feel shy or anxious, but there is no need to worry—you are guaranteed a warm, loving welcome!
                  Our ministers and hospitality team will guide you, nothing will be asked of you, and you can engage at your own pace.
                </p>
                <p className="font-medium text-[#051202]">
                  We believe church is family. Our passion is to show people God&apos;s love and create an environment where you can experience His transformative power!
                </p>
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

