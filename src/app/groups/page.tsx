import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = {
  title: "Groups & Fellowships",
  description: "Connect with house fellowships, age-grade ministries, and community groups at RCCG Court of His Majesty.",
};

interface GroupItem {
  id: string;
  name: string;
  tagline: string;
  watermark: [string, string];
  description: string;
  schedule: string;
  image: string;
  imageAlt: string;
  isImageLeft: boolean;
  link: string;
}

const groupsList: GroupItem[] = [
  {
    id: "house-fellowship",
    name: "House Fellowship Centers",
    tagline: "Community at your doorstep",
    watermark: ["HOUSE", "CELLS"],
    description:
      "Gathering weekly in neighborhood homes across Lagos for intimate Bible study, heartfelt worship, mutual care, and fervent prayers.",
    schedule: "Every Sunday, 5:00 PM – 6:00 PM",
    image: "/images/explore/community.webp",
    imageAlt: "House fellowship gathering at RCCG Court of His Majesty",
    isImageLeft: false,
    link: "/connect?subject=house-fellowship",
  },
  {
    id: "men-of-valor",
    name: "Men of Valor",
    tagline: "Brothers standing in faith",
    watermark: ["MEN OF", "VALOR"],
    description:
      "Equipping men to be godly leaders in their homes, businesses, careers, and the church through mentorship and prayer breakfasts.",
    schedule: "Monthly Breakfast & Fellowship Meetings",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Men of Valor fellowship at RCCG Court of His Majesty",
    isImageLeft: true,
    link: "/connect?subject=men-of-valor",
  },
  {
    id: "good-women",
    name: "Good Women Fellowship",
    tagline: "Virtue, wisdom, and prayer",
    watermark: ["GOOD", "WOMEN"],
    description:
      "Nurturing women in godly wisdom, motherly excellence, and intercessory prayer, impacting families and community circles.",
    schedule: "Bi-weekly Gatherings & Annual Conference",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Good Women fellowship at RCCG Court of His Majesty",
    isImageLeft: false,
    link: "/connect?subject=good-women",
  },
  {
    id: "yaya",
    name: "Youth & Young Adults (YAYA)",
    tagline: "Passionate generation of kingdom trailblazers",
    watermark: ["YOUTH", "IGNITE"],
    description:
      "Empowering students, young professionals, and creatives through relevant doctrine, career networking, and spirit-filled praise.",
    schedule: "Every 2nd & 4th Saturday, 4:00 PM",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Youth and Young Adults ministry at RCCG Court of His Majesty",
    isImageLeft: true,
    link: "/connect?subject=yaya",
  },
  {
    id: "teens-church",
    name: "Teens & Junior Church",
    tagline: "Rooted and grounded in truth",
    watermark: ["TEENS", "CHURCH"],
    description:
      "Dynamic, safe, and engaging environment helping adolescents navigate culture, develop spiritual gifts, and build lifelong friendships.",
    schedule: "Every Sunday during Main Services",
    image: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Teens and Junior Church at RCCG Court of His Majesty",
    isImageLeft: false,
    link: "/connect?subject=teens-church",
  },
  {
    id: "discipleship-cells",
    name: "Believers & Discipleship Cells",
    tagline: "Growing deep in the Word",
    watermark: ["ROOTS IN", "CHRIST"],
    description:
      "Foundational Christian living classes, baptismal preparation, and workers-in-training cohorts to build strong biblical roots.",
    schedule: "Weekly cohorts available online and on-site",
    image: "/images/explore/teachings.webp",
    imageAlt: "Discipleship and spiritual growth cells at RCCG Court of His Majesty",
    isImageLeft: true,
    link: "/connect?subject=discipleship",
  },
];

