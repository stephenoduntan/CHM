import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Events & Conferences",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
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
      name: "theme",
      title: "Conference Theme",
      type: "string",
      placeholder: "e.g. Choose Life",
    }),
    defineField({
      name: "date",
      title: "Display Date Label",
      type: "string",
      placeholder: "e.g. November 8th - 15th, 2026",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date (for automated sorting & calendar)",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
    }),
    defineField({
      name: "time",
      title: "Daily Time",
      type: "string",
      placeholder: "e.g. 6:00 PM Daily",
    }),
    defineField({
      name: "venue",
      title: "Venue / Location",
      type: "string",
      initialValue: "Main Auditorium, RCCG Court of His Majesty",
    }),
    defineField({
      name: "badge",
      title: "Category / Ministry Badge",
      type: "string",
      placeholder: "Annual Convention, Youth Ministry, Men Fellowship, etc.",
    }),
    defineField({
      name: "posterImage",
      title: "Poster Image / Banner",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "posterImageUrl",
      title: "Poster Image URL (Alternative)",
      type: "string",
      placeholder: "e.g. /images/events/fod-2026-poster.webp or https://...",
      description: "Direct image path or URL if not uploading an image file directly.",
    }),
    defineField({
      name: "videoFile",
      title: "Video Montage / Short Clip (File Upload)",
      type: "file",
      options: {
        accept: "video/mp4,video/webm,video/ogg,video/quicktime",
      },
      description: "Upload a cinematic video montage or short clip for this event. Powers the cinematic event carousel on the homepage.",
    }),
    defineField({
      name: "videoUrl",
      title: "Video Montage URL / Path (Alternative)",
      type: "string",
      placeholder: "e.g. /videos/FOD 2026.webm or https://...",
      description: "Direct video file path or hosted streaming URL for the cinematic carousel.",
    }),
    defineField({
      name: "description",
      title: "About the Event / Description",
      type: "richText",
      description: "Standard rich text editor with headings, formatted text, and quote/scripture callouts.",
    }),
    defineField({
      name: "isPast",
      title: "Concluded Event (Past Event)",
      type: "boolean",
      initialValue: false,
      description: "When marked as past, the live event page replaces the 'Join us in person' card with the Photo Gallery recap.",
    }),
    defineField({
      name: "isFeatured",
      title: "Set as Featured Countdown Event",
      type: "boolean",
      initialValue: false,
      description:
        "Toggle ON to showcase this event in the homepage Countdown Section. Only ONE event can be featured at a time; turning this ON replaces any previously featured event.",
    }),
    defineField({
      name: "featuredDisplayType",
      title: "Countdown Display Format",
      type: "string",
      options: {
        list: [
          { title: "Event Name & Theme Text (Typography)", value: "text" },
          { title: "Artwork / Logo Image (WEBP or SVG)", value: "image" },
        ],
        layout: "radio",
      },
      initialValue: "text",
      description:
        "Choose whether the countdown showcases stylized text (Event Name & Theme) or a custom graphic artwork/logo image.",
      hidden: ({ parent }) => !parent?.isFeatured,
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Event Artwork / Logo Image",
      type: "image",
      options: {
        hotspot: true,
        accept: ".webp,.svg,image/webp,image/svg+xml",
      },
      description:
        "Upload event artwork, badge, or logo. Only WEBP or SVG formats are accepted. Recommended: 600×240px to 800×320px with transparent background (max 2MB).",
      hidden: ({ parent }) => !parent?.isFeatured || parent?.featuredDisplayType !== "image",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any;
          if (
            parent?.isFeatured &&
            parent?.featuredDisplayType === "image" &&
            !value?.asset &&
            !parent?.featuredImageUrl
          ) {
            return "Please upload an artwork image or provide an image URL.";
          }
          return true;
        }),
    }),
    defineField({
      name: "featuredImageUrl",
      title: "Featured Event Artwork URL / Path (Alternative)",
      type: "string",
      placeholder: "e.g. /images/events/fod-2026-poster.webp or https://...",
      description: "Direct URL or local image path (WEBP or SVG) if not uploading directly.",
      hidden: ({ parent }) => !parent?.isFeatured || parent?.featuredDisplayType !== "image",
    }),
    defineField({
      name: "gallery",
      title: "Event Gallery Photos (for concluded events)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "caption", type: "string", title: "Caption" },
            { name: "alt", type: "string", title: "Alt text" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "theme",
      media: "posterImage",
      isFeatured: "isFeatured",
    },
    prepare(selection) {
      const { title, subtitle, media, isFeatured } = selection;
      return {
        title: isFeatured ? `★ [FEATURED] ${title}` : title,
        subtitle: subtitle || "Event",
        media,
      };
    },
  },
});

