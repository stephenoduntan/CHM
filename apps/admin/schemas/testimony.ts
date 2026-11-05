import { defineField, defineType } from "sanity";

export const testimonyType = defineType({
  name: "testimony",
  title: "Testimonies & Praise Reports",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gender",
      title: "Gender",
      type: "string",
      options: {
        list: [
          { title: "Male", value: "Male" },
          { title: "Female", value: "Female" },
          { title: "Prefer not to say", value: "Prefer not to say" },
        ],
      },
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),
    defineField({
      name: "testimony",
      title: "Testimony / Praise Report",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Review Status",
      type: "string",
      options: {
        list: [
          { title: "New / Unread", value: "New" },
          { title: "Reviewed by Pastoral Team", value: "Reviewed" },
          { title: "Approved for Public Sharing / Bulletin", value: "Approved" },
          { title: "Archived", value: "Archived" },
        ],
      },
      initialValue: "New",
    }),
    defineField({
      name: "isApprovedForPublic",
      title: "Approve for Public Testimony Wall / Website",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "pastoralNotes",
      title: "Internal Pastoral / Admin Notes",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "source",
      title: "Submission Source",
      type: "string",
      initialValue: "Watch Online",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted Date & Time",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      country: "country",
      status: "status",
      date: "submittedAt",
    },
    prepare({ title, country, status, date }) {
      const dateStr = date ? new Date(date).toLocaleDateString() : "";
      const meta = [status || "New", country, dateStr].filter(Boolean).join(" • ");
      return {
        title: title || "Anonymous Testimony",
        subtitle: meta,
      };
    },
  },
});

