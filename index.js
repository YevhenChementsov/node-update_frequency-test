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
        const dataToString = JSON.stringify(data, null, 2);
        const headers = {
          etag: response.headers.get('ETag'),
          modified: response.headers.get('Last-Modified'),
        };
        const contentHash = getHash(dataToString);
        const changes = {
          etagChanged: headers.etag !== lastETag,
          modifiedChanged: headers.modified !== lastModified,
          contentChanged: contentHash !== lastContentHash,
        };

        if (changes.etagChanged) {
          lastETag = headers.etag;
          logUpdateMessage('Change detected: ETag has changed.');
        } else if (changes.modifiedChanged) {
          lastModified = headers.modified;
          logUpdateMessage(
            'Change detected: Last-Modified header has changed.',
          );
        } else if (changes.contentChanged) {
          lastContentHash = contentHash;
          logUpdateMessage('Change detected: Content hash has changed.');
        } else {
          logUpdateMessage('No change detected.');
          return;
        }

        await fs.writeFile(dbFilePath, dataToString);
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

await checkForUpdates(); //! commit this line if you run it locally
// Run every hour
// setInterval(checkForUpdates, 60 * 1000); //! commit this line if you run it remotely
