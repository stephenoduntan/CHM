import { Metadata } from "next";
import { getEventBySlug, EVENTS_DETAILS } from "@/lib/events-data";
import { EventDetailsView } from "@/components/events/EventDetailsView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  return {
    title: `${event.title} | RCCG Court of His Majesty`,
    description: event.overviewParagraph1,
    openGraph: {
      title: `${event.title} | RCCG Court of His Majesty`,
      description: event.overviewParagraph1,
      images: [
        {
          url: event.posterImage,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(EVENTS_DETAILS).map((slug) => ({ slug }));
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  return <EventDetailsView event={event} />;
}
