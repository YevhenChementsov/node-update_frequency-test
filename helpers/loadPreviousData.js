import { readFile } from 'node:fs/promises';

import { dataFilePath, metadataFilePath } from './index.js';

export const loadPreviousData = async () => {
  try {
    const [data, metadata] = await Promise.all([
      readFile(dataFilePath, 'utf-8').then(JSON.parse),
      readFile(metadataFilePath, 'utf-8').then(JSON.parse),
    ]);

    return { data, metadata };
  } catch (error) {
    console.error(error);
  }
};
