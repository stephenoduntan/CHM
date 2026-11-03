import Image from "next/image";
import Link from "next/link";
import { MapPin, Navigation, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = {
  title: "Services & Worship Times",
  description: "Join us for Sunday worship, midweek Bible study, and Holy Ghost services at RCCG Court of His Majesty.",
};

interface ServiceSchedule {
  id: string;
  nodeId: string;
  cardName: string;
  watermark: [string, string];
  details: string[];
  image: string;
  imageAlt: string;
  isImageLeft: boolean;
}

const scheduleServices: ServiceSchedule[] = [
  {
    id: "sunday-services",
    nodeId: "2086:887",
    cardName: "card 1",
    watermark: ["SUNDAY", "SERVICES"],
    details: [
      "7:45 am First Service",
      "10:00 am Sunday School",
      "10:30 am Second Service",
      "Church Auditorium",
    ],
    image: "/images/explore/community.webp",
    imageAlt: "Sunday Worship Services at RCCG Court of His Majesty",
    isImageLeft: false,
  },
  {
    id: "digging-deep",
    nodeId: "2086:897",
    cardName: "card 3",
    watermark: ["DIGGING", "DEEP"],
    details: [
      "Tuesday",
      "6:00 pm to 7:30 pm",
      "Bible Study Service",
      "Church Auditorium",
    ],
    image: "/images/explore/teachings.webp",
    imageAlt: "Digging Deep Bible Study Service",
    isImageLeft: true,
  },
  {
    id: "faith-meeting",
    nodeId: "2086:904",
    cardName: "card 5",
    watermark: ["FAITH", "CLINIC"],
    details: [
      "Thursday",
      "6:00 pm to 7:30 pm",
      "Prayer Meeting",
      "Church Auditorium",
    ],
    image: "/images/explore/get-involved.webp",
    imageAlt: "Faith Meeting Prayer Service",
    isImageLeft: false,
  },
  {
    id: "holy-communion",
    nodeId: "2086:911",
    cardName: "card 7",
    watermark: ["HOLY", "COMMUNION"],
    details: [
      "First Wednesday of every month",
      "6:00 pm to 7:30 pm",
      "Church Auditorium",
    ],
    image: "/images/explore/ministries.webp",
    imageAlt: "Holy Communion Service",
    isImageLeft: true,
  },
];

export default function ServicesPage() {
  return (
    <div className="w-full bg-white pb-24">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative h-[720px] bg-[#051202] text-white flex items-center justify-center overflow-hidden">
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

      {/* ─── Schedule List (Figma node 2086:884) ──────────────────── */}
      <section
        className="pb-[100px] lg:pb-[124px] pt-[60px] lg:pt-[84px] bg-white relative w-full overflow-hidden"
        data-node-id="2086:884"
        data-name="explore"
      >
        <Container className="max-w-[1440px] w-full">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#d61812] bg-[#d61812]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Weekly Gatherings
            </span>
            <h2 className="font-display font-recursive-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0a0a0a] tracking-tight">
              Service Schedule
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mt-3">
              Join us in worship, discipleship, and prayer at Court of His Majesty.
            </p>
          </div>

          {/* How it works row (Figma node 2086:886) */}
          <div
            className="flex flex-col gap-12 sm:gap-14 lg:gap-[64px] items-start w-full"
            data-node-id="2086:886"
            data-name="How it works row"
          >
            {scheduleServices.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col ${
                  item.isImageLeft ? "lg:flex-row-reverse" : "lg:flex-row"
                } gap-6 sm:gap-8 lg:gap-[40px] items-stretch w-full min-h-[380px] lg:h-[400px]`}
                data-node-id={item.nodeId}
                data-name={item.cardName}
              >
                {/* Content Box (Text + Watermark) */}
                <div className="flex-1 relative flex flex-col justify-center items-end min-w-0 h-full min-h-[280px] lg:min-h-[400px] pb-6 lg:pb-[64px] pt-4 px-2 sm:px-4 lg:px-0 overflow-hidden">
                  {/* Giant Background Watermark */}
                  <div
                    className="absolute bottom-0 left-0 opacity-15 select-none pointer-events-none z-0 max-w-full lg:max-w-[700px]"
                    aria-hidden="true"
                  >
                    <div className="font-display font-recursive-sans font-extrabold text-[#d61812] text-5xl sm:text-7xl lg:text-[84px] xl:text-[96px] leading-[0.95] tracking-tight">
                      <p className="mb-0">{item.watermark[0]}</p>
                      <p>{item.watermark[1]}</p>
                    </div>
                  </div>

                  {/* Foreground Service Details */}
                  <div className="relative z-10 flex flex-col items-end text-right font-sans font-medium text-lg sm:text-xl lg:text-[24px] text-[#0a0a0a] gap-2 lg:gap-[16px] leading-relaxed lg:leading-[40px] w-full">
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="leading-snug lg:leading-[40px]">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Media / Image Container (Figma node 2086:896) */}
                <div className="bg-[#1f1f1f] flex-1 w-full lg:w-auto h-[260px] sm:h-[320px] lg:h-full relative rounded-[16px] overflow-hidden group shadow-sm">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 1024px) 100vw, 700px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Service Note & CTA */}
          <div className="mt-14 lg:mt-20 p-6 sm:p-8 rounded-[20px] bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-sans font-bold text-lg sm:text-xl text-[#0a0a0a]">
                Monthly Holy Ghost Service
              </h4>
              <p className="text-sm text-gray-600 max-w-xl">
                Every 1st Friday of the month (7:00 PM till Dawn) at RCCG Redemption City, broadcast live in our sanctuary and online.
              </p>
            </div>

            <div
              className="flex flex-wrap gap-4 items-center pt-2"
              data-node-id="2103:9295"
              data-name="Project actions"
            >
              <Link
              href="/holy-ghost-service"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#180c62] hover:bg-[#251394] text-white text-sm font-semibold transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>Watch Online</span>
              <ArrowRight className="size-4" />
            </Link>

              <a
                href="https://maps.app.goo.gl/b2mYFzQjLYv3qjBt5" target="_blank"
                rel="noopener noreferrer"
                className="bg-[#b2a1ed]/10 border border-[#b2a1ed] text-[#180c62] hover:bg-[#b2a1ed]/20 transition-all rounded-[28px] px-6 py-3.5 sm:px-7 sm:py-4 font-semibold text-base sm:text-[18px] flex items-center gap-2 group cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                data-node-id="2103:9299"
                data-name="Action"
              >
                <span data-node-id="2103:9300">Attend Live</span>
                <div
                  className="relative size-5 shrink-0 transition-transform group-hover:translate-x-1"
                  data-node-id="2103:9301"
                >
                  <ArrowUpRight className="size-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </div>

          </div>
        </Container>
      </section>

      {/* ─── Location & Driving Directions ────────────────────────── */}
      <section className="py-16 lg:py-24">
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
                  <div className="size-10 text-[#D61812] flex items-center justify-center shrink-0">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#051202] text-lg">Main Sanctuary</h3>
                    <p>{SITE_CONFIG.address}</p>
                    <p className="text-sm text-gray-500 mt-1">Convenient parking available on church premises.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 text-[#D61812] flex items-center justify-center shrink-0">
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
                  className="inline-flex items-center justify-center rounded-full gap-2 px-7 py-3 bg-[#b2a1ed]/10 hover:bg-[#b2a1ed]/20 border border-[#b2a1ed] text-[#180c62] font-sans font-medium text-[16px] transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
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
                <div className="size-16 rounded-full bg-[#D61812]/20 border border-[#D61812] mx-auto flex items-center justify-center text-[#D61812] mb-4">
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

