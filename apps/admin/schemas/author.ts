import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Pastors & Authors",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Ministry Title",
      type: "string",
      placeholder: "e.g. Lead Pastor, RCCG Court of His Majesty",
    }),
    defineField({
      name: "image",
      title: "Avatar / Profile Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Short Biography",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});

