export interface Leader {
  id: string;
  name: string;
  role: string;
  category: "senior" | "associate" | "director" | "elders";
  //badge: string;
  image: string;
  shortBio: string;
  fullBio: string[];
  scripture: {
    quote: string;
    reference: string;
  };
  responsibilities: string[];
  contactEmail?: string;
}

export const SENIOR_PASTORS: Leader = {
  id: "pastor-fred-odekhian",
  name: "Pastor & Pastor (Mrs.) Fred Odekhian",
  role: "Pastor-in-Charge of Province (PICP) & Parish Pastor",
  category: "senior",
  //badge: "Senior Pastoral Leadership",
  image: "/images/sermons/sermon-hero-video.png",
  shortBio:
    "Visionary shepherds called by God to teach spiritual alignment, raise consecrated disciples, and steer Lagos Province 94 in apostolic impact and supernatural growth.",
  fullBio: [
    "Pastor Fred Odekhian is the Pastor-in-Charge of RCCG Lagos Province 94 (Headquarters) and the Senior Pastor of Court of His Majesty, a flagship parish committed to spiritual transformation, prayer, and community leadership in Abesan Estate, Ipaja, Lagos.",
    "Known for his profound, scripture-steeped teaching on the divine principle of alignment ('Alignment Precedes Acceleration'), Pastor Fred carries a dynamic apostolic mandate to help believers step out of delay and walk into supernatural destiny.",
    "Together with his wife, Pastor (Mrs.) Fred Odekhian, an anointed teacher, intercessor, and convener of women's spiritual movements, they model family values, compassionate leadership, and mentorship across all generations. Under their guidance, Court of His Majesty has spearheaded landmark community projects including the multi-million naira Next Level Cathedral.",
  ],
  scripture: {
    quote:
      "“And my speech and my preaching was not with enticing words of man's wisdom, but in demonstration of the Spirit and of power.”",
    reference: "1 Corinthians 2:4",
  },
  responsibilities: [
    "Apostolic oversight and spiritual direction of Lagos Province 94 (HQ)",
    "Pulpit ministry, expository preaching, and doctrinal integrity",
    "Leadership development, ministerial mentorship, and ordination guidance",
    "Chief visionaries of the Next Level Cathedral project and regional missions",
  ],
  contactEmail: "pastorate@courtofhismajesty.org",
};

