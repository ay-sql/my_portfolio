import mongoose from 'mongoose';
import { initModels } from '../lib/db/models';

// Ensure models are initialized
initModels();

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    image: {
      type: String,
      required: [true, 'Please provide an image'],
    },
    readingTime: {
      type: Number,
      default: function() {
        // Calculate reading time based on content length
        // Average reading speed: 200 words per minute
        const words = this.content.trim().split(/\s+/).length;
        return Math.ceil(words / 200);
      }
    },
    tags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
    }],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from title
BlogPostSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
