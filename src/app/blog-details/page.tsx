import { Metadata } from "next";
import { FEATURED_ARTICLE } from "@/lib/blog-data";
import { BlogDetailView } from "@/components/blog/BlogDetailView";

export const metadata: Metadata = {
  title: `${FEATURED_ARTICLE.title} | RCCG Court of His Majesty`,
  description: FEATURED_ARTICLE.excerpt,
  openGraph: {
    title: `${FEATURED_ARTICLE.title} | RCCG Court of His Majesty`,
    description: FEATURED_ARTICLE.excerpt,
    images: [
      {
        url: FEATURED_ARTICLE.coverImage || FEATURED_ARTICLE.image,
        width: 1200,
        height: 630,
        alt: FEATURED_ARTICLE.title,
      },
    ],
  },
};

export default function BlogDetailsPage() {
  return <BlogDetailView post={FEATURED_ARTICLE} />;
}

