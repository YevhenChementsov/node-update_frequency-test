import { writeFile } from 'node:fs/promises';

import { Metadata } from '../db/models/metadata.js';
import { dataFilePath, messages, writeLogMessage } from './index.js';

export const saveCurrentData = async (metadata, data) => {
  try {
    await Metadata.findOneAndUpdate({}, metadata, { upsert: true, new: true });
    console.log(messages.db.save.metadata.success);
    await writeLogMessage(
      `Saving metadata in MongoDB:\n${JSON.stringify(metadata, null, 2)}`,
    );
    await writeFile(dataFilePath, JSON.stringify(data));
  } catch (error) {
    console.error(messages.db.save.metadata.error, error);
  }
};
