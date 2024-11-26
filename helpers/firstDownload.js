import { saveCurrentData, writeLogMessage } from './index.js';

import { messages } from './index.js';
const { noLocalData, startMonitor, saveData } = messages;

export const firstDownload = async (metadata, data) => {
  console.log(noLocalData);
  await writeLogMessage(startMonitor);
  await writeLogMessage(noLocalData);
  await saveCurrentData(metadata, data);
  console.log(saveData);
  await writeLogMessage(saveData);
  return;
};
