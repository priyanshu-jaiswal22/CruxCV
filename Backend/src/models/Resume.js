import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    originalText: {
      type: String,
      required: true
    },
    aiAnalysis: {
    summary: {
      type: String,
      required: true
    },
    skills: {
      type: [String],
      default: []
    },
    improvements: {
      type: [String],
      default: []
    }
  }
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
