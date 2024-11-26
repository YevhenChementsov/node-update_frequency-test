import { readFile } from 'node:fs/promises';

import { dataFilePath, metadataFilePath } from './index.js';

const readFileAndParse = async path =>
  await readFile(path, 'utf-8').then(JSON.parse);

export const loadPreviousData = async () => {
  try {
    const [data, metadata] = await Promise.all([
      readFileAndParse(dataFilePath),
      readFileAndParse(metadataFilePath),
    ]);

    return { data, metadata };
  } catch (error) {
    console.error(error);
  }
};
