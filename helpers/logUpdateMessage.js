import fs from 'fs/promises';

import { formatDate } from './formatDate.js';
import { logsFilePath } from './paths.js';

export const logUpdateMessage = async message => {
  const currentDate = new Date();
  const timestamp = formatDate(currentDate);
  await fs.appendFile(logsFilePath, `${timestamp} ${message}\n`);
};
