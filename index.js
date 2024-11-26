import { mkdir } from 'node:fs/promises';

import {
  checkExistFiles,
  detectChanges,
  downloadsFolderPath,
  fetchData,
  firstDownload,
  loadPreviousData,
  logsFolderPath,
  messages,
  saveCurrentData,
  writeLogMessage,
} from './helpers/index.js';

const { saveData, startMonitor } = messages;

const INTERVAL = 1000 * 60; // 1 minute

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
      console.log(saveData);
      await writeLogMessage(saveData);
    }
  } catch (error) {
    console.error(error);
  }
};

const startUpdateDetection = () => {
  monitorFile();
  console.log(startMonitor);
  setInterval(monitorFile, INTERVAL);
};

startUpdateDetection();
