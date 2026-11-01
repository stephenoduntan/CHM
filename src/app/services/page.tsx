import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, MapPin, Sparkles, Navigation, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG, SUNDAY_SERVICES, MIDWEEK_SERVICES } from "@/lib/constants";

export const metadata = {
  title: "Services & Worship Times",
  description: "Join us for Sunday worship, midweek Bible study, and Holy Ghost services at RCCG Court of His Majesty.",
};

const services = [
  {
    day: "Every Sunday",
    title: "First Worship Service",
    time: "7:45 AM - 9:45 AM",
    description: "An early morning encounter with exuberant praise, prayer, and life-applicable teachings from God's Word.",
    highlight: "Early Bird Worship",
  },
  {
    day: "Every Sunday",
    title: "Sunday School Discipleship",
    time: "9:45 AM - 10:15 AM",
    description: "Interactive biblical study and questions in small groups to build sound spiritual foundations.",
    highlight: "Discipleship Class",
  },
  {
    day: "Every Sunday",
    title: "Second Worship Service",
    time: "10:15 AM - 12:30 PM",
    description: "Dynamic family celebration featuring our choir, youth ministration, and prophetic prayers.",
    highlight: "Family Celebration",
  },
  {
    day: "Every Tuesday",
    title: "Digging Deep (Bible Study)",
    time: "6:00 PM - 7:15 PM",
    description: "Verse-by-verse exploration of Scripture to understand doctrine and practical Christian living.",
    highlight: "Mid-week Word",
  },
  {
    day: "Every Thursday",
    title: "Faith Clinic (Prayer Meeting)",
    time: "6:00 PM - 7:15 PM",
    description: "Intense intercession, healing prayers, and spiritual warfare for breakthrough in every sphere of life.",
    highlight: "Mid-week Prayer",
  },
  {
    day: "1st Friday of the Month",
    title: "Holy Ghost Service",
    time: "7:00 PM till Dawn",
    description: "Corporate gathering of believers at RCCG Redemption City and broadcast worldwide with Pastor E.A. Adeboye.",
    highlight: "Monthly Power Night",
  },
];

export default function ServicesPage() {
  return (
    <div className="w-full bg-white pb-24">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[440px] lg:min-h-[500px] bg-[#051202] text-white flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=1920"
          alt="Church Services at Court of His Majesty"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051202] via-[#051202]/70 to-transparent" />

        <Container className="relative z-10 text-center py-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#c8a96e]/20 border border-[#c8a96e]/40 text-[#c8a96e] text-xs font-semibold uppercase tracking-wider mb-4">
            Worship With Us
          </span>
          <h1 className="font-display font-recursive-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 uppercase tracking-tight">
            Services & Gathering Times
          </h1>
          <p className="text-gray-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Experience the manifest presence of God. There is always a seat reserved for you in His house.
          </p>
        </Container>
      </section>

      {/* ─── Schedule List ────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#051202] mb-3">
              Weekly Service Schedule
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Join us physically at the sanctuary or stream live across all our digital platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[28px] bg-gray-50/70 border border-gray-200 hover:border-[#c8a96e] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#051202] bg-[#c8a96e]/20 px-3 py-1 rounded-full">
                      {s.highlight}
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      {s.day}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-2xl text-[#051202] mb-2 group-hover:text-[#c8a96e] transition-colors">
                    {s.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[#051202] font-semibold text-sm mb-4">
                    <Clock className="size-4 text-[#c8a96e]" />
                    <span>{s.time}</span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {s.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200/70 flex items-center justify-between text-xs font-medium text-gray-500">
                  <span>Physical & Online</span>
                  <Link
                    href="/watch-live"
                    className="text-[#051202] group-hover:text-[#c8a96e] font-semibold"
                  >
                    Watch Live →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Location & Driving Directions ────────────────────────── */}
      <section className="py-16 lg:py-24 bg-gray-50 border-t border-gray-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-widest text-[#c8a96e] font-semibold mb-2 block">
                Find Your Way
              </span>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#051202] mb-6">
                Church Location & Directions
              </h2>

              <div className="space-y-6 text-gray-700 text-base leading-relaxed">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-[#051202] text-[#c8a96e] flex items-center justify-center shrink-0">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#051202] text-lg">Main Sanctuary</h3>
                    <p>{SITE_CONFIG.address}</p>
                    <p className="text-sm text-gray-500 mt-1">Convenient parking available on church premises.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-xl bg-[#051202] text-[#c8a96e] flex items-center justify-center shrink-0">
                    <Navigation className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#051202] text-lg">Public Transit & Landmarks</h3>
                    <p>Located right at the Abesan Estate Gate on Ipaja Road, easily accessible via commercial transit or ride-hailing.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://maps.google.com/?q=163+Ipaja+Road,+Abesan+Estate+Gate,+Lagos,+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-[#051202] hover:bg-[#c8a96e] hover:text-[#051202] shadow-md transition-all text-sm uppercase tracking-wider"
                >
                  <Navigation className="size-4" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Visual Location Card */}
            <div className="lg:col-span-6 relative h-[380px] sm:h-[450px] rounded-[32px] overflow-hidden shadow-2xl bg-[#051202] flex items-center justify-center p-8 text-center text-white">
              <Image
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000"
                alt="Map and Sanctuary"
                fill
                className="object-cover opacity-20"
              />
              <div className="relative z-10 max-w-sm">
                <div className="size-16 rounded-full bg-[#c8a96e]/20 border border-[#c8a96e] mx-auto flex items-center justify-center text-[#c8a96e] mb-4">
                  <MapPin className="size-8" />
                </div>
                <h3 className="font-sans font-bold text-2xl mb-2 text-white">
                  RCCG Court of His Majesty
                </h3>
                <p className="text-gray-300 text-sm mb-6">
                  {SITE_CONFIG.address}
                </p>
                <p className="text-xs text-[#c8a96e] uppercase tracking-wider font-semibold">
                  We look forward to seeing you this Sunday!
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

