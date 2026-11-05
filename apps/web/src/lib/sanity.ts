import { createClient } from "next-sanity";

/**
 * Sanity client configured for the public church website.
 * useCdn is set to false (or controllable via env) so additions and edits in Sanity Studio reflect instantly.
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ct660z6u",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === "true",
});

export default client;
