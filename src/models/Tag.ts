import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tag name is required'],
    unique: true,
    trim: true,
    minlength: [2, 'Tag name must be at least 2 characters long'],
    maxlength: [30, 'Tag name cannot be more than 30 characters'],
  },
  count: {
    type: Number,
    default: 0,
    min: [0, 'Count cannot be negative'],
  },
}, {
  timestamps: true,
});

// Create indexes
tagSchema.index({ name: 1 });

// Add a method to check if tag can be deleted
tagSchema.methods.canDelete = async function() {
  if (this.count > 0) {
    return false;
  }
  return true;
};

export default mongoose.models.Tag || mongoose.model('Tag', tagSchema);
