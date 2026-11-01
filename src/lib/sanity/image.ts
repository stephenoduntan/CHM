import imageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "@/types";
import { client } from "./client";

const builder = imageUrlBuilder(client);

/**
 * Generate optimized image URLs from Sanity image references
 */
export function urlForImage(source: SanityImage) {
  return builder.image(source);
}

