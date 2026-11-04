import { defineField, defineType } from "sanity";

export const announcementType = defineType({
  name: "announcement",
  title: "Announcements & Alerts",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Announcement Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "message",
      title: "Announcement Details",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "General Church Alert", value: "general" },
          { title: "Special Service / Program", value: "special" },
          { title: "Urgent Prayer Notice", value: "urgent" },
        ],
      },
      initialValue: "general",
    }),
    defineField({
      name: "link",
      title: "Target URL / Link (Optional)",
      type: "url",
    }),
    defineField({
      name: "isActive",
      title: "Active on Website",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "publishDate",
      title: "Publish Date",
      type: "date",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
});

