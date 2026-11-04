export interface GalleryImage {
  id: string;
  title: string;
  caption?: string;
  imageUrl: string;
  eventSlug?: string;
  eventName: string;
  eventTag: string;
  date: string; // e.g. "October 19, 2026"
  year: number; // 2026
  month: string; // "October"
}

export const GALLERY_IMAGES: GalleryImage[] = [
  // ─── MEN'S ANNUAL CONFERENCE (Oct 18-20, 2026) ──────────────────────────────
  {
    id: "mens-conf-01",
    title: "Men of Impact Keynote Charge",
    caption: "Pastor Fred Odekhian ministering on Kingdom men taking spiritual leadership in the home and workplace.",
    imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "mens-annual-conference",
    eventName: "Men’s Annual Conference",
    eventTag: "Men's Fellowship",
    date: "October 20, 2026",
    year: 2026,
    month: "October",
  },
  {
    id: "mens-conf-02",
    title: "Brotherhood in Worship & Prayer",
    caption: "Men gathered at the altar lifting holy hands in unified intercession for our nation and families.",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "mens-annual-conference",
    eventName: "Men’s Annual Conference",
    eventTag: "Men's Fellowship",
    date: "October 19, 2026",
    year: 2026,
    month: "October",
  },
  {
    id: "mens-conf-03",
    title: "Marketplace Leadership Breakout Panel",
    caption: "Seasoned executives addressing young professionals on biblical ethics, integrity, and career elevation.",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "mens-annual-conference",
    eventName: "Men’s Annual Conference",
    eventTag: "Men's Fellowship",
    date: "October 18, 2026",
    year: 2026,
    month: "October",
  },
  {
    id: "mens-conf-04",
    title: "Fathers & Sons Blessing Moment",
    caption: "Generational imparting of blessings between fathers, sons, and mentors in the sanctuary.",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "mens-annual-conference",
    eventName: "Men’s Annual Conference",
    eventTag: "Men's Fellowship",
    date: "October 19, 2026",
    year: 2026,
    month: "October",
  },

  // ─── EZZER WOMEN ANNUAL CONFERENCE (Sep 12-14, 2026) ────────────────────────
  {
    id: "ezzer-women-01",
    title: "Women of Grace & Glory Grand Opening",
    caption: "Pastor (Mrs.) Fred Odekhian opening the conference with a dynamic revelation on virtuous strength.",
    imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "ezzer-women-conference",
    eventName: "Ezzer Women Annual Conference",
    eventTag: "Women's Ministry",
    date: "September 14, 2026",
    year: 2026,
    month: "September",
  },
  {
    id: "ezzer-women-02",
    title: "Deep Worship & Spiritual Intimacy",
    caption: "Heartfelt praise as women rejoiced in God's promises of restoration, joy, and peace.",
    imageUrl: "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "ezzer-women-conference",
    eventName: "Ezzer Women Annual Conference",
    eventTag: "Women's Ministry",
    date: "September 13, 2026",
    year: 2026,
    month: "September",
  },
  {
    id: "ezzer-women-03",
    title: "Women in Enterprise & Skill Workshop",
    caption: "Practical masterclasses showcasing women entrepreneurs, financial literacy, and community building.",
    imageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "ezzer-women-conference",
    eventName: "Ezzer Women Annual Conference",
    eventTag: "Women's Ministry",
    date: "September 13, 2026",
    year: 2026,
    month: "September",
  },
  {
    id: "ezzer-women-04",
    title: "Sisterhood Celebration Banquet",
    caption: "Fellowship, laughter, and thanksgiving banquet honoring mothers and women leaders.",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "ezzer-women-conference",
    eventName: "Ezzer Women Annual Conference",
    eventTag: "Women's Ministry",
    date: "September 12, 2026",
    year: 2026,
    month: "September",
  },

  // ─── CHOOSE LIFE MID-YEAR ENCOUNTER (Aug 22-24, 2026) ────────────────────────
  {
    id: "choose-life-01",
    title: "Living Above Limits Altar Call",
    caption: "Souls giving their lives to Jesus Christ and experiencing supernatural breakthrough and renewal.",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "choose-life-encounter",
    eventName: "Choose Life Mid-Year Encounter",
    eventTag: "Conferences",
    date: "August 24, 2026",
    year: 2026,
    month: "August",
  },
  {
    id: "choose-life-02",
    title: "Prophetic Prayer & Deliverance Session",
    caption: "Ministers laying hands and breaking limits over careers, health, and family destinies.",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "choose-life-encounter",
    eventName: "Choose Life Mid-Year Encounter",
    eventTag: "Conferences",
    date: "August 23, 2026",
    year: 2026,
    month: "August",
  },
  {
    id: "choose-life-03",
    title: "Overflow Congregation in Praise",
    caption: "The sanctuary filled to capacity with ecstatic praise and joyful thanksgiving.",
    imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "choose-life-encounter",
    eventName: "Choose Life Mid-Year Encounter",
    eventTag: "Conferences",
    date: "August 22, 2026",
    year: 2026,
    month: "August",
  },

  // ─── KINGDOM LEADERSHIP & BUSINESS SUMMIT (Jul 17-19, 2026) ─────────────────
  {
    id: "leadership-summit-01",
    title: "Marketplace Apostles Keynote Address",
    caption: "Inspiring Christians to shine as lights in boardrooms, governance, tech, and commerce.",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "kingdom-leadership-summit",
    eventName: "Kingdom Leadership & Business Summit",
    eventTag: "Leadership & Career",
    date: "July 19, 2026",
    year: 2026,
    month: "July",
  },
  {
    id: "leadership-summit-02",
    title: "Strategic Executive Networking",
    caption: "Professionals and entrepreneurs building kingdom connections, partnerships, and collaborations.",
    imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "kingdom-leadership-summit",
    eventName: "Kingdom Leadership & Business Summit",
    eventTag: "Leadership & Career",
    date: "July 18, 2026",
    year: 2026,
    month: "July",
  },
  {
    id: "leadership-summit-03",
    title: "Youth Tech & Innovation Exhibition",
    caption: "Young innovators displaying technological solutions anchored on ethical kingdom foundations.",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "kingdom-leadership-summit",
    eventName: "Kingdom Leadership & Business Summit",
    eventTag: "Leadership & Career",
    date: "July 17, 2026",
    year: 2026,
    month: "July",
  },

  // ─── MID-YEAR PRAISE & DELIVERANCE NIGHT (Jun 26, 2026) ─────────────────────
  {
    id: "praise-night-01",
    title: "Hallelujah Victory All-Night Worship",
    caption: "Mass choir and guest psalmists leading high praises from midnight until dawn.",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "midyear-praise-night",
    eventName: "Mid-Year Praise & Deliverance Night",
    eventTag: "Praise & Worship",
    date: "June 26, 2026",
    year: 2026,
    month: "June",
  },
  {
    id: "praise-night-02",
    title: "Instruments of Praise & Trumpets",
    caption: "Anointed musicians pouring out melodies of praise that filled the sanctuary with God's glory.",
    imageUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "midyear-praise-night",
    eventName: "Mid-Year Praise & Deliverance Night",
    eventTag: "Praise & Worship",
    date: "June 26, 2026",
    year: 2026,
    month: "June",
  },
  {
    id: "praise-night-03",
    title: "Joyous Dancing in the Presence of God",
    caption: "Congregants celebrating God's preservation and victory through the first six months of the year.",
    imageUrl: "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "midyear-praise-night",
    eventName: "Mid-Year Praise & Deliverance Night",
    eventTag: "Praise & Worship",
    date: "June 27, 2026",
    year: 2026,
    month: "June",
  },

  // ─── FAMILY & MARRIAGE ENRICHMENT WEEKEND (May 23-24, 2026) ─────────────────
  {
    id: "family-weekend-01",
    title: "Couples Built to Last Renewal",
    caption: "Couples renewing marital vows and receiving pastoral blessings for peace and endurance.",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "family-marriage-weekend",
    eventName: "Family & Marriage Enrichment Weekend",
    eventTag: "Family & Marriage",
    date: "May 24, 2026",
    year: 2026,
    month: "May",
  },
  {
    id: "family-weekend-02",
    title: "Intergenerational Family Forum",
    caption: "Parents and teenagers sharing candid conversations on faith, communication, and mutual respect.",
    imageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "family-marriage-weekend",
    eventName: "Family & Marriage Enrichment Weekend",
    eventTag: "Family & Marriage",
    date: "May 23, 2026",
    year: 2026,
    month: "May",
  },
  {
    id: "family-weekend-03",
    title: "Children Ministry Fun & Bible Fest",
    caption: "The next generation celebrating with Bible quizzes, praise choreography, and family fun.",
    imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "family-marriage-weekend",
    eventName: "Family & Marriage Enrichment Weekend",
    eventTag: "Family & Marriage",
    date: "May 24, 2026",
    year: 2026,
    month: "May",
  },

  // ─── NEXT LEVEL CATHEDRAL & CHURCH MILESTONES ───────────────────────────────
  {
    id: "cathedral-01",
    title: "Next Level Cathedral Groundbreaking & Foundation",
    caption: "Pastoral leadership and congregation dedicating the Next Level Cathedral building site to the glory of God.",
    imageUrl: "/images/cathedral-give-bg.png",
    eventName: "Next Level Cathedral Project",
    eventTag: "Cathedral Project",
    date: "April 12, 2026",
    year: 2026,
    month: "April",
  },
  {
    id: "cathedral-02",
    title: "Architectural Vision Presentation",
    caption: "Unveiling the 5,000-seat sanctuary design, youth creative hub, and community center blueprints.",
    imageUrl: "/images/events/fod-2026-poster.webp",
    eventName: "Next Level Cathedral Project",
    eventTag: "Cathedral Project",
    date: "April 12, 2026",
    year: 2026,
    month: "April",
  },

  // ─── SUNDAY WORSHIP & COMMUNITY OUTREACH ────────────────────────────────────
  {
    id: "sunday-worship-01",
    title: "Sunday Celebration Communion Service",
    caption: "Partaking in the Lord's Table and covenant communion in reverence and thanksgiving.",
    imageUrl: "/images/sermons/sermon-hero-video.png",
    eventName: "Sunday Celebration Service",
    eventTag: "Sunday Worship",
    date: "March 15, 2026",
    year: 2026,
    month: "March",
  },
  {
    id: "community-outreach-01",
    title: "Abesan Community Medical & Food Outreach",
    caption: "CHM Welfare Ministry providing free medical checkups, essential food packages, and prayer to residents.",
    imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=1200",
    eventName: "Community Welfare Outreach",
    eventTag: "Community Outreach",
    date: "February 21, 2026",
    year: 2026,
    month: "February",
  },
  {
    id: "youth-ignite-fest-01",
    title: "Youth Ignite Creative Expression",
    caption: "Young adults presenting spoken word, contemporary gospel, and drama ministrations.",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
    eventName: "Youth Ignite Encounter",
    eventTag: "Youth Ministry",
    date: "January 24, 2026",
    year: 2026,
    month: "January",
  },
  {
    id: "fod-praise-01",
    title: "Festival of Destiny Mass Choir Ministration",
    caption: "The Court Choir lifting the congregation in songs of deliverance and triumph.",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "festival-of-destiny",
    eventName: "Festival of Destiny Conference",
    eventTag: "Conferences",
    date: "November 15, 2025",
    year: 2025,
    month: "November",
  },
  {
    id: "fod-prophetic-01",
    title: "Anointing Service & Prophetic Shift",
    caption: "Pastor Fred Odekhian and guest ministers laying hands and praying for spiritual acceleration.",
    imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "festival-of-destiny",
    eventName: "Festival of Destiny Conference",
    eventTag: "Conferences",
    date: "November 14, 2025",
    year: 2025,
    month: "November",
  },
  {
    id: "good-women-carol-01",
    title: "Good Women Annual Thanksgiving Carols",
    caption: "Joyous carols, testimonies of child dedications, and thanksgiving banquet.",
    imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "good-women-thanksgiving",
    eventName: "Good Women End of Year Thanksgiving",
    eventTag: "Women's Ministry",
    date: "December 14, 2025",
    year: 2025,
    month: "December",
  },
  {
    id: "youth-singles-01",
    title: "Ignite Career Mentorship Session",
    caption: "Tech leaders, corporate executives, and young graduates engaging in career masterclasses.",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    eventSlug: "youth-ignite",
    eventName: "Youth & Singles Ignite Encounter",
    eventTag: "Youth Ministry",
    date: "October 10, 2026",
    year: 2026,
    month: "October",
  },
  {
    id: "sunday-communion-02",
    title: "First Fruit & Thanksgiving Service",
    caption: "Covenant families laying their first fruits at the altar for supernatural abundance.",
    imageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=1200",
    eventName: "Sunday Celebration Service",
    eventTag: "Sunday Worship",
    date: "January 4, 2026",
    year: 2026,
    month: "January",
  },
  {
    id: "church-baptism-01",
    title: "Water Baptism & Believers Dedication",
    caption: "New converts obeying the Lord Jesus Christ in baptism and discipleship commissioning.",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200",
    eventName: "Sunday Celebration Service",
    eventTag: "Sunday Worship",
    date: "August 9, 2026",
    year: 2026,
    month: "August",
  },
];

export function getAllGalleryImages(): GalleryImage[] {
  return GALLERY_IMAGES;
}

export function getGalleryImagesByEventSlug(slug: string): GalleryImage[] {
  if (!slug) return [];
  return GALLERY_IMAGES.filter((img) => img.eventSlug === slug);
}

export function getGalleryTags(): string[] {
  const set = new Set<string>();
  GALLERY_IMAGES.forEach((img) => {
    if (img.eventTag) set.add(img.eventTag);
  });
  return Array.from(set);
}

export function getGalleryYears(): number[] {
  const set = new Set<number>();
  GALLERY_IMAGES.forEach((img) => {
    if (img.year) set.add(img.year);
  });
  return Array.from(set).sort((a, b) => b - a);
}

