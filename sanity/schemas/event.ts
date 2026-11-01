import { defineType, defineField, type Rule } from "./types";

export const eventType = defineType({
  name: "event",
  title: "Events",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
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
      name: "theme",
      title: "Theme / Subtitle",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Venue / Location",
      type: "string",
    }),
    defineField({
      name: "banner",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Full Details",
      type: "text",
    }),
  ],
});
