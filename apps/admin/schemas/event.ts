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
      name: "description",
      title: "About the Event / Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "isPast",
      title: "Concluded Event (Past Event)",
      type: "boolean",
      initialValue: false,
      description: "When marked as past, the live event page replaces the 'Join us in person' card with the Photo Gallery recap.",
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
    },
  },
});

