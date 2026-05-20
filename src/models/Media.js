import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "URL is required"],
  },
  publicId: {
    type: String,
    required: [true, "Cloudinary public ID is required"],
  },
  type: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  title: {
    type: String,
    default: "",
    maxlength: [120, "Title cannot exceed 120 characters"],
  },
  category: {
    type: String,
    default: "General",
    maxlength: [60, "Category cannot exceed 60 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Media || mongoose.model("Media", MediaSchema);
