import { defineField, defineType } from "sanity";

export const prayerRequestType = defineType({
  name: "prayerRequest",
  title: "Prayer Requests",
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
      name: "category",
      title: "Prayer Category",
      type: "string",
      options: {
        list: [
          { title: "Healing & Health", value: "Healing & Health" },
          { title: "Family & Marriage", value: "Family & Marriage" },
          { title: "Fruit of the Womb", value: "Fruit of the Womb" },
          { title: "Career, Job & Business", value: "Career, Job & Business" },
          { title: "Spiritual Growth & Deliverance", value: "Spiritual Growth & Deliverance" },
          { title: "Financial Breakthrough", value: "Financial Breakthrough" },
          { title: "Other Need", value: "Other Need" },
        ],
      },
      initialValue: "Spiritual Growth & Deliverance",
    }),
    defineField({
      name: "request",
      title: "Prayer Request Details",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isConfidential",
      title: "Strictly Confidential (Pastoral Intercessors Only)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "status",
      title: "Intercession Status",
      type: "string",
      options: {
        list: [
          { title: "New / Needs Prayer", value: "New" },
          { title: "Prayed Over by Intercessory Team", value: "Prayed Over" },
          { title: "In Ongoing Intercession", value: "Ongoing" },
          { title: "Answered Prayer / Praise", value: "Answered" },
          { title: "Archived", value: "Archived" },
        ],
      },
      initialValue: "New",
    }),
    defineField({
      name: "pastoralNotes",
      title: "Intercessory / Pastoral Notes",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "source",
      title: "Submission Source",
      type: "string",
      initialValue: "Connect Page",
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
      category: "category",
      status: "status",
      date: "submittedAt",
    },
    prepare({ title, category, status, date }) {
      const dateStr = date ? new Date(date).toLocaleDateString() : "";
      const meta = [status || "New", category, dateStr].filter(Boolean).join(" • ");
      return {
        title: title || "Prayer Request",
        subtitle: meta,
      };
    },
  },
});

