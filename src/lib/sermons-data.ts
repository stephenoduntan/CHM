export interface TranscriptSegment {
  timestamp: string;
  speaker: string;
  text: string;
}

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
  keyPoints?: string[];
  transcript?: TranscriptSegment[];
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
    keyPoints: [
      "Divine Order: God never releases maximum acceleration into an area of your life that lacks spiritual order.",
      "Demonstration of Power: Power does not reside in human oratory, but in alignment with the Holy Ghost.",
      "The Prepared Altar: Like Elijah on Mount Carmel, the altar of your heart must be repaired before heaven responds with fire.",
      "Unlocking Supernatural Speed: What takes ten years of human striving can be achieved in ten days under divine alignment.",
    ],
    transcript: [
      {
        timestamp: "00:00",
        speaker: "Pastor Fred Odekhian",
        text: "Praise the Lord, Church! Welcome to this momentous gathering at the Festival of Destiny. Lift up your hands and ask the Holy Spirit to speak directly to your destiny today.",
      },
      {
        timestamp: "04:15",
        speaker: "Pastor Fred Odekhian",
        text: "Let us read together from 1 Corinthians chapter 2, verse 4: 'And my speech and my preaching was not with enticing words of man’s wisdom, but in demonstration of the Spirit and of power.' Notice that the Apostle Paul does not boast in human eloquence. He anchors everything in the demonstration of spiritual power.",
      },
      {
        timestamp: "12:30",
        speaker: "Pastor Fred Odekhian",
        text: "Many believers pray for speed. You want promotion, you want expansion, you want breakthroughs. But hear me clearly: God will never accelerate what is out of divine alignment. If a train accelerates on misaligned tracks, disaster follows. God loves you too much to give you speed that will crash your character.",
      },
      {
        timestamp: "24:50",
        speaker: "Pastor Fred Odekhian",
        text: "Consider Elijah in 1 Kings 18. Before he prayed for fire to fall, Scripture records that he first repaired the altar of the Lord that had been broken down. Alignment always precedes the fire. When your prayer life, your integrity, and your obedience line up with God's Word, the fire of heaven falls without struggle.",
      },
      {
        timestamp: "38:15",
        speaker: "Pastor Fred Odekhian",
        text: "What does alignment look like in your daily life? First, alignment of your thoughts with God's promises. Second, alignment of your priorities—seeking first the Kingdom of God and His righteousness. When these two are in place, the grace of God produces effortless acceleration.",
      },
      {
        timestamp: "52:40",
        speaker: "Pastor Fred Odekhian",
        text: "I speak prophetically over your life: where you have experienced delay, stagnation, and frustration, the hand of the Lord is aligning your steps. Receive divine wisdom, divine connection, and unstoppable momentum in the precious name of Jesus!",
      },
    ],
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
    keyPoints: [
      "The Blueprint: God possessed thoughts of peace and an expected end for you before your conception.",
      "Hearing the Shepherd's Voice: Discernment is cultivated in the place of quiet prayer and saturation in the Word.",
      "The Courage to Obey: Destiny does not unfold automatically; it responds to bold, radical steps of obedience.",
    ],
    transcript: [
      {
        timestamp: "00:00",
        speaker: "Pastor Fred Odekhian",
        text: "God bless you saints. Today we examine Jeremiah 29:11: 'For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.' You are not an accident of biology; you are a product of divine intention.",
      },
      {
        timestamp: "15:20",
        speaker: "Pastor Fred Odekhian",
        text: "To walk in divine destiny, you must eliminate the noise of popular opinion. What God whispered to you in secret is higher than the verdict of the world. Cultivate a listening heart.",
      },
      {
        timestamp: "35:10",
        speaker: "Pastor Fred Odekhian",
        text: "Every destiny requires divine partners. Align yourself with mentors, intercessors, and a local church family that sharpens your spiritual edge. You will fulfill your calling in Jesus' name.",
      },
    ],
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
    keyPoints: [
      "Sanctify Yourselves: Joshua said, 'Sanctify yourselves: for tomorrow the Lord will do wonders among you.'",
      "Separation unto God: Consecration is not deprivation; it is separation for divine elevation.",
      "Spiritual Authority: Purity in the secret place guarantees public power against demonic resistance.",
    ],
    transcript: [
      {
        timestamp: "00:00",
        speaker: "Pastor (Mrs.) Fred Odekhian",
        text: "Beloved in Christ, peace be multiplied to you. Today the Lord is calling His church to a deeper walk of consecration. When we separate ourselves unto Him, wonders become our everyday experience.",
      },
      {
        timestamp: "18:40",
        speaker: "Pastor (Mrs.) Fred Odekhian",
        text: "Consecration guards your heart against the subtle pollutants of this world. Protect your eyes, guard your ears, and keep your tongue seasoned with grace. When God finds a clean vessel, He fills it with His glory.",
      },
    ],
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
    keyPoints: [
      "All-Sufficient Grace: God is able to make all grace abound toward you, that you always have all sufficiency.",
      "Exploits in the Marketplace: Kingdom grace is not confined to the sanctuary; it manifests in business, career, and governance.",
    ],
    transcript: [
      {
        timestamp: "00:00",
        speaker: "Pastor Caleb Okedere",
        text: "Grace is God doing for you what you could never do for yourself. When grace steps in, struggles step out. Welcome to a season of overflowing favor.",
      },
    ],
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
    keyPoints: [
      "Speaking Faith: Faith is not passive meditation; faith is voiced authority.",
      "Refusing Doubt: Doubt looks at the size of the mountain; faith looks at the majesty of the Mountain-Mover.",
    ],
    transcript: [
      {
        timestamp: "00:00",
        speaker: "Pastor Fred Odekhian",
        text: "Mark 11:23 says whosoever shall say unto this mountain, be thou removed, and shall not doubt in his heart, he shall have whatsoever he saith. Today, you will speak to your mountain!",
      },
    ],
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
    keyPoints: [
      "Dwelling vs Visiting: God did not call us to visit His presence on Sunday; He called us to dwell in the secret place continually.",
      "The Shadow of the Almighty: Under His wings you are untouchable to the arrows that fly by day.",
    ],
    transcript: [
      {
        timestamp: "00:00",
        speaker: "Pastor (Mrs.) Fred Odekhian",
        text: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. There is a fortress for the believer that no storm can shake.",
      },
    ],
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

