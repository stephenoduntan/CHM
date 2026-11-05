"use client";

import { useState, useEffect } from "react";

export const HEADER_VISIBILITY_EVENT = "chm_header_visibility";
export const HEADER_HEIGHT_PX = 124;

/**
 * Hook to synchronize sticky sub-bars (like search/filter headers)
 * with the main Header's on-scroll appear/disappear interaction.
 *
 * - When header is visible (e.g. scroll up or at page top): returns true (offset = 124px)
 * - When header is hidden (scrolling down): returns false (offset = 0px)
 */
export function useHeaderVisibility(): boolean {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1. Check initial data attribute if already set on document root
    if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute("data-header-visible");
      if (attr !== null) {
        setIsVisible(attr === "true");
      }
    }

    // 2. Direct event listener synchronized with Header component
    const handleHeaderEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ isVisible?: boolean }>;
      if (typeof customEvent.detail?.isVisible === "boolean") {
        setIsVisible(customEvent.detail.isVisible);
      }
    };

    window.addEventListener(HEADER_VISIBILITY_EVENT, handleHeaderEvent);

    // 3. Fallback scroll watcher (ensures exact synchronization even if mounted during scroll)
    let lastScrollY = typeof window !== "undefined" ? Math.max(0, window.scrollY) : 0;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = Math.max(0, window.scrollY);
          const delta = currentScrollY - lastScrollY;
          const topThreshold = 50;

          if (currentScrollY <= topThreshold) {
            setIsVisible(true);
          } else {
            const isNearBottom =
              window.innerHeight + currentScrollY >=
              document.documentElement.scrollHeight - 20;

            if (delta < -8 && !isNearBottom) {
              setIsVisible(true);
            } else if (delta > 8) {
              setIsVisible(false);
            }
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener(HEADER_VISIBILITY_EVENT, handleHeaderEvent);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return isVisible;
}

