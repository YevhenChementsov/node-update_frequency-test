import { writeFile } from 'node:fs/promises';

export const saveCurrentData = async (metadata, data) => {
  try {
    await writeFile(
      getFilePath('downloads', 'metadata.json'),
      JSON.stringify(metadata, null, 2),
    );
    await writeFile(
      getFilePath('downloads', 'company_tickers_exchange.json'),
      data,
    );
  } catch {
    throw new Error('Error writing or updating local files.');
  }
};
