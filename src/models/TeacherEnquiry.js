import mongoose from "mongoose";

const TeacherEnquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide your full name."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your contact email."],
  },
  phone: {
    type: String,
    required: [true, "Please provide a valid phone number."],
  },
  qualification: {
    type: String,
    required: [true, "Please select your highest qualification."],
    enum: ["10+2", "Graduate", "Post Graduate", "Other"],
  },
  notes: {
    type: String,
    maxlength: [500, "Notes cannot exceed 500 characters"],
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.TeacherEnquiry || mongoose.model("TeacherEnquiry", TeacherEnquirySchema);
