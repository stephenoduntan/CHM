import { defineType, defineField, type Rule } from "./types";

export const podcastType = defineType({
  name: "podcast",
  title: "Podcasts",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Episode Title",
      type: "string",
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: "episodeNumber",
      title: "Episode Number",
      type: "number",
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: "audioUrl",
      title: "Audio MP3 File / Stream URL",
      type: "url",
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration (e.g. 42:15)",
      type: "string",
    }),
    defineField({
      name: "speaker",
      title: "Speaker / Host",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Release Date",
      type: "date",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Artwork",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Episode Notes",
      type: "text",
    }),
  ],
});
