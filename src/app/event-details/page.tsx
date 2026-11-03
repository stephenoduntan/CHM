import { Metadata } from "next";
import { DEFAULT_EVENT } from "@/lib/events-data";
import { EventDetailsView } from "@/components/events/EventDetailsView";

export const metadata: Metadata = {
  title: `${DEFAULT_EVENT.title} | RCCG Court of His Majesty`,
  description: DEFAULT_EVENT.overviewParagraph1,
  openGraph: {
    title: `${DEFAULT_EVENT.title} | RCCG Court of His Majesty`,
    description: DEFAULT_EVENT.overviewParagraph1,
    images: [
      {
        url: DEFAULT_EVENT.posterImage,
        width: 1200,
        height: 630,
        alt: DEFAULT_EVENT.title,
      },
    ],
  },
};

export default function EventDetailsPage() {
  return <EventDetailsView event={DEFAULT_EVENT} />;
}
