import { createServer } from 'node:http';

import { Log } from '../db/models/index.js';
import { formatDate, messages } from './index.js';

export const startServer = async PORT => {
  createServer(async (_, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    try {
      const logs = await Log.find();
      const formattedLogs = logs
        .map(({ timestamp, message }) => `${formatDate(timestamp)} ${message}`)
        .join('\n');
      res.end(formattedLogs);
    } catch (error) {
      console.error(messages.db.fetch.log.error, error);
      res.end(JSON.stringify({ error: 'Failed to fetch logs.' }));
    }
  }).listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
  });
};
