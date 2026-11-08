export interface FellowshipCenter {
  id: string;
  name: string;
  landmark: "Abesan" | "Ayobo" | "Isefun" | "Mosan" | "Gowon Estate" | "Ipaja";
  landmarkArea: string;
  address: string;
  leaderName: string;
  leaderPhone: string;
  meetingTime: string;
  meetingDay: string;
  directionsHint?: string;
}

export const HOUSE_FELLOWSHIP_ZONES = [
  { id: "all", name: "All Locations" },
  { id: "Abesan", name: "Abesan Estate" },
  { id: "Ayobo", name: "Ayobo" },
  { id: "Isefun", name: "Isefun & Camp Davies" },
  { id: "Mosan", name: "Mosan & Baruwa" },
  { id: "Gowon Estate", name: "Gowon Estate" },
  { id: "Ipaja", name: "Ipaja Central" },
] as const;

export const HOUSE_FELLOWSHIP_CENTERS: FellowshipCenter[] = [
  // ─── Abesan Estate Zone ──────────────────────────────────────────
  {
    id: "chm-goodness-centre",
    name: "CHM Goodness Centre",
    landmark: "Abesan",
    landmarkArea: "Sector 4, Abesan Estate",
    address: "Block 84, Flat 4, Sector 4, Abesan Estate, Ipaja, Lagos",
    leaderName: "Bro. Jairus Ogwuda",
    leaderPhone: "07060646611",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "Beside Sector 4 playing ground, near Abesan gate",
  },
  {
    id: "ebenezer-centre-abesan",
    name: "Ebenezer Centre",
    landmark: "Abesan",
    landmarkArea: "Sector 2, Gate 2",
    address: "Road 14, Sector 2, Abesan Housing Estate, Ipaja",
    leaderName: "Dcns. Dayo Adepoju",
    leaderPhone: "08127723565",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "Opposite Sector 2 Primary School",
  },
  {
    id: "shalom-centre-abesan",
    name: "Shalom Peace Centre",
    landmark: "Abesan",
    landmarkArea: "Sector 7, Abesan Estate",
    address: "Block 142, Flat 2, Sector 7, Abesan Estate, Lagos",
    leaderName: "Elder & Mrs. S. A. Babatunde",
    leaderPhone: "08033221144",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "Near Sector 7 shopping complex",
  },
  {
    id: "upper-room-centre-abesan",
    name: "Upper Room Centre",
    landmark: "Abesan",
    landmarkArea: "Sector 9, Low Cost",
    address: "Block 190, Flat 6, Sector 9, Federal Housing, Abesan",
    leaderName: "Bro. Sunday Adebayo",
    leaderPhone: "08023456789",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "Behind Sector 9 Water Board",
  },

  // ─── Ayobo Zone ──────────────────────────────────────────────────
  {
    id: "shekinah-glory-ayobo",
    name: "Shekinah Glory Centre",
    landmark: "Ayobo",
    landmarkArea: "Megida, Ayobo",
    address: "18 Megida Road, off Ayobo Bus Stop, Ayobo, Lagos",
    leaderName: "Pastor & Sis. O. Adeleke",
    leaderPhone: "08055667788",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "Five minutes walk from Ayobo central round-about",
  },
  {
    id: "rehoboth-centre-ayobo",
    name: "Rehoboth Centre",
    landmark: "Ayobo",
    landmarkArea: "Ashipa / Camp David",
    address: "12 Camp David Street, off Ashipa Road, Ayobo",
    leaderName: "Bro. Matthew Ogunleye",
    leaderPhone: "08134567890",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "Close to Camp David Academy",
  },
  {
    id: "graceville-centre-ayobo",
    name: "Graceville Centre",
    landmark: "Ayobo",
    landmarkArea: "Amule, Ayobo",
    address: "4 Amule Crescent, off Ayobo-Ipaja Road, Lagos",
    leaderName: "Dcns. Esther Olaniyi",
    leaderPhone: "08022334455",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "Opposite Amule Health Center",
  },

  // ─── Isefun & Camp Davies Zone ───────────────────────────────────
  {
    id: "open-heaven-isefun",
    name: "Open Heaven Centre",
    landmark: "Isefun",
    landmarkArea: "Camp Davies Road",
    address: "22 Camp Davies Road, Isefun, Ayobo-Ipaja, Lagos",
    leaderName: "Bro. Francis Okon",
    leaderPhone: "08066778899",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "Near Camp Davies Event Center",
  },
  {
    id: "favour-centre-isefun",
    name: "Favour Centre",
    landmark: "Isefun",
    landmarkArea: "Peace Estate, Isefun",
    address: "Plot 8, Road 2, Peace Estate, off Isefun Road",
    leaderName: "A/P Joe Mbulu",
    leaderPhone: "08033307611",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "First gate entering Peace Estate",
  },
  {
    id: "divine-mercy-isefun",
    name: "Divine Mercy Centre",
    landmark: "Isefun",
    landmarkArea: "Kande Community, Isefun",
    address: "15 Kande Street, near Isefun Jetty, Lagos",
    leaderName: "Sis. Benedicta Ebhomenye",
    leaderPhone: "08033307612",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "Towards the Isefun community junction",
  },

  // ─── Mosan & Baruwa Zone ─────────────────────────────────────────
  {
    id: "house-of-glory-mosan",
    name: "House of His Glory",
    landmark: "Mosan",
    landmarkArea: "Mosan-Okunola Estate",
    address: "14 Mosan-Okunola Road, Federal Housing Scheme, Mosan",
    leaderName: "Bro. Timothy Alabi",
    leaderPhone: "08077889900",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "Close to Mosan Local Council Secretariat",
  },
  {
    id: "cornerstone-centre-mosan",
    name: "Cornerstone Centre",
    landmark: "Mosan",
    landmarkArea: "Baruwa Bus Stop",
    address: "7 Baruwa Road, near Baruwa Roundabout, Mosan",
    leaderName: "Elder Kingsley Eze",
    leaderPhone: "08033445566",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "Beside Total Energy Station Baruwa",
  },
  {
    id: "covenant-life-mosan",
    name: "Covenant Life Centre",
    landmark: "Mosan",
    landmarkArea: "Command / Mosan Border",
    address: "28 Command Road, near Mosan Gate, Lagos",
    leaderName: "Sis. Deborah Falana",
    leaderPhone: "08188990011",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "Three junctions from Command Secondary School",
  },

  // ─── Gowon Estate Zone ───────────────────────────────────────────
  {
    id: "house-of-wisdom-gowon",
    name: "House of Wisdom Centre",
    landmark: "Gowon Estate",
    landmarkArea: "41 Road, Gowon Estate",
    address: "House 12, 41 Road, Gowon Estate, Egbeda-Ipaja",
    leaderName: "Dr. & Mrs. Kenneth Ibeh",
    leaderPhone: "08022446688",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "Directly opposite Gowon Estate Post Office",
  },
  {
    id: "living-spring-gowon",
    name: "Living Spring Centre",
    landmark: "Gowon Estate",
    landmarkArea: "3rd Avenue, Gowon Estate",
    address: "Block 68, Flat 1, 3rd Avenue, Gowon Estate, Lagos",
    leaderName: "Bro. Samuel Kayode",
    leaderPhone: "08099887766",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "Near 3rd Avenue Recreation Park",
  },

  // ─── Ipaja Central Zone ──────────────────────────────────────────
  {
    id: "grace-house-ipaja",
    name: "Grace House Centre",
    landmark: "Ipaja",
    landmarkArea: "Ipaja Road, Church Vicinity",
    address: "163 Ipaja Road, near Church Bus Stop, Ipaja, Lagos",
    leaderName: "Pastor David Adeyemi",
    leaderPhone: "08033068989",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "Adjacent to Court of His Majesty Sanctuary",
  },
  {
    id: "bethel-sanctuary-ipaja",
    name: "Bethel Sanctuary Centre",
    landmark: "Ipaja",
    landmarkArea: "Alagba / Oluwaga",
    address: "9 Oluwaga Road, off Alagba Bus Stop, Ipaja",
    leaderName: "Bro. Emmanuel Ojo",
    leaderPhone: "08033557799",
    meetingDay: "Sundays",
    meetingTime: "5:00 PM – 6:00 PM",
    directionsHint: "Opposite Oluwaga Health Clinic",
  },
];

export const FELLOWSHIP_BENEFITS = [
  {
    title: "Close-Knit Fellowship",
    description:
      "A smaller, warm setting where every member is known, heard, and genuinely cared for in Christ.",
  },
  {
    title: "Practical Word & Prayer",
    description:
      "Interactive Bible study discussions and focused corporate prayers for family, business, and health needs.",
  },
  {
    title: "Neighborly Support",
    description:
      "A spiritual safety net right in your neighborhood providing timely care during celebrations and seasons of trial.",
  },
  {
    title: "Kingdom Leadership",
    description:
      "A platform to identify, nurture, and exercise your spiritual gifts through teaching, hospitality, and evangelism.",
  },
];

