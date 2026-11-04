import { Metadata } from "next";
import { DEFAULT_SERMON } from "@/lib/sermons-data";
import { SermonWatchDetailView } from "@/components/sermons/SermonWatchDetailView";

export const metadata: Metadata = {
  title: `${DEFAULT_SERMON.title} | RCCG Court of His Majesty`,
  description: DEFAULT_SERMON.description,
  openGraph: {
    title: `${DEFAULT_SERMON.title} | RCCG Court of His Majesty`,
    description: DEFAULT_SERMON.description,
    images: [
      {
        url: DEFAULT_SERMON.thumbnail,
        width: 1200,
        height: 630,
        alt: DEFAULT_SERMON.title,
      },
    ],
  },
};

export default function SermonDetailsPage() {
  return <SermonWatchDetailView sermon={DEFAULT_SERMON} />;
}

