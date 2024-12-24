import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  author: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  isPublished: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

// Create indexes
postSchema.index({ title: 'text', content: 'text' });
postSchema.index({ slug: 1 });
postSchema.index({ tags: 1 });
postSchema.index({ publishedAt: -1 });

export default mongoose.models.Post || mongoose.model('Post', postSchema);
