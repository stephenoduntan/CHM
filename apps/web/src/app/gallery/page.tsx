import { Metadata } from "next";
import { GalleryView } from "@/components/gallery/GalleryView";

export const metadata: Metadata = {
  title: "Church Photo Gallery | RCCG Court of His Majesty",
  description:
    "Explore photo highlights from conferences, worship services, choir ministrations, family weekends, and community outreaches at RCCG Court of His Majesty.",
  openGraph: {
    title: "Church Photo Gallery | RCCG Court of His Majesty",
    description:
      "Explore photo highlights from conferences, worship services, choir ministrations, family weekends, and community outreaches at RCCG Court of His Majesty.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Church Photo Gallery - RCCG Court of His Majesty",
      },
    ],
  },
};

export default function GalleryPage() {
  return <GalleryView />;
}

