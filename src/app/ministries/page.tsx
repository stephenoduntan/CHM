import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Ministries & Departments",
  description: "Explore the ministries and service departments at RCCG Court of His Majesty.",
};

const departments = [
  {
    name: "Children & Teens",
    icon: "/images/departments/mingcute-baby-line.svg",
    description:
      "We nurture children and teens through Bible teaching, discipleship, and age-specific activities that help them grow in faith and community.",
  },
  {
    name: "Good Women",
    icon: "/images/departments/ion-woman-outline.svg",
    description:
      "Good Women supports women through prayer, fellowship, discipleship, and outreach, helping them live out their faith in practical ways.",
  },
  {
    name: "Youth & Singles",
    icon: "/images/departments/foundation-torsos-male-female.svg",
    description:
      "Youth & Singles creates spaces for young adults to connect, grow in faith, and serve together through community, discipleship, and outreach.",
  },
  {
    name: "Evangelism",
    icon: "/images/departments/fluent-megaphone-loud.svg",
    description:
      "Evangelism equips members to share the gospel, reach new people, and invite the community to experience God’s love through practical outreach.",
  },
  {
    name: "Counselling & Follow-Up",
    icon: "/images/departments/fluent-people-chat.svg",
    description:
      "Counselling & Follow-Up provides care, support, and spiritual guidance for new believers and members navigating life’s challenges.",
  },
  {
    name: "Choir",
    icon: "/images/departments/fluent-music-note.svg",
    description:
      "Choir leads the congregation in worship through music, preparing hearts to receive God’s Word and celebrate His presence.",
  },
  {
    name: "Hospital Ministry",
    icon: "/images/departments/fluent-briefcase-medical.svg",
    description:
      "Hospital Ministry visits and prays for the sick, bringing comfort, hope, and spiritual care to those in need.",
  },
  {
    name: "Prison Ministry",
    icon: "/images/departments/circle-x.svg",
    description:
      "Prison Ministry shares the gospel, provides support, and demonstrates God’s love to those in correctional facilities.",
  },
  {
    name: "Sunday School",
    icon: "/images/departments/book-open.svg",
    description:
      "Sunday School teaches biblical foundations, doctrine, and practical living to help members deepen their understanding of God’s Word.",
  },
  {
    name: "Tracts & Publications",
    icon: "/images/departments/book.svg",
    description:
      "Tracts & Publications distributes resources that help people learn about Jesus, grow in faith, and share the gospel with others.",
  },
  {
    name: "Ushering",
    icon: "/images/departments/users.svg",
    description:
      "Ushering serves the congregation by creating a welcoming environment, guiding guests, and supporting the smooth flow of services.",
  },
  {
    name: "Engineering",
    icon: "/images/departments/settings.svg",
    description:
      "Engineering supports the technical aspects of worship, ensuring sound, lighting, and media systems serve the congregation effectively.",
  },
  {
    name: "Prayer Champions",
    icon: "/images/departments/mingcute-pray-line.svg",
    description:
      "Prayer Champions leads the church in intercession, fasting, and corporate prayer, seeking God’s presence and guidance.",
  },
  {
    name: "Welfare",
    icon: "/images/departments/heart.svg",
    description:
      "Welfare cares for members in need, providing practical support and connecting them with resources for spiritual and material well-being.",
  },
  {
    name: "House Fellowship",
    icon: "/images/departments/home.svg",
    description:
      "House Fellowship gathers members in smaller groups for Bible study, prayer, and community, helping people connect beyond Sunday services.",
  },
  {
    name: "Believers’ Class",
    icon: "/images/departments/book.svg",
    description:
      "Believers’ Class prepares new converts for baptism and membership, grounding them in foundational Christian doctrine and practice.",
  },
  {
    name: "Baptismal Class",
    icon: "/images/departments/droplet.svg",
    description:
      "Baptismal Class prepares candidates for water baptism, teaching the meaning and significance of this public declaration of faith.",
  },
  {
    name: "Sanitation",
    icon: "/images/departments/sparkles.svg",
    description:
      "Sanitation maintains a clean, safe, and dignified environment for worship, ensuring the church facilities reflect God’s beauty and order.",
  },
  {
    name: "Protocol",
    icon: "/images/departments/shield.svg",
    description:
      "Protocol supports the church’s hospitality and guest services, especially for visiting ministers, dignitaries, and special events.",
  },
  {
    name: "Security",
    icon: "/images/departments/mingcute-umbrella-line.svg",
    description:
      "Security provides a safe and secure environment for members and guests during services, events, and church activities.",
  },
  {
    name: "Elders",
    icon: "/images/departments/users.svg",
    description:
      "Elders provide spiritual leadership, guidance, and pastoral care, helping members navigate life and faith with wisdom.",
  },
  {
    name: "Workers in Training",
    icon: "/images/departments/graduation-cap.svg",
    description:
      "Workers in Training equips new volunteers with the skills, doctrine, and heart needed to serve effectively across church ministries.",
  },
  {
    name: "Wisdom Club",
    icon: "/images/departments/lightbulb.svg",
    description:
      "Wisdom Club disciples and mentors older adults, helping them apply biblical wisdom to life, family, and community.",
  },
  {
    name: "King’s Diadem",
    icon: "/images/departments/crown.svg",
    description:
      "King’s Diadem supports women in leadership and ministry, helping them grow in confidence, character, and service to God.",
  },
];

export default function MinistriesPage() {
  return (
    <div className="w-full bg-white">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-[640px] sm:h-[720px] bg-[#051202] text-white flex items-center justify-center overflow-hidden">
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

      {/* ─── Invitation Banner & Department Grid (Figma node 2086:638) ──────── */}
      <section className="pt-16 sm:pt-20 lg:pt-[84px] pb-20 sm:pb-24 lg:pb-[124px] bg-white">
        <Container className="max-w-[1440px]">
          {/* Invitation Banner (node 2086:639 & 2086:640) */}
          <div className="mb-14 sm:mb-16 lg:mb-[64px]">
            <p className="font-sans font-normal text-lg sm:text-xl lg:text-[24px] text-[#3d3d3d] leading-relaxed text-justify sm:text-left">
              You are welcome to join any of the following departments as a worker in RCCG Court of His Majesty. Simply ask any of our ushers to guide you on what to do.
            </p>
          </div>

          {/* Department Grid (node 2086:641) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-10 lg:gap-x-12 gap-y-12 sm:gap-y-14 lg:gap-y-16">
            {departments.map((dept) => (
              <div
                key={dept.name}
                className="flex flex-col items-start gap-4 sm:gap-6 group"
              >
                <div className="size-12 shrink-0 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={dept.icon}
                    alt={dept.name}
                    width={48}
                    height={48}
                    className="size-12 object-contain"
                  />
                </div>

                <div className="w-full">
                  <h3 className="font-display font-recursive-sans font-semibold text-2xl sm:text-3xl lg:text-[36px] text-[#0a0a0a] tracking-tight leading-snug">
                    {dept.name}
                  </h3>
                </div>

                <div className="w-full">
                  <p className="font-sans font-normal text-base sm:text-lg lg:text-[20px] text-[#0a0a0a] leading-relaxed">
                    {dept.description}
                  </p>
                </div>
              </div>
            ))}
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
