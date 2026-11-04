import { createClient } from "next-sanity";

/**
 * Read-only Sanity client configured with CDN caching enabled for maximum edge performance.
 * Used across the public church website to query Sermons, Events, Leadership, Blogs, and Galleries.
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ct660z6u",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: true, // CDN enabled for read-only caching at edge
});

export default client;

