export interface EventDetail {
  slug: string;
  status: string;
  title: string;
  theme?: string;
  date: string;
  year?: string;
  fullDate?: string;
  time?: string;
  venue: string;
  churchName: string;
  addressLine1: string;
  addressLine2: string;
  posterImage: string;
  aboutTitle: string;
  overviewParagraph1: string;
  overviewParagraph2: string;
  inviteHeading: string;
  inviteCopy: string;
  calendarEvent: {
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
  };
}

export const EVENTS_DETAILS: Record<string, EventDetail> = {
  "festival-of-destiny": {
    slug: "festival-of-destiny",
    status: "Upcoming event",
    title: "2026 Festival of Destiny Conference",
    theme: "CHOOSE LIFE",
    date: "November 8th - 15th",
    year: "2026",
    fullDate: "November 8th - 15th, 2026",
    time: "6:00 PM Daily (Grand Finale: 8:00 AM Sunday)",
    venue: "Church Auditorium",
    churchName: "RCCG Court of His Majesty",
    addressLine1: "163 Ipaja Road, Abesan Estate Gate,",
    addressLine2: "Lagos, Nigeria",
    posterImage: "/images/events/fod-2026-poster.png",
    aboutTitle: "About the conference",
    overviewParagraph1:
      "Join RCCG Court of His Majesty for the 2026 Festival of Destiny Conference, themed “CHOOSE LIFE”.",
    overviewParagraph2:
      "From November 8th - 15th, come together with our church community at the Church Auditorium. Set aside the dates and make plans to join us.",
    inviteHeading: "Come with someone",
    inviteCopy:
      "Invite a friend or family member to join you for the conference.",
    calendarEvent: {
      title: "2026 Festival of Destiny Conference - Choose Life",
      description:
        "Join RCCG Court of His Majesty for the 2026 Festival of Destiny Conference, themed CHOOSE LIFE. From November 8th - 15th, 2026.",
      location:
        "Church Auditorium, RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      startDate: "2026-11-08T18:00:00",
      endDate: "2026-11-15T21:00:00",
    },
  },
  "mens-annual-conference": {
    slug: "mens-annual-conference",
    status: "Upcoming event",
    title: "Men’s Annual Conference",
    theme: "Kingdom Men of Impact",
    date: "October 18th - 20th",
    year: "2026",
    fullDate: "October 18th - 20th, 2026",
    time: "9:00 AM & 5:00 PM",
    venue: "Main Sanctuary",
    churchName: "RCCG Court of His Majesty",
    addressLine1: "163 Ipaja Road, Abesan Estate Gate,",
    addressLine2: "Lagos, Nigeria",
    posterImage: "/images/events/fod-2026-poster.png",
    aboutTitle: "About the conference",
    overviewParagraph1:
      "Join RCCG Court of His Majesty for the Men’s Annual Conference, themed “Kingdom Men of Impact”.",
    overviewParagraph2:
      "From October 18th - 20th, come together with our men’s fellowship for life-transforming sessions in biblical leadership, spiritual authority, and career excellence.",
    inviteHeading: "Come with someone",
    inviteCopy:
      "Invite a brother, colleague, or friend to experience this impactful weekend together.",
    calendarEvent: {
      title: "Men’s Annual Conference - Kingdom Men of Impact",
      description:
        "A strategic gathering of men to discover biblical leadership, career excellence, and spiritual authority at RCCG Court of His Majesty.",
      location:
        "Main Sanctuary, RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      startDate: "2026-10-18T09:00:00",
      endDate: "2026-10-20T20:00:00",
    },
  },
  "ezzer-women-conference": {
    slug: "ezzer-women-conference",
    status: "Upcoming event",
    title: "Ezzer Women Annual Conference",
    theme: "Women of Grace & Glory",
    date: "September 12th - 14th",
    year: "2026",
    fullDate: "September 12th - 14th, 2026",
    time: "10:00 AM & 6:00 PM",
    venue: "Main Sanctuary",
    churchName: "RCCG Court of His Majesty",
    addressLine1: "163 Ipaja Road, Abesan Estate Gate,",
    addressLine2: "Lagos, Nigeria",
    posterImage: "/images/events/fod-2026-poster.png",
    aboutTitle: "About the conference",
    overviewParagraph1:
      "Join RCCG Court of His Majesty for the Ezzer Women Annual Conference, themed “Women of Grace & Glory”.",
    overviewParagraph2:
      "From September 12th - 14th, gather with virtuous women for deep prayer, anointed teaching, business empowerment, and sisterhood in Christ.",
    inviteHeading: "Come with someone",
    inviteCopy:
      "Invite a sister, mother, or daughter to encounter God’s grace and glory.",
    calendarEvent: {
      title: "Ezzer Women Annual Conference - Women of Grace & Glory",
      description:
        "Empowering women across marriage, spiritual warfare, family, and enterprise through prayer, teachings, and sisterhood at RCCG Court of His Majesty.",
      location:
        "Main Sanctuary, RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      startDate: "2026-09-12T10:00:00",
      endDate: "2026-09-14T20:00:00",
    },
  },
  "choose-life-encounter": {
    slug: "choose-life-encounter",
    status: "Upcoming event",
    title: "Choose Life Conference",
    theme: "Living Above Limits",
    date: "August 22nd - 24th",
    year: "2026",
    fullDate: "August 22nd - 24th, 2026",
    time: "5:30 PM Daily",
    venue: "Church Auditorium & Livestream",
    churchName: "RCCG Court of His Majesty",
    addressLine1: "163 Ipaja Road, Abesan Estate Gate,",
    addressLine2: "Lagos, Nigeria",
    posterImage: "/images/events/fod-2026-poster.png",
    aboutTitle: "About the conference",
    overviewParagraph1:
      "Join RCCG Court of His Majesty for the Choose Life Encounter, themed “Living Above Limits”.",
    overviewParagraph2:
      "From August 22nd - 24th, experience powerful nights of prophetic breakthrough, salvation, and divine healing.",
    inviteHeading: "Come with someone",
    inviteCopy:
      "Invite anyone seeking divine direction, healing, and supernatural encounter.",
    calendarEvent: {
      title: "Choose Life Conference - Living Above Limits",
      description:
        "A powerful weekend of intensive prayer, deliverance, divine healing, and breakthrough encounters in God's presence.",
      location:
        "Church Auditorium, RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      startDate: "2026-08-22T17:30:00",
      endDate: "2026-08-24T21:00:00",
    },
  },
  "holy-ghost-service": {
    slug: "holy-ghost-service",
    status: "Upcoming event",
    title: "Monthly Holy Ghost Service",
    theme: "Power from on High",
    date: "First Friday of Every Month",
    year: "2026",
    fullDate: "First Friday of Every Month, 7:00 PM till Dawn",
    time: "7:00 PM till Dawn",
    venue: "RCCG Redemption City & Live in Sanctuary",
    churchName: "RCCG Court of His Majesty",
    addressLine1: "163 Ipaja Road, Abesan Estate Gate,",
    addressLine2: "Lagos, Nigeria",
    posterImage: "/images/events/fod-2026-poster.png",
    aboutTitle: "About the gathering",
    overviewParagraph1:
      "Join millions worldwide for the Holy Ghost Service with our General Overseer, Pastor E.A. Adeboye.",
    overviewParagraph2:
      "A supernatural night of prophetic declarations, miracles, salvation, and breakthroughs in God's presence.",
    inviteHeading: "Come with someone",
    inviteCopy:
      "Invite family and loved ones for an unforgettable night of divine intervention.",
    calendarEvent: {
      title: "Monthly Holy Ghost Service - Power from on High",
      description:
        "A night of extraordinary miracles, salvation, healing, and prophetic declarations with the General Overseer, Pastor E.A. Adeboye.",
      location:
        "RCCG Redemption City & Sanctuary, Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      startDate: "2026-11-06T19:00:00",
      endDate: "2026-11-07T05:00:00",
    },
  },
  "youth-ignite": {
    slug: "youth-ignite",
    status: "Upcoming event",
    title: "Youth & Singles Ignite Encounter",
    theme: "Purpose Unveiled",
    date: "November 28th",
    year: "2026",
    fullDate: "November 28th, 2026",
    time: "4:00 PM",
    venue: "Youth Arena",
    churchName: "RCCG Court of His Majesty",
    addressLine1: "163 Ipaja Road, Abesan Estate Gate,",
    addressLine2: "Lagos, Nigeria",
    posterImage: "/images/events/fod-2026-poster.png",
    aboutTitle: "About the encounter",
    overviewParagraph1:
      "Join the dynamic youth generation at Court of His Majesty for Ignite Encounter, themed “Purpose Unveiled”.",
    overviewParagraph2:
      "Featuring electrifying worship, practical career masterclasses, relationship panels, and an altar encounter with God.",
    inviteHeading: "Come with someone",
    inviteCopy:
      "Bring your squad, campus friends, and peers for an uplifting experience.",
    calendarEvent: {
      title: "Youth & Singles Ignite Encounter - Purpose Unveiled",
      description:
        "Vibrant worship, breakout career and relationship masterclasses, and an altar encounter specifically for teenagers, students, and young professionals.",
      location:
        "Youth Arena, RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      startDate: "2026-11-28T16:00:00",
      endDate: "2026-11-28T20:00:00",
    },
  },
};

export const DEFAULT_EVENT = EVENTS_DETAILS["festival-of-destiny"];

export function getEventBySlug(slug?: string): EventDetail {
  if (!slug) return DEFAULT_EVENT;
  return EVENTS_DETAILS[slug] || DEFAULT_EVENT;
}
