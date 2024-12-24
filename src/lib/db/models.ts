import mongoose from 'mongoose';

// Tag Schema Definition
const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a tag name'],
      trim: true,
      unique: true,
      lowercase: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from name
TagSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

// Initialize models
export const Tag = mongoose.models.Tag || mongoose.model('Tag', TagSchema);

// Export a function to ensure models are initialized
export function initModels() {
  // This ensures the models are registered
  return { Tag };
} 