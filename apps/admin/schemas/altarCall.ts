import { defineField, defineType } from "sanity";

export const altarCallType = defineType({
  name: "altarCall",
  title: "Altar Call & Decisions for Christ",
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
      validation: (rule) => rule.required(),
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
      name: "decisionReason",
      title: "Reason for this Decision",
      type: "string",
      options: {
        list: [
          { title: "Giving my life to Jesus Christ for the first time", value: "First Time Decision" },
          { title: "Re-dedicating my life to Christ", value: "Rededication" },
          { title: "Seeking spiritual restoration and counseling", value: "Counseling" },
          { title: "Joining Court of His Majesty family", value: "Membership" },
          { title: "Other Reason", value: "Other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "prayerRequest",
      title: "Prayer Point Request",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "status",
      title: "Follow-Up Status",
      type: "string",
      options: {
        list: [
          { title: "New Decision / Pending Follow-Up", value: "New" },
          { title: "Contacted / Welcome Email Sent", value: "Contacted" },
          { title: "Enrolled in Foundation / Believers Class", value: "Enrolled" },
          { title: "Completed Follow-Up", value: "Completed" },
          { title: "Archived", value: "Archived" },
        ],
      },
      initialValue: "New",
    }),
    defineField({
      name: "pastoralNotes",
      title: "Pastoral Follow-Up Notes",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "assignedMinister",
      title: "Assigned Follow-Up Minister",
      type: "string",
      placeholder: "e.g. Pastor / Minister Name",
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
      reason: "decisionReason",
      status: "status",
      date: "submittedAt",
    },
    prepare({ title, reason, status, date }) {
      const dateStr = date ? new Date(date).toLocaleDateString() : "";
      const meta = [status || "New", reason, dateStr].filter(Boolean).join(" • ");
      return {
        title: title || "New Believer",
        subtitle: meta,
      };
    },
  },
});

