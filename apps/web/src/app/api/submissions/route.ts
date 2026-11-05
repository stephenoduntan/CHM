import { NextResponse, NextRequest } from "next/server";
import { createClient } from "next-sanity";

const writeClient = createClient({
  projectId:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.SANITY_STUDIO_PROJECT_ID ||
    "ct660z6u",
  dataset:
    process.env.NEXT_PUBLIC_SANITY_DATASET ||
    process.env.SANITY_STUDIO_DATASET ||
    "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      formType,
      fullName,
      gender,
      email,
      phoneNumber,
      country,
      testimony,
      decisionReason,
      prayerRequest,
      subject,
      message,
      category,
      source = "Website",
    } = body;

    if (!formType) {
      return NextResponse.json(
        { success: false, error: "Missing formType" },
        { status: 400 }
      );
    }

    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: "Full Name is required" },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();
    let doc: any = null;

    if (formType === "testimony") {
      doc = {
        _type: "testimony",
        fullName: fullName.trim(),
        gender: gender || "Prefer not to say",
        email: email?.trim() || "",
        phoneNumber: phoneNumber?.trim() || "",
        country: country || "Nigeria",
        testimony: (testimony || message || "").trim(),
        status: "New",
        isApprovedForPublic: false,
        source: source || "Watch Online",
        submittedAt,
      };
    } else if (formType === "altarCall") {
      doc = {
        _type: "altarCall",
        fullName: fullName.trim(),
        gender: gender || "Prefer not to say",
        email: email?.trim() || "",
        phoneNumber: phoneNumber?.trim() || "",
        country: country || "Nigeria",
        decisionReason: decisionReason || "First Time Decision",
        prayerRequest: (prayerRequest || "").trim(),
        status: "New",
        source: source || "Watch Online",
        submittedAt,
      };
    } else if (formType === "prayer" || formType === "prayerRequest") {
      doc = {
        _type: "prayerRequest",
        fullName: fullName.trim(),
        gender: gender || "Prefer not to say",
        email: email?.trim() || "",
        phoneNumber: phoneNumber?.trim() || "",
        country: country || "Nigeria",
        category: category || "Spiritual Growth & Deliverance",
        request: (prayerRequest || message || "").trim(),
        isConfidential: true,
        status: "New",
        source: source || "Connect Page",
        submittedAt,
      };
    } else {
      // General Inquiry
      doc = {
        _type: "generalInquiry",
        fullName: fullName.trim(),
        email: email?.trim() || "",
        phoneNumber: phoneNumber?.trim() || "",
        subject: subject || "General Church Inquiry",
        message: (message || "").trim(),
        status: "New",
        source: source || "Connect Page",
        submittedAt,
      };
    }

    if (process.env.SANITY_API_WRITE_TOKEN) {
      const created = await writeClient.create(doc);
      return NextResponse.json({ success: true, id: created._id });
    } else {
      console.warn(
        "[Submissions API] SANITY_API_WRITE_TOKEN not detected in environment. Logging document:",
        doc
      );
      return NextResponse.json({ success: true, simulated: true });
    }
  } catch (error) {
    console.error("[Submissions API] Error saving submission:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal error",
      },
      { status: 500 }
    );
  }
}

