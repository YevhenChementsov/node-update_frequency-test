import { mkdir } from 'node:fs/promises';
import {
  checkExistFiles,
  detectChanges,
  downloadsFolderPath,
  fetchData,
  firstDownload,
  loadPreviousData,
  logsFolderPath,
  saveCurrentData,
  writeLogMessage,
} from './helpers/index.js';

const INTERVAL = 1000 * 60 * 60; // 1 hour

const monitorFile = async () => {
  await mkdir(downloadsFolderPath, { recursive: true });
  await mkdir(logsFolderPath, { recursive: true });

  try {
    const currentData = await fetchData();
    if (!currentData || !currentData.data) return;

    const { metadata, data } = currentData;

    if (checkExistFiles()) {
      return await firstDownload(metadata, data);
    }

    const previousData = await loadPreviousData();

    const changesDetected = await detectChanges(previousData, currentData);

    if (changesDetected) {
      await saveCurrentData(metadata, data);
      console.log('New data was saved successfully.');
      await writeLogMessage('New data was saved successfully.');
    }
  } catch (error) {
    console.error(error);
  }
};

const startUpdateDetection = () => {
  monitorFile();
  console.log('Starting update detection...');
  setInterval(monitorFile, INTERVAL);
};

startUpdateDetection();
