/**
 * GROQ queries for fetching data from Sanity CMS
 * Tuned to match apps/admin/schemas precisely and extract full image/video asset URLs.
 */

// ─── Sermons ─────────────────────────────────────────────────────────────────
export const SERMONS_QUERY = `*[_type == "sermon"] | order(date desc) {
  _id,
  title,
  slug,
  speaker,
  series,
  date,
  duration,
  biblePassage,
  youtubeId,
  description,
  keyPoints,
  transcript,
  "thumbnail": coalesce(thumbnail.asset->url, thumbnailUrl)
}`;

export const SERMON_BY_SLUG_QUERY = `*[_type == "sermon" && (slug.current == $slug || _id == $slug)][0] {
  _id,
  title,
  slug,
  speaker,
  series,
  date,
  duration,
  biblePassage,
  youtubeId,
  description,
  keyPoints,
  transcript,
  "thumbnail": coalesce(thumbnail.asset->url, thumbnailUrl)
}`;

// ─── Events ──────────────────────────────────────────────────────────────────
export const EVENTS_QUERY = `*[_type == "event"] | order(startDate asc) {
  _id,
  title,
  slug,
  theme,
  date,
  startDate,
  endDate,
  time,
  venue,
  badge,
  description,
  isPast,
  "posterImage": coalesce(posterImage.asset->url, posterImageUrl),
  "videoUrl": coalesce(videoFile.asset->url, videoUrl),
  "gallery": gallery[]{
    "url": asset->url,
    caption,
    alt
  }
}`;

export const EVENT_BY_SLUG_QUERY = `*[_type == "event" && (slug.current == $slug || _id == $slug)][0] {
  _id,
  title,
  slug,
  theme,
  date,
  startDate,
  endDate,
  time,
  venue,
  badge,
  description,
  isPast,
  "posterImage": coalesce(posterImage.asset->url, posterImageUrl),
  "videoUrl": coalesce(videoFile.asset->url, videoUrl),
  "gallery": gallery[]{
    "url": asset->url,
    caption,
    alt
  }
}`;

// ─── Blog & Articles ─────────────────────────────────────────────────────────
export const BLOG_POSTS_QUERY = `*[_type == "blog"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  publishedAt,
  readTime,
  excerpt,
  isFeatured,
  "author": coalesce(author->name, author, "CHM Editorial Team"),
  "authorRole": author->role,
  "coverImage": coalesce(coverImage.asset->url, coverImageUrl),
  content
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blog" && (slug.current == $slug || _id == $slug)][0] {
  _id,
  title,
  slug,
  category,
  publishedAt,
  readTime,
  excerpt,
  isFeatured,
  "author": coalesce(author->name, author, "CHM Editorial Team"),
  "authorRole": author->role,
  "coverImage": coalesce(coverImage.asset->url, coverImageUrl),
  content
}`;

// ─── Photo Gallery ───────────────────────────────────────────────────────────
export const GALLERY_QUERY = `*[_type == "gallery"] | order(date desc) {
  _id,
  title,
  caption,
  eventName,
  eventTag,
  date,
  year,
  "imageUrl": coalesce(image.asset->url, imageUrl)
}`;

// ─── Leadership ──────────────────────────────────────────────────────────────
export const LEADERSHIP_QUERY = `*[_type == "leadership"] | order(order asc) {
  _id,
  name,
  slug,
  role,
  category,
  order,
  bio,
  "image": coalesce(image.asset->url, imageUrl)
}`;

// ─── House Fellowship ────────────────────────────────────────────────────────
export const HOUSE_FELLOWSHIP_QUERY = `*[_type == "houseFellowship"] | order(landmark asc, centerName asc) {
  _id,
  centerName,
  landmark,
  address,
  hostName,
  hostPhone,
  meetingDay,
  meetingTime
}`;

// ─── Announcements ───────────────────────────────────────────────────────────
export const ANNOUNCEMENTS_QUERY = `*[_type == "announcement" && isActive == true] | order(publishDate desc) {
  _id,
  title,
  message,
  category,
  link,
  isActive,
  publishDate
}`;
