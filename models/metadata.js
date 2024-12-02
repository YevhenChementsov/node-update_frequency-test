import mongoose from 'mongoose';

const metadataSchema = new mongoose.Schema(
  {
    hash: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    contentLength: {
      type: Number,
      required: true,
    },
    lastModified: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export const Metadata = mongoose.model('Metadata', metadataSchema);
