import { fetchData } from './helpers/fetchData.js';
import { getFilePath } from './helpers/getFilePath.js';

const monitorFile = async () => {
  const currentData = await fetchData();
  if (!currentData) return;

  const { metadata, data } = currentData;
  const previousData = await loadPreviousData();

  // compare prev & current data/metadata
  // save current data/metadata
};

const startUpdateDetection = () => {
  // logMessage('Starting update detection.');
  console.log('Starting update detection.');
  setInterval(monitorFile, interval);
};

startUpdateDetection();

const saveCurrentData = async (metadata, data) => {
  try {
    await fs.writeFile(
      getFilePath('downloads', 'metadata.json'),
      JSON.stringify(metadata, null, 2),
    );
    await fs.writeFile(
      getFilePath('downloads', 'company_tickers_exchange.json'),
      data,
    );
  } catch {
    throw new Error('Error writing or updating local files.');
  }
};

const loadPreviousData = async () => {
  try {
    const [data, metadata] = await Promise.all([
      fs.readFile(LOCAL_FILE),
      fs.readFile(METADATA_FILE, 'utf-8').then(JSON.parse),
    ]);
    return { data, metadata };
  } catch {
    throw new Error('Error loading local files.');
  }
};
