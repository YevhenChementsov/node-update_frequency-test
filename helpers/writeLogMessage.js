import { appendFile } from 'fs/promises';

import { formatDate } from './formatDate.js';
import { getFilePath } from './getFilePath.js';

export const writeLogMessage = async message => {
  const currentDate = new Date();
  const timestamp = formatDate(currentDate);
  await appendFile(
    getFilePath('logs', 'update_logs.txt'),
    `${timestamp} ${message}\n`,
  );
};