export default function GroupsPage() {
  return (
    <div className="w-full bg-white pb-24">
      {/* ─── Hero Section with Dark Green ─────────────────────────── */}
      <section className="relative h-[720px] bg-[#051202] text-white flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1920"
          alt="Groups and Community"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051202] via-[#051202]/70 to-transparent" />

        <Container className="relative z-10 text-center py-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#c8a96e]/20 border border-[#c8a96e]/40 text-[#c8a96e] text-xs font-semibold uppercase tracking-wider mb-4">
            Fellowship & Connection
          </span>
          <h1 className="font-display font-recursive-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 uppercase tracking-tight">
            Groups & Fellowships
          </h1>
          <p className="text-gray-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Church doesn&apos;t just happen in rows on Sunday — it flourishes in circles throughout the week. Find your community here.
          </p>
        </Container>
      </section>

      {/* ─── Groups List (Alternating Template matching Services & Events) ── */}
      <section className="pb-[100px] lg:pb-[124px] pt-[60px] lg:pt-[84px] bg-white relative w-full overflow-hidden">
        <Container className="max-w-[1440px] w-full">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#d61812] bg-[#d61812]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Circles of Life
            </span>
            <h2 className="font-display font-recursive-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0a0a0a] tracking-tight">
              Our Community Groups
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mt-3">
              Explore age-grade fellowships, regional house cells, and discipleship circles tailored for your season of life.
            </p>
          </div>

          {/* Alternating Groups Rows */}
          <div className="flex flex-col gap-12 sm:gap-14 lg:gap-[64px] items-start w-full">
            {groupsList.map((group) => (
              <div
                key={group.id}
                className={`flex flex-col ${
                  group.isImageLeft ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-6 sm:gap-8 lg:gap-[40px] items-stretch w-full min-h-[380px] lg:h-[400px]`}
                data-name={group.id}
              >
                {/* Content Box (Text + Watermark + CTA) */}
                <div className="flex-1 relative flex flex-col justify-center items-start lg:items-end text-left lg:text-right min-w-0 h-full min-h-[280px] lg:min-h-[400px] pb-6 lg:pb-[40px] pt-4 px-2 sm:px-4 lg:px-0 overflow-hidden">
                  {/* Giant Background Watermark */}
                  <div
                    className="absolute bottom-0 left-0 opacity-15 select-none pointer-events-none z-0 max-w-full lg:max-w-[700px]"
                    aria-hidden="true"
                  >
                    <div className="font-display font-recursive-sans font-extrabold text-[#d61812] text-5xl sm:text-7xl lg:text-[84px] xl:text-[96px] leading-[0.95] tracking-tight">
                      <p className="mb-0">{group.watermark[0]}</p>
                      <p>{group.watermark[1]}</p>
                    </div>
                  </div>

                  {/* Foreground Group Details */}
                  <div className="relative z-10 flex flex-col items-start lg:items-end text-left lg:text-right w-full gap-3 sm:gap-4">
                    {/* Tagline Badge */}
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#180C62]/10 text-[#180C62] border border-[#180C62]/20">
                      {group.tagline}
                    </span>

                    {/* Group Title */}
                    <h3 className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl lg:text-[32px] text-[#0a0a0a] tracking-tight leading-snug">
                      {group.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 font-sans text-sm sm:text-base lg:text-[18px] leading-relaxed max-w-xl">
                      {group.description}
                    </p>

                    {/* Schedule */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-800 pt-1">
                      <Clock className="size-4 text-[#d61812] shrink-0" />
                      <span>{group.schedule}</span>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <Link
                        href={group.link}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-[#180c62] bg-[#180c62]/10 hover:bg-[#180c62] hover:text-white transition-all shadow-sm cursor-pointer"
                      >
                        <span>Join Fellowship</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Media / Image Container */}
                <div className="bg-[#1f1f1f] flex-1 w-full lg:w-auto h-[260px] sm:h-[320px] lg:h-full relative rounded-[16px] overflow-hidden group shadow-sm">
                  <Image
                    src={group.image}
                    alt={group.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 1024px) 100vw, 700px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          {/* ─── Join a Fellowship Callout ─────────────────────────── */}
          <div className="mt-16 sm:mt-20 p-8 sm:p-12 rounded-[28px] bg-[#051202] text-white text-center relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#c8a96e]/20 border border-[#c8a96e]/40 text-[#c8a96e] text-xs font-semibold uppercase tracking-wider mb-3">
                Need Help Finding a Center?
              </span>
              <h3 className="font-display font-recursive-sans font-bold text-2xl sm:text-3xl lg:text-4xl mb-4">
                Looking for a House Fellowship Near You?
              </h3>
              <p className="text-gray-300 text-sm sm:text-base mb-8 leading-relaxed">
                Connect with our pastoral care team to locate the nearest house fellowship center to your residence or workplace in Lagos.
              </p>
              <Link
                href="/connect?subject=house-fellowship"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-[#051202] bg-[#c8a96e] hover:bg-[#b59556] shadow-md transition-all text-sm uppercase tracking-wider cursor-pointer"
              >
                Find Nearest Center
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

