import { defineField, defineType } from "sanity";

export const sermonType = defineType({
  name: "sermon",
  title: "Sermons & Media",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Sermon Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "speaker",
      title: "Preacher / Speaker",
      type: "string",
      initialValue: "Pastor Fred Odekhian",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "series",
      title: "Sermon Series",
      type: "string",
      placeholder: "e.g. Festival of Destiny Series",
    }),
    defineField({
      name: "date",
      title: "Date Preached",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      placeholder: "e.g. 1 hr 15 mins",
    }),
    defineField({
      name: "biblePassage",
      title: "Scripture Reference",
      type: "string",
      placeholder: "e.g. 1 Corinthians 2:4",
    }),
    defineField({
      name: "youtubeId",
      title: "YouTube Video ID or Full URL",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "thumbnailUrl",
      title: "Thumbnail Image URL / Path (Alternative)",
      type: "string",
      placeholder: "/images/sermons/sermon-hero-video.png or https://...",
      description: "Direct image path or URL if not uploading an image file directly.",
    }),
    defineField({
      name: "description",
      title: "Sermon Overview / Summary",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "keyPoints",
      title: "Key Takeaways / Revelations",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "transcript",
      title: "Full Message Transcript",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "timestamp", type: "string", title: "Timestamp (e.g. 04:15)" },
            { name: "speaker", type: "string", title: "Speaker" },
            { name: "text", type: "text", title: "Spoken Words" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "speaker",
      media: "thumbnail",
    },
  },
});

