import fetch from 'node-fetch';
import fs from 'node:fs/promises';

import { dbFilePath, getHash, logUpdateMessage } from './helpers/index.js';

const URL = 'https://www.sec.gov/files/company_tickers_exchange.json';

let lastETag = null;
let lastModified = null;
let lastContentHash = null;

const checkForUpdates = async () => {
  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (compatible; MyScript/1.0)',
    };

    if (lastETag) headers['If-None-Match'] = lastETag;
    if (lastModified) headers['If-Modified-Since'] = lastModified;

    const response = await fetch(URL, { headers });

    switch (response.status) {
      case 304:
        logUpdateMessage('No update found (304 Not Modified).');
        return;
      case 200:
        const data = await response.json();
        const etag = response.headers.get('ETag');
        const modified = response.headers.get('Last-Modified');
        const contentHash = getHash(JSON.stringify(data, null, 2));

        switch (true) {
          case etag !== lastETag:
            lastETag = etag;
            logUpdateMessage('Change detected: ETag has changed.');
            break;
          case modified !== lastModified:
            lastModified = modified;
            logUpdateMessage(
              'Change detected: Last-Modified header has changed.',
            );
            break;
          case contentHash !== lastContentHash:
            lastContentHash = contentHash;
            logUpdateMessage('Change detected: Content hash has changed.');
            break;
          default:
            logUpdateMessage('No change detected.');
            return;
        }

        await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2));
        logUpdateMessage('Update found and saved.');
        break;
      default:
        const errorMessage = `Error: Received status ${response.status}`;
        logUpdateMessage(errorMessage);
    }
  } catch (error) {
    const errorMessage = `Error fetching file: ${error.message}`;
    logUpdateMessage(errorMessage);
  }
};

setInterval(checkForUpdates, 60 * 1000);
