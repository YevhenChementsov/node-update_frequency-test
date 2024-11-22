import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const localFilePath = join(__dirname, 'company_tickers_exchange.json');
// const metadataFilePath = join(__dirname, 'metadata.json');
// const logsFilePath = join(__dirname, 'update_log.txt');

const getFilePath = (folder, fileName) =>
  join(__dirname, '..', `${folder}`, `${fileName}`);

const getFolderPath = folder => join(__dirname, '..', `${folder}`);

export { getFilePath, getFolderPath };
