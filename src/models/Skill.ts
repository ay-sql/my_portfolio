import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a skill name"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["tool", "skill", "methodology"],
      required: true,
    },
    icon: {
      type: String,
    },
    proficiency: {
      type: Number,
      min: 0,
      max: 100,
      default: 80,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
