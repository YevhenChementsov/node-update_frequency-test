import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFolderPath = folder => join(__dirname, '..', `${folder}`);

const downloadsFolderPath = getFolderPath('downloads');
const logsFolderPath = getFolderPath('logs');
const dataFilePath = join(downloadsFolderPath, 'company_tickers_exchange.json');
const metadataFilePath = join(downloadsFolderPath, 'metadata.json');
const logsFilePath = join(logsFolderPath, 'update_logs.txt');

export {
  dataFilePath,
  downloadsFolderPath,
  logsFilePath,
  logsFolderPath,
  metadataFilePath,
};
