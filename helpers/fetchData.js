import axios from 'axios';
import { calculateHash } from './calculateHash.js';

const URL = 'https://www.sec.gov/files/company_tickers_exchange.json';

const fetchData = async () => {
  try {
    console.log('Fetching data...');
    const response = await axios.get(URL, {
      headers: { 'User-Agent': 'Company_Tickers_Update-Monitoring/1.0' },
      responseType: 'text',
    });
    const data = JSON.parse(response.data);
    const headers = response.headers;

    const currentHash = calculateHash(response.data);
    const lastModified = headers['last-modified'];
    const fileSize = Buffer.byteLength(response.data, 'utf-8');

    return { currentHash, fileSize, lastModified, data };
  } catch (error) {
    throw new Error(
      `Error fetching data from ${error.response.config.url}: ${error.response.status} - ${error.response.statusText}.`,
    );
  }
};

fetchData();
