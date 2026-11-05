import { defineField, defineType } from "sanity";

export const generalInquiryType = defineType({
  name: "generalInquiry",
  title: "General Inquiries",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "subject",
      title: "Subject / Topic",
      type: "string",
      initialValue: "General Church Inquiry",
    }),
    defineField({
      name: "message",
      title: "Inquiry Message",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Inquiry Status",
      type: "string",
      options: {
        list: [
          { title: "New / Unread", value: "New" },
          { title: "In Progress / Assigned", value: "In Progress" },
          { title: "Replied / Resolved", value: "Resolved" },
          { title: "Archived", value: "Archived" },
        ],
      },
      initialValue: "New",
    }),
    defineField({
      name: "responseNotes",
      title: "Internal Admin Response Notes",
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
      subject: "subject",
      status: "status",
      date: "submittedAt",
    },
    prepare({ title, subject, status, date }) {
      const dateStr = date ? new Date(date).toLocaleDateString() : "";
      const meta = [status || "New", subject, dateStr].filter(Boolean).join(" • ");
      return {
        title: title || "General Inquiry",
        subtitle: meta,
      };
    },
  },
});

