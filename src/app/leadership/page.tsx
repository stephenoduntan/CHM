import { Metadata } from "next";
import { LeadershipView } from "@/components/leadership/LeadershipView";

export const metadata: Metadata = {
  title: "Our Leadership | RCCG Court of His Majesty",
  description:
    "Meet Pastor Fred Odekhian, Pastor (Mrs.) Fred Odekhian, and the pastoral leadership team shepherding RCCG Court of His Majesty (Lagos Province 94 HQ) in faith, discipleship, and community transformation.",
  openGraph: {
    title: "Our Leadership | RCCG Court of His Majesty",
    description:
      "Meet Pastor Fred Odekhian, Pastor (Mrs.) Fred Odekhian, and the pastoral leadership team shepherding RCCG Court of His Majesty.",
    images: [
      {
        url: "/images/sermons/sermon-hero-video.png",
        width: 1200,
        height: 630,
        alt: "Our Leadership - RCCG Court of His Majesty",
      },
    ],
  },
};

export default function LeadershipPage() {
  return <LeadershipView />;
}

