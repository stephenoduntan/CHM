"use client";

import { useState, useMemo } from "react";
import { Plus, Minus, Search } from "lucide-react";

export interface BeliefItem {
  id: number;
  title: string;
  content: string;
}

export const RCCG_BELIEFS: BeliefItem[] = [
  {
    id: 1,
    title: "THE BIBLE TEACHING",
    content:
      "We believe that the entire Scripture, both Old and New Testaments, are written by the inspiration of the Holy Spirit – II Tim. 3:16-17. All Christian teachings and the Christian faith are firmly based on the Holy Bible – II Pet. 1:21; Prov. 30:5; Rev. 22:18-19.",
  },
  {
    id: 2,
    title: "ABOUT GOD: Ps. 33:6-9",
    content:
      "As revealed unto us by the Bible, we believe that there is only one God, Who is the Creator of both visible and invisible creatures – Gen. 1:1; Ps. 86:9-10; Is. 43:10-11; John 1:1-3. Only God will be in existence forever – Ex. 3:14; in God every creature receives life – John 5:26.",
  },
  {
    id: 3,
    title: "ABOUT JESUS CHRIST",
    content:
      "We believe that He is the Son of God; Who took away our sins, and the Savior of the world. We also believe that Jesus is God and was born of Mary the Virgin. He is God revealed in the flesh. Through Him all things were created – John 1:1-14; John 14:9; Matt. 1:18-25; Is. 9:6; Is. 53:5-6. We believe in His death on the Cross, and resurrection, by which He brought redemption – Is. 53:4-10; I Pet. 2:24; John 10:11; Gal. 3:13; Matt. 20:28; I Cor. 15:3; Rom. 4:25; II Cor. 5:14; Heb. 2:9; Heb. 9:26.",
  },
  {
    id: 4,
    title: "ABOUT THE HOLY SPIRIT",
    content:
      "The Holy Spirit is the third Person of the Trinity. He is one with the Father and the Son. He is the Comforter and the Teacher of all Truth, Who convicts the world of sin, of righteousness, and of judgment. He indwells believers and empowers them for service – John 14:16-17, 26; John 16:7-14; Acts 1:8; Matt. 28:19.",
  },
  {
    id: 5,
    title: "ABOUT TRINITY",
    content:
      "We believe in the Triune God: Father, Son, and Holy Spirit. These three are equal in power, majesty, and glory, being one God existing eternally in three persons – Matt. 28:19; II Cor. 13:14; I John 5:7; Gen. 1:26; John 10:30.",
  },
  {
    id: 6,
    title: "ABOUT THE DEVIL",
    content:
      "We believe that the Devil (Satan) is a real spiritual entity, an angelic being who fell through pride and rebellion against God. He is the adversary of God, the deceiver of mankind, and the author of sin. His final doom in the Lake of Fire has been sealed – Is. 14:12-15; Ezek. 28:12-19; Rev. 20:10; I Pet. 5:8.",
  },
  {
    id: 7,
    title: "ABOUT MAN",
    content:
      "We believe that man was created in the image and likeness of God, innocent and holy, but through voluntary disobedience fell into sin. Consequently, all mankind became sinners by nature and practice, separated from God and in need of redemption – Gen. 1:26-27; Gen. 3:1-19; Rom. 3:23; Rom. 5:12.",
  },
  {
    id: 8,
    title: "REPENTANCE UNTO GOD",
    content:
      "Repentance is a sincere turning away from sin unto God with godly sorrow and a commitment to forsake evil. It is an indispensable condition for forgiveness and salvation – Acts 2:38; Acts 3:19; II Cor. 7:10; Luke 13:3; Prov. 28:13.",
  },
  {
    id: 9,
    title: "JUSTIFICATION OR NEW BIRTH",
    content:
      "Justification is the sovereign act of God's grace whereby a repentant sinner is declared righteous through faith in Jesus Christ and His shed blood. Through the New Birth, a person is regenerated and made a new creation – Rom. 5:1; Rom. 3:24-26; II Cor. 5:17; John 3:3-5.",
  },
  {
    id: 10,
    title: "SANCTIFICATION (HOLINESS)",
    content:
      "Sanctification is a definite work of God's grace following justification, setting the believer apart for God and cleansing the heart from the pollution of sin. Without holiness, no man shall see the Lord – I Thess. 4:3; I Thess. 5:23; Heb. 12:14; I Pet. 1:15-16.",
  },
  {
    id: 11,
    title: "WATER BAPTISM",
    content:
      "Water baptism is by single immersion in the name of the Father, and of the Son, and of the Holy Spirit, as commanded by Christ. It is an outward demonstration of an inward spiritual rebirth, signifying burial and resurrection with Christ – Matt. 28:19; Rom. 6:3-5; Acts 8:36-39; Mark 16:16.",
  },
  {
    id: 12,
    title: "BAPTISM OF THE HOLY SPIRIT",
    content:
      "The baptism of the Holy Spirit is an enduement of power from on high for life and service, promised to all believers. It is distinct from the new birth and is accompanied by the initial physical evidence of speaking in other tongues as the Spirit gives utterance – Acts 1:8; Acts 2:1-4; Acts 10:44-46; Luke 24:49.",
  },
  {
    id: 13,
    title: "ABOUT PRAYER",
    content:
      "Prayer is communion with God, the vital breath of the Christian life. We believe in praying without ceasing, in the name of Jesus, according to God's will and in faith – I Thess. 5:17; Matt. 6:9-13; John 14:13-14; James 5:16-18; Phil. 4:6.",
  },
  {
    id: 14,
    title: "ABOUT RESTITUTION",
    content:
      "Restitution is the act of restoring what has been wrongfully taken, stolen, or defrauded, and reconciling interpersonal grievances wherever possible and right, to keep a conscience void of offense before God and men – Luke 19:8; Lev. 6:1-5; Acts 24:16; Matt. 5:23-24.",
  },
  {
    id: 15,
    title: "DIVINE HEALING (WITHOUT MEDICINE)",
    content:
      "We believe that divine healing is provided in the atonement of Jesus Christ for our physical bodies. Christ took our infirmities and bore our sicknesses. Healing is ministered through prayer of faith and laying on of hands – Is. 53:4-5; Matt. 8:16-17; James 5:14-16; Ex. 15:26.",
  },
  {
    id: 16,
    title: "PROPHECY IN THE CHURCH",
    content:
      "Prophecy is a spiritual gift given by the Holy Spirit for the edification, exhortation, and comfort of the church. All prophecy must be tested and aligned with the written Word of God – I Cor. 14:1-5; I Thess. 5:19-21; II Pet. 1:19-21.",
  },
  {
    id: 17,
    title: "DUE REVERENCE TO PARENTS AND AUTHORITIES",
    content:
      "God's Word strictly commands children to obey and honor their parents in the Lord. Believers are also instructed to submit to constituted civil and spiritual authorities that are ordained of God – Eph. 6:1-3; Col. 3:20; Rom. 13:1-7; Heb. 13:17.",
  },
  {
    id: 18,
    title: "REBELLION AGAINST CHURCH AUTHORITY FORBIDDEN",
    content:
      "Rebellion against spiritual leadership established by God is deeply sinful and brings grave spiritual peril. Believers are called to honor, obey, and submit to their pastors and leaders in love – Num. 12:1-10; Num. 16:1-35; I Sam. 15:23; Heb. 13:17.",
  },
  {
    id: 19,
    title: "DEBTS FORBIDDEN",
    content:
      "Scripture explicitly warns believers against accumulating debts and failing to repay. We are commanded to owe no man anything except love – Rom. 13:8; Prov. 22:7; Ps. 37:21; Deut. 28:12.",
  },
  {
    id: 20,
    title: "OUR GARMENT",
    content:
      "We believe in modesty and decency in Christian attire. Believers should dress in clothing that reflects modesty, sobriety, and godliness, avoiding vanity, worldly fashion extremes, or provocation – I Tim. 2:9-10; I Pet. 3:3-5; Deut. 22:5.",
  },
  {
    id: 21,
    title: "LAYING OF HANDS AND ANOINTING THE SICK",
    content:
      "We believe in the biblical practice of laying on of hands and anointing with oil in the name of the Lord for the healing of the sick, spiritual ordination, and the impartation of spiritual gifts – Mark 16:17-18; James 5:14-15; Acts 6:6; I Tim. 4:14.",
  },
  {
    id: 22,
    title: "HOLY MATRIMONY",
    content:
      "Marriage was instituted by God as a sacred, lifelong covenant exclusively between one biological man and one biological woman. It is honorable in all, and the marriage bed is undefiled – Gen. 2:24; Matt. 19:4-6; Heb. 13:4; Eph. 5:22-33.",
  },
  {
    id: 23,
    title: "PROPHECY & PROPHETIC ORDER IN THE CHURCH",
    content:
      "Spiritual gifts must operate decently and in order. While we do not despise prophecies, all manifestations must be judged by spiritual elders according to sound doctrine – I Cor. 14:29-40; I John 4:1.",
  },
  {
    id: 24,
    title: "CHURCH DISCIPLINE",
    content:
      "The church has the biblical authority and duty to exercise loving, scriptural discipline to correct sin, preserve the purity of the body of Christ, and restore erring brethren – Matt. 18:15-17; I Cor. 5:1-13; Gal. 6:1; II Thess. 3:14-15.",
  },
  {
    id: 25,
    title: "ONE HUSBAND, ONE WIFE, CORRECT DIVORCE AND RE-MARRIAGE",
    content:
      "Scripture teaches monogamy: one man married to one woman for life. God hates divorce. Separation or divorce followed by remarriage while the former spouse lives is unscriptural – Mal. 2:14-16; Matt. 19:6-9; Rom. 7:2-3; I Cor. 7:10-11.",
  },
  {
    id: 26,
    title: "HOLY COMMUNION OR THE LORD'S SUPPER",
    content:
      "The Lord's Supper is a divine ordinance instituted by Jesus Christ for born-again believers to commemorate His suffering, broken body, and shed blood, and to proclaim His death until He returns – Matt. 26:26-29; I Cor. 11:23-30; Luke 22:19-20.",
  },
  {
    id: 27,
    title: "THE CHURCH OF GOD",
    content:
      "The Church is the spiritual Body and Bride of Christ, composed of all genuinely born-again believers from every nation, tribe, and tongue. Christ is the supreme Head of the Church – Eph. 1:22-23; Col. 1:18; I Cor. 12:12-27; I Pet. 2:9.",
  },
  {
    id: 28,
    title: "THE DEDICATION OR SEPARATION",
    content:
      "Believers are called out from the world unto God in holiness and total consecration. We must maintain a distinct, separate walk from ungodly worldly practices, unrighteous partnerships, and idolatry – II Cor. 6:14-18; Rom. 12:1-2; I John 2:15-17.",
  },
  {
    id: 29,
    title: "THE DEDICATED CHRISTIAN",
    content:
      "A dedicated Christian lives wholly for Christ, presenting their body as a living sacrifice, fervent in spirit, diligent in service, faithful in stewardship, and bearing the fruits of the Spirit – Rom. 12:1; Gal. 5:22-23; Col. 3:1-4; II Tim. 2:3-4.",
  },
  {
    id: 30,
    title: "THE DEAD IN CHRIST",
    content:
      "We believe that when a believer dies physically, their spirit immediately goes to be with Christ in conscious joy and peace, awaiting the glorious resurrection of the body at Christ's return – II Cor. 5:8; Phil. 1:21-23; Luke 23:43; I Thess. 4:13-14.",
  },
  {
    id: 31,
    title: "RESURRECTION",
    content:
      "We believe in the literal, bodily resurrection of both the saved and the lost; the saved unto the resurrection of life and eternal glory, and the unsaved unto the resurrection of damnation and judgment – John 5:28-29; I Cor. 15:20-23; Acts 24:15; Rev. 20:11-15.",
  },
  {
    id: 32,
    title: "THE SECOND COMING OF CHRIST",
    content:
      "The second coming of Jesus Christ is literal, bodily, and imminent. It will occur in two stages: first, the Rapture of the saints to meet Him in the air; second, His glorious revelation with His saints to reign on the earth – I Thess. 4:16-17; Acts 1:11; Rev. 1:7; Matt. 24:30.",
  },
  {
    id: 33,
    title: "THE TRIBULATION PERIOD",
    content:
      "Following the Rapture, the earth will experience the Great Tribulation—a period of unprecedented distress, judgment, and the rise of the Antichrist, as prophesied in Scripture – Matt. 24:21-22; Dan. 12:1; Rev. 6-19; II Thess. 2:3-12.",
  },
  {
    id: 34,
    title: "THE MILLENNIAL REIGN (CHRIST 1,000 YEARS' REIGN)",
    content:
      "Christ will return visibly to the earth with His saints to establish a literal kingdom of universal peace, justice, and righteousness, reigning over the nations for one thousand years – Rev. 20:1-6; Is. 11:6-9; Micah 4:1-4; Zech. 14:9.",
  },
  {
    id: 35,
    title: "SATAN IN PRISON",
    content:
      "During the Millennial Reign of Christ, Satan will be bound and cast into the bottomless pit for a thousand years, unable to deceive the nations until the period is completed – Rev. 20:1-3.",
  },
  {
    id: 36,
    title: "THE COMING JUDGEMENTS",
    content:
      "God has appointed days of judgment: the Judgment Seat of Christ for believers' rewards (II Cor. 5:10), the Judgment of Nations (Matt. 25:31-46), and the Great White Throne Judgment for the wicked and unsaved (Rev. 20:11-15) – Heb. 9:27.",
  },
  {
    id: 37,
    title: "NEW HEAVEN AND NEW EARTH",
    content:
      "We believe that the present heavens and earth will be dissolved by fire, and God will create a New Heaven and a New Earth wherein righteousness dwells, the eternal dwelling place of the redeemed – II Pet. 3:10-13; Rev. 21:1-5; Is. 65:17.",
  },
  {
    id: 38,
    title: "ETERNAL LIFE AND ETERNAL PUNISHMENT",
    content:
      "We believe in eternal life with God for all who trust and obey Jesus Christ, and eternal, conscious punishment in the Lake of Fire for the Devil, his demons, and all who reject the salvation of God – Matt. 25:46; John 3:16; Rev. 20:10-15; Rev. 21:8.",
  },
  {
    id: 39,
    title: "DEDICATION OF CHILDREN",
    content:
      "In accordance with biblical example, we practice the dedication of infants and children to the Lord, presenting them before God in the congregation for blessing and pastoral prayer – I Sam. 1:26-28; Luke 2:22-24; Matt. 19:13-15.",
  },
  {
    id: 40,
    title: "THE LORD'S DAY",
    content:
      "We observe Sunday, the first day of the week, as the Lord's Day in commemoration of Christ's glorious resurrection, setting it apart for worship, fellowship, prayer, and the ministry of the Word – Acts 20:7; I Cor. 16:2; Rev. 1:10; Ps. 118:24.",
  },
];

