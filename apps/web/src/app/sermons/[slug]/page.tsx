import { Metadata } from "next";
import { fetchSanitySermonBySlug, fetchSanitySermons } from "@/lib/sanity/fetcher";
import { SermonWatchDetailView } from "@/components/sermons/SermonWatchDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sermon = await fetchSanitySermonBySlug(slug);

  return {
    title: `${sermon.title} | RCCG Court of His Majesty`,
    description: sermon.description,
    openGraph: {
      title: `${sermon.title} | RCCG Court of His Majesty`,
      description: sermon.description,
      images: [
        {
          url: sermon.thumbnail,
          width: 1200,
          height: 630,
          alt: sermon.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const sermons = await fetchSanitySermons();
  return sermons.map((sermon) => ({
    slug: sermon.id,
  }));
}

export default async function SermonWatchPage({ params }: PageProps) {
  const { slug } = await params;
  const sermon = await fetchSanitySermonBySlug(slug);

  return <SermonWatchDetailView sermon={sermon} requestedSlug={slug} />;
}
