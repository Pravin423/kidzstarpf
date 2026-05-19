import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Admission from "../../../models/Admission";

export async function POST(request) {
  try {
    const body = await request.json();
    const isConnected = await dbConnect();

    // Graceful fallback if MongoDB URI is not configured yet
    if (!isConnected) {
      console.warn("No MongoDB connection found. Running in local-mock mode for fallback demo.");
      return NextResponse.json(
        {
          success: true,
          mode: "mock",
          message: "Inquiry received successfully! (Mock Saved)",
          data: body
        },
        { status: 201 }
      );
    }

    // Active Mongoose creation if connected
    const newAdmission = await Admission.create(body);
    
    return NextResponse.json(
      { 
        success: true, 
        message: "Admission inquiry registered successfully!",
        data: newAdmission 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "Something went wrong while submitting the form" 
      },
      { status: 400 }
    );
  }
}
