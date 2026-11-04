import { defineField, defineType } from "sanity";

export const leadershipType = defineType({
  name: "leadership",
  title: "Church Leadership & Pastors",
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
      title: "Pastoral Role / Title",
      type: "string",
      placeholder: "e.g. Pastor in Charge of Province / Lead Pastor",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Leadership Category",
      type: "string",
      options: {
        list: [
          { title: "Pastoral Leadership", value: "pastoral" },
          { title: "Assistant Pastors", value: "assistant" },
          { title: "Ministry Heads", value: "ministry" },
          { title: "Executive Council", value: "executive" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Portrait Photo",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order Rank",
      type: "number",
      initialValue: 1,
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

