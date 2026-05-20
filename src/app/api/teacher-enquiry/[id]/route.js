import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import TeacherEnquiry from "../../../../models/TeacherEnquiry";

// PATCH — toggle isChecked status for a single teacher course enquiry
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const isConnected = await dbConnect();

    if (!isConnected) {
      return NextResponse.json(
        { success: false, error: "Database not connected" },
        { status: 503 }
      );
    }

    const updated = await TeacherEnquiry.findByIdAndUpdate(
      id,
      { isChecked: body.isChecked },
      { new: true, runValidators: false }
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Teacher enquiry record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/teacher-enquiry/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update record" },
      { status: 500 }
    );
  }
}

// DELETE — remove a single teacher course enquiry
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const isConnected = await dbConnect();

    if (!isConnected) {
      return NextResponse.json(
        { success: false, error: "Database not connected" },
        { status: 503 }
      );
    }

    const deleted = await TeacherEnquiry.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Teacher enquiry record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Record deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/teacher-enquiry/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete record" },
      { status: 500 }
    );
  }
}
