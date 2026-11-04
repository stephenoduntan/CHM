import { defineField, defineType } from "sanity";

export const blogType = defineType({
  name: "blog",
  title: "Blog & Articles",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Article Title",
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
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Faith & everyday life", value: "Faith & everyday life" },
          { title: "Prayer", value: "Prayer" },
          { title: "Community", value: "Community" },
          { title: "Bible study", value: "Bible study" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Estimated Read Time",
      type: "string",
      placeholder: "e.g. 5 min read",
    }),
    defineField({
      name: "excerpt",
      title: "Short Excerpt / Teaser",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Featured Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isFeatured",
      title: "Pin as Featured Hero Article",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "content",
      title: "Article Body Content",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});

