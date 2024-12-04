import { messages, saveCurrentData, writeLogMessage } from './index.js';

export const firstDownload = async (metadata, data) => {
  console.log(messages.data.noLocalData);
  await writeLogMessage(messages.data.monitor);
  await writeLogMessage(messages.data.noLocalData);
  await saveCurrentData(metadata, data);
  console.log(messages.data.update.success);
  await writeLogMessage(messages.data.update.success);
  return;
};
