"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import {
  NAV_LINKS,
  SITE_CONFIG,
  MENU_MAIN_NAVIGATION,
  MENU_CONNECT_FELLOWSHIP,
  MENU_RESOURCES,
} from "@/lib/constants";
import { HEADER_VISIBILITY_EVENT } from "@/lib/hooks/useHeaderVisibility";
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
  "/house-fellowship",
  "/gallery",
];

export function Header({ variant }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollYRef = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const prevScrollY = lastScrollYRef.current;
      const delta = currentScrollY - prevScrollY;
      const topThreshold = 50;

      // When at or near the top of the page, header is always visible and in transparent/initial state
      if (currentScrollY <= topThreshold) {
        setIsSticky(false);
        setIsVisible(true);
      } else {
        // Scrolled down past the top: sticky styles are primed
        setIsSticky(true);

        // Guard against bottom rubber-band bouncing on iOS/Safari
        const isNearBottom =
          window.innerHeight + currentScrollY >=
          document.documentElement.scrollHeight - 20;

        // Upward scroll -> appear and stick at the top of the page
        if (delta < -8 && !isNearBottom) {
          setIsVisible(true);
        }
        // Downward scroll -> remain hidden
        else if (delta > 8) {
          setIsVisible(false);
        }
      }

      lastScrollYRef.current = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    // Check position on mount
    updateHeader();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset header state and close mobile drawer on route change
  useEffect(() => {
    setIsMenuOpen(false);
    lastScrollYRef.current = typeof window !== "undefined" ? Math.max(0, window.scrollY) : 0;
    if (lastScrollYRef.current <= 50) {
      setIsSticky(false);
      setIsVisible(true);
    }
  }, [pathname]);

  // Synchronize header visibility state with global event and document root attributes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent(HEADER_VISIBILITY_EVENT, {
          detail: { isVisible, isSticky },
        })
      );
      document.documentElement.setAttribute(
        "data-header-visible",
        isVisible ? "true" : "false"
      );
      document.documentElement.style.setProperty(
        "--header-offset",
        isVisible ? "124px" : "0px"
      );
    }
  }, [isVisible, isSticky]);

  // Determine variant: explicit prop takes precedence, otherwise auto-detect from route
  // Note: /events (root) has a solid black hero (dark header), but /events/[slug] has a white background (light header)
  const isDark =
    variant === "dark" ||
    (variant !== "light" &&
      (pathname === "/events"
        ? true
        : DARK_HEADER_ROUTES.filter((r) => r !== "/events").some(
            (route) => pathname === route || pathname?.startsWith(`${route}/`)
          )));

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? "translate-y-0" : "-translate-y-full pointer-events-none"
        } ${
          isSticky
            ? `shadow-md ${
                isDark
                  ? "bg-[#051202]/95 backdrop-blur-md text-white border-b border-white/10"
                  : "bg-white/95 backdrop-blur-md text-[#242424] border-b border-gray-100/80"
              }`
            : `bg-transparent border-b border-transparent shadow-none ${
                isDark ? "text-white" : "text-[#242424]"
              }`
        }`}>
        <Container>
          <div
            className="flex items-center justify-between h-[124px] sm:h-[124px] relative w-full"
            data-node-id={isDark ? "2070:1798" : "2086:1951"}
            data-name={isDark ? "header-dark" : "header-light"}
          >
            {/* Left Column: Navigation Links (Width: 287px to mirror right column and center logo perfectly) */}
            <div
              className="items-center justify-start gap-[24px] w-[240px] sm:w-[287px] shrink-0 hidden lg:block"
              data-node-id="2086:1942"
            >
              <nav className="flex items-center gap-[24px]">
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
              className="flex items-center justify-left lg:justify-center flex-1 shrink-0"
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
            <div className="py-6 space-y-7">
              {/* Main Navigation */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-3.5 font-display font-recursive-mono font-semibold">
                  Main Navigation
                </h3>
                <ul className="space-y-2 font-display font-recursive-sans text-lg">
                  {MENU_MAIN_NAVIGATION.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block transition-colors py-0.5 ${
                            isActive
                              ? "text-[#c8a96e] font-semibold"
                              : "text-white/90 hover:text-[#c8a96e]"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Connect & Fellowship */}
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-3.5 font-display font-recursive-mono font-semibold">
                  Connect & Fellowship
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#f5f5f5]">
                  {MENU_CONNECT_FELLOWSHIP.map((link) => {
                    const isActive = pathname === link.href;
                    const isExternal = link.target === "_blank" || link.href.startsWith("http");
                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          target={link.target}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          onClick={() => setIsMenuOpen(false)}
                          className={`inline-flex items-center gap-1.5 transition-colors py-1 ${
                            isActive
                              ? "text-[#c8a96e] font-medium"
                              : "hover:text-[#c8a96e]"
                          }`}
                        >
                          <span>{link.label}</span>
                          {isExternal && <span className="text-[10px] opacity-70">↗</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Resources */}
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-3.5 font-display font-recursive-mono font-semibold">
                  Resources
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#f5f5f5]">
                  {MENU_RESOURCES.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`inline-flex items-center gap-1.5 transition-colors py-1 ${
                            isActive
                              ? "text-[#c8a96e] font-medium"
                              : "hover:text-[#c8a96e]"
                          }`}
                        >
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    );
                  })}
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
