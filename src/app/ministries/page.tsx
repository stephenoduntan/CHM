import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Music,
  Heart,
  BookOpen,
  Shield,
  Sparkles,
  Baby,
  HandHeart,
  Cross,
  Radio,
  Settings,
  GraduationCap,
  Lightbulb,
  Crown,
  Home,
  Droplet,
  Megaphone,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = {
  title: "Ministries & Departments",
  description: "Explore the ministries and service departments at RCCG Court of His Majesty.",
};

const departments = [
  {
    name: "Children & Teens",
    icon: Baby,
    category: "Generations",
    description:
      "We nurture children and teens through Bible teaching, discipleship, and age-specific activities that help them grow in faith and community.",
  },
  {
    name: "Good Women",
    icon: Heart,
    category: "Fellowship",
    description:
      "Good Women supports women through prayer, fellowship, discipleship, and outreach, helping them live out their faith in practical ways.",
  },
  {
    name: "Youth & Singles",
    icon: Users,
    category: "Generations",
    description:
      "Youth & Singles creates spaces for young adults to connect, grow in faith, and serve together through community, discipleship, and outreach.",
  },
  {
    name: "Choir (Praise Team)",
    icon: Music,
    category: "Worship & Arts",
    description:
      "Choir leads the congregation in worship through music, preparing hearts to receive God's Word and celebrate His presence.",
  },
  {
    name: "Evangelism",
    icon: Megaphone,
    category: "Outreach",
    description:
      "Evangelism equips members to share the gospel, reach new people, and invite the community to experience God's love through practical outreach.",
  },
  {
    name: "Counselling & Follow-Up",
    icon: HandHeart,
    category: "Care",
    description:
      "Counselling & Follow-Up provides care, support, and spiritual guidance for new believers and members navigating life's challenges.",
  },
  {
    name: "Hospital Ministry",
    icon: Heart,
    category: "Outreach",
    description:
      "Hospital Ministry visits and prays for the sick, bringing comfort, hope, and spiritual care to those in medical centers and homes.",
  },
  {
    name: "Prison Ministry",
    icon: Shield,
    category: "Outreach",
    description:
      "Prison Ministry shares the gospel, provides support, and demonstrates God's love to those in correctional facilities.",
  },
  {
    name: "Sunday School",
    icon: BookOpen,
    category: "Discipleship",
    description:
      "Sunday School teaches biblical foundations, doctrine, and practical living to help members deepen their understanding of God's Word.",
  },
  {
    name: "Tracts & Publications",
    icon: BookOpen,
    category: "Media",
    description:
      "Tracts & Publications distributes resources that help people learn about Jesus, grow in faith, and share the gospel with others.",
  },
  {
    name: "Ushering",
    icon: Users,
    category: "Service",
    description:
      "Ushering serves the congregation by creating a welcoming environment, guiding guests, and supporting the smooth flow of services.",
  },
  {
    name: "Engineering & Technical",
    icon: Settings,
    category: "Media",
    description:
      "Engineering supports the technical aspects of worship, ensuring sound, lighting, live broadcasts, and media systems serve effectively.",
  },
  {
    name: "Prayer Champions",
    icon: Sparkles,
    category: "Spiritual",
    description:
      "Prayer Champions leads the church in intercession, fasting, and corporate prayer, standing in the gap for the church and the nation.",
  },
  {
    name: "Welfare",
    icon: HandHeart,
    category: "Care",
    description:
      "Welfare cares for members in need, providing practical support and connecting them with resources for spiritual and material well-being.",
  },
  {
    name: "House Fellowship",
    icon: Home,
    category: "Fellowship",
    description:
      "House Fellowship gathers members in neighborhood groups for Bible study, prayer, and community, connecting beyond Sunday services.",
  },
  {
    name: "Believers' Class",
    icon: BookOpen,
    category: "Discipleship",
    description:
      "Believers' Class prepares new converts for baptism and membership, grounding them in foundational Christian doctrine and practice.",
  },
  {
    name: "Baptismal Class",
    icon: Droplet,
    category: "Discipleship",
    description:
      "Baptismal Class prepares candidates for water baptism, teaching the biblical meaning and significance of this public declaration of faith.",
  },
  {
    name: "Sanitation",
    icon: Sparkles,
    category: "Service",
    description:
      "Sanitation maintains a clean, safe, and dignified environment for worship, ensuring the church facilities reflect God's beauty and order.",
  },
  {
    name: "Protocol",
    icon: Shield,
    category: "Service",
    description:
      "Protocol supports the church's hospitality and guest services, especially for visiting ministers, dignitaries, and special events.",
  },
  {
    name: "Security",
    icon: Shield,
    category: "Service",
    description:
      "Security provides a safe and orderly environment for members and guests during services, events, and church activities.",
  },
  {
    name: "Workers in Training",
    icon: GraduationCap,
    category: "Leadership",
    description:
      "Workers in Training equips new volunteers with the skills, doctrine, and servant heart needed to serve effectively across church ministries.",
  },
  {
    name: "Wisdom Club",
    icon: Lightbulb,
    category: "Fellowship",
    description:
      "Wisdom Club disciples and mentors senior members, helping them apply biblical wisdom to family, legacy, and community impact.",
  },
  {
    name: "King's Diadem",
    icon: Crown,
    category: "Leadership",
    description:
      "King's Diadem supports women in leadership and ministry, helping them grow in confidence, character, and royal purpose.",
  },
];

