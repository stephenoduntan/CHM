/**
 * GROQ queries for fetching data from Sanity CMS
 */

// ─── Sermons ─────────────────────────────────────────────────────────────────
export const SERMONS_QUERY = `*[_type == "sermon"] | order(date desc) {
  _id,
  title,
  slug,
  date,
  series,
  description,
  videoUrl,
  audioUrl,
  scriptureReferences,
  image,
  "speaker": speaker->{name, slug, image, role}
}`;

export const SERMON_BY_SLUG_QUERY = `*[_type == "sermon" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  date,
  series,
  description,
  videoUrl,
  audioUrl,
  scriptureReferences,
  image,
  notes,
  "speaker": speaker->{name, slug, image, role}
}`;

// ─── Events ──────────────────────────────────────────────────────────────────
export const EVENTS_QUERY = `*[_type == "event"] | order(date asc) {
  _id,
  title,
  slug,
  date,
  endDate,
  time,
  location,
  description,
  image,
  registrationUrl,
  isFeatured
}`;

export const UPCOMING_EVENTS_QUERY = `*[_type == "event" && date >= now()] | order(date asc) [0...6] {
  _id,
  title,
  slug,
  date,
  time,
  location,
  description,
  image,
  registrationUrl,
  isFeatured
}`;

export const EVENT_BY_SLUG_QUERY = `*[_type == "event" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  date,
  endDate,
  time,
  location,
  description,
  image,
  registrationUrl,
  isFeatured,
  body
}`;

// ─── Blog ────────────────────────────────────────────────────────────────────
export const BLOG_POSTS_QUERY = `*[_type == "blog"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  featuredImage,
  tags,
  "author": author->{name, slug, image},
  "categories": categories[]->{title, slug}
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  body,
  featuredImage,
  tags,
  "author": author->{name, slug, image, bio, role},
  "categories": categories[]->{title, slug}
}`;

// ─── Podcasts ────────────────────────────────────────────────────────────────
export const PODCASTS_QUERY = `*[_type == "podcast"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  episodeNumber,
  season,
  audioUrl,
  duration,
  description,
  guests,
  image,
  publishedAt
}`;

export const PODCAST_BY_SLUG_QUERY = `*[_type == "podcast" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  episodeNumber,
  season,
  audioUrl,
  duration,
  description,
  showNotes,
  guests,
  image,
  publishedAt
}`;

// ─── Site Settings ───────────────────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  title,
  description,
  logo,
  address,
  phone,
  email,
  serviceTimes,
  socialLinks
}`;