export function BeliefsList() {
  const [openIds, setOpenIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(RCCG_BELIEFS.map((b) => b.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  const filteredBeliefs = useMemo(() => {
    if (!searchQuery.trim()) return RCCG_BELIEFS;
    const query = searchQuery.toLowerCase();
    return RCCG_BELIEFS.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.content.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="w-full flex flex-col gap-6" data-name="beliefs-accordion">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctrines or scriptures (e.g. Prayer, Baptism)..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/70 text-sm focus:outline-none focus:ring-2 focus:ring-[#180c62] focus:border-transparent transition-all"
          />
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto text-xs font-semibold">
          <button
            onClick={expandAll}
            className="px-3.5 py-1.5 rounded-lg bg-[#e6e1f9] hover:bg-[#dcd4f5] text-[#180c62] transition-colors cursor-pointer"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3.5 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-6 w-full" data-node-id="2086:1646">
        {filteredBeliefs.map((belief) => {
          const isOpen = openIds.includes(belief.id);

          return (
            <div
              key={belief.id}
              className="w-full rounded-[8px] overflow-hidden transition-all duration-300 shadow-sm"
            >
              {/* Card Header matching Figma Dropdown */}
              <button
                type="button"
                onClick={() => toggleItem(belief.id)}
                className="w-full bg-[#e6e1f9] hover:bg-[#ded7f7] border-t-2 border-[#180c62] p-5 sm:p-6 flex items-center justify-between cursor-pointer select-none text-left transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 pr-4">
                  <span className="font-mono text-xs sm:text-sm font-bold text-[#180c62]/60 shrink-0">
                    {String(belief.id).padStart(2, "0")}
                  </span>
                  <h3 className="font-sans font-semibold text-base sm:text-lg lg:text-[22px] text-[#180c62] tracking-wide uppercase leading-snug">
                    {belief.title}
                  </h3>
                </div>

                <div className="size-7 rounded-full flex items-center justify-center shrink-0 text-[#180c62] bg-[#180c62]/10 transition-transform">
                  {isOpen ? (
                    <Minus className="size-4 stroke-[2.5]" />
                  ) : (
                    <Plus className="size-4 stroke-[2.5]" />
                  )}
                </div>
              </button>

              {/* Card Content with Smooth Disclosure */}
              {isOpen && (
                <div className="bg-[#fbfaff] border-x border-b border-[#180c62]/20 p-6 sm:p-8 text-[#3d3d3d] text-base sm:text-lg lg:text-[20px] leading-relaxed font-normal animate-in fade-in-50 duration-200">
                  <p>{belief.content}</p>
                </div>
              )}
            </div>
          );
        })}

        {filteredBeliefs.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            No beliefs found matching &quot;{searchQuery}&quot;.
          </div>
        )}
      </div>
    </div>
  );
}

