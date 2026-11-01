import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import {
  SITE_CONFIG,
  FOOTER_QUICK_LINKS,
  FOOTER_CONNECT_LINKS,
  SOCIAL_LINKS,
  SUNDAY_SERVICES,
  MIDWEEK_SERVICES,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="w-full">
      {/* ─── Top Light Bar (#e8e8e8) ───────────────────────────────── */}
      <div className="w-full bg-[#e8e8e8]">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between py-10 gap-6">
            {/* Logo */}
            <div className="relative size-[100px] md:size-[120px]">
              <Image
                src="/images/rccgchm-logo.svg"
                alt={SITE_CONFIG.fullName}
                fill
                className="object-contain"
              />
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-6">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.platform}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative size-10 transition-transform hover:scale-110"
                  aria-label={item.platform}
                >
                  <Image
                    src={item.icon}
                    alt={item.platform}
                    fill
                    className="object-contain"
                  />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ─── Main Dark Section (#051202) ───────────────────────────── */}
      <div className="w-full bg-[#051202] text-[#f5f5f5]">
        <Container>
          <div className="pt-[84px] pb-[48px]">
            {/* 4 Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-16 border-b border-[#bfbfbf]">
              {/* Column 1: Church Info & Contact */}
              <div className="flex flex-col gap-6">
                <div className="text-[18px] lg:text-[20px] font-normal leading-relaxed text-[#f5f5f5]">
                  <p className="font-semibold text-white mb-1">
                    RCCG Court of His Majesty
                  </p>
                  <p>{SITE_CONFIG.address}</p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://maps.google.com/?q=163+Ipaja+Road,+Abesan+Estate+Gate,+Lagos,+Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[18px] lg:text-[20px] underline underline-offset-4 hover:text-[#c8a96e] transition-colors"
                  >
                    Locate Us
                  </a>
                  <div className="relative size-6">
                    <Image
                      src="/images/location-pin.svg"
                      alt="Location"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="font-display font-recursive-sans text-[24px] lg:text-[28px] font-semibold text-white mb-4">
                    Contact Us
                  </h3>
                  <div className="space-y-3 text-[18px] lg:text-[20px] text-[#f5f5f5]">
                    <p>
                      <a
                        href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
                        className="hover:text-[#c8a96e] transition-colors"
                      >
                        {SITE_CONFIG.phone}
                      </a>
                    </p>
                    <p>
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="hover:text-[#c8a96e] transition-colors"
                      >
                        [{SITE_CONFIG.email}]
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Column 2: Service Times */}
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="font-display font-recursive-sans text-[24px] lg:text-[28px] font-semibold text-white mb-4">
                    Sunday Service
                  </h3>
                  <div className="space-y-3 text-[18px] lg:text-[20px] text-[#f5f5f5]">
                    {SUNDAY_SERVICES.map((s, idx) => (
                      <p key={idx}>
                        {s.time} {s.service}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-recursive-sans text-[24px] lg:text-[28px] font-semibold text-white mb-4">
                    Mid-week Services
                  </h3>
                  <div className="space-y-2 text-[18px] lg:text-[20px] text-[#f5f5f5]">
                    <p>{MIDWEEK_SERVICES.days}</p>
                    <p>{MIDWEEK_SERVICES.time}</p>
                  </div>
                </div>

                <div>
                  <Link
                    href="/services"
                    className="inline-block text-[18px] lg:text-[20px] font-medium underline underline-offset-4 text-white hover:text-[#c8a96e] transition-colors"
                  >
                    See more
                  </Link>
                </div>
              </div>

              {/* Column 3: Quick Links */}
              <div className="flex flex-col gap-4">
                <h3 className="font-display font-recursive-sans text-[24px] lg:text-[28px] font-semibold text-white mb-2">
                  Quick Link
                </h3>
                <ul className="space-y-3 text-[18px] lg:text-[20px] text-[#f5f5f5]">
                  {FOOTER_QUICK_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="hover:text-[#c8a96e] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Connect */}
              <div className="flex flex-col gap-4">
                <h3 className="font-display font-recursive-sans text-[24px] lg:text-[28px] font-semibold text-white mb-2">
                  Connect
                </h3>
                <ul className="space-y-3 text-[18px] lg:text-[20px] text-[#f5f5f5]">
                  {FOOTER_CONNECT_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="hover:text-[#c8a96e] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Copyright */}
            <div className="pt-8 text-center sm:text-left text-[16px] lg:text-[18px] text-[#a8a8a8]">
              <p>© 2026 Court of His Majesty. All rights reserved.</p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
