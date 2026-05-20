import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import TeacherEnquiry from "../../../models/TeacherEnquiry";

// POST — submit a new teacher course enquiry
export async function POST(request) {
  try {
    const body = await request.json();
    const isConnected = await dbConnect();

    if (!isConnected) {
      console.warn("No MongoDB connection — running in mock mode.");
      return NextResponse.json(
        {
          success: true,
          mode: "mock",
          message: "Inquiry received! (Mock — add MONGODB_URI to .env.local)",
          data: body,
        },
        { status: 201 }
      );
    }

    const newEnquiry = await TeacherEnquiry.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Teacher course enquiry submitted successfully!",
        data: newEnquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/teacher-enquiry error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}

// GET — fetch all teacher course enquiries (admin use)
export async function GET() {
  try {
    const isConnected = await dbConnect();

    if (!isConnected) {
      return NextResponse.json(
        { success: false, error: "Database not connected. Please set MONGODB_URI in .env.local" },
        { status: 503 }
      );
    }

    const enquiries = await TeacherEnquiry.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: enquiries }, { status: 200 });
  } catch (error) {
    console.error("GET /api/teacher-enquiry error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}
