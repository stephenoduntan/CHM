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
  // ─── UPCOMING EVENTS ────────────────────────────────────────────────────────
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
    posterImage: "/images/events/fod-2026-poster.webp",
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
    posterImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
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
  "good-women-thanksgiving": {
    slug: "good-women-thanksgiving",
    status: "Upcoming event",
    title: "Good Women End of Year Thanksgiving",
    theme: "Joy Unspeakable",
    date: "December 12th",
    year: "2026",
    fullDate: "December 12th, 2026",
    time: "10:00 AM",
    venue: "Fellowship Hall",
    churchName: "RCCG Court of His Majesty",
    addressLine1: "163 Ipaja Road, Abesan Estate Gate,",
    addressLine2: "Lagos, Nigeria",
    posterImage: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1200",
    aboutTitle: "About the thanksgiving",
    overviewParagraph1:
      "A grand annual celebration of God’s faithfulness, provisions, and protection over our families throughout 2026.",
    overviewParagraph2:
      "Join the Good Women Fellowship for joyful praises, heartfelt testimonies, special carols, and community banquet.",
    inviteHeading: "Come with someone",
    inviteCopy:
      "Invite your mothers, sisters, and neighbors for a memorable celebration of joy and thanksgiving.",
    calendarEvent: {
      title: "Good Women End of Year Thanksgiving - Joy Unspeakable",
      description:
        "A grand annual celebration of God’s faithfulness, provisions, and protection over our families throughout 2026.",
      location:
        "Fellowship Hall, RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      startDate: "2026-12-12T10:00:00",
      endDate: "2026-12-12T14:00:00",
    },
  },
  "crossover-service": {
    slug: "crossover-service",
    status: "Upcoming event",
    title: "Crossover Night of Glory & Restoration",
    theme: "Exceeding Grace",
    date: "December 31st",
    year: "2026",
    fullDate: "December 31st, 2026 - January 1st, 2027",
    time: "9:00 PM till 1:00 AM",
    venue: "Main Auditorium",
    churchName: "RCCG Court of His Majesty",
    addressLine1: "163 Ipaja Road, Abesan Estate Gate,",
    addressLine2: "Lagos, Nigeria",
    posterImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
    aboutTitle: "About the crossover",
    overviewParagraph1:
      "Step boldly into the new year with prophetic declarations, high praises, thanksgiving, and communion.",
    overviewParagraph2:
      "Gather with thousands as we receive the prophetic theme for 2027 and usher in supernatural blessings at the stroke of midnight.",
    inviteHeading: "Come with someone",
    inviteCopy:
      "Gather your family and friends to cross over into 2027 in God’s holy presence.",
    calendarEvent: {
      title: "Crossover Night of Glory & Restoration - Exceeding Grace",
      description:
        "Step boldly into the new year with prophetic declarations, high praises, thanksgiving, and communion at RCCG Court of His Majesty.",
      location:
        "Main Auditorium, RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      startDate: "2026-12-31T21:00:00",
      endDate: "2027-01-01T01:00:00",
    },
  },
  "annual-fasting-prayer": {
    slug: "annual-fasting-prayer",
    status: "Upcoming event",
    title: "21 Days Annual Prayer & Fasting",
    theme: "Dominion & Power",
    date: "January 11th - 31st",
    year: "2027",
    fullDate: "January 11th - 31st, 2027",
    time: "6:00 PM Daily",
    venue: "Church Auditorium & Online",
    churchName: "RCCG Court of His Majesty",
    addressLine1: "163 Ipaja Road, Abesan Estate Gate,",
    addressLine2: "Lagos, Nigeria",
    posterImage: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
    aboutTitle: "About the prayer and fasting",
    overviewParagraph1:
      "Consecrate the first month of 2027 to seek the face of God in fasting, prayer, and word encounters.",
    overviewParagraph2:
      "Daily evening prayer charges, breakthrough ministrations, and corporate waiting on the Lord for divine direction.",
    inviteHeading: "Come with someone",
    inviteCopy:
      "Join hands with fellow believers to lay an unshakeable spiritual foundation for 2027.",
    calendarEvent: {
      title: "21 Days Annual Prayer & Fasting - Dominion & Power",
      description:
        "Consecrate the first month of 2027 to seek the face of God in fasting, prayer, and word encounters at RCCG Court of His Majesty.",
      location:
        "Church Auditorium, RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      startDate: "2027-01-11T18:00:00",
      endDate: "2027-01-31T20:00:00",
    },
  },
  "divine-elevation": {
    slug: "divine-elevation",
    status: "Upcoming event",
    title: "Divine Elevation Encounter Service",
    theme: "Next Level Shift",
    date: "February 14th",
    year: "2027",
    fullDate: "February 14th, 2027",
    time: "8:00 AM & 10:00 AM",
    venue: "Main Sanctuary",
    churchName: "RCCG Court of His Majesty",
    addressLine1: "163 Ipaja Road, Abesan Estate Gate,",
    addressLine2: "Lagos, Nigeria",
    posterImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200",
    aboutTitle: "About the service",
    overviewParagraph1:
      "A special anointing service for breakthroughs in careers, businesses, families, and personal destiny.",
    overviewParagraph2:
      "Experience transformative worship, prophetic word, and prayer for divine acceleration into your next level.",
    inviteHeading: "Come with someone",
    inviteCopy:
      "Invite a friend desiring a shift and supernatural elevation in their life and endeavors.",
    calendarEvent: {
      title: "Divine Elevation Encounter Service - Next Level Shift",
      description:
        "A special anointing service for breakthroughs in careers, businesses, families, and personal destiny at RCCG Court of His Majesty.",
      location:
        "Main Sanctuary, RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      startDate: "2027-02-14T08:00:00",
      endDate: "2027-02-14T12:00:00",
    },
  },

  // ─── PAST LATEST EVENTS (Last 6 Months: May 2026 to Nov 2026) ───────────────
  "mens-annual-conference": {
    slug: "mens-annual-conference",
    status: "Past event",
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
    posterImage: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=1200",
    aboutTitle: "About the conference",
    overviewParagraph1:
      "Join RCCG Court of His Majesty for the Men’s Annual Conference, themed “Kingdom Men of Impact”.",
    overviewParagraph2:
      "From October 18th - 20th, men gathered for life-transforming sessions in biblical leadership, spiritual authority, and career excellence.",
    inviteHeading: "Stay connected",
    inviteCopy:
      "Missed this gathering? Connect with our Men’s Fellowship to access sermon replays and study materials.",
    calendarEvent: {
      title: "Men’s Annual Conference - Kingdom Men of Impact",
      description:
        "A strategic gathering of men discovering biblical leadership, career excellence, and spiritual authority at RCCG Court of His Majesty.",
      location:
        "Main Sanctuary, RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      startDate: "2026-10-18T09:00:00",
      endDate: "2026-10-20T20:00:00",
    },
  },
  "ezzer-women-conference": {
    slug: "ezzer-women-conference",
    status: "Past event",
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
    posterImage: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=1200",
    aboutTitle: "About the conference",
    overviewParagraph1:
      "The Ezzer Women Annual Conference themed “Women of Grace & Glory” brought women together for intense prayer and spiritual empowerment.",
    overviewParagraph2:
      "Participants engaged in anointed teaching, marriage enrichment, business masterclasses, and sisterhood in Christ.",
    inviteHeading: "Stay connected",
    inviteCopy:
      "Join our Ezzer Women monthly fellowship and access audio recordings of each conference session.",
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
    status: "Past event",
    title: "Choose Life Mid-Year Encounter",
    theme: "Living Above Limits",
    date: "August 22nd - 24th",
    year: "2026",
    fullDate: "August 22nd - 24th, 2026",
    time: "5:30 PM Daily",
    venue: "Church Auditorium & Livestream",
    churchName: "RCCG Court of His Majesty",
    addressLine1: "163 Ipaja Road, Abesan Estate Gate,",
    addressLine2: "Lagos, Nigeria",
    posterImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200",
    aboutTitle: "About the encounter",
    overviewParagraph1:
      "A powerful 3-day encounter of intensive prayer, deliverance, divine healing, and breakthrough in God's presence.",
    overviewParagraph2:
      "Dozens testified to supernatural interventions, financial open doors, and miraculous healings during this mid-year convention.",
    inviteHeading: "Listen to the replays",
    inviteCopy:
      "Catch up on the sermons and prophetic ministrations from the Choose Life Encounter online.",
    calendarEvent: {
      title: "Choose Life Mid-Year Encounter - Living Above Limits",
      description:
        "A powerful weekend of intensive prayer, deliverance, divine healing, and breakthrough encounters in God's presence.",
      location:
        "Church Auditorium, RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      startDate: "2026-08-22T17:30:00",
      endDate: "2026-08-24T21:00:00",
    },
  },
  "kingdom-leadership-summit": {
    slug: "kingdom-leadership-summit",
    status: "Past event",
    title: "Kingdom Leadership & Business Summit",
    theme: "Marketplace Apostles",
    date: "July 17th - 19th",
    year: "2026",
    fullDate: "July 17th - 19th, 2026",
    time: "5:00 PM Daily",
    venue: "Main Auditorium",
    churchName: "RCCG Court of His Majesty",
    addressLine1: "163 Ipaja Road, Abesan Estate Gate,",
    addressLine2: "Lagos, Nigeria",
    posterImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    aboutTitle: "About the summit",
    overviewParagraph1:
      "Equipping executives, entrepreneurs, and professionals with biblical leadership principles and Kingdom wealth creation strategies.",
    overviewParagraph2:
      "Featuring keynote sessions from seasoned Christian business executives, breakout investment workshops, and networking dinners.",
    inviteHeading: "Access materials",
    inviteCopy:
      "Contact the church admin office to access session workbooks, slides, and recorded masterclasses.",
    calendarEvent: {
      title: "Kingdom Leadership & Business Summit - Marketplace Apostles",
      description:
        "Equipping executives, entrepreneurs, and professionals with biblical leadership principles and Kingdom wealth creation strategies.",
      location:
        "Main Auditorium, RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      startDate: "2026-07-17T17:00:00",
      endDate: "2026-07-19T20:30:00",
    },
  },
  "midyear-praise-night": {
    slug: "midyear-praise-night",
    status: "Past event",
    title: "Mid-Year Praise & Deliverance Night",
    theme: "Hallelujah Victory",
    date: "June 26th",
    year: "2026",
    fullDate: "June 26th, 2026",
    time: "10:00 PM till Dawn",
    venue: "Church Auditorium",
    churchName: "RCCG Court of His Majesty",
    addressLine1: "163 Ipaja Road, Abesan Estate Gate,",
    addressLine2: "Lagos, Nigeria",
    posterImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
    aboutTitle: "About the praise night",
    overviewParagraph1:
      "An explosive all-night worship celebration marking the conclusion of the first half of 2026 in high praise and adoration.",
    overviewParagraph2:
      "Guest worship ministers led thousands in non-stop praise, breaking yokes and establishing victories for the remaining months.",
    inviteHeading: "Relive the worship",
    inviteCopy:
      "Stream the full praise night audio on our podcasts page and worship anytime.",
    calendarEvent: {
      title: "Mid-Year Praise & Deliverance Night - Hallelujah Victory",
      description:
        "An explosive all-night worship celebration marking the conclusion of the first half of 2026 in high praise and adoration.",
      location:
        "Church Auditorium, RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      startDate: "2026-06-26T22:00:00",
      endDate: "2026-06-27T05:00:00",
    },
  },
  "family-marriage-weekend": {
    slug: "family-marriage-weekend",
    status: "Past event",
    title: "Family & Marriage Enrichment Weekend",
    theme: "Built to Last",
    date: "May 23rd - 24th",
    year: "2026",
    fullDate: "May 23rd - 24th, 2026",
    time: "10:00 AM & 4:00 PM",
    venue: "Fellowship Hall",
    churchName: "RCCG Court of His Majesty",
    addressLine1: "163 Ipaja Road, Abesan Estate Gate,",
    addressLine2: "Lagos, Nigeria",
    posterImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
    aboutTitle: "About the weekend",
    overviewParagraph1:
      "Strengthening matrimonial bonds, parenting communication, and generational blessings across families in our church.",
    overviewParagraph2:
      "Couples enjoyed candid panel discussions, relationship therapy workshops, romance renewals, and youth parenting forums.",
    inviteHeading: "Family ministry",
    inviteCopy:
      "Connect with our Family & Marriage counseling ministry for resources and ongoing mentorship.",
    calendarEvent: {
      title: "Family & Marriage Enrichment Weekend - Built to Last",
      description:
        "Strengthening matrimonial bonds, parenting communication, and generational blessings across families in our church.",
      location:
        "Fellowship Hall, RCCG Court of His Majesty, 163 Ipaja Road, Abesan Estate Gate, Lagos, Nigeria",
      startDate: "2026-05-23T10:00:00",
      endDate: "2026-05-24T18:00:00",
    },
  },
};

export const DEFAULT_EVENT = EVENTS_DETAILS["festival-of-destiny"];

export function getEventBySlug(slug?: string): EventDetail {
  if (!slug) return DEFAULT_EVENT;
  return EVENTS_DETAILS[slug] || DEFAULT_EVENT;
}
