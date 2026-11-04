import { Metadata } from "next";
import { WatchOnlineView } from "@/components/watch/WatchOnlineView";

export const metadata: Metadata = {
  title: "Watch Online | Live Broadcast & Sermons | RCCG Court of His Majesty",
  description:
    "Join RCCG Court of His Majesty live online for Sunday celebration services, midweek prayer, and ministry broadcasts. Experience worship, take digital sermon notes, and sow into Kingdom advancement.",
  openGraph: {
    title: "Watch Online | Live Broadcast & Sermons | RCCG Court of His Majesty",
    description:
      "Join RCCG Court of His Majesty live online for Sunday celebration services, midweek prayer, and ministry broadcasts.",
    images: [
      {
        url: "/images/sermons/sermon-hero-video.png",
        width: 1200,
        height: 630,
        alt: "Watch Online - RCCG Court of His Majesty",
      },
    ],
  },
};

export default function WatchOnlinePage() {
  return <WatchOnlineView />;
}

