import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFilePath = path.join(
  __dirname,
  '..',
  'db',
  'latest_company_tickers_exchange.json',
);

const logsFilePath = path.join(__dirname, '..', 'logs', 'update_log.txt');

export { dbFilePath, logsFilePath };