export const LEADERSHIP_TEAM: Leader[] = [
  {
    id: "pastor-caleb-okedere",
    name: "Pastor & Pastor (Mrs.) Caleb Okedere",
    role: "National Secretary RCCG & Assistant Pastor (Admin)",
    category: "associate",
    //badge: "Executive Pastoral Team",
    image: "/images/explore/teachings.webp",
    shortBio:
      "Seasoned administrator, teacher of righteousness, and National Secretary of RCCG, championing operational excellence and ministerial fidelity.",
    fullBio: [
      "Pastor Caleb Okedere serves with distinction as the National Secretary of the Redeemed Christian Church of God (RCCG) and plays a vital executive role in the leadership team of Court of His Majesty.",
      "With decades of dedicated stewardship in church governance, constitutional administration, and biblical training, Pastor Caleb inspires workers and ministers to pursue spiritual excellence combined with meticulous diligence.",
      "Alongside Pastor (Mrs.) Okedere, they actively invest in marital mentoring, leadership training, and building systems that enable the church to expand effortlessly while preserving spiritual power.",
    ],
    scripture: {
      quote: "“Moreover it is required in stewards, that a man be found faithful.”",
      reference: "1 Corinthians 4:2",
    },
    responsibilities: [
      "Provincial administration, policy execution, and protocol oversight",
      "Executive governance and national church relations",
      "Ministerial ethics, worker training, and leadership accountability",
    ],
    contactEmail: "admin@courtofhismajesty.org",
  },
  {
    id: "pastor-david-adeyemi",
    name: "Pastor David Adeyemi",
    role: "Associate Pastor, Discipleship & Evangelism",
    category: "associate",
    //badge: "Associate Pastor",
    image: "/images/explore/community.webp",
    shortBio:
      "A passionate evangelist dedicated to grassroots outreach, soul winning, follow-up, and raising believers who actively share their faith.",
    fullBio: [
      "Pastor David Adeyemi brings infectious zeal to the evangelism and discipleship ministry at Court of His Majesty. He believes every believer is commissioned to be an ambassador of Christ in the marketplace.",
      "He coordinates house-to-house visitations, medical outreaches, digital evangelism, and community food drives that demonstrate Christ's unconditional love in tangible ways.",
    ],
    scripture: {
      quote:
        "“Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost.”",
      reference: "Matthew 28:19",
    },
    responsibilities: [
      "Evangelical crusades and community soul-winning campaigns",
      "New converts follow-up, Believers' Class, and Baptismal School",
      "House Fellowship coordination across Abesan Estate zones",
    ],
  },
  {
    id: "pastor-grace-oladipo",
    name: "Pastor (Mrs.) Grace Oladipo",
    role: "Associate Pastor, Women & Family Ministries",
    category: "associate",
    //badge: "Associate Pastor",
    image: "/images/explore/ministries.webp",
    shortBio:
      "A compassionate shepherd and intercessor devoted to equipping women, strengthening marriages, and building wholesome, godly homes.",
    fullBio: [
      "Pastor (Mrs.) Grace Oladipo coordinates the King's Diadem and Good Women Fellowship at Court of His Majesty, creating an empowering environment for women of all walks of life.",
      "She regularly hosts marriage seminars, motherhood masterclasses, and intensive prayer vigils aimed at preserving the spiritual sanctity of families.",
    ],
    scripture: {
      quote:
        "“She openeth her mouth with wisdom; and in her tongue is the law of kindness.”",
      reference: "Proverbs 31:26",
    },
    responsibilities: [
      "Good Women Fellowship and King's Diadem ministry coordination",
      "Pre-marital and marital counseling in conjunction with senior pastorate",
      "Welfare and benevolence support for widows, single mothers, and families",
    ],
  },
  {
    id: "pastor-emmanuel-ogundele",
    name: "Pastor Emmanuel Ogundele",
    role: "Youth & Young Adults Pastor (Youth Ignite)",
    category: "director",
    //badge: "NextGen & Youth Director",
    image: "/images/explore/get-involved.webp",
    shortBio:
      "A dynamic mentor empowering youth, teens, students, and young professionals to maximize their divine potential without compromising kingdom values.",
    fullBio: [
      "Pastor Emmanuel Ogundele leads Youth Ignite, the vibrant young adult and student ministry at Court of His Majesty.",
      "With innovative formats including worship lounges, career bootcamps, and creative arts summits, he helps young people navigate 21st-century culture with unshakable biblical convictions.",
    ],
    scripture: {
      quote:
        "“Let no man despise thy youth; but be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity.”",
      reference: "1 Timothy 4:12",
    },
    responsibilities: [
      "Oversight of Youth Ignite, Teens Church, and Campus Fellowships",
      "Career mentorship, entrepreneurship workshops, and youth leadership retreats",
      "Creative expressions and digital media outreach for next-generation believers",
    ],
  },
  {
    id: "minister-michael-adeleke",
    name: "Minister Michael Adeleke",
    role: "Director of Music & Creative Arts",
    category: "director",
    //badge: "Music & Media Director",
    image: "/images/blog/church-family.png",
    shortBio:
      "Consecrated psalmist and choir director steering Majesty Voices into profound atmospheres of high praise, deep worship, and creative ministry.",
    fullBio: [
      "Minister Michael Adeleke directs Majesty Voices, the celebrated praise and worship team of Court of His Majesty.",
      "He believes worship is both a lifestyle of devotion and a powerful spiritual weapon that pulls down strongholds and ushers God's presence into the congregation.",
    ],
    scripture: {
      quote:
        "“God is a Spirit: and they that worship him must worship him in spirit and in truth.”",
      reference: "John 4:24",
    },
    responsibilities: [
      "Majesty Voices choral direction, rehearsals, and repertoire development",
      "Sound engineering, acoustic production, and live stream media coordination",
      "Mentoring vocalists, instrumentalists, and sound technicians",
    ],
  },
  // {
  //   id: "elders-forum",
  //   name: "The Elders’ Forum of Throne of Grace / CHM",
  //   role: "Board of Spiritual Elders & Advisors",
  //   category: "elders",
  //   badge: "Spiritual Council",
  //   image: "/images/blog/bible-study.png",
  //   shortBio:
  //     "Heaven-bound fathers and mothers in faith who provide seasoned spiritual counsel, intercessory cover, and mature guidance to the body of Christ.",
  //   fullBio: [
  //     "The Elders’ Forum is an esteemed association of seasoned believers who are heaven-bound, fully committed to finishing their Christian race well.",
  //     "Comprising retired ministers, veteran workers, and spiritual patriarchs from age 60 and above, God has empowered and equipped our elders with wisdom from above to offer continual guidance and prayer support to the pastors and members.",
  //   ],
  //   scripture: {
  //     quote:
  //       "“The hoary head is a crown of glory, if it be found in the way of righteousness.”",
  //     reference: "Proverbs 16:31",
  //   },
  //   responsibilities: [
  //     "Strategic prayer cover for the pastorate, province, and nation",
  //     "Spiritual conflict resolution and ethical guidance within the parish",
  //     "Mentoring younger couples and interceding for the church's spiritual vitality",
  //   ],
  // },
];

export const LEADERSHIP_CATEGORIES = [
  { id: "all", label: "All Leaders" },
  { id: "senior", label: "Senior Pastors" },
  { id: "associate", label: "Associate Pastors" },
  { id: "director", label: "Ministry Directors" },
  // { id: "elders", label: "Elders' Council" },
] as const;

export const LEADERSHIP_VALUES = [
  {
    title: "Biblical Integrity",
    description:
      "Upholding the uncompromised Word of God as the final authority in all matters of life, doctrine, and church governance.",
  },
  {
    title: "Servant Leadership",
    description:
      "Modeling Christ-like humility, empathy, and sacrificial service to nurture and elevate every member of God's household.",
  },
  {
    title: "Spiritual Alignment",
    description:
      "Prioritizing deep prayer, personal consecration, and sensitive obedience to the Holy Spirit above human wisdom.",
  },
  {
    title: "Generational Legacy",
    description:
      "Equipping children, youth, and upcoming ministers to carry the torch of revival into future generations.",
  },
];

