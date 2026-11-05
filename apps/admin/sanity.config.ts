import { defineConfig, useClient } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

function createFeaturedEventPublishAction(originalPublishAction: any) {
  return function FeaturedEventPublishAction(props: any) {
    const originalResult = originalPublishAction(props);
    const client = useClient({ apiVersion: "2024-01-01" });

    return {
      ...originalResult,
      onHandle: async () => {
        const isFeatured = props.draft?.isFeatured ?? props.published?.isFeatured;
        if (isFeatured) {
          try {
            const docId = props.id.replace(/^drafts\./, "");
            const otherFeaturedIds: string[] = await client.fetch(
              `*[_type == "event" && isFeatured == true && !(_id in [$id, $draftId])]._id`,
              { id: docId, draftId: `drafts.${docId}` }
            );

            if (otherFeaturedIds.length > 0) {
              const tx = client.transaction();
              for (const id of otherFeaturedIds) {
                tx.patch(id, (patch) => patch.set({ isFeatured: false }));
              }
              await tx.commit();
            }
          } catch (err) {
            console.error("Error clearing previous featured event:", err);
          }
        }
        if (originalResult && typeof originalResult.onHandle === "function") {
          originalResult.onHandle();
        }
      },
    };
  };
}

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

            // ── Form Submissions & Pastoral Care ──
            S.listItem()
              .title("Testimonies")
              .schemaType("testimony")
              .child(S.documentTypeList("testimony").title("Testimonies & Praise Reports")),

            S.listItem()
              .title("Altar Call & Decisions")
              .schemaType("altarCall")
              .child(S.documentTypeList("altarCall").title("Altar Call Decisions")),

            S.listItem()
              .title("Prayer Requests")
              .schemaType("prayerRequest")
              .child(S.documentTypeList("prayerRequest").title("Prayer Requests")),

            S.listItem()
              .title("General Inquiries")
              .schemaType("generalInquiry")
              .child(S.documentTypeList("generalInquiry").title("General Inquiries")),

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

  document: {
    actions: (prev, context) => {
      if (context.schemaType === "event") {
        return prev.map((action) => {
          if (action.action === "publish") {
            return createFeaturedEventPublishAction(action);
          }
          return action;
        });
      }
      return prev;
    },
  },
});

