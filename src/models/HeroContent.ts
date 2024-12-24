import mongoose from "mongoose";

const HeroContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      default: 'Creative Developer & Designer'
    },
    subtitle: {
      type: String,
      required: [true, 'Please provide a subtitle'],
      default: 'Crafting beautiful and functional digital experiences'
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      default: 'I help businesses grow by crafting amazing web experiences'
    },
    imageUrl: {
      type: String,
      required: [true, 'Please provide an image URL'],
      default: '/images/hero-default.jpg'
    },
    ctaText: {
      type: String,
      required: true,
      default: "Let's Work Together"
    },
    ctaLink: {
      type: String,
      required: true,
      default: '#contact'
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.HeroContent || mongoose.model("HeroContent", HeroContentSchema);
