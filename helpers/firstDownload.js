import { messages } from './getMessage.js';
import { saveCurrentData, writeLogMessage } from './index.js';

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
