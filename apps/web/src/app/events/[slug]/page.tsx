import { Metadata } from "next";
import { fetchSanityEventBySlug, fetchSanityEvents } from "@/lib/sanity/fetcher";
import { EventDetailsView } from "@/components/events/EventDetailsView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await fetchSanityEventBySlug(slug);

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
  const events = await fetchSanityEvents();
  return events.map((event) => ({ slug: event.id }));
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await fetchSanityEventBySlug(slug);

  return <EventDetailsView event={event} />;
}
