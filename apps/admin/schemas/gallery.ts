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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption / Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "eventName",
      title: "Associated Event / Program Name",
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

