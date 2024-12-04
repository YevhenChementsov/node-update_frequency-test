import { Metadata } from '../db/models/metadata.js';
import { messages } from './index.js';

export const loadPreviousData = async () => {
  try {
    const latestMetadata = await Metadata.findOne();
    return latestMetadata || null;
  } catch (error) {
    console.error(messages.db.load.metadata.error, error);
    return null;
  }
};
