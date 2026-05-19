import mongoose from "mongoose";

const AdmissionSchema = new mongoose.Schema({
  parentName: {
    type: String,
    required: [true, "Please provide the parent's name."],
    maxlength: [60, "Parent's name cannot be more than 60 characters"],
  },
  childName: {
    type: String,
    required: [true, "Please provide the child's name."],
    maxlength: [60, "Child's name cannot be more than 60 characters"],
  },
  childAge: {
    type: Number,
    required: [true, "Please specify child's age."],
    min: [1, "Age must be at least 1"],
    max: [8, "Age cannot exceed 8 for preschool"],
  },
  email: {
    type: String,
    required: [true, "Please provide your contact email."],
  },
  phone: {
    type: String,
    required: [true, "Please provide a valid phone number."],
  },
  program: {
    type: String,
    enum: ["toddler", "preschool", "kindergarten", "daycare"],
    default: "preschool",
  },
  notes: {
    type: String,
    maxlength: [500, "Notes cannot exceed 500 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Admission || mongoose.model("Admission", AdmissionSchema);
