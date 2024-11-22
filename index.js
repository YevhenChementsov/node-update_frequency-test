import { mkdir } from 'node:fs/promises';
import {
  fetchData,
  getFolderPath,
  loadPreviousData,
  writeLogMessage,
} from './helpers';

const INTERVAL = 60 * 1000; // 1 minute

const monitorFile = async () => {
  try {
    await mkdir(getFolderPath(downloads), { recursive: true });
    await mkdir(getFolderPath(logs), { recursive: true });

    const currentData = await fetchData();
    if (!currentData || !currentData.data) return;

    const { metadata, data } = currentData;

    const previousData = loadPreviousData();
    // compare prev & current data/metadata
    // save current data/metadata
  } catch (error) {
    throw new Error(`File upgrade detection failed. ${error}`);
  }
};

const startUpdateDetection = () => {
  console.log('Starting update detection.');
  writeLogMessage('Starting update detection.');
  setInterval(monitorFile, INTERVAL);
};

startUpdateDetection();
