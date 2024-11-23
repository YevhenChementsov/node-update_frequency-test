import { saveCurrentData, writeLogMessage } from './index.js';

const message = {
  noData: 'No local data files found. The first download has started.',
  saveData: 'New data was saved successfully.',
};

export const firstDownload = async (metadata, data) => {
  const { noData, saveData } = message;
  console.log(noData);
  await writeLogMessage('Starting update detection...');
  await writeLogMessage(noData);
  await saveCurrentData(metadata, data);
  console.log(saveData);
  await writeLogMessage(saveData);
  return;
};
