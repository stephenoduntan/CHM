import { Metadata } from "next";
import { getBlogPostBySlug, ALL_BLOG_POSTS } from "@/lib/blog-data";
import { BlogDetailView } from "@/components/blog/BlogDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  return {
    title: `${post.title} | RCCG Court of His Majesty`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | RCCG Court of His Majesty`,
      description: post.excerpt,
      images: [
        {
          url: post.coverImage || post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return ALL_BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  return <BlogDetailView post={post} />;
}

