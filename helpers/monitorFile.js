import { mkdir } from 'node:fs/promises';

import { Metadata } from '../db/models/index.js';
import {
  detectChanges,
  downloadsFolderPath,
  fetchData,
  firstDownload,
  loadPreviousData,
  messages,
  saveCurrentData,
  writeLogMessage,
} from './index.js';

export const monitorFile = async () => {
  await mkdir(downloadsFolderPath, { recursive: true });

  try {
    const existingMetadata = await Metadata.findOne();

    const currentData = await fetchData();
    if (!currentData || !currentData.data) return;
    const { metadata, data } = currentData;

    if (!existingMetadata) {
      return await firstDownload(metadata, data);
    }

    const previousMetadata = await loadPreviousData();

    const changesDetected = await detectChanges(previousMetadata, metadata);

    if (changesDetected) {
      await saveCurrentData(metadata, data);
      console.log(messages.data.update.success);
      await writeLogMessage(messages.data.update.success);
    }
  } catch (error) {
    console.error(error);
  }
};
