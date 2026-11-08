import { Metadata } from "next";
import { HouseFellowshipView } from "@/components/house-fellowship/HouseFellowshipView";

export const metadata: Metadata = {
  title: "House Fellowship Centers | RCCG Court of His Majesty",
  description:
    "Find an RCCG Court of His Majesty house fellowship center near you across Abesan Estate, Ayobo, Ikola, Mosan, Gowon Estate, and Ipaja, Lagos. Meet weekly from house to house for prayer, study, and fellowship.",
  openGraph: {
    title: "House Fellowship Centers | RCCG Court of His Majesty",
    description:
      "Find an RCCG Court of His Majesty house fellowship center near you in Abesan Estate, Ayobo, Ikola, Mosan, Gowon Estate, and Ipaja.",
    images: [
      {
        url: "/images/blog/church-family.png",
        width: 1200,
        height: 630,
        alt: "House Fellowship Centers - RCCG Court of His Majesty",
      },
    ],
  },
};

export default function HouseFellowshipPage() {
  return <HouseFellowshipView />;
}

