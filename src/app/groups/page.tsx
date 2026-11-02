import Image from "next/image";
import Link from "next/link";
import { Users, Home, Heart, Shield, Sparkles, BookOpen } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = {
  title: "Groups & Fellowships",
  description: "Connect with house fellowships, age-grade ministries, and community groups at RCCG Court of His Majesty.",
};

const groupsList = [
  {
    name: "House Fellowship Centers",
    tagline: "Community at your doorstep",
    icon: Home,
    description:
      "Gathering weekly in neighborhood homes across Lagos for intimate Bible study, heartfelt worship, mutual care, and fervent prayers.",
    schedule: "Every Sunday, 5:00 PM – 6:00 PM",
  },
  {
    name: "Men of Valor",
    tagline: "Brothers standing in faith",
    icon: Shield,
    description:
      "Equipping men to be godly leaders in their homes, businesses, careers, and the church through mentorship and prayer breakfasts.",
    schedule: "Monthly Breakfast & Fellowship Meetings",
  },
  {
    name: "Good Women Fellowship",
    tagline: "Virtue, wisdom, and prayer",
    icon: Heart,
    description:
      "Nurturing women in godly wisdom, motherly excellence, and intercessory prayer, impacting families and community circles.",
    schedule: "Bi-weekly Gatherings & Annual Conference",
  },
  {
    name: "Youth & Young Adults (YAYA)",
    tagline: "Passionate generation of kingdom trailblazers",
    icon: Sparkles,
    description:
      "Empowering students, young professionals, and creatives through relevant doctrine, career networking, and spirit-filled praise.",
    schedule: "Every 2nd & 4th Saturday, 4:00 PM",
  },
  {
    name: "Teens & Junior Church",
    tagline: "Rooted and grounded in truth",
    icon: Users,
    description:
      "Dynamic, safe, and engaging environment helping adolescents navigate culture, develop spiritual gifts, and build lifelong friendships.",
    schedule: "Every Sunday during Main Services",
  },
  {
    name: "Believers & Discipleship Cells",
    tagline: "Growing deep in the Word",
    icon: BookOpen,
    description:
      "Foundational Christian living classes, baptismal preparation, and workers-in-training cohorts to build strong biblical roots.",
    schedule: "Weekly cohorts available online and on-site",
  },
];

export default function GroupsPage() {
  return (
    <div className="w-full bg-white pb-24">
      {/* ─── Hero Section with Dark Green ─────────────────────────── */}
      <section className="relative min-h-[440px] lg:min-h-[500px] bg-[#051202] text-white flex items-center justify-center overflow-hidden">
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

      {/* ─── Groups Grid ───────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50/50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupsList.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.name}
                  className="p-8 rounded-[24px] bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="size-12 rounded-2xl bg-[#051202] text-[#c8a96e] flex items-center justify-center mb-6">
                      <Icon className="size-6" />
                    </div>
                    <span className="text-xs uppercase font-bold tracking-wider text-[#c8a96e] block mb-1">
                      {group.tagline}
                    </span>
                    <h2 className="font-sans font-bold text-xl text-[#051202] mb-3">
                      {group.name}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {group.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-medium text-gray-500">
                    <span>{group.schedule}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─── Join a Group CTA ──────────────────────────────────── */}
          <div className="mt-16 p-8 sm:p-12 rounded-[32px] bg-[#051202] text-white text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="font-sans font-bold text-2xl sm:text-3xl mb-4">
                Looking for a House Fellowship Near You?
              </h3>
              <p className="text-gray-300 text-base mb-8">
                Connect with our pastoral care team to locate the nearest house fellowship center to your residence or workplace.
              </p>
              <Link
                href="/connect?subject=house-fellowship"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-[#051202] bg-[#c8a96e] hover:bg-[#b59556] shadow-md transition-all text-base"
              >
                Join a Fellowship
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

