import { readFile } from 'node:fs/promises';

import { metadataFilePath } from './index.js';

export const loadPreviousData = async () => {
  try {
    const metadata = await readFile(metadataFilePath, 'utf-8').then(JSON.parse);
    return metadata;
  } catch (error) {
    console.error(error);
  }
};
