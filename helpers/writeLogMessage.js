import { appendFile } from 'node:fs/promises';

import { formatDate, logsFilePath } from './index.js';

export const writeLogMessage = async message => {
  const currentDate = new Date();
  const timestamp = formatDate(currentDate);
  await appendFile(logsFilePath, `${timestamp} ${message}\n`);
};
