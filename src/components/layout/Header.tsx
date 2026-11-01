"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { NAV_LINKS, FOOTER_QUICK_LINKS, FOOTER_CONNECT_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Container } from "./Container";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="w-full bg-white relative z-40">
        <Container>
          <div className="flex items-center justify-between py-6 h-[140px] md:h-[160px]">
            {/* Left: Primary Navigation Links */}
            <nav className="flex items-center gap-6 font-display font-semibold text-[17px] md:text-[18px] text-[#242424] font-recursive-mono min-w-[200px]">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors hover:text-[#051202] ${
                      isActive ? "underline decoration-2 underline-offset-8" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Center: Brand Logo */}
            <div className="flex justify-center flex-1">
              <Link href="/" className="relative block h-[80px] w-[110px] sm:h-[100px] sm:w-[138px] md:h-[112px] md:w-[154px]">
                <Image
                  src="/images/logo.svg"
                  alt={SITE_CONFIG.fullName}
                  fill
                  priority
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Right: Hamburger Menu Button */}
            <div className="flex items-center justify-end min-w-[200px]">
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
              >
                <div className="relative size-[36px] md:size-[40px]">
                  <Image
                    src="/images/hamburger-menu.svg"
                    alt="Menu"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Fullscreen / Drawer Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
          <div
            className="w-full max-w-md bg-[#051202] text-white h-full p-8 flex flex-col justify-between overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300"
            role="dialog"
            aria-modal="true"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="relative h-[60px] w-[90px]">
                <Image
                  src="/images/logo.svg"
                  alt={SITE_CONFIG.name}
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Navigation Groups */}
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
