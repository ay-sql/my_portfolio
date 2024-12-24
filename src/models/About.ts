import mongoose from "mongoose";

const StatSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  icon: String,
});

const AboutSchema = new mongoose.Schema(
  {
    bio: {
      type: String,
      required: [true, "Please provide a bio"],
    },
    stats: [StatSchema],
    resumeUrl: {
      type: String,
      required: [true, "Please provide a resume URL"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please provide an image URL"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.About || mongoose.model("About", AboutSchema);
