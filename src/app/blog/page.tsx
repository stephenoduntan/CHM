import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Blog & Devotionals",
  description: "Spiritual insights, testimonies, and faith-building articles from RCCG Court of His Majesty.",
};

const blogPosts = [
  {
    id: "finding-peace-in-times-of-trial",
    title: "Finding Peace in the Middle of Life's Storms",
    excerpt: "True peace is not the absence of trouble; it is the tangible presence of Christ reassuring you that you are never alone.",
    author: "Pastor Fred Odekhian",
    date: "October 20, 2026",
    readTime: "5 min read",
    category: "Faith & Spiritual Growth",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "power-of-intentional-parenting",
    title: "Raising Kingdom Champions: The Power of Intentional Parenting",
    excerpt: "Guiding the next generation requires consistent prayer, personal example, and instilling biblical values early in their walk.",
    author: "Pastor (Mrs.) Fred Odekhian",
    date: "October 14, 2026",
    readTime: "7 min read",
    category: "Family & Parenting",
    image: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "secrets-of-answered-prayers",
    title: "Unlocking Heaven: Three Keys to Answered Prayers",
    excerpt: "When you align your petitions with God's written word and approach Him with thanksgiving, breakthroughs become your everyday reality.",
    author: "Pastor Caleb Okedere",
    date: "October 08, 2026",
    readTime: "6 min read",
    category: "Prayer & Intercession",
    image: "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?auto=format&fit=crop&q=80&w=800",
  },
];

export default function BlogPage() {
  return (
    <div className="w-full bg-white pb-24">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[420px] lg:min-h-[480px] bg-[#051202] text-white flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1920"
          alt="Articles and Devotionals"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051202] via-[#051202]/70 to-transparent" />

        <Container className="relative z-10 text-center py-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#c8a96e]/20 border border-[#c8a96e]/40 text-[#c8a96e] text-xs font-semibold uppercase tracking-wider mb-4">
            Spiritual Insights
          </span>
          <h1 className="font-display font-recursive-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 uppercase tracking-tight">
            Blog & Devotionals
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Practical teachings and biblical wisdom to encourage and sharpen your daily Christian walk.
          </p>
        </Container>
      </section>

      {/* ─── Blog Articles Grid ───────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-[28px] overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 text-xs font-semibold bg-[#051202]/80 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/20">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h2 className="font-sans font-bold text-xl text-[#051202] mb-3 group-hover:text-[#c8a96e] transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
                    <User className="size-3.5 text-[#c8a96e]" />
                    <span>{post.author}</span>
                  </div>

                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#051202] group-hover:text-[#c8a96e] transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
