import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import Media from "../../../../models/Media";
import { deleteFromCloudinary } from "../../../../lib/cloudinary";

// DELETE — remove from Cloudinary + MongoDB
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await dbConnect();

    const media = await Media.findById(id).lean();
    if (!media) {
      return NextResponse.json(
        { success: false, error: "Media not found" },
        { status: 404 }
      );
    }

    // Delete from Cloudinary first
    await deleteFromCloudinary(media.publicId, media.type);

    // Remove from MongoDB
    await Media.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Media deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/media/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Delete failed" },
      { status: 500 }
    );
  }
}
