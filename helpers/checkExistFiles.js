import { existsSync } from 'node:fs';

import { dataFilePath, metadataFilePath } from './index.js';

export const checkExistFiles = () =>
  !existsSync(dataFilePath) && !existsSync(metadataFilePath);
