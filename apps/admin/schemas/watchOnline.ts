import { defineField, defineType } from "sanity";

export const watchOnlineType = defineType({
  name: "watchOnline",
  title: "Watch Online & Livestream",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Main Heading",
      type: "string",
      initialValue: "Watch Online & Experience God's Presence",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "youtubeId",
      title: "YouTube Video ID or Full Livestream URL",
      type: "string",
      description:
        "Enter the 11-character video ID (e.g. GAtafaSSyxw) or paste the complete YouTube livestream link (e.g. https://www.youtube.com/watch?v=GAtafaSSyxw). Updating this immediately changes the player on the website.",
      initialValue: "GAtafaSSyxw",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isLive",
      title: "Broadcast Status: Live Streaming Now?",
      type: "boolean",
      description:
        "Switch ON when a church service is actively streaming live. Switch OFF to display the recent broadcast badge.",
      initialValue: true,
    }),
    defineField({
      name: "serviceName",
      title: "Service / Broadcast Name (Notepad Default)",
      type: "string",
      placeholder: "e.g. Sunday Celebration Service, Festival of Destiny, etc.",
      initialValue: "Sunday Celebration Service",
    }),
    defineField({
      name: "speaker",
      title: "Preacher / Minister Name",
      type: "string",
      placeholder: "e.g. Pastor Fred Odekhian",
      initialValue: "Pastor Fred Odekhian",
    }),
    defineField({
      name: "scripturePassage",
      title: "Scripture Reference",
      type: "string",
      placeholder: "e.g. 1 Corinthians 2:4",
      initialValue: "1 Corinthians 2:4",
    }),
    defineField({
      name: "description",
      title: "Broadcast Overview / Message Notes",
      type: "richText",
      description: "Optional notes or summary welcoming online worshippers.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "youtubeId",
    },
    prepare(selection) {
      return {
        title: selection.title || "Watch Online Settings",
        subtitle: `YouTube ID: ${selection.subtitle || "Not set"}`,
      };
    },
  },
});