export default function MinistriesPage() {
  return (
    <div className="w-full bg-white pb-24">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[440px] lg:min-h-[500px] bg-[#051202] text-white flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?auto=format&fit=crop&q=80&w=1920"
          alt="Ministries and Departments"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051202] via-[#051202]/70 to-transparent" />

        <Container className="relative z-10 text-center py-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#c8a96e]/20 border border-[#c8a96e]/40 text-[#c8a96e] text-xs font-semibold uppercase tracking-wider mb-4">
            Service & Fellowship
          </span>
          <h1 className="font-display font-recursive-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 uppercase tracking-tight">
            Ministries & Departments
          </h1>
          <p className="text-gray-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Every member has a unique gift and a calling. Discover where your passion intersects with purpose.
          </p>
        </Container>
      </section>

      {/* ─── Invitation Banner ────────────────────────────────────── */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <Container>
          <div className="p-8 sm:p-10 rounded-[28px] bg-white border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="font-sans font-bold text-2xl text-[#051202] mb-2">
                Serve in God&apos;s House
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                You are welcome to join any of the following departments as a worker in RCCG Court of His Majesty. Simply ask any of our ushers on Sunday or connect with our team online.
              </p>
            </div>
            <Link
              href="#join"
              className="px-8 py-3.5 rounded-full font-semibold text-white bg-[#051202] hover:bg-[#c8a96e] hover:text-[#051202] transition-colors whitespace-nowrap text-sm uppercase tracking-wider shadow-md"
            >
              Sign Up as Worker
            </Link>
          </div>
        </Container>
      </section>

      {/* ─── Departments Grid ─────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept) => {
              const Icon = dept.icon;
              return (
                <div
                  key={dept.name}
                  className="p-8 rounded-[28px] bg-gray-50/70 border border-gray-200/80 hover:border-[#c8a96e] hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="size-14 rounded-2xl bg-[#051202] text-[#c8a96e] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Icon className="size-7" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-200/60 px-3 py-1 rounded-full">
                        {dept.category}
                      </span>
                    </div>

                    <h3 className="font-sans font-bold text-2xl text-[#051202] mb-3 group-hover:text-[#c8a96e] transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {dept.description}
                    </p>
                  </div>

                  <Link
                    href={`/connect?department=${encodeURIComponent(dept.name)}`}
                    className="inline-flex items-center text-sm font-semibold text-[#051202] group-hover:text-[#c8a96e] underline underline-offset-4"
                  >
                    Join this team →
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─── Call to Action / Worker Enrollment ────────────────────── */}
      <section id="join" className="py-20 bg-[#051202] text-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white mb-4">
              Ready to Make an Eternal Impact?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
              Step into leadership and service. Fill out the volunteer form or speak with a department leader after Sunday service.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/connect"
                className="px-8 py-3.5 rounded-full font-semibold text-[#051202] bg-[#c8a96e] hover:bg-[#b8985c] shadow-md transition-all text-base"
              >
                Volunteer Now
              </Link>
              <Link
                href="/services"
                className="px-8 py-3.5 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-base"
              >
                View Service Times
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

