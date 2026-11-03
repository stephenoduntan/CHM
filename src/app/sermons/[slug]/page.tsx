import { Metadata } from "next";
import { getSermonBySlug, SERMONS_DATA } from "@/lib/sermons-data";
import { SermonWatchDetailView } from "@/components/sermons/SermonWatchDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sermon = getSermonBySlug(slug);

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
  return SERMONS_DATA.map((sermon) => ({
    slug: sermon.id,
  }));
}

export default async function SermonWatchPage({ params }: PageProps) {
  const { slug } = await params;
  const sermon = getSermonBySlug(slug);

  return <SermonWatchDetailView sermon={sermon} />;
}

