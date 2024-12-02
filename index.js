import 'dotenv/config';
import http from 'http';
import { mkdir } from 'node:fs/promises';

import { connectToDB } from './db.js';
import { Log, Metadata } from './models/index.js';

import {
  detectChanges,
  downloadsFolderPath,
  fetchData,
  firstDownload,
  formatDate,
  loadPreviousData,
  messages,
  saveCurrentData,
  writeLogMessage,
} from './helpers/index.js';

const { saveData, startMonitor } = messages;

//! Change interval below
const INTERVAL = 1000 * 60 * 60; // 1 hour

const monitorFile = async () => {
  await mkdir(downloadsFolderPath, { recursive: true });

  try {
    const existingMetadata = await Metadata.findOne();

    const currentData = await fetchData();
    if (!currentData || !currentData.data) return;
    const { metadata, data } = currentData;

    if (!existingMetadata) {
      return await firstDownload(metadata, data);
    }

    const previousMetadata = await loadPreviousData();

    const changesDetected = await detectChanges(previousMetadata, metadata);

    if (changesDetected) {
      await saveCurrentData(metadata, data);
      console.log(saveData);
      await writeLogMessage(saveData);
    }
  } catch (error) {
    console.error(error);
  }
};

const startUpdateDetection = async () => {
  await connectToDB();
  monitorFile();
  console.log(startMonitor);
  setInterval(monitorFile, INTERVAL);
};

startUpdateDetection();

const { PORT = 3000 } = process.env;

http
  .createServer(async (_, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    try {
      const logs = await Log.find();
      const formattedLogs = logs
        .map(
          ({ timestamp, message }) => `${formatDate(timestamp)} ${message}\n`,
        )
        .join('\n');
      res.end(formattedLogs);
    } catch (error) {
      console.error('Error fetching logs from MongoDB:', error);
      res.end(JSON.stringify({ error: 'Failed to fetch logs.' }));
    }
  })
  .listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
