import { NextResponse } from "next/server";
import {
  fetchSanitySermons,
  fetchSanityEvents,
  fetchSanityBlogs,
  fetchSanityGallery,
  fetchSanityLeadership,
  fetchSanityHouseFellowship,
} from "@/lib/sanity/fetcher";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const [sermons, events, blogs, gallery, leadership, houseFellowship] =
      await Promise.all([
        fetchSanitySermons(),
        fetchSanityEvents(),
        fetchSanityBlogs(),
        fetchSanityGallery(),
        fetchSanityLeadership(),
        fetchSanityHouseFellowship(),
      ]);

    return NextResponse.json(
      {
        success: true,
        source: "sanity-cms",
        timestamp: new Date().toISOString(),
        data: {
          sermons,
          events,
          blogs,
          gallery,
          leadership,
          houseFellowship,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          "CDN-Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("[API /api/content] Failed to fetch CMS content:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

