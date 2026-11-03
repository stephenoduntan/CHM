export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  series: string;
  duration: string;
  thumbnail: string;
  youtubeId: string;
  description: string;
  supportingCopy: string;
  biblePassage?: string;
}

export const SERMONS_DATA: Sermon[] = [
  {
    id: "alignment-precedes-acceleration",
    title: "Alignment Precedes Acceleration",
    speaker: "Pastor Fred Odekhian",
    date: "October 24, 2026",
    series: "Festival of Destiny Series",
    duration: "1 hr 15 mins",
    thumbnail: "/images/sermons/sermon-hero-video.png",
    youtubeId: "vBvP_h0k_X8", // Fallback church stream ID
    biblePassage: "1 Corinthians 2:4",
    description:
      "In this profound message delivered at the Festival of Destiny, Pastor Fred Odekhian teaches on the divine principle of alignment. Drawing from 1 Corinthians 2:4, he demonstrates that when a believer’s spirit, thoughts, and actions align with the counsel of God, supernatural acceleration and victory become inevitable.",
    supportingCopy:
      "Watch the full message and continue exploring sermons from Court of His Majesty below.",
  },
  {
    id: "walking-in-divine-destiny",
    title: "Walking in Divine Destiny",
    speaker: "Pastor Fred Odekhian",
    date: "October 17, 2026",
    series: "Destiny Series",
    duration: "58 mins",
    thumbnail: "/images/sermons/sermon-hero-video.png",
    youtubeId: "vBvP_h0k_X8",
    biblePassage: "Jeremiah 29:11",
    description:
      "Discover God's sovereign blueprint for your journey. Pastor Fred breaks down the essential steps to discerning God's voice, obeying divine instructions, and stepping boldly into the fullness of your destiny.",
    supportingCopy:
      "Watch the full message and continue exploring sermons from Court of His Majesty below.",
  },
  {
    id: "the-power-of-consecration",
    title: "The Power of Consecration",
    speaker: "Pastor (Mrs.) Fred Odekhian",
    date: "October 10, 2026",
    series: "Spiritual Foundations",
    duration: "45 mins",
    thumbnail: "/images/sermons/sermon-hero-video.png",
    youtubeId: "vBvP_h0k_X8",
    biblePassage: "Joshua 3:5",
    description:
      "A timely call to holiness and devotion. Pastor (Mrs.) Fred Odekhian shares how sanctification and wholehearted consecration release extraordinary spiritual authority and favor.",
    supportingCopy:
      "Watch the full message and continue exploring sermons from Court of His Majesty below.",
  },
  {
    id: "overflowing-grace",
    title: "Overflowing Grace for Greater Exploits",
    speaker: "Pastor Caleb Okedere",
    date: "October 3, 2026",
    series: "Grace Unveiled",
    duration: "1 hr 12 mins",
    thumbnail: "/images/sermons/sermon-hero-video.png",
    youtubeId: "vBvP_h0k_X8",
    biblePassage: "2 Corinthians 9:8",
    description:
      "Pastor Caleb expounds on God's unmerited favor and sufficiency, empowering every believer to conquer impossible odds and make lasting Kingdom impact.",
    supportingCopy:
      "Watch the full message and continue exploring sermons from Court of His Majesty below.",
  },
  {
    id: "faith-that-moves-mountains",
    title: "Faith That Moves Mountains",
    speaker: "Pastor Fred Odekhian",
    date: "September 26, 2026",
    series: "Victorious Faith",
    duration: "52 mins",
    thumbnail: "/images/sermons/sermon-hero-video.png",
    youtubeId: "vBvP_h0k_X8",
    biblePassage: "Mark 11:23-24",
    description:
      "Unshakable faith in God's promises removes every spiritual and physical obstacle. Learn how to speak to your mountains and enforce God's Word in your everyday circumstances.",
    supportingCopy:
      "Watch the full message and continue exploring sermons from Court of His Majesty below.",
  },
  {
    id: "the-secret-place",
    title: "Dwell in the Secret Place",
    speaker: "Pastor (Mrs.) Fred Odekhian",
    date: "September 19, 2026",
    series: "Intimacy with God",
    duration: "48 mins",
    thumbnail: "/images/sermons/sermon-hero-video.png",
    youtubeId: "vBvP_h0k_X8",
    biblePassage: "Psalm 91:1-2",
    description:
      "True protection and strength come from dwelling in God's presence. Pastor (Mrs.) Fred teaches the power of a quiet prayer life and daily communion with the Holy Spirit.",
    supportingCopy:
      "Watch the full message and continue exploring sermons from Court of His Majesty below.",
  },
];

export const DEFAULT_SERMON = SERMONS_DATA[0];

export function getSermonBySlug(slug: string): Sermon {
  const found = SERMONS_DATA.find((s) => s.id === slug);
  return found || DEFAULT_SERMON;
}

export function getRelatedSermons(currentId: string, count = 3): Sermon[] {
  return SERMONS_DATA.filter((s) => s.id !== currentId).slice(0, count);
}
