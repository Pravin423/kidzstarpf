import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Media from "../../../models/Media";
import { uploadToCloudinary } from "../../../lib/cloudinary";

// GET — fetch all media (optionally filter by ?type=image or ?type=video)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "image" | "video" | null

    await dbConnect();
    const query = type ? { type } : {};
    const media = await Media.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: media }, { status: 200 });
  } catch (error) {
    console.error("GET /api/media error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST — upload a new image or video via multipart/form-data
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const title = formData.get("title") || "";
    const category = formData.get("category") || "General";

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Determine resource type
    const mime = file.type || "";
    const resourceType = mime.startsWith("video/") ? "video" : "image";

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result = await uploadToCloudinary(buffer, {
      folder: "kidzstar",
      resource_type: resourceType,
      // For images: auto quality and format
      ...(resourceType === "image" && {
        quality: "auto",
        fetch_format: "auto",
      }),
    });

    // Save metadata to MongoDB
    await dbConnect();
    const media = await Media.create({
      url: result.secure_url,
      publicId: result.public_id,
      type: resourceType,
      title,
      category,
    });

    return NextResponse.json({ success: true, data: media }, { status: 201 });
  } catch (error) {
    console.error("POST /api/media error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
