import { defineType, defineField, type Rule } from "./types";

export const sermonType = defineType({
  name: "sermon",
  title: "Sermons",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Sermon Title",
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
      name: "speaker",
      title: "Preacher / Convener",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "date",
      title: "Date Preached",
      type: "date",
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: "series",
      title: "Sermon Series",
      type: "string",
    }),
    defineField({
      name: "videoUrl",
      title: "YouTube / Video URL",
      type: "url",
    }),
    defineField({
      name: "audioUrl",
      title: "Audio Podcast / MP3 URL",
      type: "url",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Summary / Notes",
      type: "text",
    }),
  ],
});
