import { defineField, defineType } from "sanity";

export const houseFellowshipType = defineType({
  name: "houseFellowship",
  title: "House Fellowship Centers",
  type: "document",
  fields: [
    defineField({
      name: "centerName",
      title: "Center Name",
      type: "string",
      placeholder: "e.g. Dominion Center, Grace Sanctuary",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "landmark",
      title: "Landmark / District",
      type: "string",
      options: {
        list: [
          { title: "Abesan Estate", value: "Abesan" },
          { title: "Ayobo", value: "Ayobo" },
          { title: "Ikola", value: "Ikola" },
          { title: "Mosan", value: "Mosan" },
          { title: "Ipaja", value: "Ipaja" },
          { title: "Gowon Estate", value: "Gowon Estate" },
          { title: "Baruwa", value: "Baruwa" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Center Physical Address",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "leaderName",
      title: "Leader Name",
      type: "string",
      placeholder: "e.g. Bro. & Sis. Adeleke",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "leaderPhone",
      title: "Leader Contact Phone Number",
      type: "string",
      placeholder: "+234 803 123 4567",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "meetingDay",
      title: "Meeting Day",
      type: "string",
      initialValue: "Sunday",
    }),
    defineField({
      name: "meetingTime",
      title: "Meeting Time",
      type: "string",
      initialValue: "5:00 PM – 6:00 PM",
    }),
  ],
  preview: {
    select: {
      title: "centerName",
      subtitle: "landmark",
    },
  },
});

