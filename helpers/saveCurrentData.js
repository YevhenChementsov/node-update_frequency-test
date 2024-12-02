import { writeFile } from 'node:fs/promises';

import { Metadata } from '../models/metadata.js';
import { dataFilePath } from './index.js';

export const saveCurrentData = async (metadata, data) => {
  try {
    await Metadata.findOneAndUpdate({}, metadata, { upsert: true, new: true });
    console.log('Metadata saved to MongoDB:', metadata);
    await writeFile(dataFilePath, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving metadata to MongoDB:', error);
  }
};
