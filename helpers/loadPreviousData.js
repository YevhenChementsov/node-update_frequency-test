import { Metadata } from '../models/metadata.js';

export const loadPreviousData = async () => {
  try {
    const latestMetadata = await Metadata.findOne();
    return latestMetadata || null;
  } catch (error) {
    console.error('Error loading metadata from MongoDB:', error);
    return null;
  }
};
