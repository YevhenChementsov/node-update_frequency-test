import { writeFile } from 'node:fs/promises';

import { dataFilePath, metadataFilePath } from './index.js';

const dataObjectToString = obj => JSON.stringify(obj, null, 2);

export const saveCurrentData = async (metadata, data) => {
  try {
    await writeFile(metadataFilePath, dataObjectToString(metadata));
    await writeFile(dataFilePath, dataObjectToString(data));
  } catch (error) {
    console.error(error);
  }
};
