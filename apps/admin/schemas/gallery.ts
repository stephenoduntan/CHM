import { defineField, defineType } from "sanity";

export const galleryType = defineType({
  name: "gallery",
  title: "Photo Gallery",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Photo Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "High-Resolution Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageUrl",
      title: "Image URL / Path (Alternative)",
      type: "string",
      placeholder: "https://images.unsplash.com/... or /images/...",
    }),
    defineField({
      name: "caption",
      title: "Caption / Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "event",
      title: "Associated Event / Program Name",
      description: "Select an event created in the Events section from this dropdown.",
      type: "reference",
      to: [{ type: "event" }],
    }),
    defineField({
      name: "eventName",
      title: "Custom Event / Program Name (Alternative)",
      description: "Optional custom name if this photo is not linked to an event in the dropdown above.",
      type: "string",
      placeholder: "e.g. Festival of Destiny 2026",
    }),
    defineField({
      name: "eventTag",
      title: "Ministry Tag / Category",
      type: "string",
      placeholder: "e.g. Sunday Service, Men's Fellowship, Youth Ministry",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Event Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      initialValue: 2026,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eventTag",
      media: "image",
    },
  },
});

