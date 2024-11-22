import { readFile } from 'node:fs/promises';

export const loadPreviousData = async () => {
  try {
    const [data, metadata] = await Promise.all([
      readFile(getFilePath('downloads', 'company_tickers_exchange.json')),
      readFile(getFilePath('downloads', 'metadata.json'), 'utf-8').then(
        JSON.parse,
      ),
    ]);

    return { data, metadata };
  } catch {
    throw new Error('Error loading local files.');
  }
};
