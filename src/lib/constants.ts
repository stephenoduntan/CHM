/**
 * Site-wide constants for RCCG Court of His Majesty
 * Extracted from Figma design
 */

export const SITE_CONFIG = {
  name: "Court of His Majesty",
  shortName: "MAJESTY",
  fullName: "RCCG Court of His Majesty",
  description: "Impacted Lives, Changing Community. Discover new ways to connect, serve, and grow as you live out your faith alongside others at Court of His Majesty.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rccgchm.com",
  ogImage: "/images/og-image.jpg",
  address: "163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
  phone: "+234 803 306 8989",
  email: "info@rccgchm.com",
} as const;

export const NAV_LINKS = [
  { label: "New Here", href: "/new-here" },
  { label: "Ministries", href: "/ministries" },
  { label: "Give", href: "/give" },
] as const;

export const FOOTER_QUICK_LINKS = [
  { label: "Give", href: "/give" },
  { label: "New Here", href: "/new-here" },
  { label: "Our Beliefs", href: "/our-beliefs" },
  { label: "Our Leadership", href: "/leadership" },
  { label: "Events", href: "/events" },
  { label: "Sermons", href: "/sermons" },
  { label: "Watch Online", href: "/watch-online"},
  { label: "Photo Gallery", href: "/gallery" },
  { label: "Holy Ghost Service", href: "https://www.youtube.com/@rccglive/streams", target: "_blank" },
  { label: "Next Level Cathedral", href: "/next-level-cathedral" },
] as const;

export const FOOTER_CONNECT_LINKS = [
  { label: "Connect with Us", href: "/connect" },
  { label: "House Fellowship", href: "/house-fellowship" },
  { label: "Services", href: "/services" },
  { label: "Prayer Request", href: "/connect" },
  { label: "Testify", href: "/connect" },
  { label: "Management Portal", href: "/management" },
] as const;

export const SOCIAL_LINKS = [
  { platform: "youtube", href: "https://youtube.com/@rccgchm", icon: "/images/youtube.svg" },
  { platform: "facebook", href: "https://www.facebook.com/rccgchm", icon: "/images/facebook.svg" },
  { platform: "instagram", href: "https://instagram.com/rccgchm", icon: "/images/instagram.svg" },
  { platform: "tiktok", href: "https://tiktok.com/@rccg_chm", icon: "/images/tiktok.svg" },
  { platform: "x", href: "https://x.com/rccgchm", icon: "/images/x-twitter.svg" },
] as const;

export const SUNDAY_SERVICES = [
  { time: "7:45 am", service: "First Service" },
  { time: "9:45 am", service: "Sunday School" },
  { time: "10:15 am", service: "Second Service" },
] as const;

export const MIDWEEK_SERVICES = {
  days: "Tuesday & Thursday",
  time: "6:00 pm to 7:15 pm",
} as const;

export const UPCOMING_EVENT = {
  name: "Festival of Destiny Conference",
  theme: "Choose Life",
  startDate: "2026-11-08",
  endDate: "2026-11-15",
  dateLabel: "8th - 15th November 2026",
} as const;
