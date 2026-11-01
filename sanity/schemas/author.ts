import { defineType, defineField, type Rule } from "./types";

export const authorType = defineType({
  name: "author",
  title: "Authors & Pastors",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (rule: Rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Title / Pastoral Office",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
    }),
  ],
});
