import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "RCCG Court of His Majesty — Admin Management Portal",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ct660z6u",
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Church Content Management")
          .items([
            S.listItem()
              .title("Watch Online & Livestream")
              .schemaType("watchOnline")
              .child(
                S.document()
                  .schemaType("watchOnline")
                  .documentId("watchOnlineSettings")
                  .title("Watch Online & Livestream Settings")
              ),

            S.divider(),

            S.listItem()
              .title("Sermons & Media")
              .schemaType("sermon")
              .child(S.documentTypeList("sermon").title("Sermons")),

            S.listItem()
              .title("Events & Conferences")
              .schemaType("event")
              .child(S.documentTypeList("event").title("Events")),

            S.listItem()
              .title("Our Leadership")
              .schemaType("leadership")
              .child(S.documentTypeList("leadership").title("Pastors & Leaders")),

            S.listItem()
              .title("Blog & Devotionals")
              .schemaType("blog")
              .child(S.documentTypeList("blog").title("Articles")),

            S.listItem()
              .title("Photo Gallery")
              .schemaType("gallery")
              .child(S.documentTypeList("gallery").title("Gallery Photos")),

            S.listItem()
              .title("House Fellowship Centers")
              .schemaType("houseFellowship")
              .child(S.documentTypeList("houseFellowship").title("Fellowship Centers")),

            S.listItem()
              .title("Announcements & Alerts")
              .schemaType("announcement")
              .child(S.documentTypeList("announcement").title("Announcements")),

            S.divider(),

            S.listItem()
              .title("Pastors & Authors")
              .schemaType("author")
              .child(S.documentTypeList("author").title("Authors")),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});

