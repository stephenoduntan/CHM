"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { NAV_LINKS, FOOTER_QUICK_LINKS, FOOTER_CONNECT_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Container } from "./Container";

export interface HeaderProps {
  variant?: "light" | "dark";
}

// Pages that feature the dark green (#051202) themed header variant
const DARK_HEADER_ROUTES = [
  "/new-here",
  "/ministries",
  "/give",
  "/events",
  "/services",
  "/groups",
];

export function Header({ variant }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Determine variant: explicit prop takes precedence, otherwise auto-detect from route
  const isDark =
    variant === "dark" ||
    (variant !== "light" &&
      DARK_HEADER_ROUTES.some(
        (route) => pathname === route || pathname?.startsWith(`${route}/`)
      ));

  return (
    <>
      <header
        className={`w-full transition-colors duration-200 relative z-40 ${
          isDark
            ? "bg-[#051202] text-white border-b border-white/10"
            : "bg-white text-[#242424] border-b border-gray-100/60"
        }`}
      >
        <Container>
          <div
            className="flex items-center justify-between h-[124px] sm:h-[124px] relative w-full"
            data-node-id={isDark ? "2070:1798" : "2086:1951"}
            data-name={isDark ? "header-dark" : "header-light"}
          >
            {/* Left Column: Navigation Links (Width: 287px to mirror right column and center logo perfectly) */}
            <div
              className="flex items-center justify-start gap-[24px] w-[240px] sm:w-[287px] shrink-0 hidden lg:flex"
              data-node-id="2086:1942"
            >
              <nav className="items-center gap-[24px]">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-[17px] sm:text-[18px] font-semibold leading-normal whitespace-nowrap transition-colors ${
                        isDark
                          ? isActive
                            ? "text-[#c8a96e]"
                            : "text-[#f5f5f5] hover:text-[#c8a96e]"
                          : isActive
                          ? "text-[#c8a96e]"
                          : "text-[#242424] hover:text-[#c8a96e]"
                      }`}
                      style={{
                        fontFamily: "var(--font-recursive), monospace",
                        fontVariationSettings: '"CASL" 1, "CRSV" 0.5, "MONO" 1',
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Center Column: Official Logo */}
            <div
              className="flex items-center justify-center flex-1 shrink-0"
              data-node-id="2147:3013"
              data-name="rccgchm logo"
            >
              <Link
                href="/"
                className="relative block h-[90px] sm:h-[106px] w-[110px] sm:w-[130px] transition-transform hover:scale-[1.02]"
                aria-label={SITE_CONFIG.fullName}
              >
                <Image
                  src={isDark ? "/images/rccgchm-logo-dark.png" : "/images/rccgchm-logo.svg"}
                  alt={SITE_CONFIG.fullName}
                  fill
                  priority
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Right Column: Menu Button (Width: 287px, right-aligned) */}
            <div
              className="flex items-center justify-end w-[240px] sm:w-[287px] shrink-0"
              data-node-id="2086:1948"
            >
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className={`block cursor-pointer relative size-[40px] rounded-lg transition-colors p-0 border-0 bg-transparent ${
                  isDark ? "hover:bg-white/10" : "hover:bg-gray-100/80"
                }`}
                aria-label="Open menu"
                data-node-id="2086:1949"
                data-name="fluent:line-horizontal-3-24-filled"
              >
                <Image
                  src="/images/fluent-menu.svg"
                  alt="Menu"
                  fill
                  className={`object-contain ${isDark ? "brightness-0 invert" : ""}`}
                />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Slide-over Drawer Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
          <div
            className="w-full max-w-md bg-[#051202] text-white h-full p-8 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300"
            role="dialog"
            aria-modal="true"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="relative h-[80px] w-[110px]">
                <Image
                  src="/images/rccgchm-logo-dark.png"
                  alt={SITE_CONFIG.name}
                  fill
                  className="object-contain"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="py-8 space-y-8">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-[#a8a8a8] mb-4 font-display font-recursive-mono">
                  Main Navigation
                </h3>
                <ul className="space-y-3 font-display font-recursive-sans text-xl">
                  <li>
                    <Link
                      href="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="block hover:text-[#c8a96e] transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block hover:text-[#c8a96e] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/groups"
                      onClick={() => setIsMenuOpen(false)}
                      className="block hover:text-[#c8a96e] transition-colors"
                    >
                      Groups & Fellowships
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-[#a8a8a8] mb-4 font-display font-recursive-mono">
                  Quick Links
                </h3>
                <ul className="grid grid-cols-2 gap-3 text-sm text-[#f5f5f5]">
                  {FOOTER_QUICK_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="hover:text-[#c8a96e] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-[#a8a8a8] mb-4 font-display font-recursive-mono">
                  Connect & Fellowship
                </h3>
                <ul className="grid grid-cols-2 gap-3 text-sm text-[#f5f5f5]">
                  {FOOTER_CONNECT_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="hover:text-[#c8a96e] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Drawer Footer Contact */}
            <div className="pt-6 border-t border-white/10 text-xs text-[#a8a8a8] space-y-2">
              <p className="font-semibold text-white">{SITE_CONFIG.fullName}</p>
              <p>{SITE_CONFIG.address}</p>
              <p>{SITE_CONFIG.phone}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
